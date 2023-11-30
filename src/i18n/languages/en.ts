import enLocale from 'element-plus/es/locale/lang/en';

export default {
  title: 'Management System',
  nav: {
    home: 'Home'
  },
  sidebar: {
    settings: 'Role Settings'
  },
  buttons: {
    changeLanguage: 'change language'
  },
  search: 'Search',
  add: 'Add {0}',
  edit: 'Edit {0}',
  delete: 'Delete {0}',
  submit: 'Submit',
  back: 'Back',
  clear: 'Clear',
  detail: 'Detail',
  prompting: ['No Node Selected Yet', 'No Information Temporarily'],
  action: 'Action',
  cancel: 'Cancel',
  confirm: 'Confirm',
  open: 'Open',
  close: 'Close',
  undefined: 'Undefined',
  reset: 'Reset',
  configure: 'Configure',
  create: 'Create',
  essential: 'Essential Information',
  normal: 'Normal',
  abnormal: 'Abnormal',
  batchDelete: 'Batch Delete',
  noData: 'No data',
  system: {
    error: 'Server Error',
    expired: 'Login expired, please login again'
  },
  loginPage: {
    userName: 'Please enter userName',
    pwd: 'Please enter password',
    login: 'Login',
    validate: 'Validate'
  },
  confirm_box: {
    reminder: 'Reminder',
    warning: 'Warning',
    danger: 'Danger',
    success: 'Success',
    tips: 'Tips'
  },
  tooltip: {
    search: 'Search',
    add: 'Add',
    new: 'New',
    edit: 'Edit',
    delete: 'Delete',
    down: 'Download',
    submit: 'Submit',
    back: 'Back',
    clear: 'Clear',
    detail: 'Detail',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    open: 'Open',
    close: 'Close',
    batchDelete: 'Batch Delete'
  },
  elMessage: {
    sucAdd: 'Add Succeeded',
    errAdd: 'Add Failed',
    sucEdit: 'Edit Succeeded',
    errEdit: 'Edit Failed',
    sucDel: 'Delete Succeeded',
    errDel: 'Delete Failed',
    sucOper: 'Operation Succeeded',
    errOper: 'Operation Failed',
    sucSave: 'Save Succeeded',
    errSave: 'Save Failed',
    confirmDel: 'Are you sure you want to delete?'
  },
  validate: {
    required: 'Required',
    enter: 'Please enter ',
    select: 'Please select '
  },
  validateTip: {
    required: 'Please enter ${this.labelV}',
    type: 'Please enter ${this.labelV}, which must be in the format of ${TYPELIST[typeVal]}',
    min: 'The minimum length of ${this.labelV} is ${min} characters',
    max: 'The maximum length of ${this.labelV} is ${max} characters',
    minmax: '${this.labelV} is ${min} - ${max} characters in length',
    len: '${this.labelV} length is ${len} characters',
    enum: '${this.labelV} must be in the enumeration value',
    whitespace: 'Cannot have only spaces',
    number: 'Must be number',
    range: 'Value must be between ${min} - ${max}',
    maxv: 'The maximum value is ${max}',
    minv: 'The minimum value is ${min}'
  },
  validateType: {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    regexp: 'regexp',
    integer: 'integer',
    float: 'float',
    array: 'array',
    object: 'object',
    date: 'date',
    url: 'url',
    hex: 'hex',
    email: 'email'
    // enum: '枚举值',
    // method: '函数',
  },
  name: 'en', // don't change or delete this line
};
