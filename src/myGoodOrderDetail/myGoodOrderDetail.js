"use strict";
var vm = new Vue({
  el: '#index',
  components: {
    keyboard: Keyboard,
    callphone: Callphone,
    cancelorder: Cancelorder,
    goodinfo: Goodinfo
  },
  data: {
    id: 0,
    myInfoDetails: {goods: []},
    myGoodDetails: {},
    myAddressDetails: {},
    myPic: '',
    showCancel: false,
    password: '',
    spa_text: {},
    showPhone: false,
    cancelTime: true,
    deliveryTime: true,
    remainTime: '',
    remainDelliveryTime: '',
    pay_pwd: '',
    keyboardModel: false,
    intervalid: ''
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.GoodOrderDetail;
    this.id = common._parseUrl('orderid') - 0;
    this.getmyGoodDetail();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  methods: {
    getmyGoodDetail: function() {
      var $__3 = this;
      var data = {id: this.id};
      this.$axios.post('shoporder/detail', data).then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res && res.code == 0) {
          ($__4 = [res.data, res.data.userinfo, res.data.goods[0]], $__3.myInfoDetails = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.myAddressDetails = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.myGoodDetails = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
          $__3.myPic = ("background: url('" + $__3.myGoodDetails.goods_cover_id + "') 50% 50% / cover no-repeat;border:1px solid #2A2F50;box-sizing: border-box;height: 6.5rem;");
          if ($__3.myInfoDetails.status_id == 1) {
            $__3.getCancelTime(res.data.cancel_time * 1000 - new Date().getTime());
          }
          if ($__3.myInfoDetails.status_id == 3) {
            $__3.remainDelliveryTime = Math.ceil((res.data.receive_time * 1000 - new Date().getTime()) / (24 * 1000 * 60 * 60)) + $__3.spa_text.day;
          }
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back();
          });
        }
      });
    },
    getTypePic: function() {
      var code = arguments[0] !== (void 0) ? arguments[0] : 5;
      var picType = {
        1: 'img/tradPaying.png',
        2: 'img/tradSendGood.png',
        3: 'img/tradCollectGood.png',
        4: 'img/tradSuccess.png',
        5: 'img/tradClose.png'
      };
      return picType[code];
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
    domOrder: function(type) {
      var $__3 = this;
      if (type == "cancel") {
        var data = {
          id: this.id,
          status_id: 5
        };
        this.$axios.post('shoporder/up_status', data).then(function(res) {
          if (res && res.code == 0) {
            myalert._msg(res.msg, 1, function() {
              $__3.showCancel = false;
              $__3.myInfoDetails['status_id'] = 5;
            });
          } else {
            myalert._msg(res.msg, 1, function() {
              history.back();
            });
          }
        });
      } else {
        var title = this.spa_text.tip,
            subtitle = this.spa_text.subCancelOrder,
            subSHtitle = this.spa_text.collectConform,
            no = this.spa_text.no,
            yes = this.spa_text.yes;
        if (type == "del") {
          myalert._confirm({
            myClass: "confirmLayer ftF wrapper size1",
            content: ("<p class='title'><strong>" + title + "</strong></p>\n\t\t\t\t\t\t\t      <p class='subtitle'>" + subtitle + "</p>\n\t\t\t\t\t\t\t      <p class='my-col-50  button no' id='_confirmClose'>" + no + "</p>\n\t\t\t\t\t\t\t      <p class='my-col-50  button' onclick='vm.handleOrder(0)'>" + yes + "</p>")
          });
        } else if (type == "shouhuo") {
          myalert._confirm({
            myClass: "confirmLayer ftF wrapper size1",
            content: ("<p class='title'><strong>" + title + "</strong></p>\n\t\t\t\t\t\t      <p class='subtitle'>" + subSHtitle + "</p>\n\t\t\t\t\t\t      <p class='my-col-50  button no' id='_confirmClose'>" + no + "</p>\n\t\t\t\t\t\t      <p class='my-col-50  button' onclick='vm.handleOrder(1)'>" + yes + "</p>")
          });
        }
      }
    },
    handleOrder: function(type) {
      var $__3 = this;
      var data = {id: this.id};
      var url = '';
      if (type == 0) {
        url = 'shoporder/del_order';
      } else if (type == 1) {
        data.status_id = 4;
        url = 'shoporder/up_status';
      }
      this.$axios.post(url, data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            if (type == 0) {
              history.back();
            } else if (type == 1) {
              myalert._closeConfirm();
              $__3.myInfoDetails['status_id'] = 4;
            }
          });
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back();
          });
        }
      });
    },
    getCancelTime: function() {
      var timestamp = arguments[0] !== (void 0) ? arguments[0] : 0;
      var $__3 = this;
      this.intervalid = setInterval(function() {
        if (timestamp <= 0) {
          $__3.cancelTime = false;
          clearInterval($__3.intervalid);
          return false;
        }
        var paramTime = timestamp / (1000 * 60),
            min = Math.floor(paramTime),
            sec = Math.floor((paramTime - min) * 60);
        if (min < 10) {
          $__3.remainTime = sec < 10 ? ("0" + min + " : 0" + sec) : ("0" + min + " : " + sec);
        } else {
          $__3.remainTime = sec < 10 ? (min + " : 0" + sec) : (min + " : " + sec);
        }
        timestamp = timestamp - 1000;
      }, 1000);
    },
    openModel: function() {
      this.keyboardModel = !this.keyboardModel;
    },
    submit: function(password) {
      this.pay_pwd = password;
      var data = {
        id: this.id,
        pay_pwd: this.pay_pwd
      };
      this.$axios.post('shoporder/pay_order', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 2, function() {
            location.href = ("myGoodOrderDetail.html?&orderid=" + res.data.id);
          });
        } else {
          myalert._msg(res.msg, 2, function() {
            common._formMask();
          });
        }
      });
    }
  }
});
