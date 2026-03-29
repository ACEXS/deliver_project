from sqlalchemy import Column, Integer, String, DateTime, Date, Float, ForeignKey, Index
from sqlalchemy.sql import func
from config.database import Base

class TouristData(Base):
    __tablename__ = "tourist_data"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    record_date = Column(Date, nullable=False, index=True)
    record_time = Column(DateTime(timezone=True), nullable=False, index=True)
    tourists_count = Column(Integer, nullable=False)
    vehicles_count = Column(Integer, nullable=False)
    average_stay_time = Column(Float, nullable=True)  # 平均停留时间（分钟）
    peak_hour = Column(Integer, nullable=True)  # 高峰小时（0-23）
    weather = Column(String(50), nullable=True)
    temperature = Column(Float, nullable=True)  # 温度（℃）
    humidity = Column(Float, nullable=True)  # 湿度（%）
    air_quality = Column(String(20), nullable=True)  # 空气质量
    notes = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 创建复合索引
    __table_args__ = (
        Index('idx_date_time', 'record_date', 'record_time'),
    )
    
    # 序列化方法
    def to_dict(self):
        """转换为字典"""
        return {
            "id": self.id,
            "record_date": self.record_date.isoformat() if self.record_date else None,
            "record_time": self.record_time.isoformat() if self.record_time else None,
            "tourists_count": self.tourists_count,
            "vehicles_count": self.vehicles_count,
            "average_stay_time": self.average_stay_time,
            "peak_hour": self.peak_hour,
            "weather": self.weather,
            "temperature": self.temperature,
            "humidity": self.humidity,
            "air_quality": self.air_quality,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    
    # 统计相关方法
    @classmethod
    def get_daily_summary(cls, db, date):
        """获取指定日期的汇总数据"""
        from sqlalchemy import func
        
        result = db.query(
            func.sum(cls.tourists_count).label('total_tourists'),
            func.sum(cls.vehicles_count).label('total_vehicles'),
            func.avg(cls.average_stay_time).label('avg_stay_time'),
            func.max(cls.tourists_count).label('peak_tourists'),
            func.max(cls.vehicles_count).label('peak_vehicles')
        ).filter(cls.record_date == date).first()
        
        return {
            "date": date.isoformat() if date else None,
            "total_tourists": result.total_tourists or 0,
            "total_vehicles": result.total_vehicles or 0,
            "avg_stay_time": round(result.avg_stay_time, 2) if result.avg_stay_time else 0,
            "peak_tourists": result.peak_tourists or 0,
            "peak_vehicles": result.peak_vehicles or 0
        }
    
    @classmethod
    def get_date_range_summary(cls, db, start_date, end_date):
        """获取日期范围内的汇总数据"""
        from sqlalchemy import func
        
        result = db.query(
            func.sum(cls.tourists_count).label('total_tourists'),
            func.sum(cls.vehicles_count).label('total_vehicles'),
            func.avg(cls.average_stay_time).label('avg_stay_time'),
            func.count(cls.id).label('record_count')
        ).filter(cls.record_date >= start_date, cls.record_date <= end_date).first()
        
        return {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None,
            "total_tourists": result.total_tourists or 0,
            "total_vehicles": result.total_vehicles or 0,
            "avg_stay_time": round(result.avg_stay_time, 2) if result.avg_stay_time else 0,
            "record_count": result.record_count or 0
        }
