import React, { useState } from 'react';
import Layout from '../components/Layout';

const TrainingManagement = ({ onLogout }) => {
  // 模拟培训数据
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: '习近平新时代中国特色社会主义思想专题培训',
      date: '2026-02-01',
      startTime: '09:00',
      endTime: '17:00',
      location: '培训中心会议室',
      instructor: '张教授',
      status: '已完成',
    },
    {
      id: 2,
      title: '党史学习教育专题讲座',
      date: '2026-02-03',
      startTime: '14:00',
      endTime: '16:30',
      location: '培训中心大礼堂',
      instructor: '李老师',
      status: '已完成',
    },
    {
      id: 3,
      title: '党风廉政建设专题培训',
      date: '2026-02-05',
      startTime: '09:00',
      endTime: '12:00',
      location: '培训中心会议室',
      instructor: '王主任',
      status: '进行中',
    },
    {
      id: 4,
      title: '乡村振兴战略专题研讨',
      date: '2026-02-08',
      startTime: '09:00',
      endTime: '17:00',
      location: '培训中心大礼堂',
      instructor: '陈专家',
      status: '未开始',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    instructor: '',
    status: '未开始',
  });

  const handleAddTraining = () => {
    if (!newTraining.title || !newTraining.date) {
      alert('请填写培训名称和日期');
      return;
    }

    const training = {
      id: trainings.length + 1,
      ...newTraining,
    };

    setTrainings([...trainings, training]);
    setNewTraining({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      instructor: '',
      status: '未开始',
    });
    setShowAddModal(false);
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm('确定要删除这个培训吗？')) {
      setTrainings(trainings.filter(training => training.id !== id));
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题和操作按钮 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">培训管理</h1>
          <button
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <span>➕</span>
            <span>添加培训</span>
          </button>
        </div>

        {/* 培训列表 */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">培训名称</th>
                  <th className="table-header">日期</th>
                  <th className="table-header">时间</th>
                  <th className="table-header">地点</th>
                  <th className="table-header">讲师</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell font-medium">{training.title}</td>
                    <td className="table-cell">{training.date}</td>
                    <td className="table-cell">{training.startTime} - {training.endTime}</td>
                    <td className="table-cell">{training.location}</td>
                    <td className="table-cell">{training.instructor}</td>
                    <td className="table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${training.status === '已完成' ? 'bg-green-100 text-green-600' : training.status === '进行中' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {training.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-500 hover:text-primary-700 transition-colors">
                          📝
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDeleteTraining(training.id)}
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

        {/* 添加培训模态框 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">添加培训</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">培训名称</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入培训名称"
                    value={newTraining.title}
                    onChange={(e) => setNewTraining({...newTraining, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">日期</label>
                    <input
                      type="date"
                      className="input-field"
                      value={newTraining.date}
                      onChange={(e) => setNewTraining({...newTraining, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">开始时间</label>
                    <input
                      type="time"
                      className="input-field"
                      value={newTraining.startTime}
                      onChange={(e) => setNewTraining({...newTraining, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">结束时间</label>
                    <input
                      type="time"
                      className="input-field"
                      value={newTraining.endTime}
                      onChange={(e) => setNewTraining({...newTraining, endTime: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">地点</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入培训地点"
                    value={newTraining.location}
                    onChange={(e) => setNewTraining({...newTraining, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">讲师</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入讲师姓名"
                    value={newTraining.instructor}
                    onChange={(e) => setNewTraining({...newTraining, instructor: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">状态</label>
                  <select
                    className="input-field"
                    value={newTraining.status}
                    onChange={(e) => setNewTraining({...newTraining, status: e.target.value})}
                  >
                    <option value="未开始">未开始</option>
                    <option value="进行中">进行中</option>
                    <option value="已完成">已完成</option>
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
                    onClick={handleAddTraining}
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

export default TrainingManagement;