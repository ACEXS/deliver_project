import React, { useState } from 'react';
import Layout from '../components/Layout';

const SystemSettings = ({ onLogout }) => {
  // 模拟系统设置数据
  const [settings, setSettings] = useState({
    systemName: '泰宁县新实践培训中心',
    systemDesc: '党校培训打卡系统',
    adminEmail: 'admin@example.com',
    adminPhone: '13800138000',
    logoUrl: '',
    themeColor: '#0ea5e9',
    enableNotification: true,
    enableAutoCheckin: false,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      role: '超级管理员',
      status: '活跃',
      lastLogin: '2026-02-07 15:30',
    },
    {
      id: 2,
      username: 'manager',
      role: '管理员',
      status: '活跃',
      lastLogin: '2026-02-07 14:20',
    },
    {
      id: 3,
      username: 'staff',
      role: '普通用户',
      status: '暂停',
      lastLogin: '2026-02-06 10:15',
    },
  ]);

  const handleSettingChange = (key, value) => {
    setSettings({...settings, [key]: value});
  };

  const handleSaveSettings = () => {
    alert('设置已保存');
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-secondary-800">系统设置</h1>
        </div>

        {/* 基本设置 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">基本设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">系统名称</label>
              <input
                type="text"
                className="input-field"
                value={settings.systemName}
                onChange={(e) => handleSettingChange('systemName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">系统描述</label>
              <input
                type="text"
                className="input-field"
                value={settings.systemDesc}
                onChange={(e) => handleSettingChange('systemDesc', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">管理员邮箱</label>
              <input
                type="email"
                className="input-field"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">管理员电话</label>
              <input
                type="tel"
                className="input-field"
                value={settings.adminPhone}
                onChange={(e) => handleSettingChange('adminPhone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">主题颜色</label>
              <input
                type="color"
                className="w-full h-10 rounded-lg cursor-pointer"
                value={settings.themeColor}
                onChange={(e) => handleSettingChange('themeColor', e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                className="btn-primary w-full"
                onClick={handleSaveSettings}
              >
                保存设置
              </button>
            </div>
          </div>
        </div>

        {/* 系统功能 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">系统功能</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-secondary-700">启用通知功能</label>
                <p className="text-xs text-secondary-400 mt-1">启用后系统会发送培训提醒通知</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="enableNotification"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  checked={settings.enableNotification}
                  onChange={(e) => handleSettingChange('enableNotification', e.target.checked)}
                />
                <label
                  htmlFor="enableNotification"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-secondary-700">启用自动打卡</label>
                <p className="text-xs text-secondary-400 mt-1">启用后系统会自动记录学员打卡</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="enableAutoCheckin"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  checked={settings.enableAutoCheckin}
                  onChange={(e) => handleSettingChange('enableAutoCheckin', e.target.checked)}
                />
                <label
                  htmlFor="enableAutoCheckin"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        </div>

        {/* 用户管理 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">用户管理</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">用户名</th>
                  <th className="table-header">角色</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">最后登录</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="table-cell font-medium">{user.username}</td>
                    <td className="table-cell">{user.role}</td>
                    <td className="table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === '活跃' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="table-cell">{user.lastLogin}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-500 hover:text-primary-700 transition-colors">
                          📝
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
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

        {/* 系统信息 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">系统信息</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-500">系统版本</span>
              <span className="text-sm font-medium text-secondary-700">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-500">部署日期</span>
              <span className="text-sm font-medium text-secondary-700">2026-02-01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-500">服务器状态</span>
              <span className="text-sm font-medium text-green-600">运行正常</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-500">数据库状态</span>
              <span className="text-sm font-medium text-green-600">连接正常</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettings;