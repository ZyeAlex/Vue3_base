import type { FormItemRule } from 'element-plus';
import type { App, DirectiveBinding, VNode } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    rule: () => Rules;
  }
}

const VALIDATE = {
  required: '必填',
  enter: '请输入',
  select: '请选择',
};
const TYPELIST = {
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
  email: '电子邮箱格式',
};
const DEFAULTMSG = {
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
  minv: '最小值为${min}',
};

declare type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'pattern'
  | 'any';
class Rules {
  private value: FormItemRule[];
  private labelV: string;
  private triggerV: 'blur' | 'change' | string[];
  constructor() {
    this.value = [];
    this.labelV = '';
    this.triggerV = ['blur', 'change'];
  }

  // 自定义提示时的默认键值
  public label(label: string) {
    this.labelV = label;
    return this;
  }

  // 修改校验触发
  public trigger(trigger: 'blur' | 'change' | string[]) {
    this.triggerV = trigger;
    return this;
  }

  // 获取rules值
  public getValue() {
    this.value = this.value.map((item: FormItemRule) => {
      item.trigger = this.triggerV;
      if (item.message) {
        item.message = (item.message as string)
          .replace('${this.labelV}', this.labelV)
          .replace('${TYPELIST[typeVal]}', TYPELIST[item.type as string])
          .replace('${min}', item.min || item.min == 0 ? item.min.toString() : '')
          .replace('${max}', item.max || item.max == 0 ? item.max.toString() : '')
          .replace('${len}', item.len ? item.len.toString() : '');
      }
      return {
        ...item,
      };
    });
    return this.value;
  }

  // 必填校验
  public required(msg: string = DEFAULTMSG.required) {
    this.value.push({ required: true, message: msg, trigger: this.triggerV });
    return this;
  }

  // 类型校验
  public type(typeVal: RuleType, msg: string = DEFAULTMSG.type) {
    this.value.push({ type: typeVal, message: msg, trigger: this.triggerV });
    return this;
  }

  // 正则校验
  public regexp(pattern: RegExp, msg: string) {
    this.value.push({
      type: 'string',
      message: msg,
      pattern: pattern,
      trigger: this.triggerV,
    });
    return this;
  }
  // 最小长度校验
  public min(min: number, msg: string = DEFAULTMSG.min) {
    this.value.push({ min: min, message: msg, trigger: this.triggerV });
    return this;
  }

  // 最大长度校验
  public max(max: number, msg: string = DEFAULTMSG.max) {
    this.value.push({ max: max, message: msg, trigger: this.triggerV });
    return this;
  }

  // 区间长度校验
  public minmax(min: number, max: number, msg: string = DEFAULTMSG.minmax) {
    this.value.push({
      min: min,
      max: max,
      message: msg,
      trigger: this.triggerV,
    });
    return this;
  }

  // 长度校验
  public len(len: number, msg: string = DEFAULTMSG.len) {
    this.value.push({ len: len, message: msg, trigger: this.triggerV });
    return this;
  }

  // 枚举值校验
  public enum(enumVal: any, msg: string = DEFAULTMSG.enum) {
    this.value.push({
      type: 'enum',
      enum: enumVal,
      message: msg,
      trigger: this.triggerV,
    });
    return this;
  }

  // 空格校验
  public whitespace(msg: string = DEFAULTMSG.whitespace) {
    this.value.push({
      type: 'string',
      message: msg,
      whitespace: true,
      trigger: this.triggerV,
    });
    return this;
  }

  // 最大值校验
  public maxv(max: number, msg: string = DEFAULTMSG.maxv) {
    const validateMax = (rule: any, value: any, callback: any) => {
      if (!new RegExp('^-?[0-9]*.?[0-9]*$').test(value)) {
        callback(new Error(DEFAULTMSG.number));
      } else if (parseFloat(value) > max) {
        callback(new Error(msg.replace('${max}', max.toString())));
      } else {
        callback();
      }
    };
    this.value.push({ validator: validateMax, trigger: this.triggerV });
    return this;
  }
  // 最小值校验
  public minv(min: number, msg: string = DEFAULTMSG.minv) {
    const validateMin = (rule: any, value: any, callback: any) => {
      if (!new RegExp('^-?[0-9]*.?[0-9]*$').test(value)) {
        callback(new Error(DEFAULTMSG.number));
      } else if (parseFloat(value) < min) {
        callback(new Error(msg.replace('${min}', min.toString())));
      } else {
        callback();
      }
    };
    this.value.push({ validator: validateMin, trigger: this.triggerV });
    return this;
  }
  // 区间值校验 v-validate="rule().required().range(0, 15, '自定义的提示信息')"
  public range(min: number, max: number, msg: string = DEFAULTMSG.range) {
    const validateRange = (rule: any, value: any, callback: any) => {
      if (!new RegExp('^-?[0-9]*.?[0-9]*$').test(value)) {
        callback(new Error(DEFAULTMSG.number));
      } else if (parseFloat(value) < min || parseFloat(value) > max) {
        callback(new Error(msg.replace('${min}', min.toString()).replace('${max}', max.toString())));
      } else {
        callback();
      }
    };
    this.value.push({ validator: validateRange, trigger: this.triggerV });
    return this;
  }

  // 自定义方法校验
  public validator(validatorFn: any) {
    this.value.push({ validator: validatorFn, trigger: this.triggerV });
    return this;
  }
}

function setRequiredStyle(dom: Element) {
  setTimeout(() => {
    const lable = dom.querySelector('.el-form-item__label');
    const span = document.createElement('span');
    span.innerText = VALIDATE.required;
    span.style.color = '#e6584f';
    span.style.marginLeft = '10px';
    lable?.appendChild(span);
  }, 0);
}

export default {
  install: (app: App) => {
    app.config.globalProperties.rule = () => new Rules();
    app.directive('validate', {
      mounted(dom: Element, binding: DirectiveBinding, vnode: VNode) {
        // 设置rules
        (vnode.ref as any).i.props.rules = binding.value.label((vnode.ref as any).i.props.label).getValue();

        // 设置必填样式
        setRequiredStyle(dom);
      },
    });
    app.directive('required', {
      mounted(dom: Element, binding: DirectiveBinding, vnode: VNode) {
        
        // 设置rules
        (vnode.ref as any).i.props.rules = new Rules()
        .required()
        .label((vnode.ref as any).i.props.label)
        .getValue();
        // dom.setAttribute('rules', String(new Rules()
        //   .required()
        //   .label((vnode.ref as any).i.props.label)
        //   .getValue()))
        
        // 设置必填样式
        setRequiredStyle(dom);
      },
      // updated(dom: Element, binding: DirectiveBinding, vnode: VNode) {
      //   // 设置rules
      //   (vnode.ref as any).i.props.rules = new Rules()
      //     .required()
      //     .label((vnode.ref as any).i.props.label)
      //     .getValue();

      //   // 设置必填样式
      //   setRequiredStyle(dom);
      // },
    });
  },
};
