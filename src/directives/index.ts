
import { App } from "vue";
import validate from "./modules/validate";

const install = (app: App, options = {}) => {
    // 表单校验
    app.use(validate)
}

export default {
    install
}