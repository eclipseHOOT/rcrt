"use strict";
function loadingInfo() {
  var lang = arguments[0] !== (void 0) ? arguments[0] : "zh-cn";
  var noData = document.querySelector('#noData');
  var noDataShoe = {
    "zh-cn": '亲，已经没有更多数据啦~',
    'en-us': 'No more data.',
    "ko-kr": '네, 이미 많은 데이터가 없습니다.',
    "th-th": 'โปรไม่มีข้อมูลเพิ่มเติม . . . . . . .',
    "ja-jp": '親、もう多くのデータがありません。'
  };
  noData.innerHTML = noDataShoe[lang] || '亲，已经没有更多数据啦~';
  vm.page = 1;
  vm.getList();
  vm.getRdccMarket();
  stroage.write('lang', lang);
  vm.spa_text = language._text();
  document.title = vm.spa_text.FinancialName;
}
var vm = new Vue({
  el: '#index',
  components: {loadmore: Loadmore},
  data: {
    dataList: [],
    page: 1,
    myFocus: true,
    key: '',
    spa_text: {},
    rdccmarket: 0
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.FinancialName;
    this.getList();
    this.getRdccMarket();
  },
  mounted: function() {
    this.pullUp();
  },
  watch: {key: function(nVal, oVal) {
      this.myFocus = !nVal ? true : false;
    }},
  methods: {
    getList: function() {
      var $__2 = this;
      var data = {
        page: this.page,
        list_rows: 8
      };
      this.key && (data.keyword = this.key);
      this.$axios.postList('goods/index', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__2.dataList = ($__2.page == 1) ? res.data.data : $__2.dataList.concat(res.data.data);
          $__2.page++;
        }
      });
    },
    getRdccMarket: function() {
      var $__2 = this;
      var data = {id: 1};
      this.$axios.post('common/get_quotation', data).then(function(res) {
        res && res.code == 0 && ($__2.rdccmarket = res.data);
      });
    },
    getPic: function(pic) {
      return ("background: url('" + pic + "') 50% 50% / cover no-repeat;height:6.5rem");
    },
    goToDetail: function(id) {
      webview._goOther(("businessDetail.html?id=" + id));
    },
    pullUp: function() {
      var self = this;
      plugin.pullUpRefresh(document.querySelector("#list"), 40, function() {
        var $__2 = this;
        var timer = setTimeout(function() {
          if (window.scrollY == 0) {
            $__2.back.call();
            self.page = 1;
            clearTimeout(timer);
            self.getList();
          }
        }, 1000);
      });
    }
  }
});
