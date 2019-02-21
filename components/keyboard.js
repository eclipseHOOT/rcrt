"use strict";
var Keyboard = {
  template: ("\n\t\t<article class=\"my_model\" >\n\t\t    <div>\n\t\t\t    <p class=\"title textC\">\n\t\t\t\t\t\t<span class=\"my-col-10 size5 close\" @click=\"close\">×</span>\n\t\t\t\t\t\t<span class=\"my-col-80 size1 ft2 bolds\" >{{this.langText[this.lang]}}</span>\n\t\t\t\t\t</p>\n\t\t\t\t    <p class=\"password size6\" id='pInput'>\n\t\t\t\t\t    " + '<span></span>'.repeat(6) + "\n\t\t\t\t\t    " + '<i class="opacity"></i>'.repeat(6) + "\n\t\t\t\t    </p>\n\t\t\t\t    <p class=\"keyupCss size5 ft2\" id=\"pPrxoy\">\n\t\t\t\t       <span>\n\t\t\t\t          <a class='my-col-33' v-for=\"(list,index) of arr\">{{list}}</a>\n\t\t\t\t       </span>\n\t\t\t\t       <span>\n\t\t\t\t\t\t\t<a class=\"my-col-33 banClick\" >*</a>\n\t\t\t\t\t\t\t<a class=\"my-col-33\">0</a>\n\t\t\t\t\t\t\t<i class=\"my-col-33 delBack\"><img src=\"img/delPassword.png\"  /></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t</p>\n\t\t\t</div>\t\n\t\t</article>\n\t"),
  data: function() {
    return {
      arr: [],
      langText: {},
      lang: stroage.read('lang') || 'zh-cn',
      langText: {
        'zh-cn': '请输入交易密码',
        'en-us': 'Please input your password',
        'ko-kr': '거래 비밀번호를 입력하십시오.',
        'th-th': 'กรุณาระบุรหัสผ่านการค้า',
        'ja-jp': '请输入交易密码'
      }
    };
  },
  created: function() {
    common._formMask();
    this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function() {
      return .5 - Math.random();
    });
  },
  mounted: function() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    close: function() {
      common._removeMask();
      this.$emit('update:show', false);
    },
    getPassword: function() {
      var iDom = document.querySelectorAll('#pInput i');
      var password = [];
      for (var z = 0; z <= 5; z++) {
        password[z] = Number.parseInt(iDom[z].innerHTML);
      }
      password = password.join("");
      return password;
    },
    init: function() {
      var p = document.getElementById("pPrxoy");
      var psdDom = document.querySelectorAll('#pInput span');
      var iDom = document.querySelectorAll('#pInput i');
      var self = this;
      p.onclick = function(e) {
        if (e.target.nodeName == 'A') {
          for (var i = 0; i <= 5; i++) {
            if (!isNaN(e.target.innerText)) {
              if (i != 6 && !psdDom[i].innerText) {
                psdDom[i].innerText = "·";
                iDom[i].innerText = e.target.innerText - 0;
                if (i == 5) {
                  self.$listeners.submit(self.getPassword());
                }
                return false;
              }
            }
          }
        } else if (e.target.nodeName == 'I' || e.target.nodeName == 'IMG') {
          if (!psdDom[0].innerText) {
            return false;
          }
          for (var j = 0; j <= 6; j++) {
            if (j == 6) {
              psdDom[5].innerText = "";
              iDom[5].innerText = "";
              return false;
            }
            if (!psdDom[j].innerText) {
              if (psdDom[j - 1].innerText) {
                psdDom[j - 1].innerText = "";
                iDom[j - 1].innerText = "";
                return false;
              }
            }
          }
        }
      };
      p = null;
    }
  }
};
