import React, { useEffect } from 'react'
import { Card, Spin, Alert } from 'antd'
import * as echarts from 'echarts'

interface PredictionData {
  date: string
  predictedVisitors: number
  confidence: number
}

const TrendPrediction: React.FC = () => {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState<PredictionData[]>([])

  // 模拟预测数据
  const mockData: PredictionData[] = [
    { date: '2026-02-09', predictedVisitors: 3800, confidence: 0.85 },
    { date: '2026-02-10', predictedVisitors: 4200, confidence: 0.82 },
    { date: '2026-02-11', predictedVisitors: 4800, confidence: 0.80 },
    { date: '2026-02-12', predictedVisitors: 5500, confidence: 0.78 },
    { date: '2026-02-13', predictedVisitors: 6200, confidence: 0.75 },
    { date: '2026-02-14', predictedVisitors: 5800, confidence: 0.73 },
    { date: '2026-02-15', predictedVisitors: 4500, confidence: 0.70 },
  ]

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // 当数据变化时初始化图表
    if (data.length > 0) {
      initChart()
    }
  }, [data])

  const initChart = () => {
    const chartDom = document.getElementById('prediction-chart')
    if (chartDom) {
      const chart = echarts.init(chartDom)
      const option = {
        title: {
          text: '未来7天游客数量预测',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params: any) {
            const data = params[0]
            const item = mockData[data.dataIndex]
            return `${data.name}<br/>预测游客数: ${data.value}<br/>置信度: ${(item.confidence * 100).toFixed(1)}%`
          }
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
            data: data.map(item => item.predictedVisitors),
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#52c41a'
            },
            lineStyle: {
              width: 3
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }
              ]
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

  return (
    <div className="trend-container">
      <h2>趋势预测</h2>

      <Spin spinning={loading}>
        <Card style={{ marginBottom: 24 }}>
          <div id="prediction-chart" style={{ height: 400 }}></div>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <h3>预测数据详情</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
            {data.map((item, index) => (
              <div key={index} style={{ padding: 16, border: '1px solid #e8e8e8', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{item.date}</div>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a', marginBottom: 4 }}>{item.predictedVisitors}</div>
                <div style={{ fontSize: 12, color: '#999' }}>置信度: {(item.confidence * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Alert
          message="预测说明"
          description="本预测基于历史数据和当前趋势生成，仅供参考。实际游客数量可能会受到天气、节假日、特殊事件等因素的影响而有所偏差。"
          type="info"
        />
      </Spin>
    </div>
  )
}

export default TrendPrediction