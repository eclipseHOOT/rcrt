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
    document.title = this.spa_text.FinancialName;
    this.getList();
  },
  mounted: function() {
    this.pullUp();
  },
  methods: {
    getList: function() {
      var $__3 = this;
      var data = {
        page: this.page,
        row: "10"
      };
      var cid = common._parseUrl('cid');
      cid && (data['industry_id'] = cid);
      this.$axios.postList('goods/index', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__3.dataList = ($__3.page == 1) ? res.data.data : $__3.dataList.concat(res.data.data);
          $__3.page++;
        }
      });
    },
    getPic: function(pic) {
      return ("background: url(\"" + pic + "\") 50% 50% / cover no-repeat;height:8rem");
    },
    goToDetail: function(id) {
      location.href = ("businessDetail.html?id=" + id);
    },
    pullUp: function() {
      var self = this;
      plugin.pullUpRefresh(false, 40, function() {
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
