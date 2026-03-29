import redis.asyncio as redis
from dotenv import load_dotenv
import os
import json

# 加载环境变量
load_dotenv()

# 获取Redis URL
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# 创建Redis客户端
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

# 测试Redis连接
async def test_redis_connection():
    try:
        await redis_client.ping()
        print("Redis connection successful")
        return True
    except Exception as e:
        print(f"Redis connection failed: {e}")
        return False

# 缓存相关操作
async def set_cache(key, value, expire=3600):
    """设置缓存"""
    try:
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        await redis_client.setex(key, expire, value)
        return True
    except Exception as e:
        print(f"Set cache failed: {e}")
        return False

async def get_cache(key):
    """获取缓存"""
    try:
        value = await redis_client.get(key)
        if value:
            try:
                return json.loads(value)
            except:
                return value
        return None
    except Exception as e:
        print(f"Get cache failed: {e}")
        return None

async def delete_cache(key):
    """删除缓存"""
    try:
        await redis_client.delete(key)
        return True
    except Exception as e:
        print(f"Delete cache failed: {e}")
        return False

# 实时数据相关操作
async def publish_realtime_data(channel, data):
    """发布实时数据"""
    try:
        if isinstance(data, (dict, list)):
            data = json.dumps(data)
        await redis_client.publish(channel, data)
        return True
    except Exception as e:
        print(f"Publish failed: {e}")
        return False

# 缓存键常量
class CacheKeys:
    REALTIME_DATA = "realtime:data"
    HISTORICAL_DATA = "historical:data:{start_date}:{end_date}"
    TREND_PREDICTION = "trend:prediction"
    SCENIC_SPOTS = "scenic:spots"
    USER_SESSION = "user:session:{user_id}"
