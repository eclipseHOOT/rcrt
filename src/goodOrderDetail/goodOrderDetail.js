"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    keyboard: Keyboard,
    goodinfo: Goodinfo
  },
  data: {
    goodDetails: {},
    myInfo: {
      user_id: 0,
      currency_id: 0,
      balance: 0,
      freezing: 0,
      available: 0,
      wallet_address: ""
    },
    myPic: '',
    num: 0,
    goodPrice: 0,
    store_count: 0,
    alltotal: 0,
    hasAddrType: false,
    addrDetail: {},
    spec: '',
    remark: '',
    spa_text: {},
    rdccmarket: 1,
    submitModel: false,
    pay_pwd: '',
    orderId: 0,
    keyboardModel: false,
    userInfo: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.ConfirmOrder;
    this.id = common._parseUrl('id') - 0;
    this.num = common._parseUrl('num') - 0;
    this.getMoRenAddr();
    this.getGoodDetail();
    this.getMyInfo();
  },
  watch: {num: function(val) {
      this.alltotal = parseFloat(this.goodPrice * val).toFixed(2);
    }},
  methods: {
    getMoRenAddr: function() {
      var $__3 = this;
      if (stroage.read('addrObj')) {
        this.hasAddrType = true;
        this.addrDetail = stroage.read('addrObj');
      } else {
        this.$axios.post('address/get_auto').then(function(res) {
          if (res && res.code == 0) {
            if (res.data) {
              $__3.hasAddrType = true;
              $__3.addrDetail = res.data;
            } else {
              $__3.hasAddrType = false;
            }
          }
        });
      }
    },
    getGoodDetail: function() {
      var $__3 = this;
      var data = {id: this.id};
      this.$axios.post('goods/detail', data).then(function(res) {
        var $__4,
            $__5,
            $__6,
            $__7,
            $__8,
            $__9;
        if (res && res.code == 0) {
          ($__4 = [res.data, [res.data.price, res.data.number, res.data.quotation]], $__3.goodDetails = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), ($__7 = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.goodPrice = ($__8 = $__7[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value), $__3.store_count = ($__9 = $__8.next()).done ? void 0 : $__9.value, $__3.rdccmarket = ($__9 = $__8.next()).done ? void 0 : $__9.value, $__7), $__4);
          $__3.alltotal = parseFloat($__3.goodPrice * $__3.num).toFixed(2);
          $__3.myPic = ("background: url('" + $__3.goodDetails.cover + "') 50% 50% / cover no-repeat;height: 6.5rem;");
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back(-1);
          });
        }
      });
    },
    incNum: function() {
      if (this.num < this.store_count) {
        this.num += 1;
      }
    },
    decNum: function() {
      if (this.num > 1) {
        this.num -= 1;
      }
    },
    openModel: function() {
      var money = arguments[0] !== (void 0) ? arguments[0] : 0;
      if (this.goodDetails.shopinfo.owner == this.userInfo.id) {
        myalert._msg('您不能购买自己的商铺商品哦~', 2);
        return false;
      }
      if (!this.addrDetail.id) {
        myalert._msg(this.spa_text.selectAddress, 2);
        return false;
      }
      if (money - 0 > this.myInfo.available - 0) {
        myalert._msg(this.spa_text.insufficientBalance, 2);
        return false;
      }
      common._formMask();
      this.submitModel = true;
      this.submitOrder();
    },
    closeModel: function() {
      location.href = ("myGoodOrderDetail.html?orderid=" + this.orderId);
    },
    getMyInfo: function() {
      var $__3 = this;
      var data = {'currency_id': 1};
      this.$axios.post('user/getBalance', data).then(function(res) {
        res && res.code == 0 && res.data && ($__3.myInfo = res.data);
      });
      this.$axios.post('user/getUserInfo').then(function(res) {
        res && res.code == 0 && res.data && ($__3.userInfo = res.data);
      });
    },
    submitOrder: function() {
      var $__3 = this;
      var data = {
        id: this.id,
        number: this.num,
        address_id: this.addrDetail.id,
        remark: this.remark
      };
      this.$axios.post('shoporder/add_order', data).then(function(res) {
        if (res && res.code == 0) {
          $__3.orderId = res.data.order_id;
        } else {
          myalert._msg(res.msg, 2);
        }
      });
    },
    openPasswordModel: function() {
      this.submitModel = false;
      this.keyboardModel = !this.keyboardModel;
    },
    payMoney: function(password) {
      this.pay_pwd = password;
      var data = {
        id: this.orderId,
        pay_pwd: this.pay_pwd
      };
      this.$axios.post('shoporder/pay_order', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 2, function() {
            location.href = ("myGoodOrderDetail.html?&orderid=" + res.data.id);
          });
        } else {
          myalert._msg(res.msg, 2, function() {
            common._formMask();
          });
        }
      });
    }
  }
});
