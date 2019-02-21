"use strict";
var vm = new Vue({
  el: '#index',
  components: {loadmore: Loadmore},
  data: {
    dataList: [],
    page: 1,
    spa_text: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.IAmInvolved;
    this.getList();
  },
  mounted: function() {
    this.pullUp();
  },
  methods: {
    getList: function() {
      var $__3 = this;
      var data = {'page': this.page};
      this.$axios.postList('crowdfunding/mylist', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        }
      });
    },
    getBack: function(end, start) {
      var time = new Date(end * 1000) - new Date();
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return 'background: url(img/status1.png) no-repeat; background-size: 100% 100%;';
      }
      if (start * 1000 > new Date().getTime()) {
        return 'background: url(img/status4.png) no-repeat; background-size: 100% 100%;';
      }
      if (end * 1000 < new Date().getTime()) {
        return 'background: url(img/status3.png) no-repeat; background-size: 100% 100%;';
      }
    },
    getStatus: function() {
      var status = arguments[0] !== (void 0) ? arguments[0] : 2;
      var statusType = {
        0: this.spa_text.processing,
        1: this.spa_text.suover,
        2: this.spa_text.faover,
        3: this.spa_text.Willbegin
      };
      return statusType[status] || this.spa_text.Willbegin;
    },
    getDayTime: function(end) {
      var time = new Date(end * 1000) - new Date();
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return Math.ceil(time / (1000 * 60 * 60 * 24)) + this.spa_text.EndDay;
      } else {
        return this.spa_text.CrowdfundEndTime;
      }
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
