import React, { useState, useEffect } from 'react'
import { Card, Select, Spin, Tabs } from 'antd'
import * as echarts from 'echarts'

const { Option } = Select
const { TabPane } = Tabs

interface Spot {
  id: number
  name: string
}

const spots: Spot[] = [
  { id: 1, name: '大金湖' },
  { id: 2, name: '上清溪' },
  { id: 3, name: '寨下大峡谷' },
  { id: 4, name: '泰宁古城' },
  { id: 5, name: '猫儿山' },
  { id: 6, name: '九龙潭' },
]

const ScenicSpotAnalysis: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<number>(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setLoading(false)
      initCharts()
    }, 1000)
  }, [selectedSpot])

  const initCharts = () => {
    // 游客数量变化趋势图
    const visitorChartDom = document.getElementById('visitor-chart')
    if (visitorChartDom) {
      const chart = echarts.init(visitorChartDom)
      const option = {
        title: {
          text: '游客数量变化趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1月28日', '1月29日', '1月30日', '1月31日', '2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [1200, 1500, 1800, 2200, 2800, 3200, 3800, 4200, 4500, 4800, 4500, 3456],
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
      window.addEventListener('resize', () => chart.resize())
    }

    // 停留时间分析图
    const stayTimeChartDom = document.getElementById('stay-time-chart')
    if (stayTimeChartDom) {
      const chart = echarts.init(stayTimeChartDom)
      const option = {
        title: {
          text: '平均停留时间分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1月28日', '1月29日', '1月30日', '1月31日', '2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日']
        },
        yAxis: {
          type: 'value',
          name: '分钟'
        },
        series: [
          {
            data: [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 130, 120],
            type: 'bar',
            itemStyle: {
              color: '#52c41a'
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    }

    // 高峰时段分析图
    const peakHourChartDom = document.getElementById('peak-hour-chart')
    if (peakHourChartDom) {
      const chart = echarts.init(peakHourChartDom)
      const option = {
        title: {
          text: '每日高峰时段分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [100, 200, 350, 450, 300, 250, 350, 400, 300, 200, 100],
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#faad14'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(250, 173, 20, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(250, 173, 20, 0.1)'
                }
              ])
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    }

    // 游客来源分析图
    const sourceChartDom = document.getElementById('source-chart')
    if (sourceChartDom) {
      const chart = echarts.init(sourceChartDom)
      const option = {
        title: {
          text: '游客来源分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '游客来源',
            type: 'pie',
            radius: '60%',
            data: [
              { value: 45, name: '本地游客' },
              { value: 25, name: '省内游客' },
              { value: 20, name: '国内其他省份' },
              { value: 10, name: '境外游客' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    }
  }

  return (
    <div className="scenic-container">
      <h2>景点分析</h2>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h3>选择景点：</h3>
          <Select
            value={selectedSpot}
            onChange={setSelectedSpot}
            style={{ width: 200 }}
          >
            {spots.map(spot => (
              <Option key={spot.id} value={spot.id}>{spot.name}</Option>
            ))}
          </Select>
        </div>
      </Card>

      <Spin spinning={loading}>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 24 }}>
          <TabPane tab="游客数量变化" key="1">
            <Card>
              <div id="visitor-chart" style={{ height: 400 }}></div>
            </Card>
          </TabPane>
          <TabPane tab="停留时间分析" key="2">
            <Card>
              <div id="stay-time-chart" style={{ height: 400 }}></div>
            </Card>
          </TabPane>
          <TabPane tab="高峰时段分析" key="3">
            <Card>
              <div id="peak-hour-chart" style={{ height: 400 }}></div>
            </Card>
          </TabPane>
          <TabPane tab="游客来源分析" key="4">
            <Card>
              <div id="source-chart" style={{ height: 400 }}></div>
            </Card>
          </TabPane>
        </Tabs>

        <Card>
          <h3>分析结论与建议</h3>
          <div style={{ marginTop: 16, lineHeight: '24px' }}>
            <p>1. <strong>游客数量趋势</strong>：春节期间游客数量呈上升趋势，2月6日达到峰值，随后开始下降。</p>
            <p>2. <strong>停留时间分析</strong>：平均停留时间逐渐增加，从春节初期的90分钟增加到中期的135分钟。</p>
            <p>3. <strong>高峰时段</strong>：每日10:00-11:00和14:00-15:00为游客高峰时段。</p>
            <p>4. <strong>游客来源</strong>：本地游客占比最高，达到45%，省内游客占25%。</p>
            <p>5. <strong>建议措施</strong>：</p>
            <ul style={{ marginLeft: 20, marginTop: 8 }}>
              <li>在高峰时段增加景区工作人员，引导游客有序游览</li>
              <li>针对本地游客推出更多优惠活动，提高游客满意度</li>
              <li>加强景区设施维护，确保游客体验质量</li>
              <li>根据游客来源分布，有针对性地开展市场营销活动</li>
            </ul>
          </div>
        </Card>
      </Spin>
    </div>
  )
}

export default ScenicSpotAnalysis