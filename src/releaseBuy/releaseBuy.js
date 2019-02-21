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
    num: 100,
    money: 10,
    pay_pwd: '',
    spa_text: {},
    myInfo: {
      available: 0,
      freezing: 0
    },
    minNum: 0,
    dollar: 1,
    symbol: '￥',
    keyboardModel: false,
    init: false
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.Buy;
    this.getIndexInfo();
    this.getMyInfo();
    this.getServiceData();
    this.getHL();
  },
  methods: {
    getNum: function(nVal, oVal) {
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
      var mydata = {'currency_id': 1};
      this.$axios.post('user/getBalance', mydata).then(function(res) {
        if (res.code == 0) {
          $__3.myInfo = res.data;
        }
      });
    },
    getIndexInfo: function() {
      var $__3 = this;
      var data = {id: 1};
      this.$axios.post('common/get_quotation', data).then(function(res) {
        if (res.code == 0) {
          $__3.money = $__3.currentMoney = res.data;
        }
      });
    },
    openModel: function() {
      if (this.num - 0 < this.minNum - 0) {
        myalert._msg(this.spa_text.PUBLISHED_RULE5 + this.minNum, 2);
        return false;
      }
      this.keyboardModel = !this.keyboardModel;
    },
    submit: function(password) {
      console.log(password);
      this.pay_pwd = password;
      var data = {
        type: 1,
        num: this.num,
        pay_pwd: this.pay_pwd
      };
      this.$axios.post('c2c/add', data).then(function(res) {
        if (res.code == 0) {
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
        if (res.code == 0) {
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
