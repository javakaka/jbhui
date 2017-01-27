<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>订单详情</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/h5orderDetail.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" ></a>
<h1>订单详情</h1>
</div>
<div class="wrapper">
<font color="red" id="rebuyNews" style="display:none">重新购买失败</font>
<font color="red" id="cancelOk" style="display:none">取消订单成功</font>
<font color="red" id="cancelFail" style="display:none">取消订单失败</font>
<!--定金预售进度条S-->
<!--定金预售进度条 E-->
<div class="order_module basic_info">
<p class="module_title">基本信息</p>
<table class="order_detail_wrapper">
<tbody><tr>
<td>订单编号</td>
<td>${order.ORDER_NO }</td>
</tr>
<tr>
<td>下单时间</td>
<td>${order.CREATE_TIME }</td>
</tr>
<tr>
<td>收货地址</td>
<td>
<p>${address.RECEIVE_NAME }</p>
<p>${address.PROVINCE_NAME }&nbsp;${address.CITY_NAME }&nbsp;${address.REGION_NAME }</p>
<p> ${address.ADDRESS }</p>
<p>${address.RECEIVE_TEL }</p>
</td>
</tr>
<tr>
<td>包裹数</td>
<td>
1
个<span class="attachment">（含${order.TOTAL_GOODS_NUM }件商品）</span></td>
</tr>
<tr>
<td>支付方式</td>
<td class="pay_content">
网上支付
</td>
</tr>
<tr>
<td>共需支付</td>
<td class="amount"><span class="payment">¥${order.MONEY }</span><span class="attachment">（含${order.TRANSFER_FEE }元运费）</span></td>
</tr>
<tr>
<td colspan="2">
<c:if test="${order.STATE == 0 }">
	<a  href="javascript:detailOrderPay();" class="pay_now" id="payBtn">立即支付</a>
</c:if>
</td>
</tr>
</tbody></table>
</div>
<!-- 包裹及配送信息 -->
<div class="order_module package_infos">
<p class="module_title">包裹及配送信息</p>
<input type="hidden" value="1339388" name="rebuyPmId">
<input type="hidden" value="1" name="rebuyNum">
<div class="package">
<p class="store_type"></p>
<div class="package_detail">
<p class="title">
<a>
<span>包裹1</span>
<span class="delivery_time">
</span>
</a>
</p>
<a href="" class="items a_link" >
	<ul>
		<c:forEach items="${goodsList }" var="goods" varStatus="status">
			<li>
			<c:if test="${!empty goods.FILE_PATH }">
				<img src="${goods.FILE_PATH }" />
			</c:if>
			<c:if test="${empty goods.FILE_PATH }">
				<img src="<%=basePath%>res/jbh/resource/images/goods-list-default.png" />
			</c:if>
			</li>
		</c:forEach>
	</ul>
	<span>共${order.TOTAL_GOODS_NUM }件</span>
</a>
<p class="bottom truck">
<a>
<em>
<c:if test="${order.STATE == 0 }">未支付</c:if>
<c:if test="${order.STATE == 1 }">付款中</c:if>
<c:if test="${order.STATE == -1 }">已取消</c:if>
<c:if test="${order.STATE != 0  && order.STATE != 1 && order.STATE != -1}">已支付</c:if>
</em>
</a>
</p>
</div>
</div>
</div>
<!-- 价格清单 -->
<div class="order_module charge_info">
<p class="module_title">价格清单</p>
<ul>
<li>
商品总额
<span>¥${order.MONEY - order.TRANSFER_FEE}</span>
</li>
<li>
运费
<span>¥${order.TRANSFER_FEE }</span>
</li>

<c:if test="${order.STATE == 0 }">
<li>
还需支付
<span class="payment">¥${order.MONEY}</span>
</li>
</c:if>
</ul>
</div>
<!-- 发票信息 -->
</div>
<!-- 顶部选项弹出框浮层 -->
<div class="more_option" id="more_option">
<a href="javascript:;" id="cancelOrder">取消订单</a>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</body>
<c:if test="${order.STATE == 0 }">
<script>
	var goods_id=request("goods_id");
	var from_user=request("from_user");
 	var appId ="${appId}";
    var timestamp ="${timestamp}";
    var nonceStr ="${nonceStr}";
    var signature ="${signature}";
    
    var pay_timestamp ="${pay_timestamp}";
    var pay_noncestr ="${pay_noncestr}";
    var pay_package ="${pay_package}";
    var pay_signtype ="${pay_signtype}";
    var pay_paysign ="${pay_paysign}";
    /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 如有问题请通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
      debug: false,
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'chooseWXPay'
      ]
  });
/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
  // 10 微信支付接口
  // 10.1 发起一个支付请求
 function detailOrderPay() {
	 console.log("begin pay................................");
	 wx.chooseWXPay({
 	      timestamp: '${pay_timestamp}', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
 	      nonceStr: '${pay_noncestr}', // 支付签名随机串，不长于 32 位
 	      package: '${pay_package}', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
 	      signType: '${pay_signtype}', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
 	      paySign: '${pay_paysign}', // 支付签名
 	      success: function (res) {
 	          // 支付成功后的回调函数
 	          showMsg('支付成功')
 	          $("#payBtn").hide();
 	         var url =SITE_PATH+"/user/order/finish.do";
 	    	 url +="?id="+request("id")+"&token=${pay_token}";
 	    	 window.location.href=url;
 	      }
 	  	});
	wx.error(function (res) {
	 // alert(res.errMsg);
	  showMsg(res.errMsg)
	});
 };
 </script>
</c:if>
</html>