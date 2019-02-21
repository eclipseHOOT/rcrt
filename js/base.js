"use strict";
var common = (function(COMMON) {
  COMMON._parseUrl = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return r[2];
    return null;
  };
  COMMON._formMask = function() {
    var $__2,
        $__3;
    if (!document.getElementById('bg')) {
      var $__1 = [document.getElementById('index'), document.createElement('article')],
          index = ($__2 = $__1[Symbol.iterator](), ($__3 = $__2.next()).done ? void 0 : $__3.value),
          article = ($__3 = $__2.next()).done ? void 0 : $__3.value;
      var heights = index.scrollHeight > window.screen.height ? index.scrollHeight : window.screen.height;
      var html = ("<div  class='wrapper bg' id='bg' style='height: " + (heights - 0 + 30) + "px' ></div>");
      article.innerHTML += html;
      index.appendChild(article);
      document.body.setAttribute('class', 'overflow');
    }
  };
  COMMON._removeMask = function() {
    var bgDom = document.getElementById('bg');
    bgDom && bgDom.parentNode.remove();
    document.body.removeAttribute('class', 'overflow');
  };
  return COMMON;
}(common || {}));

"use strict";
Vue.filter('symbolCoin', function(value, symbol, dollar) {
  return symbol + parseFloat((value) / dollar).toFixed(4) || 0.00;
});
Vue.filter('converContent', function(value, count) {
  return value.substring(0, count) + "...";
});
Vue.filter('computedNum', function(value, num, len) {
  return parseFloat(value / num).toFixed(len) || 0.00;
});
Vue.filter('computedFloat', function(value) {
  if (value.toString().indexOf('.') != -1) {
    if (value.toString().split(".")[1].length > 4) {
      return parseFloat(value).toFixed(4) || 0.00;
    } else {
      return value;
    }
  } else {
    return value;
  }
});
Vue.filter('coverTimeNow', function(value) {
  return moment(value * 1000).toNow(true);
});

"use strict";
var language = (function(LANGUAGE) {
  LANGUAGE._text = function() {
    var $__2,
        $__3;
    var outLangObj = {
      'tta': ['目标金额', 'Target amount', '목표 금액', 'จำนวนเงินเป้าหมาย', '目標金額'],
      'schedule': ['进度', 'schedule', '진행 상황', 'ความคืบหน้า', '進度'],
      'day': ['天', 'day', '하늘', 'วัน', '天'],
      'Willbegin': ['即将开始.....', 'Will begin', '곧 시작', 'จะเริ่ม', '近日発売'],
      'processing': ['进行中', 'processing', '진행 중', 'ดำเนินการใน', '進行中'],
      'suover': ['已结束', 'success over', '종료 됨', 'ได้จบลง', '終わった'],
      'faover': ['已结束', 'fail over', '종료 됨', 'ได้จบลง', '終わった'],
      'Remaining': ['剩余', 'Remaining', '잉여', 'ที่เหลือ', '残っている'],
      'CrowdfundingRestrictions': ['众筹限制', 'Crowdfunding Restrictions', '여러 모로 제한하다.', 'เพิ่มข้อจำกัดทั้งหมด', 'クラウドファンディングの制限'],
      'CrowdfundingTime': ['众筹时间', 'Crowdfunding Time', '많은 시간.', 'รวมเวลาทั้งหมด', '衆議の時間'],
      'CrowdfundingRules': ['众筹规则', 'Crowdfunding Rules', '대중 의 법칙', 'เพิ่มกฎทั้งหมด', '衆議の規則'],
      'CFAReturn': ['众筹失败自动返回', 'Crowdfunding failure automatically returns', '여러 차례 실패하여 귀환 하다', 'ความล้มเหลวและการส่งกลับโดยอัตโนมัติ', '計画に失敗して自動的に戻る'],
      'PCSASC': ['众筹成功后请联系工作人员', 'Please contact the staff after successful crowdfunding', '대중이 성공한 후, 스태프에게 연락해 주십시오.', 'หลังจากความสำเร็จของบรรดาเพิ่มกรุณาติดต่อเจ้าหน้าที่', '計画に成功したらスタッフに連絡してください'],
      'CrowdfundEndTime': ['众筹已经结束了', 'Crowdfunding is over', '중수 가 이미 끝났다', 'และการสิ้นสุด', 'みんなの計画はもう終わった'],
      'TokenSituation': ['Token详情', 'Token situation', '대폐의 상황', 'ด้วยสถานการณ์', '代札の場合'],
      'TokenName': ['Token名称', 'Token Name', '대폐명', 'ชื่อสัญญาณ', '代札名'],
      'TokenSymbol': ['Token符号', 'Token symbol', '대폐 부호', 'สัญญาณสัญลักษณ์', '代札記号'],
      'TotalTokens': ['Token总量', 'Total tokens', '대화 총량.', 'สัญญาณทั้งหมด', '代札の総量'],
      'Crowdfunding': ['众筹介绍', 'Crowdfunding', '대중 앞에서 소개하다.', 'และการแนะนํา', '衆議を出して紹介する'],
      'CrowdfundingDetails': ['众筹详情', 'CrowdfundingDetails', '대중 앞에서 상세한 상황을 세우다.', 'เพิ่มรายละเอียดทั้งหมด', '衆議の詳細'],
      'Crowdfund': ['众筹', 'Crowdfunding', '중수', 'บรรดาชิป', '衆議を出す'],
      'ParticipateCrowdfunding': ['参与众筹', 'Participate crowdfunding', '대중 앞에 참여하다.', 'การมีส่วนร่วมของประชาชนการ', '衆議に参与する'],
      'CrowdfundingNum': ['参与众筹数量', 'Crowdfunding Num', '대중 1 차 수량에 참여하다.', 'การเพิ่มจํานวนมากมาย', '総数に参加する'],
      'PIFmanagement': ['参与理财数量', 'Participation in financial management', '재테크 수량에 가담하다.', 'การมีส่วนร่วมในจํานวนเงิน', '理財数に参与する'],
      'IAmInvolved': ['我参与的', 'I am involved', '제가 참여했어요.', 'ฉันเป็นส่วนหนึ่งของ', '私が参加しました'],
      'Balance': ['余额', 'Balance', '잔액', 'ยอดคงเหลือ', '残高'],
      'RemainingAmount': ['剩余额度', 'Remaining amount', '잉여 한도', 'เหลือโควต้า', '残りの額'],
      'AlreadyInvolved': ['已参与', 'Already involved', '참여하다', 'ได้รับการมีส่วนร่วมในการ', '参加しています'],
      'PaymentPassword': ['支付密码', 'Payment password', '암호를 지불하다.', 'จ่ายรหัสผ่าน', 'パスワードを支払う'],
      'determine': ['确定', 'determine', '확정하다', 'แน่ใจว่า', '確定する'],
      'Accept': ['确定', 'Accept', '확정하다', 'แน่ใจว่า', '確定する'],
      'Trade': ['交易', 'Trade', '거래', 'การซื้อขาย', '取引'],
      'Cash': ['现金交易', 'Cash_Trade', '현금 거래', 'การจัดการเงินสด', '現金取引'],
      'High': ['高', 'High', '높다', 'สูง', '高い'],
      'Low': ['低', 'Low', '낮다', 'ต่ำ', '低い'],
      'Price': ['当前价格', 'Price', '낮다', 'ราคาปัจจุบัน', '現在の価格'],
      'depute': ['委托', 'depute', '위탁', 'มอบหมายให้', '依頼する'],
      'Buy': ['发布购买', 'Buy', '반포', 'ประกาศซื้อ', '購入する'],
      'Sell': ['发布出售', 'Sell', '발포하다', 'ประกาศขาย', '売り出す'],
      'BuyMarket': ['买入', 'Buy', '매입', 'การซื้อ', '買い入れる'],
      'SellMarket': ['卖出', 'Sell', '팔리다', 'ขาย', '売り出す'],
      'Order': ['订单', 'Order', '주문서', 'สั่งซื้อสินค้า', '注文書'],
      'TradeLog': ['我的交易', 'Trade Log', '교역 기록', 'บันทึกรายการค้า', '取引記録'],
      'SevenDay': ['近七天', 'Seven Day', '근 7 일', 'ใกล้วันเจ็ด', '7日近い'],
      'AMonth': ['近一个月', 'A Month', '한 달 가까이', 'เกือบหนึ่งเดือน', '1か月近く'],
      'CashBuy': ['现金购买', 'Cash Buy', '구매 RCRT', 'ซื้อRCRT', '購入RCRT'],
      'CashSell': ['现金出售', 'Cash Sell', 'RCRT', 'ขายRCRT', '販売RCRT'],
      'Number': ['数量', 'Number', '수량', 'จํานวน', '数量'],
      'One_PRICE': ['单价', 'One Price', '단가', 'ราคาต่อหน่วย', '単価'],
      'ALL_PRICE': ['总价', 'All Price', '총가격', 'ราคารวม', '総価格'],
      'TranTips3': ['亲，您不能接自己的单哦~', 'you can not take your own order ~', '당신은 자신의 주문을 ~ 수 없습니다 ~', 'จูบคุณไม่สามารถมารับเองเดียว', '親、自分の手を受け取ることはできませんよ'],
      "ACCEPT_ORDER": ['接单', 'Accept Order', '주문', 'รับใบสั่งซื้อ', '接写書'],
      'KNOWLEDGE': ['交易须知', 'Knowledge', '거래 지시', 'ประกาศซื้อขาย', '取引の心得'],
      'RULE1': ['接单成功后，您将看到卖家的收款账号，请在2小时内完成汇款，汇款后点击“确认已汇款”，否则订单将2小时后自动取消，并扣除买家保证金！', 'Please complete the remittance within 1 hours.Otherwise cancel automatically.', '1 시간 안에 입금할 수 있어요,그렇지 않으면 자동으로 취소한다', 'กรุณากรอกโอนเงินภายใน 1 ชั่วโมง มิฉะนั้นจะยกเลิกโดยอัตโนมัติ', 'ご成功後、売家の口座番号をご覧になります。1時間以内に送金を完了してください。'],
      'RULE2': ['订单信息中可以看到卖家的联系方式，建议您联系确认。', 'I suggest you contact each other information', '상대의 정보를 연락하는 것을 권장합니다', 'ข้อความคำสั่งที่สามารถเห็นได้ในการติดต่อของผู้ขายได้รับการยืนยันและขอแนะนําให้คุณติดต่อ', 'ご注文の情報には売家の連絡先が見られますので、ご連絡をお勧めします。'],
      'RULE3': ['卖家收款后在24小时内没有确定收款，24小时后自动将币转到买家，并扣除卖家保证金。（如未收到款，24小时内请申诉）', 'After successful, the system automatically transfers coins.', '확인 성공 후, 시스템 자동 화폐.', 'ทั้งสองฝ่ายยืนยันว่าหลังจากความสำเร็จของระบบโดยอัตโนมัติซึ่งจะจัดสรรให้กับผู้ซื้อ', '双方が成功を確認した後、システムは自動的に貨幣を買い手に回す。'],
      'RULE4': ['接单后超过3单不及时汇款，将被视为恶意骚扰，暂停交易功能，需要联系平台客服处理。', '3 times a week after receipt of a single time, not timely remittance, suspend trading function', '일주일 3 회 접속 후 적시에 입금 을 하지 않고 교역 을 멈추고, 플랫폼 에 연락하는 것 을 연락해야 한다', '3 ครั้งต่อสัปดาห์ หลังจากรับครั้งเดียวไม่ทันเวลา การ ระงับ ฟังก์ชันการค้า', '週3回シングル後に振り込みをしない場合は、悪意のあるセクハラとして、取引機能を一時停止し、プラットフォームのサービス処理を行う必要があります。'],
      'RULE5': ['交易手续费由卖家承担（卖家需扣5%手续费）', 'Transaction fee is borne by the seller', '거래 수수료는 판매자가 부담합니다.', 'โดยผู้ขายรับผิดชอบค่าธรรมเนียมในการซื้อขายหลักทรัพย์', '取引の手数料は売家が引き受ける'],
      'Buyrdcc': ['购买RCRT', 'Buy RCRT', '구매 RCRT', 'ซื้อ RCRT', '購入RCRT'],
      'Confirm': ['确认', 'Confirm', '확인', 'ยืนยัน', '確認'],
      'Cancel': ['取消', 'Cancel', '취소', 'ยกเลิก', '取り消す'],
      'no': ['取消', 'no', '취소', 'ยกเลิก', '取り消す'],
      'yes': ['确认', 'yes', '확인', 'การยืนยัน', '確認'],
      'CurrentPrice': ['当前价格', 'Current Price', '현재 가격', 'ราคาปัจจุบัน', '現在の価格'],
      'SellPrice': ['出售价格', 'Sell Price', '판매 가격', 'ขายราคา', '価格を売る'],
      'SellNum': ['出售数量', 'Sell Num', '판매 수량', 'ปริมาณการขาย', '販売数量'],
      'poundage': ['手续费', 'poundage', '수수료', 'ค่าธรรมเนียม', '手数料'],
      'SellAll': ['出售总额', 'Total Money', '총 판매액', 'ขายรวม', '総額を売る'],
      'BuyPrice': ['购买价格', 'Buy Price', '구매 가격', 'ซื้อในราคาที่', '購入価格'],
      'BuyNum': ['购买数量', 'Buy Num', '구매 수량', 'ปริมาณการซื้อ', '購入数量'],
      'BuyAll': ['购买总额', 'Total Money', '총 구매액', 'ปริมาณการซื้อ', '総額を買う'],
      'payMoney': ['支付金额', 'Pay Money', '지불 금액', 'ยอดเงินที่ต้องจ่าย', '支払い金額'],
      'PAYMENT': ['收款', 'Pay', '영수증', 'คอลเลกชัน', '受取をする'],
      'METHOD': ['方式', 'Method', '길', 'วิธี', '方式'],
      'CONTACT': ['联系方式', 'Contact', '연락처 정보', 'ติดต่อ', '連絡方式'],
      'PUBLISHED': ['发布', 'Published', '릴리스', 'เปิดตัว', '発表する'],
      'ALIPAY': ['支付宝', 'Alipay', 'Alipay', 'จ่ายสมบัติ', '宝を払う'],
      'BANK_CARD': ['银行卡', 'Bank_Card', '은행 카드', 'บัตรของธนาคาร', '銀行カード'],
      'PUBLISHED_TITLE': ['请输入交易密码', 'Please input your password.', '거래 비밀번호를 입력하십시오.', 'กรุณาระบุรหัสผ่านการค้า', '取引パスワードを入力してください'],
      'PUBLISHED_RULE': ['发布目前只支持RMB汇率', 'It only supports RMB exchange rate.', '출시는 현재 인민폐 (RMB) 환율 만 지원합니다.', 'โพสต์ในขณะนี้สนับสนุนเฉพาะสกุลเงินหยวน', '現在はRMBの為替レートのみをサポートしております'],
      'PUBLISHED_RULE1': ['请选择至少一种收款方式', 'Please choose at least one collection method', '지불 방법을 하나 이상 선택하십시오.', 'กรุณาเลือกอย่างน้อยหนึ่งชนิดของเงิน', '少なくとも1つの受取方を選択してください'],
      'PUBLISHED_RULE2': ['出售价格不能低于当前价格', 'The selling price should not be lower than the current price.', '판매 가격은 현재 가격보다 낮을 수 없습니다.', 'ขายในราคาที่ไม่ต่ำกว่าราคาปัจจุบัน', '販売価格が現在の価格を下回ることはできません'],
      'PUBLISHED_RULE3': ['出售数量不能低于', 'The sale quantity should not be lower than', '판매 수는 다음보다 낮을 수 없습니다.', 'ขายจำนวนไม่ต่ำกว่า', '販売台数が下回ることはできません'],
      'PUBLISHED_RULE5': ['购买数量不能低于', 'Purchase quantity cannot be less than', '구매 수량이 낮으면 안 됩니다.', 'ปริมาณการซื้อไม่ต่ำกว่า', '購入した数量は、'],
      'SellPublished': ['出售RCRT', 'Sell', '릴리스 확인', 'ยืนยันการเปิดตัว', 'リリースを確認する'],
      'BuyPublished': ['购买RCRT', 'Buy', '릴리스 확인', 'ยืนยันการเปิดตัว', 'リリースを確認する'],
      'Sell1': ['卖', 'Sell', '팔다', 'ขาย', '売る'],
      'Buy1': ['买', 'Buy', '사다', 'ซื้อ', '購入する'],
      'RomAllPrice': ['总额', 'Total Money', '총액', 'รวม', '合計'],
      'hasSuccess': ['已成交', 'Success', '이미 거래가 성사되었다.', 'ขายได้', '完了しました'],
      'MONEY': ['金额', 'Money', '돈', 'จํานวนเงิน', '金額'],
      'REVOKE': ['撤销', 'Revoke', '취소하다', 'การยกเลิก', 'キャンセル'],
      'tip': ['提示', 'Tip', '제시', 'เคล็ดลับ', 'プロンプト'],
      'Cancel_Order': ['确定取消订单吗？', 'Confirm cancellation of order', '주문 취소 확실합니까?', 'กำหนดให้ยกเลิกคำสั่งใช่ไหม？', '注文をキャンセルしてもよろしいですか？'],
      'Accept_Order': ['确定接单？', 'Accept Order?', '확인 확인?', 'กำหนดรับเอกสาร？', '注文を確認する'],
      'PUT_UP': ['正在挂单', 'Put Up', '계산기 마르고 있어요.', 'กำลังรอคําสั่ง', '保留中の注文'],
      'Wait_Gather': ['待确定', 'Wait determined', '결정될', 'จะได้รับการพิจารณา', '決定される'],
      'Wait_Pay': ['待付款', 'Wait Pay', '대금을 지불하다.', 'รอการชำระเงิน', '保留中の支払い'],
      'COMPLETED': ['已完成', 'Success', '완료됨', 'ที่เสร็จสมบูรณ์', '完了しました'],
      'indexFrozen': ['已冻结', 'Frozen', '이미 동결되었다', 'ที่ได้รับการแช่แข็ง', '冷凍'],
      'FROZEN': ['已冻结（申诉中）', 'Frozen', '이미 동결 (소소 중)', 'ที่ถูกแช่แข็ง ( บ่น )', '冷凍（アピール）'],
      'Order_Fail': ['订单失败', 'Fail', '주문 실패', 'คำสั่งล้มเหลว', '注文に失敗しました'],
      'SUCCESS': ['成功', 'Success', '성공하다', 'ประสบความสําเร็จ', '成功'],
      'FAIL': ['失败', 'Fail', '실패', 'ล้มเหลว', '失敗'],
      'SellOrder': ['掛單中', 'put up', '주문서 팔다', 'ใบสั่งขาย', '売り注文'],
      'BuyOrder': ['已完結', 'Have finished', '주문서', 'คำสั่งซื้อ', '注文を購入する'],
      'WaitBuyPay': ['等待买家付款', 'Wait Buyer Pay', '구매를 기다리다.', 'รอผู้ซื้อชําระเงิน', '買い手の支払いを待っている'],
      'WaitSellPay': ['等待卖家确认收款', 'Wait Seller Gather', '가가를 기다리고, 돈을 받는 것을 확인하다.', 'รอยืนยันการชำระเงินผู้ขาย', '売り手が支払いを確認するのを待っている'],
      'Order_Rule0': ['当天接单三次未付款，系统默认恶意接单请您在指定时间内完成交易操作', 'Three times on the day the order is not paid, the system will accept the malicious order by default, please complete the transaction within the specified time', '이 당일 주문서 3 회 미불, 시스템의 기본 악성접 단서를 지정해 주십시오', 'วันสามครั้งเดี่ยวไม่ชำระเงินค่าเริ่มต้นของระบบที่เป็นอันตรายตามรายการโปรดของคุณในเวลาที่กำหนดไว้การทำธุรกรรมเสร็จสมบูรณ์', '注文は1日3回支払われません、システムはデフォルトの悪意のある注文、指定された時間内にトランザクション操作を完了してください。'],
      'Order_Rule1': ['卖家提出申诉，已冻结订单请尽快联系客服处理', 'The seller has lodged a complaint, and the order has been frozen. Please contact the customer service for processing as soon as possible', '판매가가 제소를 제기하였으며, 이미 주문서를 동결하였으며, 가능한 한 빨리 객복에 연락해 주시기 바랍니다.', 'ผู้ขายได้ระงับการอุทธรณ์คำสั่งจัดการกับการบริการลูกค้าโปรดติดต่อเราโดยเร็วที่สุด', '売り手は上訴を提出し、注文は凍結されているので、できるだけ早く顧客サービスに連絡してください'],
      'SellerName': ['卖家昵称', 'seller name', '매인', 'ชื่อเล่นของผู้ขาย', '売り手ニックネーム'],
      'BuyerName': ['买家昵称', 'buyer name', '애칭', 'ชื่อเล่นของผู้ซื้อ', '購入者のニックネーム'],
      'VOUCHER': ['付款凭证', 'Voucher', '지불증명서', 'หลักฐานการจ่ายเงิน', 'お支払いバウチャー'],
      'open_Voucher': ['查看付款凭证', 'Open Voucher', '지불 증명서를 확인하다.', 'ดูหลักฐานการจ่ายเงิน', '支払いバウチャーを表示する'],
      'ORDER_Id': ['订单编号', 'Order Id', '주문 번호', 'หมายเลขการสั่งซื้อ', '注文番号'],
      'Seller_Contact': ['卖家联系方式', 'seller contact', '판매 방식', 'ติดต่อผู้ขาย', '売り手の連絡先情報'],
      'Buyer_Contact': ['买家联系方式', 'buyer contact', '가계 연락 방식', 'ผู้ซื้อที่ติดต่อ', '購入者の連絡先'],
      'SellerInfo': ['卖家信息', 'Seller Info', '매점 정보', 'ข้อมูลการขายบ้าน', '売り手情報'],
      'BuyerInfo': ['买家信息', 'Buyer Info', '구매자 정보', 'ข้อมูลผู้ซื้อ', 'バイヤー情報'],
      'NICKNAME': ['昵称', 'Nickname', '별명', 'ชื่อเล่น', 'ニックネーム'],
      'NAME': ['户名', 'Name', '호호', 'ชื่อบัญชี', 'アカウント名'],
      'BANKCard': ['银行卡号', 'Bank Card', '은행 번호.', 'หมายเลขบัตรเครดิต', '銀行カード番号'],
      'BANK': ['银行', 'Bank', '은행', 'ธนาคาร', '銀行'],
      'TradeProcess': ['交易进度', 'Trade schedule', '교역 진도.', 'ตารางรายการ', '取引の進捗状況'],
      'CARD_Id': ['卡号', 'Card Id', '카드', 'หมายเลขบัตร', 'カード番号'],
      'SERVICE': ['客服', 'Service', '객복', 'การบริการลูกค้า', 'カスタマーサービス'],
      'COPY': ['复制', 'Copy', '복제', 'คัดลอก', 'コピー'],
      'TIPS0': ['提示:正在等待买家付款，倒计时', 'Tip: waiting for payment, countdown', '힌트: 구매자 지불, 카운트다운', 'เคล็ดลับ : การชำระเงินนับถอยหลังรอ ,', 'ヒント：買い手の支払いを待って、カウントダウン'],
      'TIPS1': ['确认您的收款账号是否收到汇款', 'Confirm whether your account has received remittance.', '당신 의 수금 계좌 가 송금 을 받았는지 확인한다', 'ตรวจสอบให้แน่ใจว่าคุณจะได้รับเงินในบัญชีผู้รับเงิน', 'お支払い口座が送金を受け取ったことを確認してください'],
      'TIPS2': ['买家确定收款后10分钟，卖家没收到款可以申诉并冻结订单和币，平台会根据双方提供凭证判断最终结果。', 'Ten minutes after the buyer confirms the receipt, the seller can appeal and freeze the order and currency, and the platform will judge the final result according to the credentials provided by both parties.', '구매자는 입금 확정 후 10 분 후, 판매자가 받지 않고 주문과 주문서를 동결할 수 있으며, 플랫폼은 쌍방 제공에 근거하여 최종 결과를 판단한다.', 'หลังจากได้รับการชำระเงินที่ผู้ซื้อกำหนด 10 นาทีผู้ขายได้รับการชำระเงินและแช่แข็งโดยไม่สามารถอุทธรณ์คำสั่งและเหรียญที่สอดคล้องกับทั้งสองแพลตฟอร์มจะให้หลักฐานตัดสินผลลัพธ์สุดท้าย', '購入者が売り手が支払いを受け取っていないと判断してから10分後、注文と通貨を控えて凍結することができます。プラットフォームは、両当事者から提供された証拠に従って最終結果を判断します。'],
      'TIPS3': ['卖家提出申诉，以冻结订单请尽快联系客服处理', 'The seller made a complaint to freeze the order. Please contact customer service as soon as possible.', '판매가 가 제소 를 제기하여 주문서 를 동결 하여 빨리 객복 에 연락해 주십시오', 'ร้องเรียนผู้ขายเพื่อสั่งซื้อกรุณาติดต่อฝ่ายบริการลูกค้าจัดการแช่แข็ง', '売り手は注文を凍結するために訴えを提出し、できるだけ早くカスタマーサービスに連絡してください。'],
      'TIPS4': ['如果超过倒计时卖家未确定收款，系统自动判断交易成功，将币拨给买家。', 'If the seller fails to confirm the payment, the system automatically determines the success of the transaction and transfers the money to the buyer.', '카운트다운 판매가가 수금을 확정하지 않았다면, 시스템 자동 판단 거래가 성공하여, 돈을 구매자에게 보내게 된다.', 'หากเกินกำหนดเวลานับถอยหลังผู้ขายยังไม่ตัดสินในความโปรดปรานของระบบโดยอัตโนมัติจะประสบความสำเร็จในการซื้อขายเงินตราให้กับผู้ซื้อ', '売り手がカウントダウン後に支払いを決定しない場合、システムは自動的に取引が成功したと判断し、買い手に通貨を割り当てます。'],
      'TIPS5': ['买家确定收款后5分钟，卖家没收到款可以申诉并冻结订单和币，平台会根据双方提供凭证判断最终结果。', '5 minutes after the buyer determines the payment collection, the seller can appeal and freeze the order and currency if the payment is not received by the buyer. The platform will judge the final result according to the documents provided by both parties.', '구매가 확정 수금 후 5 분 후 판매자 없이 주문과 주문서를 동결할 수 있으며, 플랫폼은 양측이 증명서를 제공하고 최종 결과를 판단합니다.', 'หลังจากได้รับการชำระเงินที่ผู้ซื้อกำหนด 5 นาทีผู้ขายได้รับการชำระเงินและแช่แข็งโดยไม่สามารถอุทธรณ์คำสั่งและเหรียญที่สอดคล้องกับทั้งสองแพลตฟอร์มจะให้หลักฐานตัดสินผลลัพธ์สุดท้าย', '購入者が支払いを決定してから5分後に、売り手は注文と通貨を控えて凍結することはできません。プラットフォームは、両当事者によって提供された証拠に基づいて最終結果を判断します。'],
      'TIPS7': ['请按照以上信息给卖家汇款', 'Please remit to the seller according to the above information', '이상의 정보에 따라 매표자에게 송금해 주십시오.', 'กรุณาโอนเงินให้กับผู้ขายตามข้อมูลข้างต้น', '上記の情報に従って、売り手に送金してください。'],
      'TIPS8': ['汇款备注请填写“订单尾号', 'Please fill in the "end of order"', '돈을 송금하여 주문서를 작성해 주십시오.', 'หมายเหตุ : กรุณากรอก “แบบฟอร์มการโอนเงินเลขท้าย', '送金備考「受注番号」に記入してください'],
      'TIPS9': ['”，请避免填写其他内容。', 'Please avoid other content', '다른 내용 기입하지 마세요.', '”,โปรดหลีกเลี่ยงการกรอกเนื้อหาอื่นๆ', '、他のコンテンツを入力しないでください'],
      'TIPS10': ['汇款完成后请及时确认已汇款，系统将通知卖家继续完成交易。', 'Please confirm the remittance in time after the completion of remittance, and the system will inform the seller to continue to complete the transaction.', '송금 이 완료된 후 입금 을 확인해 주십시오.', 'หลังจากได้รับการยืนยันการโอนเงินกรุณาแจ้งการโอนเงินให้ผู้ขายระบบจะดำเนินการกับรายการ', '送金が完了した後、時間内に送金を確認してください、システムは取引を完了するために売り手に通知します。'],
      'TIPS11': ['正在等待卖家确认收款，倒计时', 'Waiting for the seller to confirm the collection, countdown', '판매자 확인 수수료 확인', 'กำลังรอผู้ขายยืนยันในความโปรดปรานของการนับถอยหลัง', '売り手が領収書、カウントダウンを確認するのを待つ'],
      'TIPS12': ['如果超过倒计时卖家未确认收款，系统自动判断交易成功，将币拨给买家', 'If the countdown seller does not confirm the receipt, the system automatically determines the success of the transaction, the money will be transferred to the buyer', '만약 카운트다운 판매가 미확인 수금을 초과하면, 시스템 자동 판단 거래가 성공하여, 돈을 구매자에게 헤집는다', 'ถ้าเกินผู้ขายยังไม่ยืนยันชำระเงินนับถอยหลัง , ระบบตรวจสอบโดยอัตโนมัติประสบความสำเร็จในการซื้อขายที่ผู้ซื้อจะได้รับเหรียญ', '売り手がカウントダウン後に支払いを確認しない場合、システムは自動的に取引が成功したと判断し、買い手に通貨を割り当てます。'],
      'TIPS13': ['买家确认已付款，10分钟后可以提交申述，申述后订单冻结，恶意申述停止交易功能', 'The buyer confirmed the payment, 10 minutes later can submit the statement, the order after the statement freezes, malicious statement stops the transaction function', '구매 확인 이미 지불, 10 분 후 제출할 수 있다 신술 후 주문서 동결, 악의신술 정지 교역 기능', 'ผู้ซื้อได้รับการยืนยันการชําระเงินสามารถส่ง 10 นาทีหลังจากถูกแช่แข็งที่ถูกสั่งหยุดการซื้อขายสภาพการทำงานที่เป็นอันตราย', '買い手は、支払いが行われたことを確認し、10分後にクレームを提出することができます。注文は清算後に凍結され、悪意のある表示は停止されます。'],
      'OrderNo': ['取消交易', 'no', '거래 취소', 'ในการยกเลิกการทำธุรกรรม', '取引をキャンセルする'],
      'OrderYes': ['确认已付款', 'yes', '지급 확인', 'ได้รับการยืนยันการชําระเงิน', '支払いを確認する'],
      'FROZEN_ORDER': ['申诉并冻结订单', 'FROZEN_ORDER', '항소 및 주문 중단', 'อุทธรณ์คำสั่งและแช่แข็ง', '上訴と凍結命令'],
      'Seller': ['卖家', 'Seller', '판매자', 'ขายบ้าน', '売り手'],
      'Buyer': ['买家', 'Buyer', '구매자', 'ผู้ซื้อ', '買い手'],
      'GoFrozen': ['去申诉', 'Go Frozen', '항소하기', 'ไปร้องเรียน', 'アピールする'],
      'ConfirmOrder': ['确认已收款', 'submit', '지불 영수증을 확인하십시오.', 'ได้รับการยืนยันการชำระเงิน', '支払いの領収書を確認する'],
      'ContactSeller': ['联系卖家', 'Seller', '판매자에게 문의', 'ติดต่อผู้ขาย', '売り手に連絡する'],
      'ContactBuyer': ['联系买家', 'Buyer', '구매자에게 문의', 'ติดต่อผู้ซื้อ', 'バイヤーに連絡する'],
      'ContactService': ['联系客服', 'Service', '고객 서비스에 문의하십시오.', 'ติดต่อฝ่ายบริการลูกค้า', 'カスタマーサービスに連絡する'],
      'uploadVocher': ['请上传您的支付凭证', 'Please upload pay voucher', '결제 영수증을 업로드하십시오.', 'โปรดอัปโหลดเอกสารของการชําระเงินของคุณ', 'お支払いバウチャーをアップロードしてください'],
      'uploadPhotos': ['上传照片', 'upload Photos', '사진 업로드', 'อัพโหลดภาพถ่าย', '写真をアップロードする'],
      'CancelOrder': ['确定取消交易吗？', 'Are you sure to cancel the transaction?', '거래를 취소 하시겠습니까?', 'ตกลงยกเลิกการขายไหม？', '取引をキャンセルしてもよろしいですか？'],
      'CancelContent': ['当天接单三次取消交易，系统默认恶意接单。', 'Today More than 3 times is malicious', '같은 날에 주문이 3 번 취소되고 시스템의 악성 주문이 기본값으로 설정됩니다.', 'วันที่รับเอกสารสามครั้งค่าเริ่มต้นของระบบที่เป็นอันตรายในการยกเลิกรายการสั่งซื้อ', '注文は同じ日に3回キャンセルされ、システムのデフォルトは悪意のある注文になります。'],
      "confirmReceipt": ['确定已收款吗?', 'Are you sure you have received the payment?', '지불을 받으셨습니까?', 'ตรวจสอบให้แน่ใจว่ามีใบเสร็จรับเงินไหม？', 'お支払いを受け取りましたか？'],
      "confirmContent": ['确认收款后，不可提交申诉申请', 'Cannot submit an appeal after confirming the payment', '결제 확인 후 항소를 제출할 수 없습니다.', 'หลังจากได้รับการชำระเงินได้รับการยืนยันจะไม่ส่งข้อร้องเรียนสำหรับ', '支払いを確認した後、控訴を提出できません'],
      'AppealReason': ['申诉原因', 'Appeal reason', '상고 이유', 'เหตุผลที่ร้องเรียน', '上訴の理由'],
      'AppealMsg': ['您的申诉已提交，48小时内官方将会联系到您进行审核，请保持通话畅通', 'Your appeal has been submitted and will be contacted by you within 48 hours. Please keep your call open.', '귀하의 이의 제기가 제출되었으며 48 시간 이내에 연락을 드릴 것입니다. 전화를 끊지 마십시오.', 'คุณร้องเรียนได้ยื่น 48 เจ้าหน้าที่จะติดต่อคุณภายใน 24 ชั่วโมงกรุณาโทรตรวจสอบให้เรียบ', 'あなたの控訴が提出され、48時間以内にあなたから連絡されます。'],
      'AppealPlac': ['请输入您的申诉理由', 'Please input your reasons', '항소 이유를 입력하십시오.', 'ของคุณกรุณาใส่เหตุผลที่ร้องเรียน', 'アピールの理由を入力してください'],
      'reason1': ['请输入正确格式的手机号码', 'Please enter the phone number in the correct format', '전화 번호를 올바른 형식으로 입력하십시오.', 'โปรดระบุหมายเลขโทรศัพท์มือถือที่ถูกต้องในรูปแบบ', '電話番号を正しい形式で入力してください'],
      'reason2': ['留言不能为空', 'The message cannot be left blank', '메시지는 비워 둘 수 없습니다.', 'ข้อความจะว่างเปล่า', 'メッセージを空にすることはできません'],
      'SEARCH': ['搜索', 'search', '검색', 'ค้นหา', '検索'],
      'HOT_RECOMMENT': ['热门推荐', 'Hot Recomment', '대중의 추천', 'วิศวกร', '人気のあるおすすめ'],
      'GOOD_INTRODUCE': ['商品详情', 'Good Detail', '제품 세부 정보', 'รายละเอียดสินค้า', '製品の詳細'],
      'STOCK': ['库存', 'Stock', '인벤토리', 'สินค้าคงคลัง', '目録'],
      'Jian': ['件', 'Piece', '조각', 'ชิ้น', 'ピース'],
      'aNAME': ['收货人', 'name', '수취인', 'ผู้รับของ', '荷受人'],
      'aPHONE': ['联系电话', 'phone', '전화', 'ติดต่อทางโทรศัพท์', '連絡先'],
      'aADDRESS': ['收货地址', 'address', '수신 주소', 'ที่อยู่จัดส่ง', '受信アドレス'],
      'Courier': ['配送方式', 'Courier', '배송 방법', 'วิธีการจัดส่งสินค้า', '配送方法'],
      'COMMENTS': ['买家留言', 'comments', '구매자의 메시지', 'ข้อความจากผู้ซื้อ', '買い手のメッセージ'],
      'freight': ['含运费', 'Contains freight', '배송료 포함', 'รวมค่าขนส่ง', '出荷時に'],
      'noAddress': ['您目前还没有添加收货地址哦~', 'You have not added the shipping address at present ~', '배송 주소를 아직 추가하지 않았습니다 ~', 'ขณะนี้คุณยังไม่ได้เพิ่มที่อยู่จัดส่ง~', '配送先住所をまだ追加していません。'],
      'PAYMENT2': ['实付', 'payment', '지불', 'จ่ายจริง', '支払う'],
      'SUBMIT': ['提交', 'submit', '제출', 'ส่ง', '提出する'],
      'placeholder1': ['填写您需要协商的和商家确认', 'Fill in what you need to negotiate and confirm', '필수 확인서 및 판매자 확인서 작성', 'กรอกข้อมูลในแบบฟอร์มที่ต้องเจรจากับพ่อค้ายืนยัน', '必要な確認と商人の確認を記入してください'],
      'FREEMAIL': ['快递免邮', 'free', '익스프레스 무료 게시물', 'บริการจัดส่งไปรษณีย์ฟรี', 'エクスプレスフリーポスト'],
      'Has': ['共', 'Has', '합계', 'ทั้งหมด', '合計'],
      'HasGood': ['件商品，实付', 'goods', '상품 조각', 'สินค้าที่จ่ายจริง', '商品の一部'],
      'GOODBUY': ['立即购买', 'BUY', '지금 구입', 'ซื้อทันที', '今すぐ購入'],
      'ADD_ADDRESS': ['添加收货地址', 'Add Address', '배송 주소 추가', 'เพิ่มที่อยู่จัดส่ง', '配送先住所を追加する'],
      'ADD_ADDRESS_Title': ['新增收货地址', 'Add Address', '배송 주소 추가', 'เพิ่มที่อยู่จัดส่ง', '配送先住所を追加する'],
      'DELADDRESS': ['确认删除该地址吗？', 'Are you sure you want to delete this address?', '이 주소를 삭제 하시겠습니까?', 'ยืนยันลบที่อยู่นี้ ?', 'アドレスの削除を確認しますか？'],
      'SelectAddress': ['选择收货地址', 'SELECT ADDRESS', '배송지 주소 선택', 'เลือกที่อยู่จัดส่ง', '配送先住所を選択'],
      'defaultAddress': ['默认地址', 'default', '기본 주소', 'โดยค่าเริ่มต้นที่อยู่', 'デフォルトアドレス'],
      'setDefaultAddress': ['设为默认', 'set Default', '기본값으로 설정', 'โดยค่าเริ่มต้นที่อยู่', 'デフォルトとして設定'],
      'please_select': ['请选择', 'please select', '선택해주세요.', 'กรุณาเลือก', '選択してください'],
      'PHONE': ['手机号码', 'Phone', '휴대 전화 번호', 'หมายเลขโทรศัพท์มือถือ', '携帯電話番号'],
      'SAVE': ['保存', 'Save', '저장', 'บันทึก', '保存する'],
      'region': ['所在地区', 'region', '지역', 'ในพื้นที่', 'エリア'],
      'ADDRESS_PLAC': ['请输入道路、门牌号、小区、单元室等详细地址', 'Please enter the detailed address of road, door number, plot, unit room and so on.', '도로, 집 번호, 셀, 유닛 등과 같은 상세 주소를 입력하십시오.', 'โปรดระบุถนน , เลขที่ , ชุมชน , หน่วยห้องและรายละเอียดที่อยู่', '道路、住宅番号、セル、ユニットなどの詳細な住所を入力してください。'],
      'ALL': ['全部', 'All', '모두', 'ทั้งหมด', 'すべて'],
      'Contact_Business': ['联系商家', 'Contact', '판매자에게 문의하기', 'ติดต่อพ่อค้า', 'お問い合わせ商人'],
      'Go_To_Shop': ['进入店铺', 'go to shop', '상점에 입장하십시오.', 'เข้าไปในร้าน', '店に入る'],
      'Business_Hours': ['营业时间', 'Hours', '영업 시간', 'ชั่วโมงธุรกิจ', '営業時間'],
      'GOOD': ['商品', 'Good', '물품', 'สินค้า', 'グッズ'],
      'BUSINESS': ['商家', 'Business', '판매자', 'ธุรกิจ', '商人'],
      'Navigation': ['导航', 'Map', '내비게이션', 'นำทาง', '地図'],
      'BusinessShop': ['商家店铺', 'ShopPic', '가맹점', 'ธุรกิจร้านค้า', '加盟店'],
      'is_default': ['设为默认', 'is default', '기본값으로 설정', 'ตั้งเป็นค่าเริ่มต้น', 'デフォルトとして設定'],
      'edit': ['编辑', 'Edit', '수정', 'การแก้ไข', '編集'],
      'delete': ['删除', 'Delete', '삭제', 'ลบ', '削除'],
      'myOrder': ['我的订单', 'my Order', '내 주문', 'ของที่ผมสั่ง', '私の注文'],
      'BusinessOrder': ['商家订单', 'Business Order', '상가 주문서', 'ธุรกิจการสั่งซื้อ', '商家の注文'],
      'Online_Store': ['线上商店', 'Online Store', '온라인 상점', 'ร้านค้าออนไลน์', 'オンラインストア'],
      'ToStore': ['到店消费', 'To Store', '가게에', 'ไปที่ร้านของผู้บริโภค', '店舗へ'],
      'PayMent': ['付款', 'PayMent', '지불', 'การชําระเงิน', 'お支払い'],
      'noComment': ['未填写留言', 'no Comment', '메시지 남기기', 'ข้อความไม่เต็ม', 'メッセージを残す'],
      'cancelOrder': ['取消订单', 'Cancel', '주문 취소', 'ยกเลิกการสั่งซื้อ', '注文をキャンセルする'],
      'delOrder': ['删除订单', 'Delete', '주문 삭제', 'ลบคำสั่ง', '注文を削除する'],
      'DeliveryOrder': ['确认收货', 'Delivery', '영수증 확인', 'ยืนยันการรับสินค้า', '領収書を確認する'],
      'OrderStatus0': ['已取消', 'Fail', '취소됨', 'ถูกยกเลิก', 'キャンセルされた'],
      'OrderStatus1': ['待付款', 'Wait pay', '지불 대기 중', 'รอการชำระเงิน', '保留中の支払い'],
      'OrderStatus2': ['等待发货', 'Wait Send Goods', '배송 대기 중', 'รอการจัดส่งสินค้า', '配達を待っている'],
      'OrderStatus3': ['等待收货', 'Wait take Goods', '영수증을 기다리는 중', 'รอรับสินค้า', '領収書を待っている'],
      'OrderStatus4': ['已完成', 'Success', '완료 됨', 'ที่เสร็จสมบูรณ์', '完了しました'],
      'Status1': ['待发货', 'Wait Send', '보류중인 발송물', 'รอการจัดส่งสินค้า', '保留中の出荷'],
      'Status2': ['待收货', 'Wait Take', '영수증 대기 중', 'ไม่ได้รับสินค้า', '保留中の領収書'],
      'copyYes': ['复制成功', 'success', '성공적인 사본', 'คัดลอกความสำเร็จ', 'コピーが成功しました'],
      'subCancelOrder': ['确定删除订单吗?', 'Confirm Cancel Order?', '주문을 삭제 하시겠습니까?', 'ยืนยันที่จะลบคำสั่งเหรอ？', '注文を削除してもよろしいですか？'],
      'goodName': ['商品名称', 'name', '상품명', 'ชื่อสินค้า', '製品名'],
      'goodBuyTime': ['购买时间', 'buy Time', '구매 시간', 'เวลาที่จะซื้อ', '購入時間'],
      'goodAllPrice': ['商品总价', 'all Price', '상품의 총 가격', 'สินค้าทั้งหมด', '商品の合計価格'],
      'allOrderTip': ['商家正在为您准备发货...', 'merchant is preparing the delivery', '상인이 선적을 준비 중입니다 ...', 'บริษัทจะจัดส่งสินค้าให้คุณแล้ว . . . . . . .', '商人があなたの荷物を準備しています...'],
      'CALL': ['拨打', 'call', '다이얼', 'โทร .', 'ダイヤル'],
      'BUSINESSPhone': ['商家电话', 'Phone', '업무용 전화', 'ธุรกิจโทรศัพท์', 'ビジネス電話'],
      'TradeSector': ['交易区', 'Trade Sector', '거래 지역', 'โซนธุรกิจ', '取引地域'],
      'TradeDetail': ['交易详情', 'Trade Detail', '거래 세부 정보', 'รายละเอียดของรายการ', '取引の詳細'],
      'GoodDetail': ['商品详情', 'Good Detail', '제품 세부 정보', 'รายละเอียดสินค้า', '製品の詳細'],
      'ConfirmOrder': ['确认订单', 'Confirm Order', '주문 확인', 'เพื่อยืนยันการสั่งซื้อ', '注文を確認する'],
      'GoodOrderDetail': ['订单详情', 'Good Order Detail', '주문 세부 정보', 'รายละเอียดสินค้า', '注文の詳細'],
      'classification': ['分类', 'SELECT TYPE', '분류', 'หมวดหมู่', '分類'],
      'ADDRESSAGNET': ['地址管理', 'ADDRESS AGNET', '주소 관리', 'การจัดการที่อยู่', 'アドレス管理'],
      'goodIsError': ['该商品已下架', 'The goods have been taken off shelves', '항목이 제거되었습니다.', 'สินค้านี้ถูกถอดวาง', 'アイテムが削除されました'],
      'Perperson': ['每人', 'Per person', '1 인당', 'แต่ละคน', '一人'],
      'payNotEmpty': ['支付密码不能为空！', 'Payment password cannot be empty！', '지불 비밀번호는 비워 둘 수 없습니다.', 'รหัสผ่านว่างเปล่าไม่ได้จ่าย', '支払いパスワードは空ではありません'],
      'crowdLower': ['众筹额度不能低于', 'The crowdfunding amount cannot be lower than ', '크라우드 펀딩 금액은', 'เพิ่มวงเงินทั้งสิ้นไม่ต่ำกว่า', 'クラウドファンディングの額は、'],
      'crowdMore': ['众筹额度不能超过', 'The crowdfunding cannot exceed', '크라우드 펀딩은 초과 할 수 없습니다.', 'และเพิ่มวงเงินไม่เกิน', '万円の額を超えてはならない'],
      'EndDay': ['天后结束', 'End of the day', '하루의 끝', 'วันสิ้นสุด', '後に終わる'],
      'BuyShop': ['购买', 'Buy', '구매', 'การซื้อ', '購入する'],
      'Shop': ['店铺', 'Shop', '가게', 'ร้าน', '店舗'],
      'submitOrder': ['提交订单', 'Submit Order', '주문 제출', 'ส่งคําสั่งซื้อ', '注文を提出する'],
      'inputMerchant': ['填写您需要协商的和商家确认', 'Fill in the required confirmation and merchant confirmation', '필수 확인서 및 판매자 확인서 작성', 'กรอกข้อมูลในแบบฟอร์มที่ต้องเจรจากับพ่อค้ายืนยัน', 'ご相談が必要となっている方とご確認ください'],
      'consigneenotempty': ['收货人不能为空', 'The consignee cannot be empty', '수취인은 비워 둘 수 없습니다.', 'ผู้รับจะว่างเปล่า', '受取人は暇ではない'],
      'correctPhone': ['请输入正确格式的手机号码', 'Please enter the phone number in the correct format', '전화 번호를 올바른 형식으로 입력하십시오.', 'โปรดระบุหมายเลขโทรศัพท์มือถือที่ถูกต้องในรูปแบบ'],
      'confirmPay': ['确认付款', 'Confirm PayMent', '지불 확인', 'ได้รับการยืนยันการชําระเงิน', '正しいフォーマットの携帯番号を入力してください'],
      'MyBalance': ['我的余额', 'My Balance', '내 잔액', 'ยอดคงเหลือของฉัน', '私の残高'],
      'insufficientBalance': ['抱歉，您的可用余额不足', 'Sorry, you have insufficient balance available', '죄송합니다. 사용 가능한 잔액이 부족합니다.', 'ขอโทษ , คุณสามารถมีความสมดุลไม่เพียงพอ', '申し訳ございませんが、ご利用の残高が足りません。'],
      'selectAddress': ['请先选择收货地址', 'Please select the shipping address first', '먼저 배송 주소를 선택하십시오.', 'กรุณาเลือกที่อยู่จัดส่ง', '先に入荷先を選択してください'],
      'minuteCancel': ['15分钟后未付款自动取消订单', 'Automatic cancellation of order after 15 minutes without payment', '결제없이 15 분이 지나면 자동으로 주문 취소', '15 นาทีโดยไม่ต้องชําระเงินอัตโนมัติยกเลิกการสั่งซื้อ', '15分後にご注文をキャンセルしていません'],
      'collectGoodTip': ['商家发货后，7天后系统默认买已收货', 'After the merchant delivers the goods, the system defaults to the received goods after 7 days.', '가맹점이 상품을 납품 한 후 시스템은 7 일 후에 수령 한 상품을 기본값으로 사용합니다.', 'พ่อค้าส่ง 7 วันหลังจากที่ซื้อสินค้าที่ได้รับการเริ่มต้นระบบ', 'メーカーが出荷した後、7日後にシステムのデフォルトを購入した。'],
      'collectConform': ['确定已收货吗？', 'Are you sure you have received the goods?', '물건을 받으셨습니까?', 'ให้แน่ใจว่าได้รับสินค้า ?', '入荷しましたか?'],
      'SendConform': ['确定发货吗？', 'Confirm shipment?', '발송 확정?', 'ตรวจสอบการจัดส่งสินค้า ?', '出荷を確定しますか'],
      'bankCard': ['银行卡号', 'Bank Card', '은행 카드 번호', 'หมายเลขบัตรเครดิต', '銀行のカード番号'],
      'Weekly': ['周线', 'Weekly', '매주', 'รายสัปดาห์', '周線'],
      'Monthly': ['月线', 'Monthly', '월간 회선', 'รายเดือน', '月線'],
      'All': ['全部', 'All', '모두', 'ทั้งหมด', 'すべて'],
      'Automatic': ['7天后自动默认收款', 'Automatic default receipt after 7 days', '7 일 후 자동 기본 영수증', '7 วันเริ่มต้นคอลเลกชันโดยอัตโนมัติ', '7日後に自動でデフォルトの入金'],
      'countdown': ['倒计时', 'countdown', '카운트 다운', 'นับถอยหลัง', 'カウントダウン'],
      'fillAddress': ['请把所在地区填写完整哦~', 'Please fill in the complete area', '귀하의 지역을 기입하십시오 ~', 'กรุณากรอกข้อมูลในพื้นที่ . . . . . . . .', '所在地を完全に記入してくださいね'],
      'noMoreDate': ['親，已經沒有更多數據啦~', 'No more data.', '네, 이미 많은 데이터가 없습니다.', 'โปรไม่มีข้อมูลเพิ่มเติม . . . . . . .', '親、もう多くのデータがありません。'],
      'waitBusinessSend': ['待商家发货...', 'To be shipped...', '상가를 발송하여 화물을 발송하다.', 'พ่อค้าส่งอยู่ . . . . . . .', '業者に出荷する'],
      'goToSendGood': ['去发货', 'Go to delivery', '발송', 'ไปที่สินค้า', '出荷に行く'],
      'waitCancelOrder': ['未付款15分钟后自动取消订单', 'Cancel the order automatically after 15 minutes without payment.', '지불하지 않은 15 분 후 자동 주문 취소', '15 นาทีโดยไม่ต้องชําระเงินโดยอัตโนมัติหลังจากการยกเลิกคําสั่งซื้อ', '未払い15分後に自動的に注文をキャンセルします'],
      'expressInfo': ['快递信息', 'Express information', '속달 정보', 'บริการข้อมูล', '速達情報'],
      'expressName': ['快递名称', 'Express name', '택배 이름', 'ชื่อบริการ', '宅配便'],
      'expressNumber': ['快递单号', 'Express number', '택배 번호', 'ไม่ด่วน', '宅配便'],
      'ConfirmationDelivery': ['确定发货', 'delivery', '발송 확인', 'เพื่อยืนยันการจัดส่ง', '出荷を確認する'],
      'CrowdfundStart': ['众筹活动还未开始，请耐心等待', 'Crowd raising activities have not yet started. Please be patient.', '대중 의 계획 이 아직 시작되지 않으니 참을성 있게 기다려 주십시오', 'และเพิ่มกิจกรรมยังไม่เริ่มรอ', 'イベントはまだ始まりませんので、お待ちください'],
      'buyCancelOrder': ['买家取消了订单', 'The buyer canceled the order', '구매자가 주문을 취소 함', 'ผู้ซื้อยกเลิกคำสั่งซื้อแล้ว', '買い手が注文をキャンセルしました'],
      'FinancialName': ['财富孵化园', 'Wealth Incubation Park', '웰스 인큐베이션 파크', 'บ่มเพาะธุรกิจการเงิน', 'ウェルス・インキュベーション・パーク'],
      'entercourier': ['请输入快递名称', 'Please enter the courier name', '택배 이름을 입력하십시오.', 'โปรดป้อนชื่อจัดส่ง', '宅配業者名を入力してください'],
      'enternumber': ['请输入快递单号', 'Please enter the courier number', '택배 이름을 입력하십시오.', 'โปรดป้อนหมายเลขจัดส่ง', '宅配番号を入力してください'],
      'underReview': ['区块审核中', 'Block review', '리뷰 차단', 'บล็อกความเห็น', 'ブロックレビュー'],
      'registerName': ['帳號', 'Account Number', '계좌 번호', 'เลขที่บัญชี', 'アカウント'],
      'registerEmail': ['綁定郵箱', 'Binding mailbox', '바인딩 메일박스', 'ผูกกล่องจดหมาย', 'メールボックス'],
      'registerInput': ['輸入郵箱驗證碼', 'Enter mailbox validation code', '메일박스 검증 코드 입력', 'ป้อนรหัสการตรวจสอบกล่องจดหมาย', 'メールアドレスの検証コード'],
      'registerAccountTip': ['帳號密碼[6~16比特數位與字母組合]', 'Account password [6~16 digit number and alphabet combination]', '계좌번호 [6 ~ 16 의 숫자 와 알파벳 조합]', 'アカウントのパスワード「6～16位の数字とアルファベット」', 'アカウントのパスワード「6～16位の数字とアルファベット」'],
      'registerTradePassword': ['交易密碼[6比特數位]', 'Transaction password [6 digit number]', 'รหัสผ่านการทำธุรกรรม 6 [ ตัวเลข ]', 'アカウントのパスワード「6～16位の数字とアルファベット」', 'パスワード「6桁」'],
      'invitedCode': ['邀請碼（必填）', 'Invitation code (Required)', '초대 코드 (필수)', 'รหัสเชิญ (จำเป็น)', '招待コード（必須）'],
      'goToregister': ['註冊', 'register', '책.', 'การลงทะเบียน', '登録する'],
      'sendCode': ['發送驗證碼', 'send Code', '검증 코드 보내기', 'การลงทะเบียน', '認証'],
      'nameFormat': ['帳號不能為空', 'The Account Number should be filled', '닉네임은 비워 둘 수 없습니다.', 'ชื่อเรียกจะว่างเปล่า', 'ニックネームは暇ではありません'],
      'codeFormat': ['驗證碼不能為空', 'verification code must be filled', '인증 코드는 비워 둘 수 없습니다.', 'รหัสการตรวจสอบจะว่างเปล่า', '検証コードは空けてはならない'],
      'emailFormat': ['郵箱格式不正確', 'The email format is incorrect', '검증 코드 형식이 정확하지 않습니다.', 'รหัสยืนยันไม่ถูกต้อง', '검증 코드 형식이 정확하지 않습니다.'],
      'haspassword': ['登入密碼不能為空', 'Login password cannot be empty', '로그인 비밀번호는 비워 둘 수 없습니다.', 'เข้าสู่ระบบรหัสผ่านว่างเปล่าไม่ได้', 'ログインパスワードを空にすることはできません'],
      'haspayPassword': ['交易密碼不能為空', 'Payment password cannot be empty', '지불 비밀번호는 비워 둘 수 없습니다.', 'รหัสผ่านว่างเปล่าไม่ได้จ่าย', 'パスワードを支払うことはできません'],
      'hasPayFormat': ['交易密碼格式不正確', 'Payment password format is incorrect', '결제 비밀번호 형식이 잘못되었습니다.', 'การชำระเงินรูปแบบรหัสผ่านไม่ถูกต้อง', 'パスワードフォーマットが正しくない'],
      'hasinvitePassword': ['邀請碼不能為空', 'Invitation code cannot be empty', '초대 코드는 비워 둘 수 없습니다.', 'รหัสเชิญจะว่างเปล่า', '招待コードが空になってはいけない'],
      'putIn': ['掛單中', 'In the list', '증기증', 'ในการพิจารณาสั่ง', '掛け値の中'],
      'hasfinished': ['已完結', 'Have finished', '완결', 'ได้จบลง', '終わりました'],
      'Cancel': ['取消', 'Cancel', '취소', 'ยกเลิก', '取り消す'],
      'priceType': ['價格類型', 'priceType', '가격 유형', 'ประเภทราคา', '価格タイプ'],
      'entrusPrice': ['委託價', 'Entrustment price', '위탁 가격', 'ประเภทราคา', '委託価格'],
      'entrustment': ['委託量', 'Entrustment', '위탁량', 'ปริมาณของลูกค้า', '依頼量'],
      'orderstatus': ['訂單狀態', 'Order status', '주문 상태', 'สถานะการสั่งซื้อ', '注文の状態'],
      'transaction': ['成交價', 'Transaction price', '거래가', 'ราคา', '成約価格'],
      'trandTime': ['時間', 'time', '시간', 'เวลา', '時間'],
      'tradewaiting': ['等待中', 'Waiting', '대기 중', 'ในการรอคอย', '待っている'],
      'tradeLimit': ['限價', 'Fixed price', '가격', 'จำกัด', '価格制限']
    };
    var newLangObj = {};
    var getLang = common._parseUrl('lang');
    var stroageLang = stroage.read('lang');
    var $__1 = ["zh-cn", "en-us", "ko-kr", "th-th", "ja-jp"],
        zh = ($__2 = $__1[Symbol.iterator](), ($__3 = $__2.next()).done ? void 0 : $__3.value),
        en = ($__3 = $__2.next()).done ? void 0 : $__3.value,
        ko = ($__3 = $__2.next()).done ? void 0 : $__3.value,
        th = ($__3 = $__2.next()).done ? void 0 : $__3.value,
        ja = ($__3 = $__2.next()).done ? void 0 : $__3.value;
    var _getLangObj = function(index) {
      for (var i in outLangObj) {
        newLangObj[i] = outLangObj[i][index];
      }
    };
    if (getLang) {
      stroage.write('lang', getLang);
      (getLang == zh && _getLangObj(0)) || (getLang == en && _getLangObj(1)) || (getLang == ko && _getLangObj(2)) || (getLang == th && _getLangObj(3)) || (getLang == ja && _getLangObj(4));
    } else {
      if (stroageLang) {
        (stroageLang == ja && _getLangObj(4)) || (stroageLang == th && _getLangObj(3)) || (stroageLang == ko && _getLangObj(2)) || (stroageLang == en && _getLangObj(1)) || (stroageLang == zh && _getLangObj(0));
      } else {
        _getLangObj(0);
      }
    }
    return newLangObj;
  };
  return LANGUAGE;
}(language || {}));

"use strict";
var myalert = (function(MYALERT) {
  MYALERT._msg = function(msg) {
    var $__2,
        $__3;
    var time = arguments[1] !== (void 0) ? arguments[1] : 1;
    var callback = arguments[2];
    if (!document.getElementById("_msg")) {
      common._formMask();
      var section = document.createElement('section');
      var html = ("\n\t\t\t  <div id='_msg'>\n\t\t\t      <span>" + msg + "</span>\n\t\t\t  </div>\n\t\t\t");
      section.innerHTML = html;
      document.body.appendChild(section);
      var msgDom = document.getElementById("_msg"),
          spanDom = document.querySelector("#_msg>span");
      var $__1 = [spanDom.offsetWidth, spanDom.offsetHeight],
          widths = ($__2 = $__1[Symbol.iterator](), ($__3 = $__2.next()).done ? void 0 : $__3.value),
          heights = ($__3 = $__2.next()).done ? void 0 : $__3.value;
      var bgDom = document.getElementById('bg');
      if (bgDom && bgDom.classList.contains("bg")) {
        bgDom.classList.add("layerZindex");
      }
      msgDom.setAttribute('style', ("width:" + (widths - 0 + 2) + "px;height:" + heights + "px"));
      if (time > 0) {
        var timer = setTimeout(function() {
          msgDom.parentNode.remove();
          common._removeMask();
          clearTimeout(timer);
          callback && (typeof callback == 'function') && callback();
        }, time * 1000);
      }
    }
  };
  MYALERT._confirm = function(options) {
    common._formMask();
    var section = document.createElement('section');
    var html = ("\n\t\t  <article class='" + options.myClass + "' id='_confirm'>\n\t\t      <div class='my-col-100'>\n\t\t         " + options.content + "\n\t\t      </div>\n\t\t  </article>\n\t\t");
    section.innerHTML = html;
    document.body.appendChild(section);
    var heights = document.querySelector("#_confirm>div").offsetHeight,
        closeDom = document.getElementById("_confirmClose"),
        confirmDom = document.getElementById("_confirm");
    confirmDom.setAttribute('style', ("height:" + heights + "px"));
    closeDom.onclick = function() {
      stroage.remove('labelLayer');
      var dom = document.getElementById('bg');
      if (dom && dom.classList.contains("zindex")) {
        dom.classList.remove("zindex");
      } else {
        common._removeMask();
      }
      confirmDom.parentNode.remove();
    };
    closeDom = null;
  };
  MYALERT._closeConfirm = function() {
    common._removeMask();
    document.getElementById("_confirmClose").onclick = null;
    document.getElementById("_confirm").remove();
  };
  return MYALERT;
}(myalert || {}));

"use strict";
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：', message);
  console.log('捕获到异常：', error);
};
window.addEventListener('error', function(error) {
  console.log('捕获到异常：', error);
}, true);

"use strict";
var plugin = (function(PLUGIN) {
  PLUGIN._openImg = function(srclink) {
    if (srclink) {
      common._formMask();
      var template = document.createElement('section');
      var background = ("url(" + srclink + ") 50% 50% / contain no-repeat");
      var html = ("\n\t\t\t  <div class='_openImg wrapper' id='_openImg' style='background:" + background + "'>\n\t\t\t  </div>\n\t\t\t");
      template.innerHTML = html;
      document.body.appendChild(template);
      var imgDom = document.getElementById("_openImg");
      imgDom.onclick = function() {
        common._removeMask();
        imgDom.parentNode.remove();
        imgDom = null;
      };
    }
  };
  PLUGIN.pullUpRefresh = function(obj) {
    var offset = arguments[1] !== (void 0) ? arguments[1] : 40;
    var callback = arguments[2];
    obj = obj ? obj : document.getElementById("list");
    var start,
        end,
        isLock = false,
        isCanDo = false,
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad,
        objparent = obj.parentNode;
    var fn = {
      translate: function(diff) {
        obj.style.cssText = ("-webkit-transform:translate(0," + diff + "px);transform:translate(0," + diff + "px);");
      },
      backTranlate: function() {
        obj.style.cssText = "transition-duration: 500ms;-webkit-transform:translate(0,0);transform:translate(0,0);";
      },
      setTranslition: function(time) {
        obj.style.cssText = ("-webkit-transition:all " + time + "s;transition:all " + time + "s");
      },
      back: function(my) {
        fn.backTranlate();
        isLock = false;
        isCanDo = false;
      }
    };
    obj.addEventListener('touchstart', function(e) {
      if (window.scrollY == 0) {
        if (objparent.scrollTop <= 0 && !isLock) {
          var even = typeof event == "undefined" ? e : event;
          isLock = true;
          start = 0;
          start = hasTouch ? even.touches[0].pageY : even.pageY;
          fn.setTranslition(0);
        }
      }
    }, true);
    obj.addEventListener('touchmove', function(e) {
      if (window.scrollY == 0) {
        isCanDo = true;
        if (objparent.scrollTop <= 0 && isCanDo) {
          var even = typeof event == "undefined" ? e : event;
          end = 0;
          end = hasTouch ? even.touches[0].pageY : even.pageY;
          if (start < end) {
            even.preventDefault();
            fn.setTranslition(0);
            fn.translate(end - start);
          }
        }
      }
    }, true);
    obj.addEventListener('touchend', function(e) {
      if (window.scrollY == 0) {
        if (isCanDo) {
          isCanDo = false;
          if (end - start >= 100) {
            fn.setTranslition(1);
            fn.backTranlate();
            if (typeof callback == "function") {
              document.getElementById("list") && axios.loading();
              callback.call(fn, e);
            }
          } else {
            fn.back();
          }
        }
      }
    }, true);
  };
  PLUGIN.goSlipping = function(that, typename, callback) {
    var obj = document.getElementById("index");
    var start,
        end,
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    obj.addEventListener('touchstart', function(e) {
      var even = typeof event == "undefined" ? e : event;
      start = hasTouch ? even.touches[0].pageX : even.pageX;
    });
    obj.addEventListener('touchmove', function(e) {
      var even = typeof event == "undefined" ? e : event;
      end = hasTouch ? even.touches[0].pageX : even.pageX;
    });
    obj.addEventListener('touchend', function(e) {
      if (that[typename] == 1 && start - end >= 140) {
        callback(that[typename] + 1);
      } else if (that[typename] == 2 && start - end <= -140) {
        callback(that[typename] - 1);
      }
    });
  };
  PLUGIN.photoCompress = function(file, w, objDiv) {
    axios.loading();
    var ready = new FileReader();
    ready.readAsDataURL(file);
    ready.onload = function() {
      var re = this.result;
      plugin.canvasDataURL(re, w, objDiv);
    };
  };
  PLUGIN.canvasDataURL = function(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function() {
      var that = this;
      var w = that.width,
          h = that.height,
          scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      var quality = 0.7;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var anw = document.createAttribute("width");
      anw.nodeValue = w;
      var anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      obj.quality && obj.quality <= 1 && obj.quality > 0 && (quality = obj.quality);
      var base64 = canvas.toDataURL('image/jpeg', quality);
      callback(base64);
    };
  };
  PLUGIN.convertBase64UrlToBlob = function(urlData) {
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  };
  return PLUGIN;
}(plugin || {}));

"use strict";
var regular = (function(REGULAR) {
  REGULAR._isPhone = function(phone) {
    var reg = /^1[34578]{1}[0-9]{9}$/;
    return reg.test(phone) === false ? true : false;
  };
  REGULAR._isEmail = function(email) {
    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(email) === false ? true : false;
  };
  REGULAR._isAccountPassword = function(password) {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    return reg.test(password) === false ? true : false;
  };
  return REGULAR;
}(regular || {}));

"use strict";
var stroage = (function(STROAGE) {
  STROAGE.write = function(key, value) {
    var curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({
      keyValue: value,
      time: curTime
    }));
  };
  STROAGE.read = function(key) {
    var value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      var time = JSON.parse(value).time;
      return (new Date().getTime() - time > 2592000000) ? null : JSON.parse(value).keyValue;
    }
  };
  STROAGE.remove = function(key) {
    localStorage.removeItem(key);
  };
  STROAGE.deleteItem = function() {
    localStorage.clear();
  };
  return STROAGE;
}(stroage || {}));

"use strict";
var webview = (function(WEBVIEW) {
  var httpUrl = 'http://www.eac.pgerp.cn/h5/';
  var u = navigator.userAgent;
  var isAndroid = u.includes('Android') || u.includes('Linux');
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  WEBVIEW._goOther = function(url) {
    if (isAndroid) {
      Android.goOther(httpUrl + url);
    } else if (isIOS) {
      window.webkit.messageHandlers.goOther.postMessage(httpUrl + url);
    } else {
      location.href = url;
    }
  };
  WEBVIEW._goBack = function() {
    if (isAndroid) {
      Android.goBack(1);
    } else if (isIOS) {
      window.webkit.messageHandlers.goBack.postMessage(1);
    } else {
      history.back(-1);
    }
  };
  WEBVIEW._checkDevice = function(ID) {
    var dom = document.getElementById(("" + ID));
    isIOS && dom && dom.removeAttribute("capture");
  };
  WEBVIEW._goToMap = function(longitude, latitude) {
    if (isAndroid) {
      Android.goToMap(longitude, latitude);
    } else if (isIOS) {
      window.webkit.messageHandlers.goToMap.postMessage((longitude + "," + latitude));
    }
  };
  return WEBVIEW;
}(webview || {}));
