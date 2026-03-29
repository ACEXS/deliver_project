import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, Statistic, Spin, Space } from 'antd'
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  AreaChartOutlined, 
  DollarOutlined, 
  ArrowUpOutlined, 
  BarChartOutlined,
  PieChartOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import * as echarts from 'echarts'

const Dashboard: React.FC = () => {
  const lineChartRef = useRef<HTMLDivElement>(null)
  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = React.useState(true)
  const [currentDate] = useState(new Date().toLocaleDateString())

  // 模拟数据
  const mockData = {
    totalVisitors: 12345,
    todayVisitors: 3456,
    averageStayTime: 120, // 分钟
    revenue: 456789,
    totalVisitorsGrowth: 12.5,
    todayVisitorsGrowth: 8.2,
    revenueGrowth: 15.8,
    visitorTrend: [
      { date: '02-01', count: 2800 },
      { date: '02-02', count: 3200 },
      { date: '02-03', count: 4500 },
      { date: '02-04', count: 5200 },
      { date: '02-05', count: 6800 },
      { date: '02-06', count: 7200 },
      { date: '02-07', count: 6500 },
      { date: '02-08', count: 3456 },
    ],
    spotDistribution: [
      { name: '大金湖', value: 4500 },
      { name: '上清溪', value: 3200 },
      { name: '寨下大峡谷', value: 2800 },
      { name: '泰宁古城', value: 1845 },
    ],
    dailyRevenue: [
      { date: '02-01', revenue: 120000 },
      { date: '02-02', revenue: 135000 },
      { date: '02-03', revenue: 180000 },
      { date: '02-04', revenue: 210000 },
      { date: '02-05', revenue: 240000 },
      { date: '02-06', revenue: 260000 },
      { date: '02-07', revenue: 230000 },
      { date: '02-08', revenue: 150000 },
    ],
  }

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setLoading(false)
      initCharts()
    }, 1000)
  }, [])

  const initCharts = () => {
    // 初始化折线图 - 游客趋势
    if (lineChartRef.current) {
      const lineChart = echarts.init(lineChartRef.current)
      const lineOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mockData.visitorTrend.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '游客数量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#1890ff'
            },
            itemStyle: {
              color: '#1890ff',
              borderColor: '#fff',
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(24, 144, 255, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(24, 144, 255, 0.05)'
                }
              ])
            },
            data: mockData.visitorTrend.map(item => item.count)
          }
        ]
      }
      lineChart.setOption(lineOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        lineChart.resize()
      })
    }

    // 初始化饼图 - 景点分布
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current)
      const pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 10,
          left: 'center',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            name: '游客数量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: mockData.spotDistribution,
            color: ['#1890ff', '#52c41a', '#faad14', '#f5222d']
          }
        ]
      }
      pieChart.setOption(pieOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        pieChart.resize()
      })
    }

    // 初始化柱状图 - 每日收入
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current)
      const barOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: mockData.dailyRevenue.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '旅游收入',
            type: 'bar',
            barWidth: '60%',
            data: mockData.dailyRevenue.map(item => item.revenue),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#ff7875'
                },
                {
                  offset: 1,
                  color: '#ff4d4f'
                }
              ])
            }
          }
        ]
      }
      barChart.setOption(barOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        barChart.resize()
      })
    }
  }

  return (
    <div className="dashboard-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>数据概览</h1>
        <Space style={{ marginBottom: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>统计日期</div>
              <Statistic
                value={currentDate}
                prefix={<CalendarOutlined />}
                valueStyle={{ fontSize: 16 }}
              />
            </div>
          </Space>
      </Row>

      <Spin spinning={loading} tip="加载数据中...">
        {/* 核心指标卡片 */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              styles={{
                body: { padding: 24 }
              }}
            >
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>总游客数</div>
              <Statistic
                value={mockData.totalVisitors}
                suffix="人"
                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ 
                  color: '#1890ff',
                  fontSize: 32,
                  fontWeight: 'bold'
                }}
              />
              <Space size="small" style={{ marginTop: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} />
                <span style={{ color: '#52c41a', fontSize: 14 }}>{mockData.totalVisitorsGrowth}% 同比</span>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              styles={{
                body: { padding: 24 }
              }}
            >
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>今日游客</div>
              <Statistic
                value={mockData.todayVisitors}
                suffix="人"
                prefix={<ClockCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ 
                  color: '#52c41a',
                  fontSize: 32,
                  fontWeight: 'bold'
                }}
              />
              <Space size="small" style={{ marginTop: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} />
                <span style={{ color: '#52c41a', fontSize: 14 }}>{mockData.todayVisitorsGrowth}% 同比</span>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              styles={{
                body: { padding: 24 }
              }}
            >
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>平均停留时间</div>
              <Statistic
                value={mockData.averageStayTime}
                suffix="分钟"
                prefix={<AreaChartOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ 
                  color: '#faad14',
                  fontSize: 32,
                  fontWeight: 'bold'
                }}
              />
              <Space size="small" style={{ marginTop: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} />
                <span style={{ color: '#52c41a', fontSize: 14 }}>5.2% 同比</span>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              styles={{
                body: { padding: 24 }
              }}
            >
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>旅游收入</div>
              <Statistic
                value={mockData.revenue}
                suffix="元"
                prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
                valueStyle={{ 
                  color: '#f5222d',
                  fontSize: 32,
                  fontWeight: 'bold'
                }}
              />
              <Space size="small" style={{ marginTop: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} />
                <span style={{ color: '#52c41a', fontSize: 14 }}>{mockData.revenueGrowth}% 同比</span>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* 图表区域 */}
        <Row gutter={[24, 24]}>
          {/* 游客趋势图表 */}
          <Col xs={24} lg={12}>
            <Card
              hoverable
              title={
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  <AreaChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  游客数量趋势
                </span>
              }
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none',
                height: '100%'
              }}
              styles={{
                body: { padding: 20, height: 400 }
              }}
            >
              <div ref={lineChartRef} style={{ width: '100%', height: '100%' }} />
            </Card>
          </Col>
          
          {/* 景点分布图表 */}
          <Col xs={24} lg={12}>
            <Card
              hoverable
              title={
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  <PieChartOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                  景点游客分布
                </span>
              }
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none',
                height: '100%'
              }}
              styles={{
                body: { padding: 20, height: 400 }
              }}
            >
              <div ref={pieChartRef} style={{ width: '100%', height: '100%' }} />
            </Card>
          </Col>
          
          {/* 每日收入图表 */}
          <Col xs={24}>
            <Card
              hoverable
              title={
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  <BarChartOutlined style={{ marginRight: 8, color: '#f5222d' }} />
                  每日旅游收入
                </span>
              }
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              bodyStyle={{ padding: 20, height: 400 }}
            >
              <div ref={barChartRef} style={{ width: '100%', height: '100%' }} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}

export default Dashboard