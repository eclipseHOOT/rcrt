"use strict";
var vm = new Vue({
  el: '#index',
  components: {callphone: Callphone},
  data: {
    goodDetails: {
      price: 1,
      quotation: 1
    },
    businessInfo: {},
    myPic: '',
    layerPic: '',
    goodPrice: 0,
    id: common._parseUrl('id'),
    sid: common._parseUrl('sid'),
    model: false,
    myAddress: '',
    spa_text: {},
    store_count: 0,
    num: 1,
    callPhoneModel: false
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.GoodDetail;
    this.getGoodDetail();
  },
  methods: {
    getGoodDetail: function() {
      var $__3 = this;
      var data = {id: this.id};
      this.$axios.post('goods/detail', data).then(function(res) {
        var $__4,
            $__5,
            $__6,
            $__7,
            $__8,
            $__9,
            $__10;
        if (res && res.code == 0) {
          ($__4 = [res.data, [res.data.price, res.data.shopinfo, res.data.number]], $__3.goodDetails = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), ($__7 = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.goodPrice = ($__8 = $__7[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value), $__3.businessInfo = ($__9 = $__8.next()).done ? void 0 : $__9.value, $__3.store_count = ($__10 = ($__9 = $__8.next()).done ? void 0 : $__9.value) === void 0 ? 1 : $__10, $__7), $__4);
          $__3.myPic = ("background: url('" + res.data.cover + "') 50% 50% / cover no-repeat;height: 20rem;width:100%");
          $__3.layerPic = ("background: url('" + res.data.cover + "') 50% 50% / cover no-repeat;height: 6.5rem;margin: 5% 0;");
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back(-1);
          });
        }
      });
    },
    goToMap: function(longitude, latitude) {
      if (!stroage.read('lang') || stroage.read('lang') == "zh-cn") {
        webview._goToMap(longitude, latitude);
      }
    },
    openModel: function() {
      this.model = true;
      common._formMask();
    },
    closeModel: function() {
      this.model = false;
      common._removeMask();
    },
    incNum: function() {
      (this.num < this.store_count) && (this.num += 1);
    },
    decNum: function() {
      (this.num > 1) && (this.num -= 1);
    },
    goToBusiness: function(sid) {
      location.href = ("businessInfo.html?sid=" + sid);
    },
    submitOrder: function() {
      if (this.store_count == 0) {
        myalert._msg(this.spa_text.goodIsError, 1);
      } else {
        stroage.remove('addrObj');
        location.href = ("goodOrderDetail.html?id=" + this.id + "&num=" + this.num + "&goodPrice=" + this.goodPrice);
      }
    }
  }
});
