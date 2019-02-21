"use strict";
var Callphone = {
  template: "\n\t\t<article class=\"my_call_phone ft2 backF textC  size000\" >\n\t\t\t<div class=\"my-col-100  bold phone\">\n\t\t\t\t<p class=\"my-col-70 left bolds\">{{this.langText[this.lang]}}:&nbsp;&nbsp;&nbsp;{{phone}}</p>\n\t\t\t\t<p class=\"my-col-15 right\"><img src=\"img/close.png\" class=\"roW\"  @click=\"close()\" /></p>\n\t\t\t</div>\n\t\t\t<div class=\"my-col-100 size1 my_layer_button\" >\n\t\t\t\t<a :href=\"'tel:'+phone\" class=\"ftL bolds\">\n\t\t\t\t   拨打\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</article>\n\t",
  props: {phone: {
      type: String,
      default: function() {
        return '对方未输入电话号码';
      }
    }},
  data: function() {
    return {
      langText: {},
      lang: stroage.read('lang') || 'zh-cn',
      langText: {
        'zh-cn': '电话',
        'en-us': 'Phone',
        'ko-kr': '전화',
        'th-th': 'โทรศัพท์',
        'ja-jp': '電話'
      }
    };
  },
  mounted: function() {
    common._formMask();
  },
  methods: {close: function() {
      common._removeMask();
      this.$emit('update:show', false);
    }}
};
