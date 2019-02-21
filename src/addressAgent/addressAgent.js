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
    document.title = this.spa_text.ADDRESSAGNET;
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
        location.href = 'addressAdd.html';
      } else {
        myalert._msg('抱歉，收货地址不能超过5条', 1);
      }
    },
    changeMoRen: function(id) {
      var $__3 = this;
      var data = {id: id};
      this.$axios.post('address/set_auto', data).then(function(res) {
        if (res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            $__3.getList();
          });
        }
      });
    },
    editAdr: function(id) {
      location.href = ("addressAdd.html?id=" + id);
    },
    delAdr: function(id, index) {
      myalert._confirm({
        myClass: "confirmLayer ftF wrapper size1",
        content: ("<p class='title'><strong>" + this.spa_text.tip + "</strong></p>\n\t\t\t\t      <p class='size1 subtitle'>" + this.spa_text.DELADDRESS + "</p>\n\t\t\t\t      <p class='my-col-50  button no' id='_confirmClose'>" + this.spa_text.no + "</p>\n\t\t\t\t      <p class='my-col-50  button' onclick='vm.handleOrder(" + id + "," + index + ")'>" + this.spa_text.yes + "</p>")
      });
    },
    handleOrder: function(id, index) {
      var $__3 = this;
      var data = {id: id};
      this.$axios.post('address/del', data).then(function(res) {
        if (res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            $__3.dataList.splice(index, 1);
            myalert._closeConfirm();
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    }
  }
});
