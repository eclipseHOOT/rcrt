"use strict";
var vm = new Vue({
  el: '#index',
  components: {loadmore: Loadmore},
  data: {
    dataList: [],
    page: 1,
    tradType: 1,
    dollar: 1,
    spa_text: {},
    symbol: '￥',
    coinName: 'RCRT'
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.depute;
    this.getList();
    this.getHL();
  },
  mounted: function() {
    this.pullUp();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  methods: {
    getList: function() {
      var $__3 = this;
      var data = {'page': this.page};
      this.$axios.postList('c2c/entrust', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        }
      });
    },
    getStatus: function() {
      var status = arguments[0] !== (void 0) ? arguments[0] : 0;
      var statusType = {
        1: this.spa_text.PUT_UP,
        2: this.spa_text.Wait_Pay,
        3: this.spa_text.Wait_Gather,
        5: this.spa_text.COMPLETED,
        6: this.spa_text.FROZEN,
        7: this.spa_text.underReview,
        0: this.spa_text.Order_Fail
      };
      return statusType[status] || this.spa_text.Order_Fail;
    },
    cancelOrder: function(id, index) {
      myalert._confirm({
        myClass: "confirmLayer wrapper ft2",
        content: ("<p class='size1 title'><strong>" + this.spa_text.tip + "</strong></p>\n\t\t\t\t      <p class='subtitle'>" + this.spa_text.Cancel_Order + "</p>\n\t\t\t\t      <p class='my-col-50  button size000 no' id='_confirmClose'>" + this.spa_text.no + "</p>\n\t\t\t\t      <p class='my-col-50  button size000' onclick='vm.handleOrder(" + id + "," + index + ")'>" + this.spa_text.yes + "</p>")
      });
    },
    handleOrder: function(id, index) {
      var $__3 = this;
      this.$axios.post('c2c/cancel', {id: id}).then(function(res) {
        myalert._msg(res.msg, 2, function() {
          $__3.dataList.splice(index, 1);
          myalert._closeConfirm();
        });
      });
    },
    goToDetail: function(type, status, id) {
      if (type == 2 && (status == 1 || status == 2)) {
        return false;
      }
      if (type == 1 && status == 1) {
        return false;
      }
      var hlId = common._parseUrl('hlId');
      location.href = ("orderdetail.html?id=" + id + "&hlId=" + hlId);
    },
    pullUp: function() {
      var self = this;
      plugin.pullUpRefresh(document.querySelector("#list"), 40, function() {
        var $__3 = this;
        var timer = setTimeout(function() {
          if (window.scrollY == 0) {
            $__3.back.call();
            self.dataList = [];
            self.page = 1;
            clearTimeout(timer);
            self.getList();
          }
        }, 1000);
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
