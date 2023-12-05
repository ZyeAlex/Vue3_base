
import { Ref } from 'vue'
import { Graph } from '@antv/x6'
export default (dom: Ref<HTMLElement>, { background, grid, panning, mousewheel }) => {
    let graph: Graph
    // 初始化
    const init = async () => {
        graph = new Graph({
            // 节点
            container: dom.value,
            // 自适应宽高
            autoResize: true,
            // 拖拽
            panning,
            // 缩放
            mousewheel,
            // 设置背景
            background: setBackGround(),
            // 设置网格
            grid: setGrid()
        })
    }
    // 设置背景
    const setBackGround = () => {
        if (background === undefined) return undefined
        const base = {
            color: '#F2F7FA',
        }
        return Object.assign(base, background)
    }
    // 设置网格
    const setGrid = () => {
        if (grid === undefined) return undefined
        const base = {
            visible: true,
            type: 'doubleMesh',
            args: [
                {
                    color: '#eee', // 主网格线颜色
                    thickness: 1, // 主网格线宽度
                },
                {
                    color: '#ddd', // 次网格线颜色
                    thickness: 1, // 次网格线宽度
                    factor: 4, // 主次网格线间隔
                },
            ],
        }
        return Object.assign(base, grid)
    }

    return {
        graph: () => graph,
        init
    }

}