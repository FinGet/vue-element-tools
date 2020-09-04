<template>
  <el-input
    :maxlength="maxlength"
    :value="value"
    :placeholder="innerPlaceholder"
    @keydown.native="onkeydown"
    @input="changeValue"
    :size="size"
    :clearable="clearable"
    :disabled="disabled"
    @blur="blur"
  >
    <template
      v-if="append"
      slot="append"
    >{{ append }}</template>
  </el-input>
</template>
<script>

  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      size: {
        type: String,
        default: ''
      },
      clearable: {
        type: Boolean,
        default: true
      },
      intlength: {
        type: Number,
        default: 10
      },
      decimallength: {
        type: Number,
        default: 2
      },
      isDecimal: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: ''
      },
      // 是否允许为0 默认允许
      isCanZero: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      append: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isZeroStart: {
        type: Boolean,
        default: false
      },
      blurFn: Boolean
    },
    data () {
      return {
        oldValue: ''
      };
    },
    computed: {
      maxlength () {
        return this.isDecimal ? this.intlength + this.decimallength + 1 : this.intlength;
      },
      innerPlaceholder () {
        return this.placeholder ? this.placeholder : (this.isDecimal ? this.intlength + '位整数,' + this.decimallength + '位小数' : this.intlength + '位整数');
      }
    },
    created () {
      let _reg = '';
      let _decimalReg = '';
      let _int = parseInt(this.intlength);
      let _decimal = parseInt(this.decimallength);

      if (this.isZeroStart) {
        _reg = new RegExp('(^([0-9](\\d{1,' + (_int - 1) + '})?)$)|(^0$)');
      } else {
        _reg = new RegExp('(^([1-9](\\d{1,' + (_int - 1) + '})?)$)|(^0$)');
      }

      if (this.isDecimal) {
        _decimalReg = new RegExp('(^([1-9](\\d{1,' + (_int - 1) + '})?)?(\\.?|(\\.\\d{1,' + _decimal + '})?)$)|(^0$)|(^0(\\.?|\\.\\d{1,' + _decimal + '})$)');
      }
      this._reg = _reg;
      this._decimalReg = _decimalReg;
    },
    methods: {
      changeValue (e) {
        this.oldValue = this.value;
        this.innerValue = e;
        if (this.isDecimal) {
          if (this.innerValue && !this._reg.test(this.innerValue) && !this._decimalReg.test(this.innerValue)) {
            /* this.$nextTick(() => {
						this.innerValue = this.oldValue;
					}); */
            this.innerValue = this.oldValue;
          }
        } else {
          if (this.innerValue && !this._reg.test(this.innerValue)) {
            /* this.$nextTick(() => {
						this.innerValue = this.oldValue;
					}); */
            this.innerValue = this.oldValue;
          }
        }
        if (!this.isCanZero && this.innerValue == '0') {
          this.innerValue = '1';
        }
        if (this.innerValue.length > 0 && this.innerValue.indexOf('.') == 0) {
          this.innerValue = '0' + this.innerValue;
        }
        if (!this.isZeroStart) {
          if (!this.isDecimal && this.innerValue.length > 1 && this.innerValue.indexOf('0') == 0) {
            this.innerValue = this.innerValue.substr(1);
          }
        }
        this.$emit('change', this.innerValue);
      },
      onkeydown (event) {
        this.oldValue = this.value;
        // 输入必须是 0-9 或者 .
        let _code = event.charCode || event.keyCode;
        let _isMetaKey = event.metaKey;
        let _isCtrlKey = event.ctrlKey;

        // 只允许数字 退格 ctrl+c。允许出现小数的时候出现还允许.(keycode=190) TODO 全角半角判断
        if (!(((_code == 67 || _code == 86) && (_isMetaKey || _isCtrlKey)) || (_code >= 48 && _code <= 57) || (_code >= 96 && _code <= 105) || _code == 8 || (_code == 190 && this.isDecimal) || (_code == 37 || _code == 39 || _code == 9 || _code == 110 || _code == 144))) {
          event.preventDefault();
        }
      },
      blur () {
        if (this.blurFn) {
          this.$emit('blur');
        }
      }
    }
  };
</script>
<style lang="less" scoped>

</style>
