from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.tourist_data import TouristData
from models.scenic_spot import ScenicSpot
from config.database import get_db
from config.redis import get_cache, set_cache, publish_realtime_data, CacheKeys
from routes.auth import get_current_user
from models.user import User
from pydantic import BaseModel

# 创建路由器
router = APIRouter(prefix="/realtime", tags=["realtime"])

# 响应模型
class RealtimeData(BaseModel):
    total_tourists: int
    total_vehicles: int
    average_stay_time: float
    peak_hour: int
    weather: str
    temperature: float
    humidity: float
    air_quality: str
    update_time: str

class ScenicSpotRealtimeData(BaseModel):
    id: int
    name: str
    current_tourists: int
    current_vehicles: int
    capacity: int
    occupancy_rate: float
    is_over_capacity: bool
    is_open: int
    last_updated: str

class RealtimeResponse(BaseModel):
    overview: RealtimeData
    scenic_spots: list[ScenicSpotRealtimeData]
    timestamp: str
    refresh_interval: int  # 刷新间隔（秒）

# 获取实时数据
@router.get("/data", response_model=RealtimeResponse)
async def get_realtime_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    refresh: bool = Query(False, description="是否强制刷新数据")
):
    """获取实时监控数据"""
    # 尝试从缓存获取数据
    cache_key = CacheKeys.REALTIME_DATA
    cached_data = await get_cache(cache_key)
    
    if cached_data and not refresh:
        return cached_data
    
    # 获取最新的游客数据记录
    latest_data = db.query(TouristData).order_by(TouristData.record_time.desc()).first()
    
    if not latest_data:
        # 如果没有数据，返回默认值
        overview = RealtimeData(
            total_tourists=0,
            total_vehicles=0,
            average_stay_time=0,
            peak_hour=12,  # 默认中午12点
            weather="晴朗",
            temperature=25.0,
            humidity=60.0,
            air_quality="良好",
            update_time=datetime.now().isoformat()
        )
    else:
        # 计算当前总游客数和车辆数
        total_tourists = db.query(ScenicSpot).filter(ScenicSpot.is_open == 1).with_entities(
            db.func.sum(ScenicSpot.current_tourists)
        ).scalar() or 0
        
        total_vehicles = db.query(ScenicSpot).filter(ScenicSpot.is_open == 1).with_entities(
            db.func.sum(ScenicSpot.current_vehicles)
        ).scalar() or 0
        
        overview = RealtimeData(
            total_tourists=total_tourists,
            total_vehicles=total_vehicles,
            average_stay_time=latest_data.average_stay_time or 0,
            peak_hour=latest_data.peak_hour or 12,
            weather=latest_data.weather or "晴朗",
            temperature=latest_data.temperature or 25.0,
            humidity=latest_data.humidity or 60.0,
            air_quality=latest_data.air_quality or "良好",
            update_time=latest_data.record_time.isoformat()
        )
    
    # 获取所有景点的实时数据
    scenic_spots_data = []
    scenic_spots = db.query(ScenicSpot).filter(ScenicSpot.is_open == 1).all()
    
    for spot in scenic_spots:
        occupancy_rate = spot.get_occupancy_rate()
        scenic_spot_data = ScenicSpotRealtimeData(
            id=spot.id,
            name=spot.name,
            current_tourists=spot.current_tourists,
            current_vehicles=spot.current_vehicles,
            capacity=spot.capacity or 0,
            occupancy_rate=occupancy_rate,
            is_over_capacity=spot.is_over_capacity(),
            is_open=spot.is_open,
            last_updated=spot.last_updated.isoformat() if spot.last_updated else datetime.now().isoformat()
        )
        scenic_spots_data.append(scenic_spot_data)
    
    # 构建响应
    response_data = RealtimeResponse(
        overview=overview,
        scenic_spots=scenic_spots_data,
        timestamp=datetime.now().isoformat(),
        refresh_interval=30  # 30秒刷新一次
    )
    
    # 缓存数据（5分钟过期）
    await set_cache(cache_key, response_data.dict(), expire=300)
    
    # 发布实时数据到Redis
    await publish_realtime_data("realtime:update", response_data.dict())
    
    return response_data

# 获取特定景点的实时数据
@router.get("/scenic/{spot_id}", response_model=ScenicSpotRealtimeData)
def get_scenic_spot_realtime_data(
    spot_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取特定景点的实时数据"""
    spot = db.query(ScenicSpot).filter(ScenicSpot.id == spot_id).first()
    
    if not spot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scenic spot not found"
        )
    
    occupancy_rate = spot.get_occupancy_rate()
    
    return ScenicSpotRealtimeData(
        id=spot.id,
        name=spot.name,
        current_tourists=spot.current_tourists,
        current_vehicles=spot.current_vehicles,
        capacity=spot.capacity or 0,
        occupancy_rate=occupancy_rate,
        is_over_capacity=spot.is_over_capacity(),
        is_open=spot.is_open,
        last_updated=spot.last_updated.isoformat() if spot.last_updated else datetime.now().isoformat()
    )

# 更新景点实时数据（仅管理员）
@router.post("/scenic/{spot_id}/update", response_model=dict)
async def update_scenic_spot_realtime_data(
    spot_id: int,
    tourists_count: int = Query(..., description="当前游客数"),
    vehicles_count: int = Query(..., description="当前车辆数"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """更新景点实时数据"""
    # 检查权限
    if not current_user.is_admin():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    spot = db.query(ScenicSpot).filter(ScenicSpot.id == spot_id).first()
    
    if not spot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scenic spot not found"
        )
    
    # 更新数据
    spot.update_status(tourists_count, vehicles_count)
    db.commit()
    db.refresh(spot)
    
    # 清除缓存
    from config.redis import delete_cache as redis_delete
    await redis_delete(CacheKeys.REALTIME_DATA)
    
    return {
        "message": "Scenic spot data updated successfully",
        "spot_id": spot.id,
        "name": spot.name,
        "current_tourists": spot.current_tourists,
        "current_vehicles": spot.current_vehicles,
        "last_updated": spot.last_updated.isoformat()
    }

# 获取实时统计数据
@router.get("/stats", response_model=dict)
def get_realtime_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取实时统计数据"""
    # 计算总游客数和车辆数
    total_stats = db.query(
        db.func.sum(ScenicSpot.current_tourists).label('total_tourists'),
        db.func.sum(ScenicSpot.current_vehicles).label('total_vehicles'),
        db.func.count(ScenicSpot.id).label('total_spots'),
        db.func.sum(db.case((ScenicSpot.is_over_capacity() == True, 1), else_=0)).label('over_capacity_spots')
    ).filter(ScenicSpot.is_open == 1).first()
    
    # 获取热门景点（按当前游客数排序）
    popular_spots = db.query(ScenicSpot).filter(ScenicSpot.is_open == 1).order_by(ScenicSpot.current_tourists.desc()).limit(5).all()
    
    popular_list = []
    for spot in popular_spots:
        popular_list.append({
            "id": spot.id,
            "name": spot.name,
            "current_tourists": spot.current_tourists,
            "capacity": spot.capacity,
            "occupancy_rate": spot.get_occupancy_rate()
        })
    
    return {
        "total_tourists": total_stats.total_tourists or 0,
        "total_vehicles": total_stats.total_vehicles or 0,
        "total_spots": total_stats.total_spots or 0,
        "over_capacity_spots": total_stats.over_capacity_spots or 0,
        "popular_spots": popular_list,
        "timestamp": datetime.now().isoformat()
    }

# 获取实时数据趋势（最近1小时）
@router.get("/trend", response_model=dict)
def get_realtime_trend(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    hours: int = Query(1, ge=1, le=24, description="查询小时数")
):
    """获取实时数据趋势"""
    # 计算时间范围
    end_time = datetime.now()
    start_time = end_time - timedelta(hours=hours)
    
    # 查询时间范围内的数据
    trend_data = db.query(TouristData).filter(
        TouristData.record_time >= start_time,
        TouristData.record_time <= end_time
    ).order_by(TouristData.record_time).all()
    
    # 构建趋势数据
    time_points = []
    tourists_data = []
    vehicles_data = []
    
    for record in trend_data:
        time_points.append(record.record_time.isoformat())
        tourists_data.append(record.tourists_count)
        vehicles_data.append(record.vehicles_count)
    
    return {
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "time_points": time_points,
        "tourists_data": tourists_data,
        "vehicles_data": vehicles_data,
        "data_points": len(trend_data)
    }


