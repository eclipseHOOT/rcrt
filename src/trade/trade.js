"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    keyboard: Keyboard,
    loadmore: Loadmore
  },
  data: {
    dataList: [],
    page: 1,
    odType: 1,
    dollar: 1,
    orderId: 0,
    orderIndex: 0,
    spa_text: {},
    symbol: '￥',
    coinName: 'RCRT',
    pay_pwd: '',
    keyboardModel: false,
    langShowPic: true
  },
  created: function() {
    if (stroage.read('odType')) {
      this.odType = stroage.read('odType');
      stroage.remove('odType');
    }
    this.spa_text = language._text();
    document.title = this.spa_text.TradeLog;
    this.langShowPic = stroage.read('lang');
    if (this.langShowPic == "zh-hk") {
      this.langShowPic = true;
    } else {
      this.langShowPic = false;
    }
    this.getList(this.odType);
  },
  mounted: function() {
    this.pullUp();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  methods: {
    getList: function() {
      var num = arguments[0] !== (void 0) ? arguments[0] : 1;
      var $__3 = this;
      if (this.odType != num) {
        window.scrollTo(0, 0);
        this.dataList = [];
        this.page = 1;
        this.odType = num;
      }
      var data = {'page': this.page};
      var url = "";
      url = this.odType == 1 ? "Entrust/my_entrust" : "Entrust/my_entrust_end";
      this.$axios.postList(url, data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        } else {
          console.log(res.msg);
        }
      });
    },
    getOrderStatus: function(status) {
      var arr = {
        0: this.spa_text.FAIL,
        1: this.spa_text.putIn,
        2: this.spa_text.hasfinished
      };
      return arr[status];
    },
    openKeyboard: function(id, index) {
      this.orderId = id;
      this.orderIndex = index;
      this.keyboardModel = !this.keyboardModel;
    },
    openModel: function() {
      this.keyboardModel = !this.keyboardModel;
    },
    cancelOrder: function(password) {
      var $__3 = this;
      var data = {
        id: this.orderId,
        pay_pwd: password
      };
      this.$axios.post('Entrust/remove', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            $__3.keyboardModel = !$__3.keyboardModel;
            $__3.dataList.splice($__3.orderIndex, 1);
          });
        } else {
          myalert._msg(res.msg, 1, function() {
            common._formMask();
          });
        }
      });
    },
    pullUp: function() {
      var $__3 = this;
      var self = this;
      plugin.pullUpRefresh(document.querySelector("#list"), 40, function() {
        var $__3 = this;
        var timer = setTimeout(function() {
          if (window.scrollY == 0) {
            $__3.back.call();
            self.dataList = [];
            self.page = 1;
            clearTimeout(timer);
            self.getList(self.odType);
          }
        }, 1000);
      });
      plugin.goSlipping(this, 'odType', function(type) {
        $__3.dataList = [];
        $__3.page = 1;
        $__3.getList(type);
      });
    }
  }
});
