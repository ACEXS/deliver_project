import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, onLogout }) => {
  const location = useLocation();

  const sidebarLinks = [
    { path: '/dashboard', name: '仪表盘', icon: '📊' },
    { path: '/training', name: '培训管理', icon: '📋' },
    { path: '/students', name: '学员管理', icon: '👥' },
    { path: '/checkin', name: '打卡记录', icon: '📅' },
    { path: '/reports', name: '培训报表', icon: '📈' },
    { path: '/settings', name: '系统设置', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-secondary-50">
      {/* 侧边栏 */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-600 flex items-center gap-2">
            <span>🏫</span>
            <span>泰宁县新实践培训中心</span>
          </h1>
          <p className="text-sm text-secondary-500 mt-1">党校培训打卡系统</p>
        </div>
        <div className="py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 头部导航 */}
        <header className="header px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-secondary-800">
              {sidebarLinks.find(link => link.path === location.pathname)?.name || '仪表盘'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                管
              </div>
              <span className="text-secondary-700">管理员</span>
            </div>
            <button
              onClick={onLogout}
              className="btn-secondary py-1 px-3 text-sm"
            >
              退出登录
            </button>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-6 bg-secondary-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;