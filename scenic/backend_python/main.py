from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 导入路由
from routes import auth, realtime, historical, trend

# 导入配置
from config.database import init_db
from config.redis import redis_client

@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时执行
    print("正在初始化数据库...")
    try:
        init_db()
        print("数据库初始化完成")
    except Exception as e:
        print(f"数据库初始化失败: {e}")
    
    # 测试Redis连接
    try:
        await redis_client.ping()
        print("Redis连接成功")
    except Exception as e:
        print(f"Redis连接失败: {e}")
    
    yield
    
    # 关闭时执行
    print("应用正在关闭...")
    await redis_client.close()
    print("应用已关闭")

# 创建FastAPI应用实例
app = FastAPI(
    title="泰宁旅游监测系统API",
    description="泰宁旅游监测系统后端API接口",
    version="1.0.0",
    lifespan=lifespan
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router, prefix="/api/auth", tags=["认证"])
app.include_router(realtime.router, prefix="/api/realtime", tags=["实时监测"])
app.include_router(historical.router, prefix="/api/historical", tags=["历史数据"])
app.include_router(trend.router, prefix="/api/trend", tags=["趋势预测"])

# 根路径
@app.get("/")
async def root():
    return {
        "message": "泰宁旅游监测系统API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# 健康检查
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 3001)),
        reload=True
    )
