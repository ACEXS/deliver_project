import React from 'react';
import Layout from '../components/Layout';

const Dashboard = ({ onLogout }) => {
  // 模拟统计数据
  const stats = [
    {
      title: '总培训次数',
      value: 128,
      icon: '📋',
      color: 'bg-blue-100 text-blue-600',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: '总学员数',
      value: 523,
      icon: '👥',
      color: 'bg-green-100 text-green-600',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: '今日打卡',
      value: 45,
      icon: '📅',
      color: 'bg-purple-100 text-purple-600',
      change: '+15%',
      changeType: 'positive',
    },
    {
      title: '培训完成率',
      value: '87%',
      icon: '✅',
      color: 'bg-yellow-100 text-yellow-600',
      change: '+3%',
      changeType: 'positive',
    },
  ];

  // 模拟最近培训
  const recentTrainings = [
    {
      id: 1,
      title: '习近平新时代中国特色社会主义思想专题培训',
      date: '2026-03-27',
      students: 45,
      status: '已完成',
      statusColor: 'text-green-600',
    },
    {
      id: 2,
      title: '党史学习教育专题讲座',
      date: '2026-03-28',
      students: 38,
      status: '已完成',
      statusColor: 'text-green-600',
    },
    {
      id: 3,
      title: '党风廉政建设专题培训',
      date: '2026-03-29',
      students: 52,
      status: '进行中',
      statusColor: 'text-blue-600',
    },
    {
      id: 4,
      title: '乡村振兴战略专题研讨',
      date: '2026-03-30',
      students: 41,
      status: '未开始',
      statusColor: 'text-gray-600',
    },
  ];

  // 模拟培训完成率趋势数据
  const completionRateData = [
    { month: '8月', rate: 78 },
    { month: '9月', rate: 82 },
    { month: '10月', rate: 79 },
    { month: '11月', rate: 85 },
    { month: '12月', rate: 87 },
    { month: '1月', rate: 84 },
    { month: '2月', rate: 88 },
  ];

  // 模拟学员分布数据
  const studentDistributionData = [
    { department: '组织部', count: 156 },
    { department: '宣传部', count: 124 },
    { department: '统战部', count: 98 },
    { department: '其他部门', count: 145 },
  ];

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">仪表盘</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-500">今日: 2026-03-29</span>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-secondary-800 mt-1">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-secondary-400">较上月</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 最近培训 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">最近培训</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">培训名称</th>
                  <th className="table-header">日期</th>
                  <th className="table-header">参与人数</th>
                  <th className="table-header">状态</th>
                </tr>
              </thead>
              <tbody>
                {recentTrainings.map((training) => (
                  <tr key={training.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell">{training.title}</td>
                    <td className="table-cell">{training.date}</td>
                    <td className="table-cell">{training.students}</td>
                    <td className="table-cell">
                      <span className={`font-medium ${training.statusColor}`}>
                        {training.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 培训完成率图表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-800 mb-4">培训完成率趋势</h2>
            <div className="h-64 bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-full w-full flex items-end justify-between">
                {completionRateData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-12">
                    <div 
                      className="bg-primary-600 rounded-t-md transition-all duration-500 hover:bg-primary-700 w-8"
                      style={{ height: `${(item.rate / 100) * 100}%`, minHeight: '20px' }}
                    ></div>
                    <span className="text-xs text-secondary-500 mt-2">{item.month}</span>
                    <span className="text-xs font-medium text-secondary-700">{item.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-800 mb-4">学员分布</h2>
            <div className="h-64 bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-full w-full flex items-end justify-between">
                {studentDistributionData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
                    <div 
                      className="bg-secondary-600 rounded-t-md transition-all duration-500 hover:bg-secondary-700 w-16"
                      style={{ height: `${(item.count / 200) * 100}%`, minHeight: '20px' }}
                    ></div>
                    <span className="text-xs text-secondary-500 mt-2">{item.department}</span>
                    <span className="text-xs font-medium text-secondary-700">{item.count}人</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;