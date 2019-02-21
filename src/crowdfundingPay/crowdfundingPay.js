"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    detailInfo: {},
    myInfo: {
      user_id: 0,
      currency_id: 0,
      balance: 0,
      freezing: 0,
      available: 0,
      wallet_address: ""
    },
    spa_text: {},
    password: '',
    donateNum: ''
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.CrowdfundingDetails;
    this.getMyInfo();
    this.getDetail();
  },
  methods: {
    getMyInfo: function() {
      var $__3 = this;
      var data = {'currency_id': 1};
      this.$axios.post('user/getBalance', data).then(function(res) {
        res && res.code == 0 && res.data && ($__3.myInfo = res.data);
      });
    },
    getDetail: function() {
      var $__3 = this;
      var data = {id: common._parseUrl('id')};
      this.$axios.post('crowdfunding/getinfo', data).then(function(res) {
        res && res.code == 0 && ($__3.detailInfo = res.data);
      });
    },
    submit: function() {
      if (this.donateNum < this.detailInfo.min - 0) {
        myalert._msg(this.spa_text.crowdLower + this.detailInfo.min, 2);
        return false;
      }
      if (this.donateNum > this.detailInfo.max - 0) {
        myalert._msg(this.spa_text.crowdMore + this.detailInfo.max, 2);
        return false;
      }
      if (!this.password) {
        myalert._msg(this.spa_text.payNotEmpty, 2);
        return false;
      }
      var data = {
        'payment_password': this.password,
        'id': this.detailInfo.id,
        'total': this.donateNum
      };
      this.$axios.post('crowdfunding/join', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 1, function() {
            location.href = 'crowdfundingList.html';
          });
        } else {
          myalert._msg(res.msg, 2);
        }
      });
    }
  }
});
