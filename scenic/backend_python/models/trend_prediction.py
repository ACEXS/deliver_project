from sqlalchemy import Column, Integer, String, DateTime, Date, Float, Enum, Index
from sqlalchemy.sql import func
from config.database import Base
import enum

# 趋势类型枚举
class TrendType(enum.Enum):
    increasing = "increasing"  # 上升
    decreasing = "decreasing"  # 下降
    stable = "stable"  # 稳定

class TrendPrediction(Base):
    __tablename__ = "trend_predictions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    prediction_date = Column(Date, unique=True, index=True, nullable=False)  # 预测日期
    predicted_tourists = Column(Integer, nullable=False)  # 预测游客数
    predicted_vehicles = Column(Integer, nullable=False)  # 预测车辆数
    confidence_level = Column(Float, nullable=False)  # 预测可信度（0-1）
    trend = Column(Enum(TrendType), nullable=False)  # 趋势类型
    peak_time = Column(DateTime(timezone=True), nullable=True)  # 预测高峰时间
    weather_forecast = Column(String(50), nullable=True)  # 天气预报
    temperature_forecast = Column(Float, nullable=True)  # 预测温度（℃）
    notes = Column(String(255), nullable=True)  # 备注信息
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 创建索引
    __table_args__ = (
        Index('idx_prediction_date', 'prediction_date'),
    )
    
    # 序列化方法
    def to_dict(self):
        """转换为字典"""
        return {
            "id": self.id,
            "prediction_date": self.prediction_date.isoformat() if self.prediction_date else None,
            "predicted_tourists": self.predicted_tourists,
            "predicted_vehicles": self.predicted_vehicles,
            "confidence_level": self.confidence_level,
            "trend": self.trend.value if self.trend else None,
            "peak_time": self.peak_time.isoformat() if self.peak_time else None,
            "weather_forecast": self.weather_forecast,
            "temperature_forecast": self.temperature_forecast,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    
    # 预测相关方法
    @classmethod
    def get_7day_forecast(cls, db):
        """获取未来7天的预测数据"""
        from datetime import datetime, timedelta
        
        today = datetime.now().date()
        end_date = today + timedelta(days=7)
        
        return db.query(cls).filter(cls.prediction_date >= today, cls.prediction_date <= end_date).order_by(cls.prediction_date).all()
    
    @classmethod
    def get_trend_analysis(cls, db, days=30):
        """获取趋势分析数据"""
        from datetime import datetime, timedelta
        from sqlalchemy import func
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        result = db.query(
            func.avg(cls.predicted_tourists).label('avg_tourists'),
            func.avg(cls.predicted_vehicles).label('avg_vehicles'),
            func.avg(cls.confidence_level).label('avg_confidence'),
            func.count(cls.id).label('prediction_count')
        ).filter(cls.prediction_date >= start_date, cls.prediction_date <= end_date).first()
        
        # 趋势分布
        trend_distribution = db.query(
            cls.trend,
            func.count(cls.id).label('count')
        ).filter(cls.prediction_date >= start_date, cls.prediction_date <= end_date).group_by(cls.trend).all()
        
        trend_dist = {}
        for trend, count in trend_distribution:
            trend_dist[trend.value] = count
        
        return {
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat(),
            "avg_tourists": round(result.avg_tourists, 0) if result.avg_tourists else 0,
            "avg_vehicles": round(result.avg_vehicles, 0) if result.avg_vehicles else 0,
            "avg_confidence": round(result.avg_confidence, 2) if result.avg_confidence else 0,
            "prediction_count": result.prediction_count or 0,
            "trend_distribution": trend_dist
        }
    
    @classmethod
    def create_prediction(cls, db, prediction_data):
        """创建预测数据"""
        # 检查是否已存在该日期的预测
        existing = db.query(cls).filter(cls.prediction_date == prediction_data['prediction_date']).first()
        
        if existing:
            # 更新现有预测
            for key, value in prediction_data.items():
                setattr(existing, key, value)
            db.commit()
            db.refresh(existing)
            return existing
        else:
            # 创建新预测
            new_prediction = cls(**prediction_data)
            db.add(new_prediction)
            db.commit()
            db.refresh(new_prediction)
            return new_prediction
