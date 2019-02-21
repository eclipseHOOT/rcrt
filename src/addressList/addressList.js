"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    dataList: [],
    page: 1,
    spa_text: {}
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.SelectAddress;
    this.getList();
  },
  methods: {
    getList: function() {
      var $__3 = this;
      this.$axios.post('address/index').then(function(res) {
        if (res.code == 0) {
          $__3.dataList = res.data.data;
        }
      });
    },
    addAddress: function() {
      if (this.dataList.length < 5) {
        location.href = "addressAdd.html";
      } else {
        myalert._msg('抱歉，收货地址不能超过5条', 1);
      }
    },
    selectAddr: function(addrObj) {
      stroage.write('addrObj', addrObj);
      history.back();
    }
  }
});
