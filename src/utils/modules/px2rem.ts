

const remSize = 1
const setRem = () => {
    const scaleW = document.documentElement.clientWidth / 1920
    const scaleH = document.documentElement.clientHeight / 1080
    document.documentElement.style.fontSize = remSize * Math.min(scaleW, scaleH) + 'px'
}

setRem()
window.onresize = setRem