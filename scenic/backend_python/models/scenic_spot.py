from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text, Index
from sqlalchemy.sql import func
from config.database import Base

class ScenicSpot(Base):
    __tablename__ = "scenic_spots"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    area = Column(Float, nullable=True)  # 面积（平方公里）
    capacity = Column(Integer, nullable=True)  # 最大容量
    current_tourists = Column(Integer, nullable=False, default=0)  # 当前游客数
    current_vehicles = Column(Integer, nullable=False, default=0)  # 当前车辆数
    popularity_score = Column(Float, nullable=True)  # 热门程度评分（0-10）
    opening_hours = Column(String(100), nullable=True)  # 开放时间
    ticket_price = Column(Float, nullable=True)  # 票价
    contact_phone = Column(String(20), nullable=True)  # 联系电话
    is_open = Column(Integer, nullable=False, default=1)  # 是否开放（1=开放，0=关闭）
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_updated = Column(DateTime(timezone=True), nullable=True)  # 最后更新时间
    
    # 创建索引
    __table_args__ = (
        Index('idx_name_location', 'name', 'location'),
    )
    
    # 序列化方法
    def to_dict(self):
        """转换为字典"""
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "description": self.description,
            "area": self.area,
            "capacity": self.capacity,
            "current_tourists": self.current_tourists,
            "current_vehicles": self.current_vehicles,
            "popularity_score": self.popularity_score,
            "opening_hours": self.opening_hours,
            "ticket_price": self.ticket_price,
            "contact_phone": self.contact_phone,
            "is_open": self.is_open,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "last_updated": self.last_updated.isoformat() if self.last_updated else None
        }
    
    # 状态相关方法
    def is_over_capacity(self):
        """检查是否超过容量"""
        if self.capacity:
            return self.current_tourists > self.capacity
        return False
    
    def get_occupancy_rate(self):
        """获取占用率"""
        if self.capacity and self.capacity > 0:
            return round((self.current_tourists / self.capacity) * 100, 2)
        return 0
    
    # 更新状态方法
    def update_status(self, tourists_count, vehicles_count):
        """更新景点状态"""
        self.current_tourists = tourists_count
        self.current_vehicles = vehicles_count
        self.last_updated = func.now()
    
    # 统计相关方法
    @classmethod
    def get_popular_spots(cls, db, limit=10):
        """获取热门景点排行"""
        return db.query(cls).filter(cls.is_open == 1).order_by(cls.popularity_score.desc()).limit(limit).all()
    
    @classmethod
    def get_over_capacity_spots(cls, db):
        """获取超过容量的景点"""
        return db.query(cls).filter(cls.is_open == 1, cls.current_tourists > cls.capacity).all()
    
    @classmethod
    def get_total_stats(cls, db):
        """获取所有景点的汇总统计"""
        from sqlalchemy import func
        
        result = db.query(
            func.count(cls.id).label('total_spots'),
            func.sum(cls.current_tourists).label('total_tourists'),
            func.sum(cls.current_vehicles).label('total_vehicles'),
            func.avg(cls.popularity_score).label('avg_popularity')
        ).filter(cls.is_open == 1).first()
        
        return {
            "total_spots": result.total_spots or 0,
            "total_tourists": result.total_tourists or 0,
            "total_vehicles": result.total_vehicles or 0,
            "avg_popularity": round(result.avg_popularity, 2) if result.avg_popularity else 0
        }
