import React, { useState } from 'react';
import Layout from '../components/Layout';

const CheckinRecords = ({ onLogout }) => {
  // 模拟打卡记录数据
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: '张三',
      trainingName: '习近平新时代中国特色社会主义思想专题培训',
      checkinTime: '2026-02-01 08:55',
      status: '正常',
      department: '组织部',
    },
    {
      id: 2,
      studentName: '李四',
      trainingName: '习近平新时代中国特色社会主义思想专题培训',
      checkinTime: '2026-02-01 09:02',
      status: '迟到',
      department: '宣传部',
    },
    {
      id: 3,
      studentName: '王五',
      trainingName: '党史学习教育专题讲座',
      checkinTime: '2026-02-03 13:50',
      status: '正常',
      department: '统战部',
    },
    {
      id: 4,
      studentName: '赵六',
      trainingName: '党史学习教育专题讲座',
      checkinTime: '2026-02-03 14:05',
      status: '迟到',
      department: '组织部',
    },
    {
      id: 5,
      studentName: '张三',
      trainingName: '党风廉政建设专题培训',
      checkinTime: '2026-02-05 08:45',
      status: '正常',
      department: '组织部',
    },
    {
      id: 6,
      studentName: '李四',
      trainingName: '党风廉政建设专题培训',
      checkinTime: '2026-02-05 08:58',
      status: '正常',
      department: '宣传部',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('全部');

  // 筛选记录
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.includes(searchTerm) || 
                         record.trainingName.includes(searchTerm) ||
                         record.department.includes(searchTerm);
    const matchesStatus = filterStatus === '全部' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">打卡记录</h1>
        </div>

        {/* 搜索和筛选 */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">搜索</label>
              <input
                type="text"
                className="input-field"
                placeholder="请输入学员姓名、培训名称或部门"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">状态筛选</label>
              <select
                className="input-field"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="全部">全部</option>
                <option value="正常">正常</option>
                <option value="迟到">迟到</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                className="btn-secondary w-full"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('全部');
                }}
              >
                重置筛选
              </button>
            </div>
          </div>
        </div>

        {/* 打卡记录列表 */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">学员姓名</th>
                  <th className="table-header">培训名称</th>
                  <th className="table-header">打卡时间</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">部门</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell font-medium">{record.studentName}</td>
                    <td className="table-cell">{record.trainingName}</td>
                    <td className="table-cell">{record.checkinTime}</td>
                    <td className="table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === '正常' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="table-cell">{record.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-secondary-500">
              没有找到匹配的打卡记录
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckinRecords;