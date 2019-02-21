"use strict";
var Myassets = {
  template: "\n\t\t<article class=\"my_head  textC\">\n\t\t      <div class=\"my-col-50 left\">\n\t\t          <p class=\"ft9 title\" >RCRT</p>\n\t\t          <p class=\"size2 ftF\"><strong>{{$attrs.available}}</strong></p>\n\t\t      </div>\n\t\t      <div class=\"my-col-50\">\n\t\t          <p class=\"ft9 title\" v-text=\"this.langText[this.lang] +'RCRT'\">冻结RCRT</p>\n\t\t          <p class=\"size2 ftF\"><strong>{{$attrs.freezing}}</strong></p>\n\t\t      </div>\n\t\t</article>\n\t",
  inheritAttrs: false,
  data: function() {
    return {
      langText: {},
      lang: stroage.read('lang') || 'zh-cn',
      langText: {
        'zh-cn': '已冻结',
        'en-us': 'Frozen',
        'ko-kr': '이미 동결되었다',
        'th-th': 'ที่ได้รับการแช่แข็ง',
        'ja-jp': '冷凍'
      }
    };
  }
};
