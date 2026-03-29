from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, date, timedelta
from models.tourist_data import TouristData
from config.database import get_db
from config.redis import get_cache, set_cache, CacheKeys
from routes.auth import get_current_user
from models.user import User
from pydantic import BaseModel

# 创建路由器
router = APIRouter(prefix="/historical", tags=["historical"])

# 响应模型
class HistoricalDataResponse(BaseModel):
    date: str
    tourists_count: int
    vehicles_count: int
    average_stay_time: float
    peak_hour: int
    weather: str
    temperature: float
    humidity: float
    air_quality: str

class DateRangeRequest(BaseModel):
    start_date: str
    end_date: str

class HistoricalSummaryResponse(BaseModel):
    start_date: str
    end_date: str
    total_tourists: int
    total_vehicles: int
    avg_stay_time: float
    record_count: int
    daily_average_tourists: int
    daily_average_vehicles: int

class HistoricalTrendResponse(BaseModel):
    time_points: list[str]
    tourists_data: list[int]
    vehicles_data: list[int]
    trend_type: str
    peak_value: int
    peak_date: str

# 获取指定日期的历史数据
@router.get("/date/{target_date}", response_model=list[HistoricalDataResponse])
async def get_historical_data_by_date(
    target_date: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取指定日期的历史数据"""
    try:
        # 解析日期
        target_date_obj = date.fromisoformat(target_date)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )
    
    # 尝试从缓存获取数据
    cache_key = CacheKeys.HISTORICAL_DATA.format(
        start_date=target_date,
        end_date=target_date
    )
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return cached_data
    
    # 查询指定日期的数据
    data = db.query(TouristData).filter(
        TouristData.record_date == target_date_obj
    ).order_by(TouristData.record_time).all()
    
    # 转换为响应模型
    result = []
    for record in data:
        result.append(HistoricalDataResponse(
            date=record.record_time.isoformat(),
            tourists_count=record.tourists_count,
            vehicles_count=record.vehicles_count,
            average_stay_time=record.average_stay_time or 0,
            peak_hour=record.peak_hour or 0,
            weather=record.weather or "",
            temperature=record.temperature or 0,
            humidity=record.humidity or 0,
            air_quality=record.air_quality or ""
        ))
    
    # 缓存数据（1小时过期）
    await set_cache(cache_key, [item.dict() for item in result], expire=3600)
    
    return result

# 获取日期范围内的历史数据
@router.get("/range", response_model=list[HistoricalDataResponse])
async def get_historical_data_by_range(
    start_date: str = Query(..., description="开始日期 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="结束日期 (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取日期范围内的历史数据"""
    try:
        # 解析日期
        start_date_obj = date.fromisoformat(start_date)
        end_date_obj = date.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )
    
    # 验证日期范围
    if start_date_obj > end_date_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date must be before end date"
        )
    
    # 限制查询范围（最多30天）
    date_diff = (end_date_obj - start_date_obj).days
    if date_diff > 30:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Date range cannot exceed 30 days"
        )
    
    # 尝试从缓存获取数据
    cache_key = CacheKeys.HISTORICAL_DATA.format(
        start_date=start_date,
        end_date=end_date
    )
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return cached_data
    
    # 查询日期范围内的数据
    data = db.query(TouristData).filter(
        TouristData.record_date >= start_date_obj,
        TouristData.record_date <= end_date_obj
    ).order_by(TouristData.record_time).all()
    
    # 转换为响应模型
    result = []
    for record in data:
        result.append(HistoricalDataResponse(
            date=record.record_time.isoformat(),
            tourists_count=record.tourists_count,
            vehicles_count=record.vehicles_count,
            average_stay_time=record.average_stay_time or 0,
            peak_hour=record.peak_hour or 0,
            weather=record.weather or "",
            temperature=record.temperature or 0,
            humidity=record.humidity or 0,
            air_quality=record.air_quality or ""
        ))
    
    # 缓存数据（1小时过期）
    await set_cache(cache_key, [item.dict() for item in result], expire=3600)
    
    return result

# 获取日期范围内的汇总数据
@router.get("/summary", response_model=HistoricalSummaryResponse)
def get_historical_summary(
    start_date: str = Query(..., description="开始日期 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="结束日期 (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取日期范围内的汇总数据"""
    try:
        # 解析日期
        start_date_obj = date.fromisoformat(start_date)
        end_date_obj = date.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )
    
    # 验证日期范围
    if start_date_obj > end_date_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date must be before end date"
        )
    
    # 获取汇总数据
    summary = TouristData.get_date_range_summary(db, start_date_obj, end_date_obj)
    
    # 计算日均数据
    date_diff = (end_date_obj - start_date_obj).days + 1
    daily_average_tourists = round(summary["total_tourists"] / date_diff) if date_diff > 0 else 0
    daily_average_vehicles = round(summary["total_vehicles"] / date_diff) if date_diff > 0 else 0
    
    return HistoricalSummaryResponse(
        start_date=start_date,
        end_date=end_date,
        total_tourists=summary["total_tourists"],
        total_vehicles=summary["total_vehicles"],
        avg_stay_time=summary["avg_stay_time"],
        record_count=summary["record_count"],
        daily_average_tourists=daily_average_tourists,
        daily_average_vehicles=daily_average_vehicles
    )

# 获取历史趋势数据
@router.get("/trend", response_model=HistoricalTrendResponse)
def get_historical_trend(
    start_date: str = Query(..., description="开始日期 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="结束日期 (YYYY-MM-DD)"),
    interval: str = Query("day", description="时间间隔 (day, hour)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取历史趋势数据"""
    try:
        # 解析日期
        start_date_obj = date.fromisoformat(start_date)
        end_date_obj = date.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )
    
    # 验证日期范围
    if start_date_obj > end_date_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date must be before end date"
        )
    
    # 查询数据
    data = db.query(TouristData).filter(
        TouristData.record_date >= start_date_obj,
        TouristData.record_date <= end_date_obj
    ).order_by(TouristData.record_time).all()
    
    if not data:
        return HistoricalTrendResponse(
            time_points=[],
            tourists_data=[],
            vehicles_data=[],
            trend_type="stable",
            peak_value=0,
            peak_date=""
        )
    
    # 构建趋势数据
    time_points = []
    tourists_data = []
    vehicles_data = []
    
    for record in data:
        if interval == "day":
            time_points.append(record.record_date.isoformat())
        else:  # hour
            time_points.append(record.record_time.isoformat())
        tourists_data.append(record.tourists_count)
        vehicles_data.append(record.vehicles_count)
    
    # 分析趋势
    if len(tourists_data) >= 2:
        first_value = tourists_data[0]
        last_value = tourists_data[-1]
        
        if last_value > first_value * 1.1:
            trend_type = "increasing"
        elif last_value < first_value * 0.9:
            trend_type = "decreasing"
        else:
            trend_type = "stable"
    else:
        trend_type = "stable"
    
    # 找到峰值
    if tourists_data:
        peak_value = max(tourists_data)
        peak_index = tourists_data.index(peak_value)
        peak_date = time_points[peak_index]
    else:
        peak_value = 0
        peak_date = ""
    
    return HistoricalTrendResponse(
        time_points=time_points,
        tourists_data=tourists_data,
        vehicles_data=vehicles_data,
        trend_type=trend_type,
        peak_value=peak_value,
        peak_date=peak_date
    )

# 获取最近N天的历史数据
@router.get("/recent/{days}", response_model=list[HistoricalDataResponse])
async def get_recent_historical_data(
    days: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取最近N天的历史数据"""
    # 计算日期范围
    end_date = date.today()
    start_date = end_date - timedelta(days=days-1)
    
    # 转换为字符串格式
    start_date_str = start_date.isoformat()
    end_date_str = end_date.isoformat()
    
    # 调用范围查询接口
    return await get_historical_data_by_range(
        start_date=start_date_str,
        end_date=end_date_str,
        db=db,
        current_user=current_user
    )

# 导出历史数据
@router.get("/export", response_model=dict)
async def export_historical_data(
    start_date: str = Query(..., description="开始日期 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="结束日期 (YYYY-MM-DD)"),
    format: str = Query("json", description="导出格式 (json, csv)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """导出历史数据"""
    # 调用范围查询获取数据
    data = await get_historical_data_by_range(
        start_date=start_date,
        end_date=end_date,
        db=db,
        current_user=current_user
    )
    
    # 转换为导出格式
    if format == "csv":
        # 生成CSV内容
        import csv
        import io
        
        output = io.StringIO()
        writer = csv.writer(output)
        
        # 写入表头
        writer.writerow([
            "Date", "Tourists Count", "Vehicles Count",
            "Average Stay Time", "Peak Hour", "Weather",
            "Temperature", "Humidity", "Air Quality"
        ])
        
        # 写入数据
        for item in data:
            writer.writerow([
                item.date,
                item.tourists_count,
                item.vehicles_count,
                item.average_stay_time,
                item.peak_hour,
                item.weather,
                item.temperature,
                item.humidity,
                item.air_quality
            ])
        
        csv_content = output.getvalue()
        
        return {
            "format": "csv",
            "content": csv_content,
            "filename": f"historical_data_{start_date}_{end_date}.csv",
            "records_count": len(data)
        }
    else:  # json
        return {
            "format": "json",
            "data": [item.dict() for item in data],
            "records_count": len(data),
            "start_date": start_date,
            "end_date": end_date
        }
