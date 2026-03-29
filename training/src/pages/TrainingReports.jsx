import React from 'react';
import Layout from '../components/Layout';

const TrainingReports = ({ onLogout }) => {
  // 模拟培训报表数据
  const reportData = {
    totalTrainings: 128,
    totalStudents: 523,
    totalCheckins: 456,
    completionRate: '87%',
    monthlyData: [
      { month: '1月', trainings: 12, students: 45, checkins: 38 },
      { month: '2月', trainings: 10, students: 38, checkins: 35 },
      { month: '3月', trainings: 15, students: 52, checkins: 48 },
      { month: '4月', trainings: 13, students: 47, checkins: 42 },
      { month: '5月', trainings: 11, students: 40, checkins: 36 },
      { month: '6月', trainings: 14, students: 50, checkins: 45 },
      { month: '7月', trainings: 9, students: 35, checkins: 32 },
      { month: '8月', trainings: 12, students: 48, checkins: 43 },
      { month: '9月', trainings: 16, students: 55, checkins: 50 },
      { month: '10月', trainings: 14, students: 51, checkins: 46 },
      { month: '11月', trainings: 13, students: 49, checkins: 44 },
      { month: '12月', trainings: 15, students: 53, checkins: 49 },
    ],
    departmentData: [
      { department: '组织部', students: 156, trainings: 42, completionRate: '92%' },
      { department: '宣传部', students: 124, trainings: 35, completionRate: '88%' },
      { department: '统战部', students: 98, trainings: 28, completionRate: '85%' },
      { department: '其他部门', students: 145, trainings: 23, completionRate: '80%' },
    ],
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">培训报表</h1>
        </div>

        {/* 总体统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">总培训次数</p>
                <h3 className="text-2xl font-bold text-secondary-800 mt-1">{reportData.totalTrainings}</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <span className="text-xl">📋</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">总学员数</p>
                <h3 className="text-2xl font-bold text-secondary-800 mt-1">{reportData.totalStudents}</h3>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">总打卡次数</p>
                <h3 className="text-2xl font-bold text-secondary-800 mt-1">{reportData.totalCheckins}</h3>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <span className="text-xl">📅</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">培训完成率</p>
                <h3 className="text-2xl font-bold text-secondary-800 mt-1">{reportData.completionRate}</h3>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* 月度培训数据 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">月度培训数据</h2>
          <div className="h-64 bg-white rounded-lg p-4 border border-gray-200">
            <div className="h-full w-full flex items-end justify-between">
              {reportData.monthlyData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-12">
                  <div 
                    className="bg-primary-600 rounded-t-md transition-all duration-500 hover:bg-primary-700 w-8"
                    style={{ height: `${(item.trainings / 20) * 100}%`, minHeight: '20px' }}
                  ></div>
                  <span className="text-xs text-secondary-500 mt-2">{item.month}</span>
                  <span className="text-xs font-medium text-secondary-700">{item.trainings}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">月份</th>
                  <th className="table-header">培训次数</th>
                  <th className="table-header">参与人数</th>
                  <th className="table-header">打卡次数</th>
                </tr>
              </thead>
              <tbody>
                {reportData.monthlyData.map((item, index) => (
                  <tr key={index} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell">{item.month}</td>
                    <td className="table-cell">{item.trainings}</td>
                    <td className="table-cell">{item.students}</td>
                    <td className="table-cell">{item.checkins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 部门培训数据 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">部门培训数据</h2>
          <div className="h-64 bg-white rounded-lg p-4 border border-gray-200">
            <div className="h-full w-full flex items-end justify-between">
              {reportData.departmentData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-24">
                  <div 
                    className="bg-secondary-600 rounded-t-md transition-all duration-500 hover:bg-secondary-700 w-16"
                    style={{ height: `${(item.students / 200) * 100}%`, minHeight: '20px' }}
                  ></div>
                  <span className="text-xs text-secondary-500 mt-2">{item.department}</span>
                  <span className="text-xs font-medium text-secondary-700">{item.students}人</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">部门</th>
                  <th className="table-header">学员数</th>
                  <th className="table-header">培训次数</th>
                  <th className="table-header">完成率</th>
                </tr>
              </thead>
              <tbody>
                {reportData.departmentData.map((item, index) => (
                  <tr key={index} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell font-medium">{item.department}</td>
                    <td className="table-cell">{item.students}</td>
                    <td className="table-cell">{item.trainings}</td>
                    <td className="table-cell">{item.completionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainingReports;