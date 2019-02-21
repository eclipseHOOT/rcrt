"use strict";
function loadingInfo() {
  var lang = arguments[0] !== (void 0) ? arguments[0] : "zh-cn";
  var id = arguments[1] !== (void 0) ? arguments[1] : false;
  vm.getMyInfo();
  vm.checkCanTran();
  vm.page = 1;
  vm.getList(vm.tranTab);
  stroage.write('lang', lang);
  vm.spa_text = language._text();
  document.title = 'RCRT' + vm.spa_text.TradeSector;
  if (id) {
    vm.hlId = id;
    vm.getHuiLv(id);
  }
  if (!vm.kline) {
    vm.getKLineData();
  }
}
var vm = new Vue({
  el: '#index',
  components: {loadmore: Loadmore},
  data: {
    tranTab: 2,
    indexInfo: {},
    dataList: [],
    canTran: 0,
    page: 1,
    hlId: '',
    marketPage: 1,
    passwordModel: false,
    pay_pwd: '',
    newMarket: {
      high: 0,
      low: 0,
      close: 0
    },
    orderId: -1,
    day: 7,
    chart: null,
    kline: [],
    dollar: 1,
    spa_text: {},
    myInfo: {
      balance: "0.0000",
      freezing: "0.0000",
      available: "0.0000"
    },
    oneCreate: true,
    userInfo: {},
    canTranMsg: '',
    coinName: 'RCRT',
    symbol: '￥'
  },
  beforeCreate: function() {
    stroage.remove('serviceData');
    stroage.remove('labelLayer');
  },
  created: function() {
    this.spa_text = language._text();
    document.title = 'RCRT' + this.spa_text.TradeSector;
    this.checkCanTran();
    this.getMyInfo();
    this.getList(2);
    if (common._parseUrl('currency')) {
      this.getHuiLv();
    }
  },
  mounted: function() {
    var $__4 = this;
    this.$nextTick(function() {
      $__4.chart = echarts.init($__4.$refs.chart);
      $__4.getKLineData(7);
    });
  },
  methods: {
    getMyInfo: function() {
      var $__4 = this;
      this.$axios.post('user/getBalance', {currency_id: 1}).then(function(res) {
        res && res.code == 0 && res.data && ($__4.myInfo = res.data);
      });
      this.$axios.post('user/getUserInfo').then(function(res) {
        res && res.code == 0 && res.data && ($__4.userInfo = res.data);
      });
    },
    getKLineData: function() {
      var day = arguments[0] !== (void 0) ? arguments[0] : 7;
      var $__4 = this;
      this.day = day;
      this.$axios.post('c2c/getLine', {list_rows: this.day}).then(function(res) {
        if (res && res.code == 0) {
          $__4.kline = res.data.data;
          var option = $__4.initChartOption();
          $__4.newMarket = res.data.data[res.data.data.length - 1];
          $__4.chart.clear();
          $__4.chart.setOption(option);
        } else {
          myalert._msg(res.msg, 1);
        }
      }).catch(function(err) {
        console.log(err);
        $__4.$axios.delloading();
      });
    },
    initChartOption: function() {
      var $__4 = this;
      var len = this.kline.length;
      var self = this;
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            lineStyle: {
              color: '#676B6F',
              type: 'dashed'
            },
            crossStyle: {
              color: '#676B6F',
              type: 'dashed'
            },
            label: {backgroundColor: '#C8BEAF'}
          }
        },
        xAxis: {
          type: 'category',
          show: true,
          axisLabel: {color: '#92A0AC'},
          axisTick: {show: false},
          axisLine: {
            show: true,
            lineStyle: {
              type: "solid",
              opacity: 1,
              color: "#92A0AC"
            }
          },
          nameTextStyle: {fontSize: 10},
          splitLine: {show: false},
          boundaryGap: false,
          data: (function() {
            var res = [];
            var now = new Date();
            while (len--) {
              var month = now.getMonth() + 1;
              var date = now.getDate();
              res.unshift((month < 10 ? '0' : '') + month + '/' + (date < 10 ? '0' : '') + date);
              now.setDate(now.getDate() - 1);
            }
            return res;
          })()
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLabel: {color: '#92A0AC'},
          axisTick: {show: false},
          axisLine: {
            show: false,
            lineStyle: {
              type: "solid",
              opacity: 1,
              color: "#92A0AC"
            }
          },
          boundaryGap: true,
          axisLabel: {
            interval: 0,
            margin: 2
          },
          splitLine: {show: false}
        },
        series: [{
          type: 'line',
          showSymbol: true,
          areaStyle: {
            color: "#FFF2B5",
            opacity: 0.1
          },
          smooth: true,
          symbol: 'image://data:image/png;base64,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',
          lineStyle: {
            width: 1,
            color: "#FFB71D"
          },
          data: this.kline.map(function(value) {
            return parseFloat(value.close * $__4.dollar).toFixed(2);
          }).reverse()
        }]
      };
    },
    getList: function(num) {
      var $__4 = this;
      if (this.tranTab != num) {
        this.page = 1;
        this.tranTab = num;
      }
      var data = {
        'type': num,
        'page': this.page,
        "list_rows": 6
      };
      this.$axios.postList('c2c/getList', data, this.page, function(res) {
        if (res && res.code == 0) {
          $__4.dataList = $__4.page == 1 ? res.data.data : $__4.dataList.concat(res.data.data);
          $__4.page++;
        } else {
          console.log(res.msg);
        }
      });
    },
    checkCanTran: function() {
      var $__4 = this;
      this.$axios.post('c2c/allowPay').then(function(res) {
        if (res && res.code == 0) {
          $__4.canTran = 0;
        } else {
          $__4.canTran = 1;
          $__4.canTranMsg = res.msg;
        }
      });
    },
    obtainTran: function() {
      return true;
    },
    launchFullScreen: function() {
      var element = element || document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exitFullscreen: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    buy: function(id, uid) {
      this.pay_pwd = "";
      if (!this.obtainTran()) {
        return false;
      }
      this.orderId = id;
      myalert._confirm({
        myClass: "backF wrapper my_layer ft2 size000",
        content: ("<p class='size2 bolds textC'>" + this.spa_text.ACCEPT_ORDER + "</p>\n\t\t\t    <p class='size1 ft9 subtitle' ><strong>" + this.spa_text.KNOWLEDGE + "</strong></p>\n\t\t\t\t<p>" + this.spa_text.RULE1 + "</p>\n\t\t\t\t<p>" + this.spa_text.RULE2 + "</p>\n\t\t\t\t<p>" + this.spa_text.RULE3 + "</p>\n\t\t\t\t<p>" + this.spa_text.RULE4 + "</p>\n\t\t\t\t<p class='layerbottom' >" + this.spa_text.RULE5 + "</p>\n\t\t\t\t<p class='textC cancel size1  my-col-50' id='_confirmClose'>" + this.spa_text.Cancel + "</p>\n\t\t\t\t<p class='textC my-col-50 size1  ftF backL button' onclick='vm.openModel()'>" + this.spa_text.Accept + "</p>")
      });
    },
    openModel: function() {
      myalert._closeConfirm();
      common._formMask();
      this.passwordModel = true;
    },
    closeModel: function() {
      common._removeMask();
      this.passwordModel = false;
      this.pay_pwd = '';
    },
    receiptOrder: function() {
      var $__4 = this;
      if (!this.pay_pwd) {
        myalert._msg(this.spa_text.haspayPassword, 2, function() {
          common._formMask();
        });
        return false;
      }
      if (this.obtainTran()) {
        var data = {
          id: this.orderId,
          pay_pwd: this.pay_pwd
        };
        this.$axios.post('c2c/get', data).then(function(res) {
          if (res && res.code == 0) {
            $__4.passwordModel = false;
            myalert._msg(res.msg, 2, function() {
              webview._goOther(("orderdetail.html?id=" + $__4.orderId + "&hlId=" + $__4.hlId + "'"));
            });
          } else {
            myalert._msg(res.msg, 2, function() {
              common._formMask();
            });
          }
        });
      }
    },
    goToPage: function(url) {
      webview._goOther((url + "?hlId=" + this.hlId));
    },
    getHuiLv: function(currencyId) {
      var $__4 = this;
      var id = 0;
      id = currencyId ? currencyId : common._parseUrl('currency');
      this.$axios.post('common/getTenderCategory').then(function(res) {
        var $__5,
            $__6,
            $__7;
        if (res.code == 0) {
          var rate = res.data.data;
          for (var i in rate) {
            if (rate[i].id == id) {
              ($__5 = [rate[i].short, rate[i].quotation], $__4.symbol = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value), $__4.dollar = ($__7 = $__6.next()).done ? void 0 : $__7.value, $__5);
              break;
            }
          }
        }
      });
    }
  }
});
