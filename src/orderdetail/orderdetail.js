"use strict";
var vm = new Vue({
  el: '#index',
  components: {callphone: Callphone},
  data: {
    orderId: 0,
    orderData: {},
    isConfirmWaitingPay: false,
    remainTime: '',
    orderNumber: '',
    domTime: 0,
    status: -1,
    uploadModel: false,
    dollar: 1,
    spa_text: {},
    showPhone: false,
    callPhone: '',
    userId: '',
    tranList: [],
    frozen: 1,
    frozenTime: '',
    symbol: '￥',
    coinName: 'RCRT',
    intervalid: '',
    intervalid2: '',
    rate: 0,
    loaded: 0,
    source: null,
    bl: null,
    cancelTokens: false
  },
  beforeCreate: function() {
    stroage.remove('labelLayer');
  },
  created: function() {
    this.orderId = common._parseUrl('id');
    if (!this.orderId) {
      myalert._msg('订单不存在', 2, function() {
        history.back();
      });
    }
    this.spa_text = language._text();
    document.title = this.spa_text.TradeDetail;
    moment.lang(common._parseUrl('lang') || stroage.read('lang') || 'zh-cn');
    this.getUserInfo();
    this.getOrderDetail();
    this.getHL();
  },
  beforeDestory: function() {
    this.intervalid && clearInterval(this.intervalid);
    this.intervalid2 && clearInterval(this.intervalid2);
  },
  computed: {isSale: function() {
      if (this.orderData.payid == this.userId) {
        return 1;
      } else if (this.orderData.uid == this.userId) {
        return 2;
      }
    }},
  mounted: function() {
    this.$nextTick(function() {
      webview._checkDevice("voucher");
    });
  },
  filters: {coverTime: function(value) {
      return moment(value * 1000).toNow(true);
    }},
  methods: {
    getUserInfo: function() {
      var $__3 = this;
      this.$axios.post('user/getUserInfo').then(function(res) {
        if (res && res.code == 0) {
          stroage.write('userInfo', res.data);
          $__3.userId = res.data.id;
        }
      });
    },
    getSpaText: function() {
      var code = arguments[0] !== (void 0) ? arguments[0] : 0;
      var spaText = {
        0: this.spa_text.Order_Fail,
        2: this.spa_text.Wait_Pay,
        3: this.spa_text.WaitSellPay,
        5: this.spa_text.COMPLETED,
        6: this.spa_text.Frozen,
        7: this.spa_text.underReview
      };
      return spaText[code];
    },
    getBuySpaText: function() {
      var code = arguments[0] !== (void 0) ? arguments[0] : 0;
      var buySpaText = {
        0: this.spa_text.Order_Fail,
        2: this.spa_text.WaitBuyPay,
        3: this.spa_text.Wait_Gather,
        5: this.spa_text.COMPLETED,
        6: this.spa_text.Frozen,
        7: this.spa_text.underReview
      };
      return buySpaText[code];
    },
    getSeek1Text: function() {
      var code = arguments[0] !== (void 0) ? arguments[0] : 0;
      var seek1Text = {
        0: this.spa_text.Order_Fail,
        2: this.spa_text.WaitBuyPay,
        3: this.spa_text.WaitSellPay,
        5: this.spa_text.COMPLETED,
        6: this.spa_text.Frozen,
        7: this.spa_text.underReview
      };
      return seek1Text[code];
    },
    getSeek2Text: function() {
      var code = arguments[0] !== (void 0) ? arguments[0] : 0;
      var seek2Text = {
        0: this.spa_text.Order_Fail,
        2: this.spa_text.WaitBuyPay,
        3: this.spa_text.Wait_Gather,
        5: this.spa_text.COMPLETED,
        6: this.spa_text.Frozen,
        7: this.spa_text.underReview
      };
      return seek2Text[code];
    },
    getOrderDetail: function() {
      var $__3 = this;
      var data = {id: this.orderId};
      this.$axios.post('c2c/getDet', data).then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res && res.code == 0) {
          ($__4 = [res.data.info, res.data.tips.reverse()], $__3.orderData = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.tranList = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
          var now = new Date().getTime();
          if ($__3.orderData.code == 2) {
            $__3.getDomTime(Math.floor(($__3.orderData.action_time * 1000 - now) / 1000));
          } else if ($__3.orderData.code == 3) {
            $__3.getFrozenTime(Math.floor(($__3.orderData.update_time * 1000 + 10 * 60 * 1000 - now) / 1000));
            $__3.getDomTime(Math.floor(($__3.orderData.action_time * 1000 - now) / 1000));
          }
        } else {
          myalert._msg(res.msg, 2);
        }
      });
    },
    copy: function(attrId) {
      var $__3 = this;
      new Clipboard(("#" + attrId)).on('success', function(e) {
        myalert._msg($__3.spa_text.copyYes, 1);
        e.clearSelection();
      });
    },
    cancel: function() {
      myalert._confirm({
        myClass: "confirmLayer ft2 wrapper",
        content: ("<p class='size1 title'><strong>" + this.spa_text.tip + "</strong></p>\n\t\t\t\t      <p class='bold size000'>" + this.spa_text.CancelOrder + "</p>\n\t\t\t\t      <p class='ftH size00 subtitle'>" + this.spa_text.CancelContent + "</p>\n\t\t\t\t      <p class='my-col-50  button no size000' id='_confirmClose'>" + this.spa_text.no + "</p>\n\t\t\t\t      <p class='my-col-50  button  size000' onclick='vm.handleOrder(1)'>" + this.spa_text.yes + "</p>")
      });
    },
    confirmReceipt: function() {
      myalert._confirm({
        myClass: "confirmLayer ft2 wrapper",
        content: ("<p class='size1 title'><strong>" + this.spa_text.tip + "</strong></p>\n\t\t\t\t      <p class='ft8 bold size000'>" + this.spa_text.confirmReceipt + "</p>\n\t\t\t\t      <p class='ftH size00 subtitle'>" + this.spa_text.confirmContent + "</p>\n\t\t\t\t      <p class='my-col-50  button no size000' id='_confirmClose'>" + this.spa_text.no + "</p>\n\t\t\t\t      <p class='my-col-50  button size000' onclick='vm.handleOrder(2)'>" + this.spa_text.yes + "</p>")
      });
    },
    handleOrder: function(type) {
      var url = '';
      url = type == 1 ? 'c2c/cancel' : 'c2c/end';
      var data = {id: this.orderId};
      this.$axios.post(url, data).then(function(res) {
        myalert._msg(res.msg, 2, function() {
          if (type == 1) {
            location.reload();
          } else if (type == 2) {
            location.reload();
          }
        });
      });
    },
    pay: function() {
      common._formMask();
      this.uploadModel = true;
    },
    domCancel: function() {
      common._removeMask();
      this.uploadModel = false;
    },
    uploadFile: function(file) {
      var $__3 = this;
      if (!file) {
        return;
      }
      this.source = this.$axios.CancelToken.source();
      plugin.photoCompress(file, {quality: 0.7}, function(base64Codes) {
        $__3.bl = plugin.convertBase64UrlToBlob(base64Codes);
        $__3.resumeUpload();
      });
    },
    cancelUpload: function() {
      http.delloading();
      this.source.cancel('取消上传成功,您可以继续上传');
    },
    resumeUpload: function(type) {
      var $__3 = this;
      if (type == "resume") {
        this.bl = this.bl.slice(this.loaded + 1, this.bl.size);
        var currentRate = 100 - this.rate;
        var oldRate = this.rate;
      }
      var CancelToken = this.$axios.CancelToken;
      var source = CancelToken.source();
      this.source = source;
      this.$axios.post('common/uploadImg', {img: this.bl}, {
        cancelToken: source.token,
        onUploadProgress: function(progressEvent) {
          $__3.loaded = progressEvent.loaded;
          if (type == "resume") {
            $__3.rate = oldRate + ((progressEvent.loaded / progressEvent.total) * currentRate);
          } else {
            $__3.rate = (progressEvent.loaded / progressEvent.total) * 100;
          }
        }
      }).then(function(res) {
        if (res && res.code == 0) {
          var data = {
            id: $__3.orderId,
            pay_pic: res.data.id
          };
          $__3.$axios.post('c2c/pay', data).then(function(res) {
            if (res && res.code == 0) {
              myalert._msg(res.msg, 2, function() {
                location.reload();
              });
            } else {
              myalert._msg(res.msg, 1);
            }
          });
        } else {
          myalert._msg(res.msg, 1);
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    },
    getUpload: function() {
      return ("background:#EFBB53;width:" + this.rate + "%;height:2rem;");
    },
    getDomTime: function() {
      var timestamp = arguments[0] !== (void 0) ? arguments[0] : 0;
      var $__3 = this;
      this.intervalid = setInterval(function() {
        if (timestamp <= 0) {
          $__3.domTime = 0;
          clearInterval($__3.intervalid);
          return false;
        }
        var hour = Math.floor(timestamp / (60 * 60)),
            min = Math.floor((timestamp / 60) % 60),
            sec = timestamp % 60;
        if (sec < 10) {
          $__3.remainTime = min < 10 ? (hour + " : 0" + min + " : 0" + sec) : (hour + " : " + min + " : 0" + sec);
        } else {
          $__3.remainTime = min < 10 ? (hour + " : 0" + min + " : " + sec) : (hour + " : " + min + " : " + sec);
        }
        timestamp--;
      }, 1000);
    },
    getFrozenTime: function() {
      var timestamp = arguments[0] !== (void 0) ? arguments[0] : 0;
      var $__3 = this;
      this.intervalid2 = setInterval(function() {
        if (timestamp <= 0) {
          $__3.frozen = 0;
          clearInterval($__3.intervalid2);
          return false;
        }
        var min = Math.floor(timestamp / 60),
            sec = Math.floor(((timestamp / 60) - min) * 60);
        if (sec < 10) {
          $__3.frozenTime = min < 10 ? ("0" + min + " : 0" + sec) : (min + " : 0" + sec);
        } else {
          $__3.frozenTime = min < 10 ? ("0" + min + " : " + sec) : (min + " : " + sec);
        }
        timestamp--;
      }, 1000);
    },
    openPhone: function(callPhone) {
      this.showPhone = true;
      this.callPhone = callPhone;
    },
    getHL: function() {
      var $__3 = this;
      if (!common._parseUrl('hlId')) {
        return;
      }
      var id = common._parseUrl('hlId');
      this.$axios.post('common/getTenderCategory').then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res && res.code == 0) {
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
