"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    detailInfo: {},
    page: 1,
    spa_text: {},
    myPic: ''
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.CrowdfundingDetails;
    this.getDetail();
  },
  filters: {coverTimeStr: function(value, str) {
      return moment(value * 1000).format(str);
    }},
  methods: {
    getPadding: function() {
      var myLoad = arguments[0] !== (void 0) ? arguments[0] : 0;
      return myLoad > 100 ? 'padding-left:100%' : ("padding-left:" + myLoad + "%");
    },
    getLoading: function() {
      var raised = arguments[0] !== (void 0) ? arguments[0] : 0;
      var target = arguments[1] !== (void 0) ? arguments[1] : 0;
      if (target - 0 == 0) {
        return 0.00;
      }
      if ((raised / target) * 100 > 100) {
        return 100.00;
      } else {
        return parseFloat((raised / target) * 100).toFixed(2);
      }
    },
    getClass: function(end, start) {
      var time = new Date(end * 1000) - new Date();
      if (start * 1000 > new Date().getTime()) {
        return 'background: #f3a214';
      }
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return 'background: linear-gradient(to right,#299E84,#46C4A8);';
      }
      if (end * 1000 < new Date().getTime()) {
        return 'background: #989fa9';
      }
    },
    getStatus: function(end, start) {
      var statusType = {
        1: this.spa_text.Willbegin,
        2: this.spa_text.processing,
        3: this.spa_text.suover
      };
      var time = new Date(end * 1000) - new Date();
      if (start * 1000 > new Date().getTime()) {
        return statusType[1];
      }
      if (Math.ceil(time / (1000 * 60 * 60 * 24)) > 0) {
        return statusType[2];
      }
      if (end * 1000 < new Date().getTime()) {
        return statusType[3];
      }
    },
    getDetail: function() {
      var $__3 = this;
      var data = {id: common._parseUrl('id')};
      this.$axios.post('crowdfunding/getinfo', data).then(function(res) {
        res && res.code == 0 && ($__3.detailInfo = res.data);
        $__3.myPic = ("background: url(\"" + $__3.detailInfo.cover + "\") 50% 50% / cover no-repeat;height:12rem;");
      });
    },
    goToCrowd: function(id, end, start) {
      if (start * 1000 - new Date().getTime() > 0) {
        myalert._msg(this.spa_text.CrowdfundStart, 2);
        return false;
      }
      if (end * 1000 > new Date().getTime()) {
        location.href = ("crowdfundingPay.html?id=" + id);
      } else {
        myalert._msg(this.spa_text.CrowdfundEndTime, 2);
      }
    }
  }
});
