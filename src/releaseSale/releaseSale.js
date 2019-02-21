"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    keyboard: Keyboard,
    myassets: Myassets
  },
  data: {
    currentMoney: 0,
    currentService: {},
    gatherAddr: {},
    num: 100,
    money: 0,
    pay: [],
    pay_pwd: '',
    spa_text: {},
    myInfo: {
      available: 0,
      freezing: 0
    },
    minNum: 0,
    keyboardModel: false,
    dollar: 1,
    symbol: '￥'
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.Sell;
    this.getIndexInfo();
    this.getMyInfo();
    this.getServiceData();
    this.getHL();
  },
  methods: {
    getNum: function() {
      var x = this.num + "";
      if (x.includes('.')) {
        var x1 = x.split('.');
        if (x1.length > 1) {
          var x2 = x1[1] + "";
          if (x2.length > 2) {
            this.num = Math.floor(this.num * 100) / 100;
          }
        }
      }
    },
    getMyInfo: function() {
      var $__3 = this;
      var data = {'currency_id': 1};
      this.$axios.post('user/getBalance', data).then(function(res) {
        res && res.code == 0 && res.data && ($__3.myInfo = res.data);
      });
    },
    getIndexInfo: function() {
      var $__3 = this;
      this.$axios.post('common/get_quotation', {id: 1}).then(function(res) {
        res && res.code == 0 && ($__3.money = $__3.currentMoney = res.data);
      });
      this.$axios.post('user/getPayInfo').then(function(res) {
        res && res.code == 0 && ($__3.gatherAddr = res.data);
      });
    },
    selectGather: function() {
      var method = arguments[0] !== (void 0) ? arguments[0] : "alipay";
      if (this.pay.includes(method)) {
        var index = this.pay.indexOf(method);
        this.pay.splice(index, 1);
      } else {
        this.pay.push(method);
      }
    },
    openModel: function() {
      if (this.pay.length <= 0) {
        myalert._msg(this.spa_text.PUBLISHED_RULE1, 1);
        return false;
      }
      if (this.num - 0 < this.minNum - 0) {
        myalert._msg(this.spa_text.PUBLISHED_RULE3 + this.minNum, 2);
        return false;
      }
      this.keyboardModel = !this.keyboardModel;
    },
    submit: function(password) {
      this.pay_pwd = password;
      var data = {
        type: 2,
        num: this.num,
        money: this.money,
        pay: this.pay,
        pay_pwd: this.pay_pwd
      };
      this.$axios.post('c2c/add', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            webview._goBack();
          });
        } else {
          myalert._msg(res.msg, 1, function() {
            common._formMask();
          });
        }
      });
    },
    getServiceData: function() {
      var $__3 = this;
      this.$axios.post('common/getConfig').then(function(res) {
        if (res && res.code == 0) {
          $__3.currentService = res.data.pay_rdcc_fee;
          $__3.minNum = res.data.min_charge_key;
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    },
    getHL: function() {
      var $__3 = this;
      var id = common._parseUrl('hlId');
      if (!id) {
        return;
      }
      this.$axios.post('common/getTenderCategory').then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res.code == 0) {
          var rate = res.data.data;
          for (var i in rate) {
            if (rate[i].id == id) {
              ($__4 = [rate[i].short, rate[i].quotation], $__3.symbol = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.dollar = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
              break;
            }
          }
        }
      });
    }
  }
});
