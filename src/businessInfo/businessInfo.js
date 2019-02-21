"use strict";
var vm = new Vue({
  el: '#index',
  components: {callphone: Callphone},
  data: {
    businessInfo: {},
    goodDetails: {},
    businessGoodList: [],
    number: 1,
    myPic: '',
    id: common._parseUrl('id'),
    sid: common._parseUrl('sid'),
    businessPic: '',
    type: 2,
    checkId: -1,
    goodList: [],
    nameLenCss: false,
    contentName: '',
    spa_text: {},
    showPhone: false,
    imgList: [],
    rdccMarket: 1
  },
  created: function() {
    var $__3 = this;
    this.spa_text = language._text();
    document.title = this.spa_text.GoodDetail;
    this.getBusinessInfo();
    var timer = setTimeout(function() {
      $__3.getAllGood();
      $__3.getGoodList(-1);
      clearTimeout(timer);
    }, 500);
  },
  methods: {
    getBusinessInfo: function() {
      var $__3 = this;
      var data = {id: this.sid};
      this.$axios.post('shop/detail', data).then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res && res.code == 0) {
          ($__4 = [res.data, res.data.album_image], $__3.businessInfo = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.imgList = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
          $__3.businessPic = ("background: url('" + $__3.imgList[0] + "') 50% 50% / cover no-repeat;border:none;height: 12rem;width:100%");
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back(-1);
          });
        }
      });
    },
    getAllGood: function() {
      var $__3 = this;
      var dataJson = {shop_id: this.sid};
      this.$axios.post('shop/goods_cate', dataJson).then(function(res) {
        if (res && res.code == 0) {
          $__3.businessGoodList = res.data;
          $__3.businessGoodList.unshift({
            id: -1,
            name: '全部'
          });
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back(-1);
          });
        }
      });
      var data = {id: 1};
      this.$axios.post('common/get_quotation', data).then(function(res) {
        if (res && res.code == 0) {
          $__3.rdccMarket = res.data;
        } else {
          myalert._msg(res.msg, 1, function() {
            history.back(-1);
          });
        }
      });
    },
    goToDetail: function(id) {
      location.href = ("businessDetail.html?id=" + id + "&sid=" + this.sid);
    },
    getGoodList: function(id) {
      var $__3 = this;
      this.checkId = id;
      var dataJson = {shop_id: this.sid};
      if (id != -1) {
        dataJson['cid'] = id;
      }
      this.$axios.post('shop/goods_list', dataJson).then(function(res) {
        if (res && res.code == 0) {
          $__3.goodList = res.data.data || [];
        }
      });
    },
    goToMap: function(longitude, latitude) {
      if (!stroage.read('lang') || stroage.read('lang') == "zh-cn") {
        webview._goToMap(longitude, latitude);
      }
    },
    getPic: function(pic) {
      return ("background: url('" + pic + "') 50% 50% / cover no-repeat;height: 5.5rem;");
    }
  }
});
