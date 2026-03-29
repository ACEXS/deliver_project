import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider, theme } from 'antd'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RealtimeMonitoring from './pages/RealtimeMonitoring'
import HistoricalData from './pages/HistoricalData'
import TrendPrediction from './pages/TrendPrediction'
import ScenicSpotAnalysis from './pages/ScenicSpotAnalysis'

import { useAuth } from './hooks/useAuth'

const { Header, Content, Sider } = Layout

const App: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div className="logo" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold' }}>
          泰宁县游客监测系统
        </div>
        <Menu
                      mode="inline"
                      style={{ height: '100%', borderRight: 0 }}
                      items={[
                        { key: 'realtime', label: '实时监测', path: '/' },
                        { key: 'dashboard', label: '仪表盘', path: '/dashboard' },
                        { key: 'historical', label: '历史数据', path: '/historical' },
                        { key: 'trend', label: '趋势预测', path: '/trend' },
                        { key: 'scenic', label: '景点分析', path: '/scenic' },
                      ].map(item => ({
                        key: item.key,
                        label: <Link to={item.path}>{item.label}</Link>,
                      }))}
                    />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0 24px' }}>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>实时游客监测系统</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>{user?.username}</span>
            <Link to="/login" onClick={() => localStorage.removeItem('user')}>退出登录</Link>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><MainLayout><RealtimeMonitoring /></MainLayout></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
          <Route path="/historical" element={<PrivateRoute><MainLayout><HistoricalData /></MainLayout></PrivateRoute>} />
          <Route path="/trend" element={<PrivateRoute><MainLayout><TrendPrediction /></MainLayout></PrivateRoute>} />
          <Route path="/scenic" element={<PrivateRoute><MainLayout><ScenicSpotAnalysis /></MainLayout></PrivateRoute>} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App