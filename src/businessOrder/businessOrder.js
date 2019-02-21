"use strict";
var vm = new Vue({
  el: '#index',
  components: {loadmore: Loadmore},
  data: {
    dataList: [],
    page: 1,
    orderid: -1,
    goodState: 0,
    spa_text: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.BusinessOrder;
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
      this.$axios.postList('shoporder/shop_index', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        }
      });
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
    goodPic: function(pic) {
      return ("background: url('" + pic + "') 50% 50% / contain no-repeat;border:1px solid #f1f1f1;height:7rem;box-sizing: border-box;");
    },
    goToOrderDetail: function(orderid) {
      location.href = ("businessGoodOrderDetail.html?orderid=" + orderid);
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
