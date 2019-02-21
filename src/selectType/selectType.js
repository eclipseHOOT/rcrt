"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    goodList: [],
    spa_text: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.classification;
    this.getList();
  },
  methods: {
    getList: function() {
      var $__3 = this;
      this.$axios.post('common/get_shop_industry').then(function(res) {
        if (res && res.code == 0) {
          $__3.goodList = res.data;
          $__3.goodList.unshift({
            id: 0,
            name: '全部'
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    },
    goToGoodList: function(cid) {
      if (cid) {
        location.href = ("businessList.html?cid=" + cid);
      } else {
        location.href = 'businessList.html';
      }
    }
  }
});
