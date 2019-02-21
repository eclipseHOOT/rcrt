"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    callphone: Callphone,
    goodinfo: Goodinfo
  },
  data: {
    id: 0,
    myInfoDetails: {goods: []},
    myGoodDetails: {},
    myAddressDetails: {},
    expressInfo: {},
    myPic: '',
    spa_text: {},
    showPhone: false,
    cancelTime: true,
    deliveryTime: true,
    remainTime: '',
    remainDelliveryTime: '',
    express_company: '',
    express_no: '',
    intervalid: ''
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.GoodOrderDetail;
    this.id = common._parseUrl('orderid') - 0;
    this.getmyGoodDetail();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  beforeDestory: function() {
    clearInterval(this.intervalid);
  },
  methods: {
    getmyGoodDetail: function() {
      var $__3 = this;
      var data = {id: this.id};
      this.$axios.post('shoporder/detail', data).then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res && res.code == 0) {
          ($__4 = [res.data, res.data.userinfo, res.data.goods[0], res.data.express_info[0]], $__3.myInfoDetails = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.myAddressDetails = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.myGoodDetails = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.expressInfo = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
          $__3.myPic = ("background: url('" + $__3.myGoodDetails.goods_cover_id + "') 50% 50% / cover no-repeat;border:1px solid #2A2F50;box-sizing: border-box;height: 6.5rem;");
          if ($__3.myInfoDetails.status_id == 1) {
            $__3.getCancelTime(res.data.cancel_time * 1000 - new Date().getTime());
          }
          if ($__3.myInfoDetails.status_id == 3) {
            var time = res.data.receive_time * 1000 - new Date().getTime();
            $__3.remainDelliveryTime = Math.ceil((time / (24 * 1000 * 60 * 60) > 7 ? 7 : time) / (24 * 1000 * 60 * 60)) + $__3.spa_text.day;
          }
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back();
          });
        }
      });
    },
    getTypePic: function() {
      var status = arguments[0] !== (void 0) ? arguments[0] : 5;
      var picType = {
        1: 'img/tradPaying.png',
        2: 'img/tradSendGood.png',
        3: 'img/tradCollectGood.png',
        4: 'img/tradSuccess.png',
        5: 'img/tradClose.png'
      };
      return picType[status];
    },
    getStatus: function() {
      var status = arguments[0] !== (void 0) ? arguments[0] : 5;
      var statusType = {
        1: this.spa_text.OrderStatus1,
        2: this.spa_text.OrderStatus2,
        3: this.spa_text.OrderStatus3,
        4: this.spa_text.OrderStatus4,
        5: this.spa_text.OrderStatus0
      };
      return statusType[status];
    },
    getCancelTime: function() {
      var timestamp = arguments[0] !== (void 0) ? arguments[0] : 0;
      var $__3 = this;
      this.intervalid = setInterval(function() {
        if (timestamp <= 0) {
          $__3.cancelTime = false;
          clearInterval($__3.intervalid);
          return false;
        }
        var paramTime = timestamp / (1000 * 60),
            min = Math.floor(paramTime),
            sec = Math.floor((paramTime - min) * 60);
        if (min < 10) {
          $__3.remainTime = sec < 10 ? ("0" + min + " : 0" + sec) : ("0" + min + " : " + sec);
        } else {
          $__3.remainTime = sec < 10 ? (min + " : 0" + sec) : (min + " : " + sec);
        }
        timestamp = timestamp - 1000;
      }, 1000);
    },
    goToSendGood: function() {
      var data = {
        id: this.id,
        status_id: 3,
        express_company: this.express_company,
        express_no: this.express_no
      };
      this.$axios.post('shoporder/shop_up_status', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            location.reload();
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    }
  }
});
