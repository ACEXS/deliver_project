import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Spin, Progress, Statistic, Alert, Button, Space } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'

interface SpotData {
  id: number
  name: string
  currentCount: number
  capacity: number
  inCount: number
  outCount: number
  changeRate: number
  status: 'normal' | 'warning' | 'danger'
  trend: number[]
}

const RealtimeMonitoring: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [spots, setSpots] = useState<SpotData[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')

  // 模拟数据
  const mockSpots: SpotData[] = [
    {
      id: 1,
      name: '大金湖',
      currentCount: 4500,
      capacity: 6000,
      inCount: 1200,
      outCount: 800,
      changeRate: 5.2,
      status: 'normal',
      trend: [3200, 3500, 3800, 4200, 4500],
    },
    {
      id: 2,
      name: '上清溪',
      currentCount: 3200,
      capacity: 4000,
      inCount: 800,
      outCount: 500,
      changeRate: 3.8,
      status: 'normal',
      trend: [2800, 2900, 3000, 3100, 3200],
    },
    {
      id: 3,
      name: '寨下大峡谷',
      currentCount: 2800,
      capacity: 3000,
      inCount: 600,
      outCount: 200,
      changeRate: 12.5,
      status: 'warning',
      trend: [2200, 2400, 2600, 2700, 2800],
    },
    {
      id: 4,
      name: '泰宁古城',
      currentCount: 1845,
      capacity: 2000,
      inCount: 400,
      outCount: 300,
      changeRate: 2.1,
      status: 'normal',
      trend: [1700, 1750, 1800, 1820, 1845],
    },
    {
      id: 5,
      name: '猫儿山',
      currentCount: 1200,
      capacity: 1500,
      inCount: 300,
      outCount: 200,
      changeRate: 4.5,
      status: 'normal',
      trend: [1000, 1050, 1100, 1150, 1200],
    },
    {
      id: 6,
      name: '九龙潭',
      currentCount: 950,
      capacity: 1000,
      inCount: 200,
      outCount: 100,
      changeRate: 10.8,
      status: 'warning',
      trend: [800, 850, 900, 920, 950],
    },
  ]

  useEffect(() => {
    // 初始加载数据
    loadData()

    // 设置定时器，每5秒更新一次数据
    const interval = setInterval(loadData, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadData = () => {
    const isInitialLoad = loading
    if (!isInitialLoad) {
      setRefreshLoading(true)
    }
    setError(null)
    // 模拟数据加载
    setTimeout(() => {
      try {
        // 模拟数据变化
        const updatedSpots = mockSpots.map(spot => ({
          ...spot,
          currentCount: Math.max(0, spot.currentCount + Math.floor(Math.random() * 50 - 20)),
          inCount: Math.floor(Math.random() * 100 + 50),
          outCount: Math.floor(Math.random() * 80 + 30),
          changeRate: parseFloat((Math.random() * 15 - 2).toFixed(1)),
          trend: [...spot.trend.slice(1), Math.max(0, spot.currentCount + Math.floor(Math.random() * 50 - 20))],
        }))

        setSpots(updatedSpots)
        setLastUpdated(new Date().toLocaleString())
      } catch (err) {
        setError('数据加载失败，请稍后重试')
      } finally {
        setLoading(false)
        setRefreshLoading(false)
      }
    }, 800)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger':
        return '#f5222d'
      case 'warning':
        return '#faad14'
      case 'normal':
      default:
        return '#52c41a'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger':
        return <WarningOutlined style={{ color: '#f5222d' }} />
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />
      case 'normal':
      default:
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'danger':
        return '拥挤'
      case 'warning':
        return '接近饱和'
      case 'normal':
      default:
        return '正常'
    }
  }

  return (
    <div className="realtime-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>实时游客监测</h1>
        <Space size="middle">
          <span style={{ fontSize: 16, color: '#666' }}>最后更新: {lastUpdated}</span>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={loadData}
            loading={refreshLoading}
            size="large"
            style={{ padding: '0 24px' }}
          >
            刷新数据
          </Button>
        </Space>
      </Row>

      {error && (
        <Alert
          message="数据加载失败"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24, fontSize: 16 }}
        />
      )}

      <Spin spinning={loading} tip="加载实时数据...">
        <Row gutter={[24, 24]}>
          {spots.map(spot => (
            <Col xs={24} sm={24} md={12} lg={8} key={spot.id}>
              <Card
                title={
                  <Row justify="space-between" align="middle">
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>{spot.name}</span>
                    <span style={{ color: getStatusColor(spot.status), fontSize: 14 }}>
                      {getStatusIcon(spot.status)} {getStatusText(spot.status)}
                    </span>
                  </Row>
                }
                hoverable
                style={{
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: 'none'
                }}
                bodyStyle={{
                  padding: 24,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{spot.name}</div>
                  <Statistic
                    value={spot.currentCount}
                    suffix={`/ ${spot.capacity}`}
                    valueStyle={{
                      color: getStatusColor(spot.status),
                      fontSize: 32,
                      fontWeight: 'bold'
                    }}
                  />
                </div>
                <Progress
                  percent={(spot.currentCount / spot.capacity) * 100}
                  status={spot.status === 'danger' ? 'exception' : 'normal'}
                  strokeColor={{
                    from: getStatusColor(spot.status),
                    to: getStatusColor(spot.status),
                  }}
                  strokeWidth={10}
                  style={{ marginBottom: 24 }}
                />
                <Row gutter={24} style={{ marginBottom: 24 }}>
                  <Col span={12}>
                    <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>今日进入</div>
                    <Statistic
                      value={spot.inCount}
                      valueStyle={{ 
                        color: '#1890ff',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>今日离开</div>
                    <Statistic
                      value={spot.outCount}
                      valueStyle={{ 
                        color: '#722ed1',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: 24 }}>
                  <Col span={24}>
                    <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>变化率</div>
                    <Statistic
                      value={spot.changeRate}
                      suffix="%"
                      prefix={spot.changeRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      valueStyle={{ 
                        color: spot.changeRate >= 0 ? '#f5222d' : '#52c41a',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                    />
                  </Col>
                </Row>
                <div style={{ marginTop: 'auto', height: 200 }}>
                  <ResponsiveChart trend={spot.trend} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Alert
          message="系统提示"
          description="实时数据每5秒自动更新，数据来源于各景点的传感器和票务系统。"
          type="info"
          style={{ marginTop: 32, fontSize: 16 }}
        />
      </Spin>
    </div>
  )
}

// 响应式图表组件
const ResponsiveChart: React.FC<{ trend: number[] }> = ({ trend }) => {
  const chartRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['10分钟前', '8分钟前', '6分钟前', '4分钟前', '当前'],
          axisLabel: {
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: trend,
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#1890ff',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(24, 144, 255, 0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(24, 144, 255, 0.1)',
                },
              ]),
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true,
        },
      }
      chart.setOption(option)

      // 响应式调整
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  }, [trend])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default RealtimeMonitoring