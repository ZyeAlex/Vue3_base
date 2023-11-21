/*
 * @Description: 载波生成
 * @Author: Zye
 * @Date: 2022-07-04
 */

export default (() => {
  type PointType = {
    x: number
    y: number
  }

  // 像素
  const pixel = {
    x: 0, // x轴像素(px)
    y: 0, // y轴像素(px)
    i: 3, // 间隔像素(px)
    k: 1.5, // 坡度 数值越大，坡度越大(>0)
    z: 5, // 振幅像素(px)
    o: 0.5, // 振幅几率 0-1
  }
  // 坐标轴
  const axis = {
    x: [10000, 15000], // x轴起始终止坐标
    y: 50, //y轴高度
    xDeg: 0,//x轴精度
    yDeg: 0,//y轴精度
  }



  /** 设置像素
   *
   * @param x x轴像素
   * @param y y轴像素
   */
  const setPixel = (x?: number, y?: number, _pixel?: any) => {
    Object.assign(pixel, _pixel, { x, y })
  }

  /** 设置坐标轴
   *
   * @param x x轴[起始坐标,终止坐标]
   * @param y y轴坐标
   */
  const setAxis = (x?: [number, number], y?: number, xDeg?: number, yDeg?: number) => {
    x && (axis.x = x);
    y && (axis.y = y);
    xDeg && (axis.xDeg = xDeg);
    yDeg && (axis.yDeg = yDeg)
  }

  let ra = true // 负偏移振幅

  // 将x轴数值转换为坐标
  const xAxisToPixel = (num: number) => {
    return (
      // X轴像素量
      (pixel.x *
        // 点在x轴坐标占比
        (num - axis.x[0])) /
      (axis.x[1] - axis.x[0])
    )
  }
  // 将X轴坐标转换为数值
  const xPixelToAxis = (num: number) => {
    return parseFloat(((num / pixel.x) * (axis.x[1] - axis.x[0]) + axis.x[0]).toFixed(axis.xDeg))
  }
  // 将y轴数值转换为坐标
  const yAxisToPixel = (num: number) => {
    return (
      pixel.y * // y轴像素量
      (num / axis.y) // 点在Y轴占比
    )
  }
  // 将Y轴坐标转换为数值
  const yPixelToAxis = (num: number) => {
    return parseFloat(((num / pixel.y) * axis.y).toFixed(axis.yDeg))
  }

  // 获取偏移量
  const getOffset = (ran: number, sin: number) => {
    // 记录当前偏移是正负偏移
    let random = Math.random()
    if (ra) {
      random = -random
    }
    ra = !ra
    let isRandom = Math.random() > ran // 记录当前是否偏移
    return isRandom ? random * sin * pixel.z : 0 // 偏移量
  }

  //   获取载波点
  const getCarrierPoint = (
    x: [number, number], //   起始终止
    y: number //   高度
  ) => {
    const arr: PointType[] = [] //生成的载波点
    let start = xAxisToPixel(x[0]) // 起始像素
    let end = xAxisToPixel(x[1]) // 终止像素
    let height = yAxisToPixel(y) // 像素高度
    // 起始载波
    arr.push({
      x: x[0],
      y: 0,
    })
    // 如果sin函数>=sinx
    if (end - start <= (Math.PI * height) / pixel.k) {
      for (let i = start + pixel.i; i < end; i += pixel.i) {
        let sin = Math.sin(((i - start) / (end - start)) * Math.PI) // sin值
        arr.push({
          x: xPixelToAxis(i),
          y: yPixelToAxis(height * sin + getOffset(1 - 0.1 - pixel.o, sin)),
        })
      }
      // 如果sin函数<sinX
    } else if (end - start > (Math.PI * height) / pixel.k) {
      // 前半段SIN函数
      for (let i = start + pixel.i; i < start + (height * Math.PI) / pixel.k / 2; i += pixel.i) {
        let sin = Math.sin(((i - start) / ((height * Math.PI) / pixel.k)) * Math.PI) // sin值
        arr.push({
          x: xPixelToAxis(i),
          y: yPixelToAxis(height * sin + getOffset(1 - 0.1 - pixel.o, sin)),
        })
      }
      // 横线部分
      for (let i = start + (height * Math.PI) / pixel.k / 2; i < end - (height * Math.PI) / pixel.k / 2; i += pixel.i) {
        arr.push({
          x: xPixelToAxis(i),
          y: yPixelToAxis(height + getOffset(1 + 0.1 - pixel.o, 1)),
        })
      }
      // 后半段SIN函数
      for (let i = start; i < start + (height * Math.PI) / pixel.k / 2; i += pixel.i) {
        let sin = Math.sin(((i - start) / (height * Math.PI)) * pixel.k * Math.PI + Math.PI / 2) // sin值
        arr.push({
          x: xPixelToAxis(i - start + end - (height * Math.PI) / pixel.k / 2),
          y: yPixelToAxis(height * sin + getOffset(1 - 0.1 - pixel.o, sin)),
        })
      }
    }
    // 终止载波
    arr.push({
      x: x[1],
      y: 0,
    })
    return arr
  }

  return (
    pixel?: {
      x?: number
      y?: number
      i?: number
      k?: number
      z?: number
      o?: number
    },
    axis?: {
      // x轴起始终止坐标，y轴高度
      x?: [number, number]
      y?: number,
      xDeg?: number,
      yDeg?: number
    }
  ) => {
    pixel && setPixel(pixel.x, pixel.y, pixel)
    axis && setAxis(axis.x, axis.y, axis.xDeg, axis.yDeg)
    return {
      setPixel,
      setAxis,
      getCarrierPoint,
    }
  }
})()
