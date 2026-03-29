import React, { useState } from 'react';
import Layout from '../components/Layout';

const StudentManagement = ({ onLogout }) => {
  // 模拟学员数据
  const [students, setStudents] = useState([
    {
      id: 1,
      name: '张三',
      gender: '男',
      age: 32,
      department: '组织部',
      position: '科员',
      phone: '13800138001',
      email: 'zhangsan@example.com',
      status: '活跃',
    },
    {
      id: 2,
      name: '李四',
      gender: '女',
      age: 28,
      department: '宣传部',
      position: '副主任',
      phone: '13800138002',
      email: 'lisi@example.com',
      status: '活跃',
    },
    {
      id: 3,
      name: '王五',
      gender: '男',
      age: 45,
      department: '统战部',
      position: '主任',
      phone: '13800138003',
      email: 'wangwu@example.com',
      status: '活跃',
    },
    {
      id: 4,
      name: '赵六',
      gender: '女',
      age: 35,
      department: '组织部',
      position: '主任',
      phone: '13800138004',
      email: 'zhaoliu@example.com',
      status: '暂停',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    gender: '男',
    age: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    status: '活跃',
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.department) {
      alert('请填写姓名和部门');
      return;
    }

    const student = {
      id: students.length + 1,
      ...newStudent,
    };

    setStudents([...students, student]);
    setNewStudent({
      name: '',
      gender: '男',
      age: '',
      department: '',
      position: '',
      phone: '',
      email: '',
      status: '活跃',
    });
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('确定要删除这个学员吗？')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题和操作按钮 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">学员管理</h1>
          <button
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <span>➕</span>
            <span>添加学员</span>
          </button>
        </div>

        {/* 学员列表 */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">姓名</th>
                  <th className="table-header">性别</th>
                  <th className="table-header">年龄</th>
                  <th className="table-header">部门</th>
                  <th className="table-header">职位</th>
                  <th className="table-header">电话</th>
                  <th className="table-header">邮箱</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell font-medium">{student.name}</td>
                    <td className="table-cell">{student.gender}</td>
                    <td className="table-cell">{student.age}</td>
                    <td className="table-cell">{student.department}</td>
                    <td className="table-cell">{student.position}</td>
                    <td className="table-cell">{student.phone}</td>
                    <td className="table-cell">{student.email}</td>
                    <td className="table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === '活跃' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-500 hover:text-primary-700 transition-colors">
                          📝
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 添加学员模态框 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">添加学员</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">姓名</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入姓名"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">性别</label>
                    <select
                      className="input-field"
                      value={newStudent.gender}
                      onChange={(e) => setNewStudent({...newStudent, gender: e.target.value})}
                    >
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">年龄</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="请输入年龄"
                      value={newStudent.age}
                      onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">部门</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入部门"
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">职位</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入职位"
                    value={newStudent.position}
                    onChange={(e) => setNewStudent({...newStudent, position: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">电话</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="请输入电话"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="请输入邮箱"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">状态</label>
                  <select
                    className="input-field"
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                  >
                    <option value="活跃">活跃</option>
                    <option value="暂停">暂停</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    className="btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    取消
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleAddStudent}
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentManagement;