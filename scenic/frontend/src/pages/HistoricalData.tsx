import React, { useState, useEffect } from 'react'
import { Card, DatePicker, Button, Table, Spin, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

interface HistoricalDataItem {
  date: string
  totalVisitors: number
  changeRate: number
  avgStayTime: number
  revenue: number
}

const HistoricalData: React.FC = () => {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs()
  ])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<HistoricalDataItem[]>([
    { date: '2026-03-20', totalVisitors: 2800, changeRate: 2.5, avgStayTime: 110, revenue: 350000 },
    { date: '2026-03-21', totalVisitors: 3200, changeRate: 14.3, avgStayTime: 115, revenue: 400000 },
    { date: '2026-03-22', totalVisitors: 4500, changeRate: 40.6, avgStayTime: 120, revenue: 560000 },
    { date: '2026-03-23', totalVisitors: 5200, changeRate: 15.6, avgStayTime: 125, revenue: 650000 },
    { date: '2026-03-24', totalVisitors: 6800, changeRate: 30.8, avgStayTime: 130, revenue: 850000 },
    { date: '2026-03-25', totalVisitors: 7200, changeRate: 5.9, avgStayTime: 135, revenue: 900000 },
    { date: '2026-03-26', totalVisitors: 6500, changeRate: -9.7, avgStayTime: 125, revenue: 810000 },
    { date: '2026-03-27', totalVisitors: 3456, changeRate: -46.8, avgStayTime: 120, revenue: 430000 },
  ])

  // 模拟数据
  const mockData: HistoricalDataItem[] = [
    { date: '2026-03-20', totalVisitors: 2800, changeRate: 2.5, avgStayTime: 110, revenue: 350000 },
    { date: '2026-03-21', totalVisitors: 3200, changeRate: 14.3, avgStayTime: 115, revenue: 400000 },
    { date: '2026-03-22', totalVisitors: 4500, changeRate: 40.6, avgStayTime: 120, revenue: 560000 },
    { date: '2026-03-23', totalVisitors: 5200, changeRate: 15.6, avgStayTime: 125, revenue: 650000 },
    { date: '2026-03-24', totalVisitors: 6800, changeRate: 30.8, avgStayTime: 130, revenue: 850000 },
    { date: '2026-03-25', totalVisitors: 7200, changeRate: 5.9, avgStayTime: 135, revenue: 900000 },
    { date: '2026-03-26', totalVisitors: 6500, changeRate: -9.7, avgStayTime: 125, revenue: 810000 },
    { date: '2026-03-27', totalVisitors: 3456, changeRate: -46.8, avgStayTime: 120, revenue: 430000 },
  ]

  useEffect(() => {
    // 组件挂载时初始化图表
    initChart()
  }, [data])

  const handleSearch = () => {
    setLoading(true)
    // 模拟数据加载
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
      message.success('查询成功')
    }, 1000)
  }

  const initChart = () => {
    const chartDom = document.getElementById('historical-chart')
    if (chartDom) {
      const chart = echarts.init(chartDom)
      const option = {
        title: {
          text: '历史游客数量趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.map(item => item.totalVisitors),
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#1890ff'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(24, 144, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(24, 144, 255, 0.1)'
                }
              ])
            }
          }
        ]
      }
      chart.setOption(option)

      // 响应式调整
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '游客数量',
      dataIndex: 'totalVisitors',
      key: 'totalVisitors'
    },
    {
      title: '变化率',
      dataIndex: 'changeRate',
      key: 'changeRate',
      render: (text: number) => (
        <span style={{ color: text >= 0 ? '#52c41a' : '#f5222d' }}>
          {text >= 0 ? '+' : ''}{text}%
        </span>
      )
    },
    {
      title: '平均停留时间(分钟)',
      dataIndex: 'avgStayTime',
      key: 'avgStayTime'
    },
    {
      title: '旅游收入(元)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (text: number) => new Intl.NumberFormat().format(text)
    }
  ]

  return (
    <div className="historical-container">
      <h2>历史数据查询</h2>
      
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <RangePicker
            value={dateRange}
            onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            loading={loading}
          >
            查询
          </Button>
          <Button>导出Excel</Button>
        </div>
      </Card>

      <Spin spinning={loading}>
        <Card style={{ marginBottom: 24 }}>
          <div id="historical-chart" style={{ height: 400 }}></div>
        </Card>

        <Card>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="date"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Spin>
    </div>
  )
}

export default HistoricalData