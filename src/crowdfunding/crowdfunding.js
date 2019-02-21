"use strict";
function loadingInfo() {
  var lang = arguments[0] !== (void 0) ? arguments[0] : "zh-cn";
  vm.page = 1;
  vm.getList();
  stroage.write('lang', lang);
  vm.spa_text = language._text();
  document.title = vm.spa_text.Crowdfund;
}
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
    document.title = this.spa_text.Crowdfund;
    this.getList();
  },
  mounted: function() {
    this.pullUp();
  },
  methods: {
    getPic: function(pic) {
      return ("background: url(\"" + pic + "\") 50% 50% / cover no-repeat;height:12rem;");
    },
    getList: function() {
      var $__3 = this;
      var data = {page: this.page};
      this.$axios.postList('crowdfunding/getlist', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        } else {
          console.log(res.msg);
        }
      });
    },
    getClass: function(end, start) {
      var time = new Date(end * 1000) - new Date();
      if (start * 1000 > new Date().getTime()) {
        return 'background: #f3a214';
      }
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return 'background: linear-gradient(to right,#299E84,#46C4A8);';
      }
      if (end * 1000 < new Date().getTime()) {
        return 'background: #989fa9';
      }
    },
    getStatus: function(end, start) {
      var Willbegin = this.spa_text.Willbegin,
          processing = this.spa_text.processing,
          suover = this.spa_text.suover,
          faover = this.spa_text.faover,
          time = new Date(end * 1000) - new Date();
      if (start * 1000 > new Date().getTime()) {
        return Willbegin;
      }
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return processing;
      }
      if (end * 1000 < new Date().getTime()) {
        return suover;
      }
    },
    getPadding: function() {
      var myLoad = arguments[0] !== (void 0) ? arguments[0] : 0;
      return myLoad > 100 ? 'padding-left:100%' : ("padding-left:" + myLoad + "%");
    },
    getLoading: function() {
      var raised = arguments[0] !== (void 0) ? arguments[0] : 0;
      var target = arguments[1] !== (void 0) ? arguments[1] : 0;
      if (target - 0 == 0) {
        return 0.00;
      }
      if ((raised / target) * 100 > 100) {
        return 100.00;
      } else {
        return parseFloat((raised / target) * 100).toFixed(2);
      }
    },
    getDayTime: function(end, start) {
      if (start * 1000 - new Date().getTime() > 0) {
        return this.spa_text.Willbegin;
      }
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
            self.getList();
          }
        }, 1000);
      });
    }
  }
});
