"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    cancelorder: Cancelorder,
    loadmore: Loadmore
  },
  data: {
    dataList: [],
    page: 1,
    showCancel: false,
    orderid: -1,
    goodState: 0,
    spa_text: {},
    oneObj: {},
    oneIndex: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.myOrder;
    this.getList(0);
  },
  mounted: function() {
    this.pullUp();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  methods: {
    getList: function() {
      var goodState = arguments[0] !== (void 0) ? arguments[0] : 0;
      var $__3 = this;
      if (goodState != this.goodState) {
        this.dataList = [];
        this.page = 1;
        window.scrollTo(0, 0);
      }
      this.goodState = goodState;
      var data = {
        page: this.page,
        list_rows: '10',
        status: goodState
      };
      this.$axios.postList('shoporder/index', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        } else {
          console.log(res.msg);
        }
      });
    },
    getStatus: function() {
      var status = arguments[0] !== (void 0) ? arguments[0] : 0;
      var statusCode = {
        1: this.spa_text.OrderStatus1,
        2: this.spa_text.OrderStatus2,
        3: this.spa_text.OrderStatus3,
        4: this.spa_text.OrderStatus4,
        5: this.spa_text.OrderStatus0
      };
      return statusCode[status];
    },
    goToOrderDetail: function(orderid) {
      location.href = ("myGoodOrderDetail.html?orderid=" + orderid);
    },
    showSH: function(obj, index) {
      this.oneObj = obj;
      this.oneIndex = index;
      myalert._confirm({
        myClass: "confirmLayer ft2 wrapper size1",
        content: ("<p class='title'><strong>" + this.spa_text.tip + "</strong></p>\n\t\t\t\t      <p class='subtitle'>" + this.spa_text.collectConform + "</p>\n\t\t\t\t      <p class='my-col-50  button no' id='_confirmClose'>" + this.spa_text.no + "</p>\n\t\t\t\t      <p class='my-col-50  button' onclick='vm.handleOrder()'>" + this.spa_text.yes + "</p>")
      });
    },
    handleOrder: function() {
      var $__3 = this;
      var data = {
        id: this.oneObj.id,
        status_id: 4
      };
      this.$axios.post('shoporder/up_status', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            myalert._closeConfirm();
            $__3.oneObj['status_id'] = 4;
            $__3.dataList.splice($__3.oneIndex, 1, $__3.oneObj);
          });
        } else {
          myalert._msg(res.msg, 1, function() {
            location.reload();
          });
        }
      });
    },
    openModel: function(obj, index) {
      this.showCancel = true;
      this.oneObj = obj;
      this.oneIndex = index;
    },
    domOrder: function() {
      var $__3 = this;
      var data = {
        id: this.cancelObj.id,
        status_id: 5
      };
      this.$axios.post('shoporder/up_status', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            $__3.cancelObj['status_id'] = 5;
            $__3.dataList.splice($__3.cancelIndex, 1, $__3.cancelObj);
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    },
    pullUp: function() {
      var self = this;
      plugin.pullUpRefresh(document.querySelector("#list"), 40, function() {
        var $__3 = this;
        var timer = setTimeout(function() {
          if (window.scrollY == 0) {
            $__3.back.call();
            self.page = 1;
            clearTimeout(timer);
            self.getList(self.goodState);
          }
        }, 1000);
      });
    }
  }
});
