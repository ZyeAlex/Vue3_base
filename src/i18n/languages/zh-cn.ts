import zhLocale from 'element-plus/es/locale/lang/zh-cn';

export default {
  title: '管理系统',
  nav: {
    home: '首页'
  },
  sidebar: {
    settings: '角色设置'
  },
  buttons: {
    changeLanguage: '切换语言'
  },
  search: '搜索',
  add: '添加{0}',
  edit: '编辑{0}',
  delete: '删除{0}',
  submit: '提交',
  back: '返回',
  clear: '清空',
  detail: '详情',
  prompting: ['暂未选择节点', '暂无信息'],
  action: '操作',
  cancel: '取消',
  confirm: '确定',
  open: '开启',
  close: '关闭',
  undefined: '未定义',
  reset: '重置',
  configure: '配置',
  create: '创建',
  essential: '基本信息',
  normal: '正常',
  abnormal: '异常',
  batchDelete: '批量删除',
  noData: '暂无数据',
  system: {
    error: '服务器错误',
    expired: '登录过期，请重新登录'
  },
  loginPage: {
    userName: '请输入用户名',
    pwd: '请输入密码',
    login: '登录',
    validate: '验证'
  },
  confirm_box: {
    reminder: '温馨提示',
    warning: '警告',
    danger: '危险',
    success: '成功',
    tips: '提示'
  },
  tooltip: {
    search: '搜索',
    add: '添加',
    new: '新建',
    edit: '编辑',
    delete: '删除',
    down: '下载',
    submit: '提交',
    back: '返回',
    clear: '清空',
    detail: '详情',
    save: '保存',
    cancel: '取消',
    confirm: '确定',
    open: '开启',
    close: '关闭',
    batchDelete: '批量删除'
  },
  elMessage: {
    sucAdd: '新增成功',
    errAdd: '新增失败',
    sucEdit: '编辑成功',
    errEdit: '编辑失败',
    sucDel: '删除成功',
    errDel: '删除失败',
    sucOper: '操作成功',
    errOper: '操作失败',
    sucSave: '保存成功',
    errSave: '保存失败',
    confirmDel: '确定要删除吗？'
  },
  validate: {
    required: '必填',
    enter: '请输入',
    select: '请选择'
  },
  validateTip: {
    required: '请输入${this.labelV}',
    type: '${this.labelV}必须为${TYPELIST[typeVal]}格式',
    min: '${this.labelV}长度最小为${min}个字符',
    max: '${this.labelV}长度最大为${max}个字符',
    minmax: '${this.labelV}长度在${min}-${max}个字符',
    len: '${this.labelV}长度在${len}个字符',
    enum: '${this.labelV}必须在枚举值中',
    whitespace: '不能只存在空格',
    number: '必须为数值型',
    range: '值必须在${min}-${max}之间',
    maxv: '最大值为${max}',
    minv: '最小值为${min}'
  },
  validateType: {
    string: '字符串',
    number: '数字',
    boolean: '布尔',
    regexp: '正则表达式',
    integer: '整型',
    float: '双精度浮点型数字',
    array: '数组',
    object: '对象',
    date: '日期格式',
    url: '网址格式',
    hex: '16进制数字',
    email: '电子邮箱格式'
    // enum: '枚举值',
    // method: '函数',
  },
  name: 'zh-cn', // 不要删除或修改这个行
};
