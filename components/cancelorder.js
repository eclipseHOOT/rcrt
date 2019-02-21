"use strict";
var Cancelorder = {
  template: "\n\t\t<article class=\"my_cancel_order backF textC ft2 size000\" >\n \t \t \t  <div class=\"my-col-100 title\">\n \t \t \t  \t<p class=\"my-col-20 size1\" @click=\"closeTip()\"><strong>{{this.langText[1][this.lang]}}</strong></p>\n \t \t \t    <p class=\"my-col-60 ftA\">{{this.langText[0][this.lang]}}</p>\n \t \t \t    <p class=\"my-col-20 size1\" @click=\"domOrder('cancel')\"><strong>{{this.langText[2][this.lang]}}</strong></p>\n \t \t \t  </div>\n \t \t \t  <ul class=\"my_reason ftA backF\">\n \t \t \t  \t<li v-for=\"(list,index) of cancelList\" :key=\"list.id\" :class=\"{'ft2':list.id == selectReasonId}\" @click=\"selectReasonId = list.id\">\n \t \t \t     \t{{list.reason}}\n \t \t \t  \t</li>\n \t \t \t  </ul>\n \t \t </article>\n\t",
  mounted: function() {
    common._formMask();
  },
  data: function() {
    return {
      cancelList: [{
        id: 0,
        reason: '我不想买了'
      }, {
        id: 1,
        reason: '信息填写错误，重新拍'
      }, {
        id: 2,
        reason: '缺货'
      }, {
        id: 3,
        reason: '其他'
      }],
      langText: {},
      selectReasonId: -1,
      lang: stroage.read('lang') || 'zh-cn',
      langText: [{
        'zh-cn': '请选择取消订单的原因',
        'en-us': 'Please select the reason',
        'ko-kr': '주문 취소 이유를 선택하십시오.',
        'th-th': 'กรุณาเลือกเหตุผลในการยกเลิกการสั่งซื้อ',
        'ja-jp': '注文をキャンセルする理由を選択してください'
      }, {
        'zh-cn': '取消',
        'en-us': 'no',
        'ko-kr': '취소',
        'th-th': 'ยกเลิก',
        'ja-jp': '取り消す'
      }, {
        'zh-cn': '确认',
        'en-us': 'yes',
        'ko-kr': '확인',
        'th-th': 'การยืนยัน',
        'ja-jp': '確認'
      }]
    };
  },
  methods: {
    domOrder: function() {
      this.$emit('update:show', false);
      this.$listeners.cancelorder();
    },
    closeTip: function() {
      common._removeMask();
      this.$emit('update:show', false);
    }
  }
};
