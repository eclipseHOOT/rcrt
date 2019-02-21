"use strict";
var vm = new Vue({
  el: '#index',
  data: {
    spa_text: {},
    dataList: [],
    countryId: '',
    name: '',
    phone: '',
    code: '',
    password: '',
    payPassword: '',
    inviteCode: '',
    countdownTime: 60,
    sendStatus: true,
    intervalid: '',
    email: ''
  },
  created: function() {
    stroage.write('access_token', '48588c80857c0a6868a3c723a7c3d8d6');
    this.spa_text = language._text();
    document.title = this.spa_text.goToregister;
    this.inviteCode = common._parseUrl('invite_code');
  },
  beforeDestory: function() {
    clearInterval(this.intervalid);
  },
  methods: {
    handlePassword: function(e) {
      this.payPassword = e.target.value.replace(/[^\d]/g, '');
    },
    submitForm: function() {
      if (!this.name) {
        myalert._msg(this.spa_text.nameFormat, 2);
        return false;
      }
      if (regular._isEmail(this.email)) {
        myalert._msg(this.spa_text.emailFormat, 2);
        return false;
      }
      if (!this.code) {
        myalert._msg(this.spa_text.codeFormat, 2);
        return false;
      }
      if (!this.password) {
        myalert._msg(this.spa_text.haspassword, 2);
        return false;
      }
      if (regular._isAccountPassword(this.password)) {
        myalert._msg(this.spa_text.registerAccountTip, 2);
        return false;
      }
      if (!this.payPassword) {
        myalert._msg(this.spa_text.haspayPassword, 2);
        return false;
      }
      if (this.payPassword.length != 6) {
        myalert._msg(this.spa_text.hasPayFormat, 2);
        return false;
      }
      if (!this.inviteCode) {
        myalert._msg(this.spa_text.hasinvitePassword, 2);
        return false;
      }
      var data = {
        'username': this.name,
        'email': this.email,
        'verify_code': this.code,
        'password': this.password,
        'payment_password': this.payPassword,
        'invite_code': this.inviteCode
      };
      this.$axios.post('common/register', data).then(function(res) {
        myalert._msg(res.msg, 2);
      });
    },
    sendCode: function() {
      var $__3 = this;
      if (regular._isEmail(this.email)) {
        myalert._msg(this.spa_text.emailFormat, 2);
        return false;
      }
      var data = {
        'email': this.email,
        'scene': 'register'
      };
      this.$axios.post('common/sendEmailVerifyCode', data).then(function(res) {
        if (res && res.code == 0) {
          myalert._msg(res.msg, 2, function() {
            $__3.sendStatus = false;
            $__3.intervalid = setInterval(function() {
              if ($__3.countdownTime > 0) {
                $__3.countdownTime--;
              } else {
                $__3.sendStatus = true;
                clearInterval($__3.intervalid);
              }
            }, 1000);
          });
        } else {
          myalert._msg(res.msg, 2);
        }
      });
    },
    openXieYi: function() {
      myalert._confirm({
        myClass: "backBl wrapper my_layer  size000",
        content: "<h3 class='textC' style='color:#D2D7DE;margin-bottom:3%'>《EAC Plans用户协议》</h3><p style='color:#D2D7DE;'>\n\t\t\t\t尊敬的用户：<br/>\n感谢您选择EAC Plans服务。<br/>\n此刻特此提醒您在使用EAC Plans之前，请认真阅读《EAC Plans用户协议》及本文提到的相关协议及建议，包含本协议规定的“免责及责任限制”等条款。确保您充分理解本协议中各条款，并自行思考风险。\n<br/>\n一、关于本协议的理解及确认<br/>\n1、 您理解本协议及相关协议适用于EAC Plans及EAC Plans所自主开发的拥有的所有应用平台。<br/>\n2、您下载EAC Plans软件并创建用户钱包，即您已经确认阅读并接受本协议的全部内容，本协议立即生效，对双方具有约束力。<br/>\n3、本协议可由EAC Plans根据用户体验需求及时更新，经修改的协议一致在EAC Plans上公布，立即自动生效，而不再另行通知。在EAC Plans公布了修改协议条款后，如果您不接受修改后的条款，请立即停止使用EAC Plans。如您继续使用EAC Plans将被视为接受修改后的协议内容。<br/>\n二、定义<br/>\n1、EAC Plans：指由基于地球币底层及其他许可的底层架构系统开发的数字资产钱包。EAC Plans最终打造的是一个去中心化的平台，用户自己保管自己的资产，只有控制私钥的用户，才能控制对应账户的资产，及实现找回密码功能。而EAC Plans无法提供找回密码，交易回滚等操作。用户必须保存好自己的私钥，做到不泄露不转发。\n2、用户：<br/>\n（1）、用户必须是拥有完全民事行为能力的公民；<br/>\n（2）、如果您为18周岁以下的未成年人使用EAC Plans服务，需要在您父母或监护人的指导下使用EAC Plans。无民事行为能力人使用EAC Plans或限制民事行为能力人超过其民事权利或行为能力范围从事交易的，造成的一切后果，EAC Plans有权要求您及您的父母或监护人负责。<br/>\n三、EAC Plans的服务。<br/>\n  1、转币、收币。<br/>\n  您可以使用EAC Plans进行转币、收币功能。及进行数字代币的管理。转账是指付款方用收款方的区块链地址实施的转账行为，实际的转账、收款行为是在相关区块链系统上发生的。<br/>\n  2、查询行情。<br/>\n  您可以在EAC Plans上查看参考数字代币行情。实际价格以您发生交易时的价格为准。<br/>\n四、风险提示及免责声明。<br/>\n  1、本软件每次更新新版本发布后，可能会导致旧版本无法使用。为保证用户安全及使用感，请您随时核对并下载最新版本。<br/>\n  2、在理解熟悉EAC Plans服务时，以下情况的出现可能导致转账交易失败或超时<br/>\n a）钱包没有足够的PLUS支付矿工费；<br/>\n b）区块链执行合约代码失败；<br/>\n c）网络、设备等技术故障；<br/>\n d）区块链网络拥堵、故障等原因引起交易被抛弃；<br/>\n e）您的地址或交易地方地址被识别为特殊地址，或高风险地址！<br/>\n 3、EAC Plans向您提供转账工具服务时，在您使用EAC Plans完成转账后，则视为完成了当次服务的所有内容，对于其他纠纷争议，EAC Plans不负担责任。<br/>\n4、强烈建议不要采用以下备份方式：邮件、截图、短信、记事本、微信、QQ、Telegram、Facebook、Skype、Whatsapp、Tandem等电子备份方式。建议在纸质本上抄写你的私钥信息，或保管至密码器。<br/>\n5、建议您在安全的网络环境中使用EAC Plans，同时您的移动设备没有越狱，尽量避免各种安全隐患。<br/>\n6、在使用中，警惕非EAC Plans官方信息内容误导。发现此行为，建议第一时间留言告知。<br/>\n7、在您的理解下及法律所允许的范围内，因下列原因导致EAC Plans无法正常提供服务，不承担责任：<br/>\n（1）、EAC Plans系统停机维护或升级；<br/>\n（2）、地震或恐怖袭击等不可抗力原因；<br/>\n（3）、您的移动设备，软硬件，供电线路等出现故障的；<br/>\n（4）、您炒作不当或填写了错误的转出地址；<br/>\n（5）、因您手机受病毒、木马、恶意程序攻击。或区块链网络节点拥堵、不稳定原因；<br/>\n（6）、用户遗失移动设备、删除且未备份EAC Plans私钥，而导致的数字代币丢失；<br/>\n（7）用户泄露钱包密码，私钥，或借用，转让他人使用；<br/>\n请所有用户共同学习和遵守本协议，同时请及时关注更新的公告和软件版本！<br/>\n<br/>\n<br/>\n                                                       \n\t\t\t\t</p>\n\t\t\t\t<p class=\"textR\" style='color:#D2D7DE;'>EAC Plans团队</p>\n\t<p class='textC backY ftF' style='padding:3.5% 0;width:80%;margin:5% 10%;' id='_confirmClose'>已阅读并同意此用户协议</p>"
      });
    }
  }
});
