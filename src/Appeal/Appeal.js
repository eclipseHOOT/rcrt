"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    phone: '',
    content: '',
    orderId: '',
    spa_text: {},
    oid: ''
  },
  created: function() {
    this.spa_text = language._text();
    this.orderId = common._parseUrl('id');
    this.oid = common._parseUrl('oid');
    http.delloading();
  },
  methods: {submitConfig: function() {
      var $__3 = this;
      var data = {
        "id": this.orderId,
        "tip": this.content
      };
      this.$axios.post('c2c/frozen', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._confirm({
            myClass: "confirmLayer ft2 wrapper",
            content: ("<p class='size1 title'><strong id='_confirmClose'>" + $__3.spa_text.tip + "</strong></p>\n\t\t\t\t\t        <p class='size1 subtitle'>" + $__3.spa_text.AppealMsg + "</p>\n\t\t\t\t\t        <p class='ft9 button size1'  onclick='window.history.back();'>" + $__3.spa_text.yes + "</p>")
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    }}
});
