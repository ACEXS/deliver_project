from datetime import datetime, timedelta
from jose import JWTError, jwt
from dotenv import load_dotenv
import os

# 加载环境变量
load_dotenv()

# JWT配置
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key_here")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

# 处理JWT过期时间配置
jwt_expires_in = os.getenv("JWT_EXPIRES_IN", "1440")
try:
    if jwt_expires_in.endswith('h'):
        # 处理小时格式，如"24h"
        ACCESS_TOKEN_EXPIRE_MINUTES = int(jwt_expires_in[:-1]) * 60
    else:
        # 直接处理分钟格式
        ACCESS_TOKEN_EXPIRE_MINUTES = int(jwt_expires_in)
except ValueError:
    # 如果解析失败，使用默认值1440分钟（24小时）
    ACCESS_TOKEN_EXPIRE_MINUTES = 1440

def create_access_token(data: dict, expires_delta: timedelta = None):
    """创建访问令牌"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    """验证令牌"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            return None
        return payload
    except JWTError:
        return None

def get_user_id_from_token(token: str):
    """从令牌中获取用户ID"""
    payload = verify_token(token)
    if payload:
        return payload.get("sub")
    return None

def get_token_expiration(token: str):
    """获取令牌过期时间"""
    payload = verify_token(token)
    if payload:
        exp = payload.get("exp")
        if exp:
            return datetime.fromtimestamp(exp)
    return None

def is_token_expired(token: str):
    """检查令牌是否过期"""
    exp = get_token_expiration(token)
    if exp:
        return datetime.utcnow() > exp
    return True
