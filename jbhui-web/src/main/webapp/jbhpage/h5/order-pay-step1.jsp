<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String goodsParam =request.getParameter("goods");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>结算页</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="结算页">
<meta name="Description" content="结算页">
<meta name="tp_page" content="CHECKOUT_H5_HOME.0">
<link href="<%=basePath %>res/jbh/resource/global_site_baseNoFont.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/checkoutIndex.css" rel="stylesheet" type="text/css">
</head>
<body >
<!-- h5 global top -->
<div id="container">
<input type="hidden" id="errorMsg" value="">
<input type="hidden" id="errorMsgToCart" value="">
<input type="hidden" id="checkboxStr" value="1339388_0-2=1">
<input type="hidden" id="checkoutError" value="">
<input type="hidden" id="checkoutGoBack" value="">
<input type="hidden" id="splitCheckout" value="">
<input type="hidden" id="checkoutType" value="">
<form method="post" name="checkout_productForm" id="checkout_productForm">
<input type="hidden" name="checkboxStr" id="from_checkboxStr">
</form>
<div class="touchweb_page-order">
<div class="public_com-header">
<!-- left start -->
<a href="javascript:window.history.go(-1);" class="left icon-back"></a>
<!-- left end -->
<!-- title start -->
<h1>确认订单
</h1>
<!-- title end -->
</div>
<!--  -->
<a class="userInfo" href="<%=basePath %>/user/address/list.do?redirect=<%=basePath%>/user/order/create-step1.do?goods=<%=goodsParam%>" data-tpa="MODIFY_ADDRESS">
	<c:if test="${isHaveDefaultAddress == 1 }">
		<input type="hidden" id="receiverId" value="${addressRow.ID }">
		<div class="name">
		<span>收货人：</span><em><span id="receiverNameCn">${addressRow.RECEIVE_NAME }</span> &nbsp;&nbsp; ${addressRow.RECEIVE_TEL }</em>
		</div>
		<div class="address">${addressRow.PROVINCE_NAME } &nbsp;&nbsp; ${addressRow.CITY_NAME } &nbsp;&nbsp; ${addressRow.REGION_NAME } &nbsp;&nbsp; ${addressRow.ADDRESS }</div>
	</c:if>
	<c:if test="${isHaveDefaultAddress == 0 }">
	您当前没有默认收货地址，点击选择或者新建
	</c:if>
</a>
<input type="hidden" id="provinceId" value="20">
<input type="hidden" id="cityId" value="237">
<input type="hidden" id="countyId" value="2288">
<div class="touchweb_com-package">
<div class="b_wrapper">
<div class="title">
<div class="source"></div>
<div class="number">1个包裹</div>
</div>
<div style="display:none;" groupid="1" id="packageGroup_1" data-tpa="CHANGE_DELIVERY" data-trackersend="1">

<ul id="packageOrderMark_1">
<li ordermark="1_1_1"></li>
</ul>
<div id="deliveryDate_1">
<ul displayid="1" methodid="10001" displayname="普通快递" selectedflag="1" deliveryfee="0">
</ul>
</div>
</div>
<div class="p_wrapper">
<ul class="product_list">
<c:forEach items="${goods_list }" var="goods" varStatus="status">
	<li>
		<a class="product_wrapper" href="javascript:void(0);">
			<c:if test="${ empty goods.FILE_PATH }">
				<img src="<%=basePath %>res/jbh/resource/images/goods-list-default.png" alt="">
			</c:if>
			<c:if test="${ ! empty goods.FILE_PATH }">
				<img src="${goods.FILE_PATH }" alt="">
			</c:if>
			<div class="info">
				<p class="content">${goods.NAME }</p>
				<div class="icons">
					<span class="icon-support_return icon-support_return"></span>支持7天无理由退货
				</div>
			</div>
			<div class="price">
				<c:if test="${ !empty goods.IS_COUPON && goods.IS_COUPON == 1 }">
				<span class="totol_price">￥${goods.COUPON_PRICE }</span>
				</c:if>
				<c:if test="${ empty goods.IS_COUPON || goods.IS_COUPON == 0 }">
				<span class="totol_price">￥${goods.RAW_PRICE }</span>
				</c:if>
				<span class="count">X${goods.CART_NUM }</span>
			</div>
		</a>
	</li>
</c:forEach>
</ul>
<div class="express">
	<a href="javascript:;" class="content " groupid="1">
		<span class="desc">预计商品下单后1天送达</span>
	</a>
	<span class="cost">运费<span class="focus">￥${orderTransMoney }</span></span>
</div>
</div>
</div>
</div>
<input type="hidden" id="fastByPhoneFlag" name="fastByPhoneFlag" value="0">
<div class="payment" >
<div class="payment">
<div class="pay_way">
<div class="content">支付方式</div>
</div>
</div>
<div class="pay_option_list">
<div class="item">
<label class="content">
<input class="radioH5" name="onPayment" type="radio" paymenttype="1" paymentid="1" checked="checked">
<div class="option_desc">网上支付</div>
</label>
</div>
</div>
</div>
<!-- 
<div id="invoiceModel" class="payment">
1、是否需要发票 
<div class="pay_way">
<div class="content">
需要发票
</div>
<input class="checkbox need_invoice" type="checkbox">
<input type="hidden" id="isNeedInvoice" value="false">
<input type="hidden" id="3cInvoice" value="false">
<input type="hidden" id="provinceId" value="20">
<input type="hidden" id="contain1mallProduct" value="false">
<input type="hidden" id="recommendedElectronic" value="true">
</div>

 2、发票正文 
<div class="invoice">
发票模块初始化展示
 1、对于发票类型：默认是电子发票，如果电子发票不允许时，默认纸质发票
 2、发票类型确定后，附带的下面信息取上一次用户保存的发票信息 
<input type="hidden" id="defaultInvoiceTitle" value="李明">
<input type="hidden" id="defaultInvoiceTitleType" value="0">
<input type="hidden" id="defaultInvoiceContent" value="日用品">
<input type="hidden" id="defaultElectronic" value="1">
----------------------------------2.1、发票类型（纸质/电子）----------------------------------------------
<div class="v_content invoice_type">
<select class="v_select needsclick" name="v_type" id="v_type">
<option value="invoice_electron">电子发票</option>
<option value="invoice_paper">纸质发票</option>
</select>
<i class="icon-down_arrow"></i>
</div>
----------------------------------2.2、电子发票---------------------------------------------------------
--选择电子发票，个人（不可选择单位），右侧默认为收货人地址中的手机号码，如果地址中只有固定电话则显示空白。
<div class="input_flex_box" id="invoice_electron_id">
<div class="v_type">
<select class="v_select" name="v_type" id="select_electron_invoice_owner">
<option value="invoice_company">公司</option>
<option value="invoice_personal">个人</option>
</select>
<i class="icon-down_arrow"></i>
</div>
<input type="text" placeholder="请输入发票抬头" class="company_name hide">
<div class="text personal" id="electron_personal">
<span>收票人手机</span>
<input type="text" class="phone" value="1382*****36">
</div>
</div>
<div class="input_invoice_personal hide" id="invoice_electron_id_phone">
<div class="text">
<span>收票人手机</span>
<input type="text" class="phone" value="1382*****36">
</div>
</div>
----------------------------------2.3、纸质发票---------------------------------------------------------
--选择纸质发票时，抬头类型可选择个人或者单位。选择个人，带出收货人姓名（不可修改）；选择单位，右侧输入框输入发票抬头。
<div class="input_flex_box hide" id="invoice_paper_id">
<div class="v_type">
<select class="v_select" name="v_type" id="select_invoice_owner">
<option value="invoice_company">公司</option>
<option value="invoice_personal">个人</option>
</select>
<i class="icon-down_arrow"></i>
</div>
<input type="text" placeholder="请输入发票抬头" class="company_name">
<input type="text" class="user_name hide" value="李明" disabled="">
</div>
----------------------------------tips----------------------------------------------------------
<div id="elecInvoiceTips" class="v_type-content">
<p>电子发票是税务局认可的有效付款凭证，支持企业报销，请先确认所属公司是否支持。
</p>
<p class="text_link"><a href="">发票制度<i class="icon-right_arrow"></i></a></p>
</div>
----------------------------------2.4、发票内容----------------------------------------------------------
<div class="v_content">
<select class="v_select" name="v_type" id="invoiceContent">
<option value="0">请选择发票内容</option>
<option value="酒">酒</option>
<option value="食品">食品</option>
<option value="饮料">饮料</option>
<option value="玩具">玩具</option>
<option value="日用品">日用品</option>
<option value="装修材料">装修材料</option>
<option value="化妆品">化妆品</option>
<option value="办公用品">办公用品</option>
<option value="学生用品">学生用品</option>
<option value="家居用品">家居用品</option>
<option value="饰品">饰品</option>
<option value="服装">服装</option>
<option value="箱包">箱包</option>
<option value="精品">精品</option>
<option value="家电">家电</option>
<option value="劳防用品">劳防用品</option>
<option value="耗材">耗材</option>
<option value="电脑配件">电脑配件</option>
<option value="汽车用品和汽车配件">汽车用品和汽车配件</option>
<option value="体育用品及器材">体育用品及器材</option>
</select>
<i class="icon-down_arrow"></i>
</div>
----------------------------------2.5、提示-------------------------------------------------
<p>温馨提示：数码、手机、家电类商品，将根据您订购商品的全称和型号开具内容随单发送
</p>
</div>
</div>

-->
<input type="hidden" id="isHaigouAuth" value="0">
<input type="hidden" id="isSamCardAuth" value="0">
<div class="payment" id="valid_code_div" style="display:none"></div>
<div class="submit_box" >
<div class="order_totol_cost">
<span class="totol_cost">合计：<span class="cost"><span class="small">￥</span>
${orderMoney }
</span></span>
</div>
<a href="javascript:;" class="submit" id="submitBtn">提交订单</a>
</div>
<input type="hidden" name="validCodeSig" id="validCodeSig">
</div>
</div>
<!-- 订金预售 活动规则 弹窗 -->
<div class="pop_prepares_rule hide">
<div class="main">
<div class="head">活动规则</div>
<div class="body">
<ol>
<li>活动时间：（商品详情页仅在付定金期间展示相关信息）
<ol>
<li>定金支付时间：请见商品详情页及活动页面展示。</li>
<li>尾款支付时间：请见商品详情页、活动页面以及订单详情页展示。</li>
</ol>
</li>
<li>定金预售——普通预售，用户按照对应活动时间分别支付定金/尾款。</li>
<li>定金预售——阶梯价：所有用户最终支付的商品预售价会因总付定金人数不同而不同。阶梯价总共分为三个阶段，每个阶段对应的人数及预售价可见商品详情页；最终需支付订单金额会在付尾款前统一变更，其按照相应阶段对应的商品预售价计算。</li>
<li>定金预售——满减：定金预售商品可参与满减活动，具体满减金额可见商品详情页、订单详情页。</li>
<li>定金预售——定金膨胀，定金可抵用金额请见商详页，用户实付商品金额为：实付价=预售价—（抵用金额-定金）。</li>
<li>参与定金预售的商品及信息详见商品商详页。同一订单仅限购买一种定金预售商品，且定金预售商品不能与普通商品一同购买，如拟购买的定金预售商品可以多件购买，则在购买限额内，同一订单同种商品可购买多件。</li>
<li>定金预售商品的定金及尾款支付均仅支持支付宝线上支付，不可使用1号店礼品卡、余额，不可使用抵用券。</li>
<li>选购预售商品后，您需在提交订单后30分钟内完成在线定金支付，未在限期内支付完毕定金的，订单将被自动取消。一旦定金支付完毕则您与商家构成有效定金合同关系。定金一旦支付成功，您不得自行取消订单，否则定金不予退回。</li>
<li>您需在尾款支付时间内完成全额尾款的支付（即：预售价与定金之差），待商家正式邮件确认发货后，预售商品的订购合同即告成立。如您未按时支付尾款，订单将被自动取消，但已支付的定金不予退回。</li>
<li>定金预售商品的发货时间以定金预售商品详情页面“预计发货时间”描述为准。如您的商品在您与商家确认之时间内未予以发货的，您可以申请赔付。(定金膨胀活动，仅针对定金进行赔付)在申请审核通过后，您已经支的付定金与尾款会退还，等值于定金的赔付款将返还至您的1号店返利账户；而您的订单将取消，您将不再收到货物。</li>
<li>由于商品本身质量等问题所需的退换货，与普通订单相同。请按照1号店的退换货规则予以进行。</li>
<li>本规则未尽事宜，以《1号店用户服务协议》及1号店网站其他相关规定或/和说明为准。</li>
</ol>
</div>
<div class="foot">
<a href="javascript:;" class="btn btn_confirm">我已认真阅读并确认活动规则</a>
<a href="javascript:;" class="btn btn_cancel">取消</a>
</div>
</div>
</div>
<div class="pop_layer">
<section class="touchweb_com-expressPicker show">
<div class="p_header">
<a href="javascript:;" class="close icon-clear"></a>
</div>
<div class="picker">
<div class="selector s1">
<div class="s_header">配送日期</div>
<div class="slider" style="height: 414.4px;">
<ul class="slider_ul" id="deliveryDate">
</ul>
</div>
</div>
<div class="selector s2">
<div class="s_header"><span class="s_header_title t1">时间段</span><span class="s_header_title t2">费用</span></div>
<div class="slider" style="height: 414.4px;">
<ul class="slider_ul" id="deliveryTime">
</ul>
</div>
</div>
</div>
<footer class="p_footer">
<a href="javascript:;" class="ensure">确定</a>
</footer>
</section>
</div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/utils.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/order-pay-step1.js"></script>
</body>
</html>