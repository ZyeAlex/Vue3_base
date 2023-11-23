/*
 * @Description: 处理图形
 * @Author: Zye
 * @Date: 2023-03-25
 * @LastEditors: Zye
 * @LastEditTime: 2023-03-25
 */

import { ref, Ref, watch } from 'vue'
import { nextTick } from 'vue'
import { ECharts } from 'echarts'
import useStore from '@/store'
import { Num, TinyColor } from '@/utils'
type o = {
  [key: string]: any
}

export default function (props: any) {
  const store = useStore()
  // 实例
  let myChart: ECharts
  // 初始化
  const initChart = async (axis: Ref<any>) => {
    const { init } = await import('echarts')
    myChart = init(axis.value, 'light')
    store.resize.onmessage = myChart.resize
    nextTick(() => setChart())
  }
  // 参数

  setTimeout(() => {
    handleData()
  }, 1000);

  const handleData = () => {
    const length = getDataLength()
    if (length > 10) {
      endIndex.value = length - 2
      startIndex.value = endIndex.value - 10
      indexChange(1)
    }
  }

  const setChart = async () => {
    handleData()
    // props._endIndex && (endIndex.value = props.endIndex)
    const option = {
      title: '',
      grid: setGrid(),
      legend: setLegend(),
      tooltip: setTooltip(),
      dataZoom: setDataZoom(),
      yAxis: setYAxis(),
      xAxis: setXAxis(),
      series: await setSeries(),
    }
    myChart?.setOption(option)
  }

  const setGrid = () => {
    if (typeof props.tooltip != 'object') props.tooltip = {}
    return {
      top: props.top || props.tooltip.top,
      left: props.left || props.tooltip.left,
      right: props.right || props.tooltip.right,
      bottom: props.bottom || props.tooltip.bottom,
    }
  }
  const setLegend = () => {
    if (!props.legend) return
    else if (typeof props.legend != 'object') props.legend = {}
    return assign(
      {
        align: 'left',
        [props.legend.position || 'right']:
          props[props.legend.position || 'right'],
        textStyle: {
          color: props.color,
        },
      },
      props.legend
    )
  }
  const setTooltip = () => {
    if (!props.tooltip) return
    else if (typeof props.tooltip != 'object') props.tooltip = {}
    return assign(
      {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (args: any) => {
          return (
            `<div>${args[0]?.axisValue}</div>` +
            args
              .map(
                (arg: any, index: number) =>
                  `<div style="display:flex">
                    <span style="flex:1">
                      ${arg.marker +
                  (arg.seriesName.includes('series')
                    ? ''
                    : arg.seriesName)
                  }
                    </span>
                    <span style="margin-left:10px;font-weight:bold">
                      ${replace(props.tooltip[index], arg.data)}
                    </span>
                  </div>`
              )
              .join('')
          )
        },
      },
      props.tooltip
    )
  }

  const setDataZoom = () => {
    if (!props.dataZoom) return
    myChart?.on('dataZoom', (params: any) => {
      const length = getDataLength()
      startIndex.value = Math.floor((length * params.batch[0].start) / 100)
      endIndex.value = Math.ceil((length * params.batch[0].end) / 100)
    })
    return (
      props.dataZoom && [
        {
          show: false,
          // todo 这里适当延长刷新时长，避免闪烁
          throttle: 100,
          type: 'inside',
          textStyle: {
            color: props.color,
          },
          startValue: startIndex.value,
          endValue: endIndex.value,
        },
      ]
    )
  }

  const setYAxis = () => {
    // 数值轴
    let yAxis: any = {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#aaa4',
        },
      },
      axisLabel: {
        show: true,
        color: props.color,
      },
    }
    let yAxisPercent = assign(
      {
        axisLabel: {
          formatter: (value: number) => {
            return Num(100 * value, 2) + '%'
          },
        },
      },
      yAxis
    )
    let yAxiss: any[] = []
    // 如果传了yaxis，则 根据 type value/percent , 将 yaxis 与预设参数进行合并
    if (props.yAxis) {
      yAxiss = Array.isArray(props.yAxis) ? props.yAxis : [props.yAxis]
      yAxiss.forEach((_: any, index: number) => {
        if (yAxiss[index].type == 'percent') {
          yAxiss[index] = assign(yAxisPercent, {
            ...yAxiss[index],
            type: 'value',
          })
        } else {
          yAxiss[index] = assign(yAxis, { ...yAxiss[index] })
        }
      })
    }
    // 如果没传参数，则根据数据是否包含数据轴和百分轴
    else {
      if (props.series.find((data: any) => !data.type || data.type != 'line')) {
        yAxiss.push(yAxis)
      }
      if (props.series.find((data: any) => data.type == 'line')) {
        yAxiss.push(yAxisPercent)
      }
    }

    return yAxiss
  }
  const setXAxis = () => {
    let propsXAxis = props.xAxis
    if (Array.isArray(propsXAxis)) {
      propsXAxis = { data: propsXAxis }
    }
    let xAxis: any = {
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: props.color,
      },
    }
    assign(xAxis, propsXAxis)
    return xAxis
  }
  const setSeries = async () => {
    const {
      graphic: { LinearGradient },
    } = await import('echarts')
    return props.series.map((serie: any) => {
      return assign(
        {
          type: 'bar',
          lineStyle: {
            width: serie.width || 1.5,
            color: serie.color,
          },
          itemStyle: {
            width: serie.width,
            color: serie.color,
          },
          areaStyle: serie.area
            ? {
              color: new LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: new TinyColor(serie.color)
                    .setAlpha(0.95)
                    .toHex8String(),
                },
                {
                  offset: 1,
                  color: new TinyColor(serie.color)
                    .setAlpha(0.1)
                    .toHex8String(),
                },
              ]),
            }
            : undefined,
        },
        serie
      )
    })
  }

  // 起止索引
  const startIndex = ref(0)
  const endIndex = ref(10)
  let timer: NodeJS.Timeout
  const indexChange = (add?: number) => {
    let length = getDataLength()
    if (add) {
      let set = () => {
        if (
          (add < 0 && startIndex.value + add >= 0) ||
          (add > 0 && endIndex.value + add <= length - 1)
        ) {
          startIndex.value += add
          endIndex.value += add
          let option = {
            dataZoom: [
              {
                startValue: startIndex.value,
                endValue: endIndex.value,
              },
            ],
          }
          nextTick(() => myChart.setOption(option))
        } else {
          clearInterval(timer)
        }
      }
      set()
      clearInterval(timer)
      timer = setInterval(set, 100)
    } else {
      nextTick(() => {
        clearInterval(timer)
      })
    }
  }

  const getDataLength = () => {
    let propsXAxis = props.xAxis
    if (Array.isArray(propsXAxis)) {
      propsXAxis = { data: propsXAxis }
    }
    return propsXAxis.data?.length
  }
  //默认展示最后10条

  /** 将源对象的子项合并至目标对象
   *
   * @param to 基础对象、目标对象
   * @param from 源对象
   */
  const assign = (to: o, from: o = {}) => {
    Object.keys(from).forEach((key) => {
      if (
        from[key] &&
        typeof from[key] == 'object' &&
        !Array.isArray(from[key])
      ) {
        if (!to[key]) to[key] = {}
        assign(to[key], from[key])
      } else {
        to[key] = from[key]
      }
    })
    return to
  }
  const replace = (regexp: string, data: string) => {
    if (!regexp) regexp = '{value}'
    return regexp.replace('{value}', data)
  }

  return {
    initChart,
    setChart,
    indexChange,
    startIndex,
    endIndex,
    getDataLength,
  }
}
