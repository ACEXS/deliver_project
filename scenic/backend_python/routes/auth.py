from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from models.user import User
from config.database import get_db
from utils.jwt_utils import create_access_token, verify_token
from pydantic import BaseModel

# 创建路由器
router = APIRouter(prefix="/auth", tags=["authentication"])

# OAuth2密码流
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# 请求模型
class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "user"

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    username: str
    role: str

# 依赖项：获取当前用户
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """获取当前用户"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
    
    user_id: int = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    
    return user

# 依赖项：获取管理员用户
def get_admin_user(current_user: User = Depends(get_current_user)):
    """获取管理员用户"""
    if not current_user.is_admin():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

# 登录路由
@router.post("/login", response_model=Token)
def login(username: str, password: str, db: Session = Depends(get_db)):
    """用户登录"""
    # 查找用户
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 验证密码
    if not user.verify_password(password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 更新最后登录时间
    from sqlalchemy.sql import func
    user.last_login = func.now()
    db.commit()
    
    # 创建访问令牌
    access_token_expires = timedelta(minutes=1440)  # 24小时
    access_token = create_access_token(
        data={"sub": str(user.id), "username": user.username, "role": user.role},
        expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        username=user.username,
        role=user.role
    )

# 注册路由（仅管理员可访问）
@router.post("/register", response_model=dict)
def register(user_data: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(get_admin_user)):
    """用户注册（仅管理员）"""
    # 检查用户名是否已存在
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # 创建新用户
    new_user = User(
        username=user_data.username,
        role=user_data.role
    )
    new_user.set_password(user_data.password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User created successfully",
        "user_id": new_user.id,
        "username": new_user.username,
        "role": new_user.role
    }

# 获取当前用户信息
@router.get("/me", response_model=dict)
def get_me(current_user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return current_user.to_dict()

# 刷新令牌
@router.post("/refresh", response_model=Token)
def refresh_token(current_user: User = Depends(get_current_user)):
    """刷新访问令牌"""
    access_token_expires = timedelta(minutes=1440)  # 24小时
    access_token = create_access_token(
        data={"sub": str(current_user.id), "username": current_user.username, "role": current_user.role},
        expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=current_user.id,
        username=current_user.username,
        role=current_user.role
    )

# 登出路由
@router.post("/logout", response_model=dict)
def logout(current_user: User = Depends(get_current_user)):
    """用户登出"""
    # 在实际应用中，可能需要将令牌加入黑名单
    return {"message": "Logout successful"}

# 获取所有用户（仅管理员）
@router.get("/users", response_model=list)
def get_users(db: Session = Depends(get_db), current_user: User = Depends(get_admin_user)):
    """获取所有用户（仅管理员）"""
    users = db.query(User).all()
    return [user.to_dict() for user in users]

# 删除用户（仅管理员）
@router.delete("/users/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_admin_user)):
    """删除用户（仅管理员）"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # 不能删除自己
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete yourself"
        )
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
