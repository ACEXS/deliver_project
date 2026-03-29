from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, date, timedelta
from models.trend_prediction import TrendPrediction, TrendType
from config.database import get_db
from config.redis import get_cache, set_cache, CacheKeys
from routes.auth import get_current_user
from models.user import User
from pydantic import BaseModel

# 创建路由器
router = APIRouter(prefix="/trend", tags=["trend"])

# 响应模型
class PredictionDataResponse(BaseModel):
    prediction_date: str
    predicted_tourists: int
    predicted_vehicles: int
    confidence_level: float
    trend: str
    peak_time: str
    weather_forecast: str
    temperature_forecast: float
    notes: str

class PredictionSummaryResponse(BaseModel):
    start_date: str
    end_date: str
    avg_predicted_tourists: int
    avg_predicted_vehicles: int
    avg_confidence: float
    prediction_count: int
    trend_distribution: dict

class TrendAnalysisResponse(BaseModel):
    analysis_period: str
    trend_direction: str
    key_insights: list[str]
    recommendations: list[str]
    peak_prediction: dict

# 获取未来7天的预测数据
@router.get("/forecast", response_model=list[PredictionDataResponse])
async def get_7day_forecast(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取未来7天的游客流量预测"""
    # 尝试从缓存获取数据
    cache_key = CacheKeys.TREND_PREDICTION
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return cached_data
    
    # 获取未来7天的预测数据
    predictions = TrendPrediction.get_7day_forecast(db)
    
    if not predictions:
        # 如果没有预测数据，生成默认预测
        predictions = generate_default_predictions(db)
    
    # 转换为响应模型
    result = []
    for prediction in predictions:
        result.append(PredictionDataResponse(
            prediction_date=prediction.prediction_date.isoformat(),
            predicted_tourists=prediction.predicted_tourists,
            predicted_vehicles=prediction.predicted_vehicles,
            confidence_level=prediction.confidence_level,
            trend=prediction.trend.value,
            peak_time=prediction.peak_time.isoformat() if prediction.peak_time else "",
            weather_forecast=prediction.weather_forecast or "",
            temperature_forecast=prediction.temperature_forecast or 0,
            notes=prediction.notes or ""
        ))
    
    # 缓存数据（1小时过期）
    await set_cache(cache_key, [item.dict() for item in result], expire=3600)
    
    return result

# 获取趋势分析数据
@router.get("/analysis", response_model=PredictionSummaryResponse)
def get_trend_analysis(
    days: int = Query(30, ge=7, le=90, description="分析天数"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取趋势分析数据"""
    # 获取趋势分析
    analysis = TrendPrediction.get_trend_analysis(db, days)
    
    return PredictionSummaryResponse(
        start_date=analysis["start_date"],
        end_date=analysis["end_date"],
        avg_predicted_tourists=analysis["avg_tourists"],
        avg_predicted_vehicles=analysis["avg_vehicles"],
        avg_confidence=analysis["avg_confidence"],
        prediction_count=analysis["prediction_count"],
        trend_distribution=analysis["trend_distribution"]
    )

# 获取详细的趋势分析
@router.get("/detailed-analysis", response_model=TrendAnalysisResponse)
def get_detailed_trend_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取详细的趋势分析"""
    # 获取未来7天的预测数据
    predictions = TrendPrediction.get_7day_forecast(db)
    
    if not predictions:
        # 如果没有预测数据，生成默认预测
        predictions = generate_default_predictions(db)
    
    # 分析趋势
    trend_direction = analyze_trend_direction(predictions)
    key_insights = generate_key_insights(predictions)
    recommendations = generate_recommendations(predictions)
    peak_prediction = find_peak_prediction(predictions)
    
    return TrendAnalysisResponse(
        analysis_period="7天预测",
        trend_direction=trend_direction,
        key_insights=key_insights,
        recommendations=recommendations,
        peak_prediction=peak_prediction
    )

# 生成默认预测数据（当数据库中没有数据时使用）
def generate_default_predictions(db):
    """生成默认预测数据"""
    predictions = []
    base_tourists = 1000
    base_vehicles = 300
    
    for i in range(7):
        prediction_date = date.today() + timedelta(days=i)
        
        # 根据星期几调整预测值
        weekday = prediction_date.weekday()
        if weekday in [5, 6]:  # 周末
            multiplier = 1.5
            trend = TrendType.increasing
        elif weekday in [0, 4]:  # 周一和周五
            multiplier = 1.2
            trend = TrendType.increasing
        else:  # 周二到周四
            multiplier = 1.0
            trend = TrendType.stable
        
        # 生成预测数据
        predicted_tourists = int(base_tourists * multiplier)
        predicted_vehicles = int(base_vehicles * multiplier)
        
        # 创建预测记录
        prediction = TrendPrediction(
            prediction_date=prediction_date,
            predicted_tourists=predicted_tourists,
            predicted_vehicles=predicted_vehicles,
            confidence_level=0.75,
            trend=trend,
            peak_time=datetime.combine(prediction_date, datetime.strptime("14:00", "%H:%M").time()),
            weather_forecast="晴朗",
            temperature_forecast=25.0,
            notes="默认预测数据"
        )
        
        # 保存到数据库
        db.add(prediction)
        predictions.append(prediction)
    
    db.commit()
    return predictions

# 分析趋势方向
def analyze_trend_direction(predictions):
    """分析趋势方向"""
    if len(predictions) < 2:
        return "stable"
    
    first_value = predictions[0].predicted_tourists
    last_value = predictions[-1].predicted_tourists
    
    if last_value > first_value * 1.1:
        return "increasing"
    elif last_value < first_value * 0.9:
        return "decreasing"
    else:
        return "stable"

# 生成关键洞察
def generate_key_insights(predictions):
    """生成关键洞察"""
    insights = []
    
    # 计算平均预测值
    avg_tourists = sum(p.predicted_tourists for p in predictions) / len(predictions)
    
    # 找出峰值
    peak_prediction = max(predictions, key=lambda x: x.predicted_tourists)
    
    insights.append(f"预计未来7天平均游客量为{int(avg_tourists)}人次")
    insights.append(f"预计{peak_prediction.prediction_date.isoformat()}将达到峰值，游客量约{peak_prediction.predicted_tourists}人次")
    
    # 分析周末效应
    weekend_predictions = [p for p in predictions if p.prediction_date.weekday() in [5, 6]]
    weekday_predictions = [p for p in predictions if p.prediction_date.weekday() not in [5, 6]]
    
    if weekend_predictions and weekday_predictions:
        avg_weekend = sum(p.predicted_tourists for p in weekend_predictions) / len(weekend_predictions)
        avg_weekday = sum(p.predicted_tourists for p in weekday_predictions) / len(weekday_predictions)
        
        if avg_weekend > avg_weekday * 1.2:
            insights.append("周末游客量预计将显著高于工作日，增幅约{:.1f}%".format((avg_weekend / avg_weekday - 1) * 100))
    
    return insights

# 生成建议
def generate_recommendations(predictions):
    """生成建议"""
    recommendations = []
    
    # 基于预测数据生成建议
    peak_prediction = max(predictions, key=lambda x: x.predicted_tourists)
    
    if peak_prediction.predicted_tourists > 1500:
        recommendations.append(f"建议在{peak_prediction.prediction_date.isoformat()}增加安保和服务人员配置")
        recommendations.append("建议提前做好停车场和景区容量的预警管理")
    
    # 基于趋势生成建议
    trend_direction = analyze_trend_direction(predictions)
    
    if trend_direction == "increasing":
        recommendations.append("预计游客量呈上升趋势，建议提前做好物资储备")
    elif trend_direction == "decreasing":
        recommendations.append("预计游客量呈下降趋势，建议适当调整服务人员排班")
    
    recommendations.append("建议密切关注天气预报，做好极端天气的应对准备")
    recommendations.append("建议通过景区官网和社交媒体及时发布游客量信息，引导游客错峰出行")
    
    return recommendations

# 找出峰值预测
def find_peak_prediction(predictions):
    """找出峰值预测"""
    if not predictions:
        return {}
    
    peak_prediction = max(predictions, key=lambda x: x.predicted_tourists)
    
    return {
        "date": peak_prediction.prediction_date.isoformat(),
        "predicted_tourists": peak_prediction.predicted_tourists,
        "predicted_vehicles": peak_prediction.predicted_vehicles,
        "peak_time": peak_prediction.peak_time.isoformat() if peak_prediction.peak_time else "",
        "confidence_level": peak_prediction.confidence_level
    }

# 创建新的预测数据（仅管理员）
@router.post("/create", response_model=PredictionDataResponse)
async def create_prediction(
    prediction_date: str = Query(..., description="预测日期 (YYYY-MM-DD)"),
    predicted_tourists: int = Query(..., description="预测游客数"),
    predicted_vehicles: int = Query(..., description="预测车辆数"),
    confidence_level: float = Query(..., ge=0, le=1, description="预测可信度"),
    trend: str = Query(..., description="趋势类型 (increasing, decreasing, stable)"),
    weather_forecast: str = Query(None, description="天气预报"),
    temperature_forecast: float = Query(None, description="预测温度"),
    notes: str = Query(None, description="备注信息"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """创建新的预测数据（仅管理员）"""
    # 检查权限
    if not current_user.is_admin():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    try:
        # 解析日期
        prediction_date_obj = date.fromisoformat(prediction_date)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )
    
    # 验证趋势类型
    if trend not in ["increasing", "decreasing", "stable"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid trend type. Use increasing, decreasing, or stable"
        )
    
    # 构建预测数据
    prediction_data = {
        "prediction_date": prediction_date_obj,
        "predicted_tourists": predicted_tourists,
        "predicted_vehicles": predicted_vehicles,
        "confidence_level": confidence_level,
        "trend": TrendType(trend),
        "peak_time": datetime.combine(prediction_date_obj, datetime.strptime("14:00", "%H:%M").time()),
        "weather_forecast": weather_forecast,
        "temperature_forecast": temperature_forecast,
        "notes": notes
    }
    
    # 创建或更新预测
    prediction = TrendPrediction.create_prediction(db, prediction_data)
    
    # 清除缓存
    from config.redis import delete_cache
    await delete_cache(CacheKeys.TREND_PREDICTION)
    
    # 转换为响应模型
    return PredictionDataResponse(
        prediction_date=prediction.prediction_date.isoformat(),
        predicted_tourists=prediction.predicted_tourists,
        predicted_vehicles=prediction.predicted_vehicles,
        confidence_level=prediction.confidence_level,
        trend=prediction.trend.value,
        peak_time=prediction.peak_time.isoformat() if prediction.peak_time else "",
        weather_forecast=prediction.weather_forecast or "",
        temperature_forecast=prediction.temperature_forecast or 0,
        notes=prediction.notes or ""
    )
