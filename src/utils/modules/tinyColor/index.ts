let trimLeft = /^\s+/
let trimRight = /\s+$/
let mathRound = Math.round
let mathMin = Math.min
let mathMax = Math.max
let mathRandom = Math.random
interface TinyColorOptions {
  format: string
  gradientType: string
}
type Numberify<T> = {
  [P in keyof T]: number
}
type NumberOrString<T> = {
  [P in keyof T]: number | string
}
interface RGB {
  r: number | string
  g: number | string
  b: number | string
}
interface RGBA extends RGB {
  a: number
}
interface HSL {
  h: number | string
  s: number | string
  l: number | string
}
interface HSLA extends HSL {
  a: number
}
interface HSV {
  h: number | string
  s: number | string
  v: number | string
}
interface HSVA extends HSV {
  a: number
}
type ColorInput =
  | string
  | number
  | RGB
  | RGBA
  | HSL
  | HSLA
  | HSV
  | HSVA
  | TinyColor

export default class TinyColor {
  private matchers: any
  private names!: object
  private _originalInput!: ColorInput
  private _r!: number
  private _g!: number
  private _b!: number
  private _a!: number
  private _roundA!: number
  private _format!: string
  private _gradientType!: string
  private _ok!: boolean

  public isDark!: boolean
  public isLight!: boolean
  public isValid!: boolean

  constructor(color?: ColorInput, opts?: Partial<TinyColorOptions>) {
    // If input is already a tinycolor, return itself
    if (color instanceof TinyColor) {
      return color
    }
    this.init(color, opts)
  }

  init(color?: ColorInput, opts?: Partial<TinyColorOptions>): void {
    this.matchers = this.initMatchers()
    this.names = TinyColor.initNames()
    const rgb = this.inputToRGB(color)
    this._originalInput = typeof color !== 'undefined' ? color : ''
    this._r = rgb.r
    this._g = rgb.g
    this._b = rgb.b
    this._a = rgb.a
    this._roundA = mathRound(100 * this._a) / 100
    this._format =
      typeof opts !== 'undefined' && typeof opts.format !== 'undefined'
        ? opts.format
        : '' || rgb.format
    this._gradientType =
      typeof opts !== 'undefined' && typeof opts.gradientType !== 'undefined'
        ? opts.gradientType
        : ''
    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) {
      this._r = mathRound(this._r)
    }
    if (this._g < 1) {
      this._g = mathRound(this._g)
    }
    if (this._b < 1) {
      this._b = mathRound(this._b)
    }
    this._ok = rgb.ok

    this.initAttr()
  }

  initAttr() {
    this.isDark = this.getBrightness() < 128
    this.isLight = !this.isDark
    this.isValid = this._ok
  }

  private static initNames() {
    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    return {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '0ff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000',
      blanchedalmond: 'ffebcd',
      blue: '00f',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      burntsienna: 'ea7e5d',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '0ff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkgrey: 'a9a9a9',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkslategrey: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dimgrey: '696969',
      dodgerblue: '1e90ff',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'f0f',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      grey: '808080',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgray: 'd3d3d3',
      lightgreen: '90ee90',
      lightgrey: 'd3d3d3',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslategray: '789',
      lightslategrey: '789',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '0f0',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'f0f',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370db',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'db7093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      rebeccapurple: '663399',
      red: 'f00',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      slategrey: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      wheat: 'f5deb3',
      white: 'fff',
      whitesmoke: 'f5f5f5',
      yellow: 'ff0',
      yellowgreen: '9acd32',
    }
  }

  private initMatchers() {
    // <http://www.w3.org/TR/css3-values/#integers>
    const CSS_INTEGER = '[-\\+]?\\d+%?'
    // <http://www.w3.org/TR/css3-values/#number-value>
    const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    const CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'
    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    const PERMISSIVE_MATCH3 =
      '[\\s|\\(]+(' +
      CSS_UNIT +
      ')[,|\\s]+(' +
      CSS_UNIT +
      ')[,|\\s]+(' +
      CSS_UNIT +
      ')\\s*\\)?'
    const PERMISSIVE_MATCH4 =
      '[\\s|\\(]+(' +
      CSS_UNIT +
      ')[,|\\s]+(' +
      CSS_UNIT +
      ')[,|\\s]+(' +
      CSS_UNIT +
      ')[,|\\s]+(' +
      CSS_UNIT +
      ')\\s*\\)?'

    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
      rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
      hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
      hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
      hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
      hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    }
  }

  public getBrightness(): number {
    //http://www.w3.org/TR/AERT#color-contrast
    const rgb: Numberify<RGBA> = this.toRgb()
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  }
  public toRgb(): Numberify<RGBA> {
    return {
      r: mathRound(this._r),
      g: mathRound(this._g),
      b: mathRound(this._b),
      a: this._a,
    }
  }
  public static getNames() {
    return this.initNames()
  }
  public getOriginalInput(): ColorInput {
    return this._originalInput
  }
  public getFormat(): string {
    return this._format
  }
  public getAlpha(): number {
    return this._a
  }
  public getLuminance(): number {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    const rgb: Numberify<RGBA> = this.toRgb()
    let RsRGB: number,
      GsRGB: number,
      BsRGB: number,
      R: number,
      G: number,
      B: number
    RsRGB = rgb.r / 255
    GsRGB = rgb.g / 255
    BsRGB = rgb.b / 255

    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92
    } else {
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4)
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92
    } else {
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4)
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92
    } else {
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4)
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }
  public setAlpha(value?: any) {
    this._a = this.boundAlpha(value)
    this._roundA = mathRound(100 * this._a) / 100
    return this
  }
  public toHsv(): Numberify<HSVA> {
    var hsv = this.rgbToHsv(this._r, this._g, this._b)
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a }
  }
  public toHsvString(): string {
    var hsv = this.rgbToHsv(this._r, this._g, this._b)
    var h = mathRound(hsv.h * 360),
      s = mathRound(hsv.s * 100),
      v = mathRound(hsv.v * 100)
    return this._a == 1
      ? 'hsv(' + h + ', ' + s + '%, ' + v + '%)'
      : 'hsva(' + h + ', ' + s + '%, ' + v + '%, ' + this._roundA + ')'
  }
  public toHsl(): Numberify<HSLA> {
    var hsl = this.rgbToHsl(this._r, this._g, this._b)
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a }
  }
  public toHslString(): string {
    var hsl = this.rgbToHsl(this._r, this._g, this._b)
    var h = mathRound(hsl.h * 360),
      s = mathRound(hsl.s * 100),
      l = mathRound(hsl.l * 100)
    return this._a == 1
      ? 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
      : 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + this._roundA + ')'
  }
  public toHex(allow3Char?: boolean): string {
    return this.rgbToHex(this._r, this._g, this._b, allow3Char)
  }
  public toHexString(allow3Char?: boolean): string {
    return '#' + this.toHex(allow3Char)
  }
  public toHex8(allow4Char?: boolean): string {
    return this.rgbaToHex(this._r, this._g, this._b, this._a, allow4Char)
  }
  public toHex8String(allow4Char?: boolean): string {
    return '#' + this.toHex8(allow4Char)
  }
  public toRgbString(): string {
    return this._a == 1
      ? 'rgb(' +
          mathRound(this._r) +
          ', ' +
          mathRound(this._g) +
          ', ' +
          mathRound(this._b) +
          ')'
      : 'rgba(' +
          mathRound(this._r) +
          ', ' +
          mathRound(this._g) +
          ', ' +
          mathRound(this._b) +
          ', ' +
          this._roundA +
          ')'
  }
  public toPercentageRgb(): NumberOrString<RGBA> {
    return {
      r: mathRound(this.bound01(this._r, 255) * 100) + '%',
      g: mathRound(this.bound01(this._g, 255) * 100) + '%',
      b: mathRound(this.bound01(this._b, 255) * 100) + '%',
      a: this._a,
    }
  }
  public toPercentageRgbString(): string {
    return this._a == 1
      ? 'rgb(' +
          mathRound(this.bound01(this._r, 255) * 100) +
          '%, ' +
          mathRound(this.bound01(this._g, 255) * 100) +
          '%, ' +
          mathRound(this.bound01(this._b, 255) * 100) +
          '%)'
      : 'rgba(' +
          mathRound(this.bound01(this._r, 255) * 100) +
          '%, ' +
          mathRound(this.bound01(this._g, 255) * 100) +
          '%, ' +
          mathRound(this.bound01(this._b, 255) * 100) +
          '%, ' +
          this._roundA +
          ')'
  }
  public toName(): string | boolean {
    if (this._a === 0) {
      return 'transparent'
    }
    if (this._a < 1) {
      return false
    }
    return this._flip()[this.rgbToHex(this._r, this._g, this._b, true)] || false
  }
  public toFilter(secondColor?: ColorInput): string {
    var hex8String =
      '#' + this.rgbaToArgbHex(this._r, this._g, this._b, this._a)
    var secondHex8String = hex8String
    var gradientType = this._gradientType ? 'GradientType = 1, ' : ''

    if (secondColor) {
      const tinyColorObj = new TinyColor(secondColor)
      secondHex8String =
        '#' +
        this.rgbaToArgbHex(
          tinyColorObj._r,
          tinyColorObj._g,
          tinyColorObj._b,
          tinyColorObj._a
        )
    }

    return (
      'progid:DXImageTransform.Microsoft.gradient(' +
      gradientType +
      'startColorstr=' +
      hex8String +
      ',endColorstr=' +
      secondHex8String +
      ')'
    )
  }
  public toString(format?: string): any {
    var formatSet = !!format
    format = format || this._format

    let formattedString: any = ''
    var hasAlpha = this._a < 1 && this._a >= 0
    var needsAlphaFormat =
      !formatSet &&
      hasAlpha &&
      (format === 'hex' ||
        format === 'hex6' ||
        format === 'hex3' ||
        format === 'hex4' ||
        format === 'hex8' ||
        format === 'name')

    if (needsAlphaFormat) {
      if (format === 'name' && this._a === 0) {
        return this.toName()
      }
      return this.toRgbString()
    }
    if (format === 'rgb') {
      formattedString = this.toRgbString()
    }
    if (format === 'prgb') {
      formattedString = this.toPercentageRgbString()
    }
    if (format === 'hex' || format === 'hex6') {
      formattedString = this.toHexString()
    }
    if (format === 'hex3') {
      formattedString = this.toHexString(true)
    }
    if (format === 'hex4') {
      formattedString = this.toHex8String(true)
    }
    if (format === 'hex8') {
      formattedString = this.toHex8String()
    }
    if (format === 'name') {
      formattedString = this.toName()
    }
    if (format === 'hsl') {
      formattedString = this.toHslString()
    }
    if (format === 'hsv') {
      formattedString = this.toHsvString()
    }

    return formattedString || this.toHexString()
  }
  public clone(): TinyColor {
    return new TinyColor(this.toString())
  }
  private _applyModification(fn: Function, args?: any) {
    let color = fn.apply(null, [this].concat([].slice.call(args)))
    this._r = color._r
    this._g = color._g
    this._b = color._b
    this.setAlpha(color._a)
    return this
  }
  private _lighten(color: TinyColor, amount?: number) {
    amount = amount === 0 ? 0 : amount || 10
    let hsl = new TinyColor(color).toHsl()
    hsl.l += amount / 100
    hsl.l = color.clamp01(hsl.l)
    return new TinyColor(hsl)
  }
  public lighten(...args: any): TinyColor {
    return this._applyModification(this._lighten, args)
  }
  private _brighten(color: any, amount?: number) {
    amount = amount === 0 ? 0 : amount || 10
    let rgb = new TinyColor(color).toRgb()
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))))
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))))
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))))
    return new TinyColor(rgb)
  }
  public brighten(...args: any): TinyColor {
    return this._applyModification(this._brighten, args)
  }
  private _darken(color: TinyColor, amount?: number) {
    amount = amount === 0 ? 0 : amount || 10
    let hsl = new TinyColor(color).toHsl()
    hsl.l -= amount / 100
    hsl.l = color.clamp01(hsl.l)
    return new TinyColor(hsl)
  }
  public darken(...args: any): TinyColor {
    return this._applyModification(this._darken, args)
  }
  private _desaturate(color: TinyColor, amount?: number) {
    amount = amount === 0 ? 0 : amount || 10
    let hsl = new TinyColor(color).toHsl()
    hsl.s -= amount / 100
    hsl.s = color.clamp01(hsl.s)
    return new TinyColor(hsl)
  }
  public desaturate(...args: any): TinyColor {
    return this._applyModification(this._desaturate, args)
  }
  private _saturate(color: TinyColor, amount?: number) {
    amount = amount === 0 ? 0 : amount || 10
    var hsl = new TinyColor(color).toHsl()
    hsl.s += amount / 100
    hsl.s = color.clamp01(hsl.s)
    return new TinyColor(hsl)
  }
  public saturate(...args: any): TinyColor {
    return this._applyModification(this._saturate, args)
  }
  private _greyscale(color: any) {
    return new TinyColor(color).desaturate(100)
  }
  public greyscale(...args: any): TinyColor {
    return this._applyModification(this._greyscale, args)
  }
  private _spin(color: any, amount: number) {
    var hsl = new TinyColor(color).toHsl()
    var hue = (hsl.h + amount) % 360
    hsl.h = hue < 0 ? 360 + hue : hue
    return new TinyColor(hsl)
  }

  public spin(...args: any): TinyColor {
    return this._applyModification(this._spin, args)
  }

  private _applyCombination(fn: Function, args?: any) {
    return fn.apply(null, [this].concat([].slice.call(args)))
  }

  private _analogous(color: TinyColor, results?: number, slices?: number) {
    results = results || 6
    slices = slices || 30

    var hsl = new TinyColor(color).toHsl()
    var part = 360 / slices
    var ret = [new TinyColor(color)]

    for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360
      ret.push(new TinyColor(hsl))
    }
    return ret
  }
  public analogous(...args: any): TinyColor {
    return this._applyCombination(this._analogous, args)
  }

  private _complement(color: TinyColor) {
    var hsl = new TinyColor(color).toHsl()
    hsl.h = (hsl.h + 180) % 360
    return new TinyColor(hsl)
  }
  public complement(...args: any): TinyColor {
    return this._applyCombination(this._complement, args)
  }
  private _monochromatic(color: TinyColor, results?: number) {
    results = results || 6
    var hsv = new TinyColor(color).toHsv()
    var h = hsv.h,
      s = hsv.s,
      v = hsv.v
    var ret = []
    var modification = 1 / results

    while (results--) {
      ret.push(new TinyColor({ h: h, s: s, v: v }))
      v = (v + modification) % 1
    }
    return ret
  }
  public monochromatic(...args: any): TinyColor {
    return this._applyCombination(this._monochromatic, args)
  }
  private _splitcomplement(color: TinyColor) {
    var hsl = new TinyColor(color).toHsl()
    var h = hsl.h
    return [
      new TinyColor(color),
      new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
    ]
  }
  public splitcomplement(...args: any): TinyColor {
    return this._applyCombination(this._splitcomplement, args)
  }
  private _triad(color: TinyColor) {
    var hsl = new TinyColor(color).toHsl()
    var h = hsl.h
    return [
      new TinyColor(color),
      new TinyColor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l }),
    ]
  }
  public triad(...args: any): TinyColor {
    return this._applyCombination(this._triad, args)
  }
  private _tetrad(obj: TinyColor) {
    var hsl = new TinyColor(obj).toHsl()
    var h = hsl.h
    return [
      new TinyColor(obj),
      new TinyColor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l }),
    ]
  }
  public tetrad(...args: any): TinyColor {
    return this._applyCombination(this._tetrad, args)
  }
  public static fromRatio(
    color: ColorInput,
    opts?: Partial<TinyColorOptions>
  ): TinyColor {
    if (typeof color == 'object') {
      let newColor = {}
      for (var i in color) {
        if (color.hasOwnProperty(i)) {
          if (i === 'a') {
            newColor[i] = color[i]
          } else {
            newColor[i] = TinyColor.convertToPercentage(color[i])
          }
        }
      }
      color = newColor as ColorInput
    }
    return new TinyColor(color, opts)
  }
  public static equals(color1: ColorInput, color2: ColorInput): boolean {
    if (!color1 || !color2) {
      return false
    }
    return (
      new TinyColor(color1).toRgbString() == new TinyColor(color2).toRgbString()
    )
  }
  public static random(): TinyColor {
    return TinyColor.fromRatio({
      r: mathRandom(),
      g: mathRandom(),
      b: mathRandom(),
    })
  }
  public static mix(
    color1: ColorInput,
    color2: ColorInput,
    amount?: number
  ): TinyColor {
    amount = amount === 0 ? 0 : amount || 50
    var rgb1 = new TinyColor(color1).toRgb()
    var rgb2 = new TinyColor(color2).toRgb()
    var p = amount / 100

    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a,
    }

    return new TinyColor(rgba)
  }
  public static readability(color1: ColorInput, color2: ColorInput): number {
    var c1 = new TinyColor(color1)
    var c2 = new TinyColor(color2)
    return (
      (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) /
      (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05)
    )
  }
  public static isReadable(
    color1: ColorInput,
    color2: ColorInput,
    wcag2?: any
  ): boolean {
    var readability = TinyColor.readability(color1, color2)
    var wcag2Parms, out

    out = false
    wcag2Parms = TinyColor.validateWCAG2Parms(wcag2)
    switch (wcag2Parms.level + wcag2Parms.size) {
      case 'AAsmall':
      case 'AAAlarge':
        out = readability >= 4.5
        break
      case 'AAlarge':
        out = readability >= 3
        break
      case 'AAAsmall':
        out = readability >= 7
        break
    }
    return out
  }
  public static mostReadable(
    baseColor: ColorInput,
    colorList: any[],
    args?: any
  ): any {
    let bestColor: ColorInput = ''
    var bestScore = 0
    var readability
    var includeFallbackColors, level, size
    args = args || {}
    includeFallbackColors = args.includeFallbackColors
    level = args.level
    size = args.size

    for (var i = 0; i < colorList.length; i++) {
      readability = TinyColor.readability(baseColor, colorList[i])
      if (readability > bestScore) {
        bestScore = readability
        bestColor = new TinyColor(colorList[i])
      }
    }

    if (
      TinyColor.isReadable(baseColor, bestColor, {
        level: level,
        size: size,
      }) ||
      !includeFallbackColors
    ) {
      return bestColor
    } else {
      args.includeFallbackColors = false
      return TinyColor.mostReadable(baseColor, ['#fff', '#000'], args)
    }
  }
  private clamp01(val: any) {
    return mathMin(1, mathMax(0, val))
  }
  private _flip(): { [key: string]: string } {
    let flipped = {}
    let allName: { [key: string]: string } = TinyColor.initNames()
    for (let i in allName) {
      if (allName.hasOwnProperty(i)) {
        flipped[allName[i]] = i
      }
    }
    return flipped
  }
  private isValidCSSUnit(color: any) {
    return !!this.matchers.CSS_UNIT.exec(color)
  }
  private isOnePointZero(n: any) {
    return typeof n == 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1
  }
  private isPercentage(n: any) {
    return typeof n === 'string' && n.indexOf('%') != -1
  }
  private pad2(c: string) {
    return c.length == 1 ? '0' + c : '' + c
  }
  private bound01(n: any, max: any) {
    if (this.isOnePointZero(n)) {
      n = '100%'
    }
    let processPercent = this.isPercentage(n)
    n = mathMin(max, mathMax(0, parseFloat(n)))
    // Automatically convert percentage into number
    if (processPercent) {
      n = parseInt('' + n * max, 10) / 100
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1
    }
    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max)
  }
  private convertDecimalToHex(d: string) {
    return Math.round(parseFloat(d) * 255).toString(16)
  }
  private rgbToRgb(r: number, g: number, b: number) {
    return {
      r: this.bound01(r, 255) * 255,
      g: this.bound01(g, 255) * 255,
      b: this.bound01(b, 255) * 255,
    }
  }
  private hsvToRgb(h: number, s: number, v: number) {
    h = this.bound01(h, 360) * 6
    s = this.bound01(s, 100)
    v = this.bound01(v, 100)
    let i = Math.floor(h),
      f = h - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      mod = i % 6,
      r = [v, q, p, p, t, v][mod],
      g = [t, v, v, q, p, p][mod],
      b = [p, p, t, v, v, q][mod]

    return { r: r * 255, g: g * 255, b: b * 255 }
  }
  private hslToRgb(h: number, s: number, l: number) {
    let r, g, b
    h = this.bound01(h, 360)
    s = this.bound01(s, 100)
    l = this.bound01(l, 100)
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s
      var p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    return { r: r * 255, g: g * 255, b: b * 255 }
  }
  private rgbToHsl(r: number, g: number, b: number) {
    r = this.bound01(r, 255)
    g = this.bound01(g, 255)
    b = this.bound01(b, 255)
    let max = mathMax(r, g, b),
      min = mathMin(r, g, b)
    let h: any,
      s,
      l = (max + min) / 2

    if (max == min) {
      h = s = 0 // achromatic
    } else {
      var d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return { h: h, s: s, l: l }
  }
  private rgbToHsv(r: number, g: number, b: number) {
    r = this.bound01(r, 255)
    g = this.bound01(g, 255)
    b = this.bound01(b, 255)

    let max = mathMax(r, g, b),
      min = mathMin(r, g, b)
    let h: any,
      s,
      v = max

    let d = max - min
    s = max === 0 ? 0 : d / max

    if (max == min) {
      h = 0 // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return { h: h, s: s, v: v }
  }
  private rgbToHex(r: number, g: number, b: number, allow3Char?: boolean) {
    let hex = [
      this.pad2(mathRound(r).toString(16)),
      this.pad2(mathRound(g).toString(16)),
      this.pad2(mathRound(b).toString(16)),
    ]
    // Return a 3 character hex if possible
    if (
      allow3Char &&
      hex[0].charAt(0) == hex[0].charAt(1) &&
      hex[1].charAt(0) == hex[1].charAt(1) &&
      hex[2].charAt(0) == hex[2].charAt(1)
    ) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
    }
    return hex.join('')
  }
  private rgbaToHex(
    r: number,
    g: number,
    b: number,
    a: number,
    allow4Char?: boolean
  ) {
    var hex = [
      this.pad2(mathRound(r).toString(16)),
      this.pad2(mathRound(g).toString(16)),
      this.pad2(mathRound(b).toString(16)),
      this.pad2(this.convertDecimalToHex('' + a)),
    ]
    // Return a 4 character hex if possible
    if (
      allow4Char &&
      hex[0].charAt(0) == hex[0].charAt(1) &&
      hex[1].charAt(0) == hex[1].charAt(1) &&
      hex[2].charAt(0) == hex[2].charAt(1) &&
      hex[3].charAt(0) == hex[3].charAt(1)
    ) {
      return (
        hex[0].charAt(0) +
        hex[1].charAt(0) +
        hex[2].charAt(0) +
        hex[3].charAt(0)
      )
    }
    return hex.join('')
  }
  private rgbaToArgbHex(r: number, g: number, b: number, a: number) {
    let hex = [
      this.pad2(this.convertDecimalToHex('' + a)),
      this.pad2(mathRound(r).toString(16)),
      this.pad2(mathRound(g).toString(16)),
      this.pad2(mathRound(b).toString(16)),
    ]
    return hex.join('')
  }
  private static convertToPercentage(n: any) {
    if (n <= 1) {
      n = n * 100 + '%'
    }
    return n
  }
  private boundAlpha(a: any) {
    a = parseFloat(a)
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1
    }
    return a
  }
  private inputToRGB(color: any) {
    let rgb = { r: 0, g: 0, b: 0 }
    let a = 1
    let s = null
    let v = null
    let l = null
    let ok: boolean = false
    let format: string = ''
    if (color === null) {
      color = ''
    }
    if (typeof color == 'string') {
      color = this.stringInputToObject(color)
    }
    if (typeof color == 'object') {
      if (
        this.isValidCSSUnit(color.r) &&
        this.isValidCSSUnit(color.g) &&
        this.isValidCSSUnit(color.b)
      ) {
        rgb = this.rgbToRgb(color.r, color.g, color.b)
        ok = true
        format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb'
      } else if (
        this.isValidCSSUnit(color.h) &&
        this.isValidCSSUnit(color.s) &&
        this.isValidCSSUnit(color.v)
      ) {
        s = TinyColor.convertToPercentage(color.s)
        v = TinyColor.convertToPercentage(color.v)
        rgb = this.hsvToRgb(color.h, s, v)
        ok = true
        format = 'hsv'
      } else if (
        this.isValidCSSUnit(color.h) &&
        this.isValidCSSUnit(color.s) &&
        this.isValidCSSUnit(color.l)
      ) {
        s = TinyColor.convertToPercentage(color.s)
        l = TinyColor.convertToPercentage(color.l)
        rgb = this.hslToRgb(color.h, s, l)
        ok = true
        format = 'hsl'
      }
      if (color.hasOwnProperty('a')) {
        a = color.a
      }
    }
    a = this.boundAlpha(a)
    return {
      ok: ok,
      format: color.format || format,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a: a,
    }
  }
  private parseIntFromHex(val: any) {
    return parseInt(val, 16)
  }
  private convertHexToDecimal(h: any) {
    return this.parseIntFromHex(h) / 255
  }
  private stringInputToObject(color: any) {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase()
    let named: boolean = false
    if (this.names[color]) {
      color = this.names[color]
      named = true
    } else if (color == 'transparent') {
      return { r: 0, g: 0, b: 0, a: 0, format: 'name' }
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    let match: any
    if ((match = this.matchers.rgb.exec(color))) {
      return { r: match[1], g: match[2], b: match[3] }
    }
    if ((match = this.matchers.rgba.exec(color))) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] }
    }
    if ((match = this.matchers.hsl.exec(color))) {
      return { h: match[1], s: match[2], l: match[3] }
    }
    if ((match = this.matchers.hsla.exec(color))) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] }
    }
    if ((match = this.matchers.hsv.exec(color))) {
      return { h: match[1], s: match[2], v: match[3] }
    }
    if ((match = this.matchers.hsva.exec(color))) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] }
    }
    if ((match = this.matchers.hex8.exec(color))) {
      return {
        r: this.parseIntFromHex(match[1]),
        g: this.parseIntFromHex(match[2]),
        b: this.parseIntFromHex(match[3]),
        a: this.convertHexToDecimal(match[4]),
        format: named ? 'name' : 'hex8',
      }
    }
    if ((match = this.matchers.hex6.exec(color))) {
      return {
        r: this.parseIntFromHex(match[1]),
        g: this.parseIntFromHex(match[2]),
        b: this.parseIntFromHex(match[3]),
        format: named ? 'name' : 'hex',
      }
    }
    if ((match = this.matchers.hex4.exec(color))) {
      return {
        r: this.parseIntFromHex(match[1] + '' + match[1]),
        g: this.parseIntFromHex(match[2] + '' + match[2]),
        b: this.parseIntFromHex(match[3] + '' + match[3]),
        a: this.convertHexToDecimal(match[4] + '' + match[4]),
        format: named ? 'name' : 'hex8',
      }
    }
    if ((match = this.matchers.hex3.exec(color))) {
      return {
        r: this.parseIntFromHex(match[1] + '' + match[1]),
        g: this.parseIntFromHex(match[2] + '' + match[2]),
        b: this.parseIntFromHex(match[3] + '' + match[3]),
        format: named ? 'name' : 'hex',
      }
    }
    return false
  }

  private static validateWCAG2Parms(parms?: any) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size
    parms = parms || { level: 'AA', size: 'small' }
    level = (parms.level || 'AA').toUpperCase()
    size = (parms.size || 'small').toLowerCase()
    if (level !== 'AA' && level !== 'AAA') {
      level = 'AA'
    }
    if (size !== 'small' && size !== 'large') {
      size = 'small'
    }
    return { level: level, size: size }
  }
}
