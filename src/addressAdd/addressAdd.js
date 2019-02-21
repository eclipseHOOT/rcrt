"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    addressInfo: {},
    name: '',
    phone: '',
    daddr: '',
    proList: [],
    cityList: [],
    countyList: [],
    proName: '请选择',
    cityName: '请选择',
    countyName: '请选择',
    addrDetail: '请选择',
    showPsd: false,
    proId: 0,
    cityId: 0,
    spa_text: {},
    province_id: 0,
    city_id: 0,
    area_id: 0,
    showAddress: true,
    addrId: ''
  },
  created: function() {
    this.spa_text = language._text();
    document.title = this.spa_text.ADD_ADDRESS_Title;
    stroage.read('lang') && (stroage.read('lang') != 'zh-cn') && (this.showAddress = false);
    this.addrId = common._parseUrl('id');
    if (this.addrId) {
      this.getAddress();
    } else {
      this.getProvince();
    }
  },
  methods: {
    getAddress: function() {
      var $__3 = this;
      var data = {'id': this.addrId};
      this.$axios.post('address/info', data).then(function(res) {
        var $__4,
            $__5,
            $__6;
        if (res.code == 0) {
          ($__4 = [res.data.name, res.data.tel, res.data.address], $__3.name = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value), $__3.phone = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__3.daddr = ($__6 = $__5.next()).done ? void 0 : $__6.value, $__4);
          if (stroage.read('lang') && stroage.read('lang') != 'zh-cn') {} else {
            $__3.proId = res.data.province_id;
            $__3.getProvince();
            $__3.changeProvince($__3.proId);
            $__3.cityId = res.data.city_id;
            $__3.changeCity($__3.cityId);
            $__3.area_id = $__3.countyId = res.data.area_id;
          }
        } else {
          myalert._msg(res.msg, 1);
        }
      });
    },
    domAddress: function() {},
    showAddrSelect: function() {
      document.activeElement.blur();
      common._formMask();
      this.showPsd = true;
    },
    close: function() {
      common._removeMask();
      this.showPsd = false;
    },
    getProvince: function() {
      var $__3 = this;
      var data = {pid: 0};
      this.$axios.post('common/area', data).then(function(res) {
        if (res.code == 0) {
          $__3.proList = res.data;
          if ($__3.proId) {
            for (var i in $__3.proList) {
              if ($__3.proList[i].id == $__3.proId) {
                $__3.proName = $__3.proList[i].name;
                return;
              }
            }
          } else {
            $__3.countyName = '请选择';
          }
        }
      });
    },
    changeProvince: function(id, name) {
      var $__3 = this;
      this.province_id = id;
      if (name) {
        this.cityName = '请选择';
        this.cityList = [];
        this.countyName = '请选择';
        this.countyList = [];
        this.proName = name;
      }
      var cityJson = {'pid': id};
      this.$axios.post('common/area', cityJson).then(function(res) {
        if (res.code == 0) {
          $__3.cityList = res.data;
          if ($__3.cityId) {
            for (var i in $__3.cityList) {
              if ($__3.cityList[i].id == $__3.cityId) {
                $__3.cityName = $__3.cityList[i].name;
                return;
              }
            }
          }
        }
      });
    },
    changeCity: function(id, name) {
      var $__3 = this;
      this.city_id = id;
      if (name) {
        this.countyName = '请选择';
        this.countyList = [];
        this.cityName = name;
      }
      var countyJson = {'pid': id};
      this.$axios.post('common/area', countyJson).then(function(res) {
        if (res.code == 0) {
          $__3.countyList = res.data;
          if ($__3.countyId) {
            for (var i in $__3.countyList) {
              if ($__3.countyList[i].id == $__3.countyId) {
                $__3.countyName = $__3.countyList[i].name;
                return;
              }
            }
          }
        }
      });
    },
    changeCounty: function(id, name) {
      this.area_id = id;
      this.countyName = name;
      common._removeMask();
      this.showPsd = false;
    }
  }
});
