from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from datetime import datetime
import os

# 创建Flask应用
app = Flask(__name__)

# 配置
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///training.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化扩展
db = SQLAlchemy(app)
jwt = JWTManager(app)

# 模型定义

# 用户模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    status = db.Column(db.String(20), nullable=False, default='active')
    last_login = db.Column(db.DateTime)

# 培训模型
class Training(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    instructor = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='scheduled')

# 学员模型
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='active')

# 打卡记录模型
class CheckinRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    training_id = db.Column(db.Integer, db.ForeignKey('training.id'), nullable=False)
    checkin_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default='normal')
    
    student = db.relationship('Student', backref=db.backref('checkin_records', lazy=True))
    training = db.relationship('Training', backref=db.backref('checkin_records', lazy=True))

# 系统设置模型
class SystemSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(50), unique=True, nullable=False)
    value = db.Column(db.String(255), nullable=False)

# 创建数据库表
with app.app_context():
    db.create_all()
    
    # 初始化默认数据
    if not User.query.filter_by(username='admin').first():
        admin = User(username='admin', password='admin123', role='admin')
        db.session.add(admin)
        db.session.commit()
    
    # 初始化系统设置
    default_settings = {
        'system_name': '泰宁县新实践培训中心',
        'system_desc': '党校培训打卡系统',
        'admin_email': 'admin@example.com',
        'admin_phone': '13800138000',
        'enable_notification': 'true',
        'enable_auto_checkin': 'false',
    }
    
    for key, value in default_settings.items():
        if not SystemSetting.query.filter_by(key=key).first():
            setting = SystemSetting(key=key, value=value)
            db.session.add(setting)
    db.session.commit()

# 认证接口

# 登录
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if not user or user.password != password:
        return jsonify({'error': '用户名或密码错误'}), 401
    
    # 更新最后登录时间
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    # 创建访问令牌
    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token, 'user': {'username': user.username, 'role': user.role}})

# 注销
@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': '注销成功'})

# 培训管理接口

# 获取培训列表
@app.route('/api/trainings', methods=['GET'])
@jwt_required()
def get_trainings():
    trainings = Training.query.all()
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'date': t.date.strftime('%Y-%m-%d'),
        'start_time': t.start_time.strftime('%H:%M'),
        'end_time': t.end_time.strftime('%H:%M'),
        'location': t.location,
        'instructor': t.instructor,
        'status': t.status
    } for t in trainings])

# 添加培训
@app.route('/api/trainings', methods=['POST'])
@jwt_required()
def add_training():
    data = request.get_json()
    
    training = Training(
        title=data['title'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        start_time=datetime.strptime(data['start_time'], '%H:%M').time(),
        end_time=datetime.strptime(data['end_time'], '%H:%M').time(),
        location=data['location'],
        instructor=data['instructor'],
        status=data['status']
    )
    
    db.session.add(training)
    db.session.commit()
    
    return jsonify({'id': training.id, 'message': '培训添加成功'}), 201

# 更新培训
@app.route('/api/trainings/<int:id>', methods=['PUT'])
@jwt_required()
def update_training(id):
    training = Training.query.get(id)
    if not training:
        return jsonify({'error': '培训不存在'}), 404
    
    data = request.get_json()
    training.title = data['title']
    training.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    training.start_time = datetime.strptime(data['start_time'], '%H:%M').time()
    training.end_time = datetime.strptime(data['end_time'], '%H:%M').time()
    training.location = data['location']
    training.instructor = data['instructor']
    training.status = data['status']
    
    db.session.commit()
    return jsonify({'message': '培训更新成功'})

# 删除培训
@app.route('/api/trainings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_training(id):
    training = Training.query.get(id)
    if not training:
        return jsonify({'error': '培训不存在'}), 404
    
    db.session.delete(training)
    db.session.commit()
    return jsonify({'message': '培训删除成功'})

# 学员管理接口

# 获取学员列表
@app.route('/api/students', methods=['GET'])
@jwt_required()
def get_students():
    students = Student.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'gender': s.gender,
        'age': s.age,
        'department': s.department,
        'position': s.position,
        'phone': s.phone,
        'email': s.email,
        'status': s.status
    } for s in students])

# 添加学员
@app.route('/api/students', methods=['POST'])
@jwt_required()
def add_student():
    data = request.get_json()
    
    student = Student(
        name=data['name'],
        gender=data['gender'],
        age=data['age'],
        department=data['department'],
        position=data['position'],
        phone=data['phone'],
        email=data['email'],
        status=data['status']
    )
    
    db.session.add(student)
    db.session.commit()
    
    return jsonify({'id': student.id, 'message': '学员添加成功'}), 201

# 更新学员
@app.route('/api/students/<int:id>', methods=['PUT'])
@jwt_required()
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({'error': '学员不存在'}), 404
    
    data = request.get_json()
    student.name = data['name']
    student.gender = data['gender']
    student.age = data['age']
    student.department = data['department']
    student.position = data['position']
    student.phone = data['phone']
    student.email = data['email']
    student.status = data['status']
    
    db.session.commit()
    return jsonify({'message': '学员更新成功'})

# 删除学员
@app.route('/api/students/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({'error': '学员不存在'}), 404
    
    db.session.delete(student)
    db.session.commit()
    return jsonify({'message': '学员删除成功'})

# 打卡记录接口

# 获取打卡记录
@app.route('/api/checkin-records', methods=['GET'])
@jwt_required()
def get_checkin_records():
    student_name = request.args.get('student_name')
    training_name = request.args.get('training_name')
    department = request.args.get('department')
    status = request.args.get('status')
    
    query = CheckinRecord.query
    
    if status:
        query = query.filter_by(status=status)
    
    records = query.all()
    
    # 过滤结果
    filtered_records = []
    for record in records:
        if student_name and student_name not in record.student.name:
            continue
        if training_name and training_name not in record.training.title:
            continue
        if department and department not in record.student.department:
            continue
        filtered_records.append(record)
    
    return jsonify([{
        'id': r.id,
        'student_id': r.student_id,
        'student_name': r.student.name,
        'training_id': r.training_id,
        'training_name': r.training.title,
        'checkin_time': r.checkin_time.strftime('%Y-%m-%d %H:%M:%S'),
        'status': r.status,
        'department': r.student.department
    } for r in filtered_records])

# 添加打卡记录
@app.route('/api/checkin-records', methods=['POST'])
@jwt_required()
def add_checkin_record():
    data = request.get_json()
    
    # 检查是否已存在打卡记录
    existing = CheckinRecord.query.filter_by(
        student_id=data['student_id'],
        training_id=data['training_id']
    ).first()
    
    if existing:
        return jsonify({'error': '该学员已经打卡'}), 400
    
    # 计算打卡状态（是否迟到）
    training = Training.query.get(data['training_id'])
    checkin_time = datetime.strptime(data['checkin_time'], '%Y-%m-%d %H:%M:%S')
    
    # 组合培训日期和开始时间
    training_start = datetime.combine(
        training.date,
        training.start_time
    )
    
    status = 'normal' if checkin_time <= training_start else 'late'
    
    record = CheckinRecord(
        student_id=data['student_id'],
        training_id=data['training_id'],
        checkin_time=checkin_time,
        status=status
    )
    
    db.session.add(record)
    db.session.commit()
    
    return jsonify({'id': record.id, 'message': '打卡成功', 'status': status}), 201

# 培训报表接口

# 获取培训统计数据
@app.route('/api/reports/training-stats', methods=['GET'])
@jwt_required()
def get_training_stats():
    # 总培训次数
    total_trainings = Training.query.count()
    
    # 总学员数
    total_students = Student.query.count()
    
    # 总打卡次数
    total_checkins = CheckinRecord.query.count()
    
    # 培训完成率
    completed_trainings = Training.query.filter_by(status='completed').count()
    completion_rate = f"{int(completed_trainings / total_trainings * 100) if total_trainings > 0 else 0}%"
    
    # 月度数据
    monthly_data = []
    for month in range(1, 13):
        trainings = Training.query.filter(db.extract('month', Training.date) == month).count()
        students = db.session.query(db.distinct(CheckinRecord.student_id)).filter(
            db.extract('month', CheckinRecord.checkin_time) == month
        ).count()
        checkins = CheckinRecord.query.filter(
            db.extract('month', CheckinRecord.checkin_time) == month
        ).count()
        monthly_data.append({
            'month': f'{month}月',
            'trainings': trainings,
            'students': students,
            'checkins': checkins
        })
    
    # 部门数据
    departments = db.session.query(Student.department).distinct().all()
    department_data = []
    for (dept,) in departments:
        dept_students = Student.query.filter_by(department=dept).count()
        dept_trainings = db.session.query(db.distinct(CheckinRecord.training_id)).join(
            Student
        ).filter(Student.department == dept).count()
        dept_checkins = CheckinRecord.query.join(
            Student
        ).filter(Student.department == dept).count()
        dept_completion_rate = f"{int(dept_checkins / (dept_students * dept_trainings) * 100) if (dept_students * dept_trainings) > 0 else 0}%"
        department_data.append({
            'department': dept,
            'students': dept_students,
            'trainings': dept_trainings,
            'completion_rate': dept_completion_rate
        })
    
    return jsonify({
        'total_trainings': total_trainings,
        'total_students': total_students,
        'total_checkins': total_checkins,
        'completion_rate': completion_rate,
        'monthly_data': monthly_data,
        'department_data': department_data
    })

# 系统设置接口

# 获取系统设置
@app.route('/api/settings', methods=['GET'])
@jwt_required()
def get_settings():
    settings = SystemSetting.query.all()
    return jsonify({s.key: s.value for s in settings})

# 更新系统设置
@app.route('/api/settings', methods=['PUT'])
@jwt_required()
def update_settings():
    data = request.get_json()
    
    for key, value in data.items():
        setting = SystemSetting.query.filter_by(key=key).first()
        if setting:
            setting.value = value
        else:
            setting = SystemSetting(key=key, value=value)
            db.session.add(setting)
    
    db.session.commit()
    return jsonify({'message': '设置更新成功'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)