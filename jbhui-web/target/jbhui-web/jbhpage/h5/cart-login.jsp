<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>购物车</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="购物车">
<meta name="Description" content="购物车">
<meta name="tp_page" content="CART_H5_HOME.0">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/cartNew.css" rel="stylesheet" type="text/css">
</head>
<body mycollectionplug="bind">
<!-- h5 global top -->
<style type="text/css">
.order_warning {
display:none;
}
.order_warning .warning_content {
position: fixed;
top: 50%;
left: 50%;
width: 75%;
text-align: center;
background-color: #fff;
z-index: 920;
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
}
.order_warning .warning_content .warning_title {
line-height: 18px;
padding: 30px 28px 0;
font-size: 1.4rem;
color: #333;
}
.order_warning .warning_content .warning_desc {
line-height: 22px;
padding: 0 28px;
margin-top: 18px;
font-size: 1.4rem;
color: #333;
white-space: nowrap;
}
.order_warning .warning_content .warning_desc span {
display: block;
}
.order_warning .warning_content .warning_desc strong {
color: #ff3c3c;
font-weight: normal;
}
.order_warning .warning_content .warning_tip {
line-height: 14px;
margin-top: 10px;
padding: 0 28px;
font-size: 1.2rem;
color: #999;
}
.order_warning .warning_content .order_detail {
padding: 0 28px;
margin-top: 38px;
}
.order_warning .warning_content .order_detail .detail_item {
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
height: 34px;
margin-top: 12px;
border: 1px #e6e6e6 solid;
text-align: center;
border-radius: 5px;
}
.order_warning .warning_content .order_detail .detail_item .item_desc {
-webkit-box-flex: 1;
-webkit-flex: 1;
-ms-flex: 1;
flex: 1;
line-height: 14px;
padding-left: 10px;
text-align: left;
}
.order_warning .warning_content .order_detail .detail_item .item_desc .price {
display: block;
padding-top: 4px;
color: #ff3c3c;
font-size: 1.2rem;
}
.order_warning .warning_content .order_detail .detail_item .item_desc .sort {
display: block;
color: #666;
font-size: 0.9rem;
}
.order_warning .warning_content .order_detail .detail_item .button {
display: block;
width: 80px;
line-height: 34px;
margin-top: -1px;
font-size: 1.2rem;
color: #fff;
background-color: #ff3c3c;
border-radius: 5px;
}
.order_warning .warning_content .bottom_btn {
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
height: 40px;
line-height: 40px;
margin-top: 20px;
}
.order_warning .warning_content .bottom_btn a {
-webkit-box-flex: 1;
-webkit-flex: 1;
-ms-flex: 1;
flex: 1;
display: block;
font-size: 1.4rem;
color: #999;
text-align: center;
background-color: #f5f5f5;
}
.order_warning .mask {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.6);
z-index: 904;
}
</style>
<div id="container">
<div class="layout_head">
<div class="touchweb-com_header ">
<a href="javascript:window.history.go(-1)" class="left icon-back">
</a>
<h1>购物车</h1>
<div class="rightBox">
</div>
</div>
</div>
<div class="layout_body">
<form method="post" action="" class="buycarForm" name="productForm" id="productForm">
<input type="hidden" value="252038638" id="userId">
<div class="touchweb_page-shopCart">
<div class="goods_box">
<div class="goods_box-title">
<label class="left">
<input type="checkbox" class="storeCheck check_box" checked="true">
<a class="link" href="javascript:void(0);">商品列表</a>
</label>
<div class="right">
<span class="cart_info">
</span>

</div>
</div> 
<div id="coupon_remind_-1" style="display:block"></div>
<div class="goods_box-body">
<div class="product_list">
<div class="product_list_wrap">
<input type="checkbox" class="check_box" checkouttype="0" id="1339388_0-2" checked="">
<div class="product_content">
<div class="product_box">
<div class="product_pic" data-tpa="GOTO_PRODUCT_DETAIL">
<img onclick="" data-tpa="GOTO_PRODUCT_DETAIL" src="<%=basePath %>res/jbh/resource/cart-goods.jpg">
</div>
<a class="product_con" href="javascript:void(0);">
<span class="product_title" onclick="javasript:window.location.href='goods-detail.html?id=1'">
妙洁 点断式增厚保鲜袋大号 35*25cm 150只装</span>
<p class="product_from">
</p>
<p class="cell_price">
<span class="sale_price">
¥9.9
</span>
</p>
</a>
<div class="product_option">
<div class="tool_num">
<div class="computing_act">
<input type="button" value="-" class="reduce" onclick="">
</div>
<div class="computing_num">
<select class="needsclick" name="1339388_0-2" onchange="javascript:inputBuynum('1339388_0-2','1',this);" v="1">
<option value="1" selected="true">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
<option value="32">32</option>
<option value="33">33</option>
<option value="34">34</option>
<option value="35">35</option>
<option value="36">36</option>
<option value="37">37</option>
<option value="38">38</option>
<option value="39">39</option>
<option value="40">40</option>
<option value="41">41</option>
<option value="42">42</option>
<option value="43">43</option>
<option value="44">44</option>
<option value="45">45</option>
<option value="46">46</option>
<option value="47">47</option>
<option value="48">48</option>
<option value="49">49</option>
<option value="50">50</option>
<option value="51">51</option>
<option value="52">52</option>
<option value="53">53</option>
<option value="54">54</option>
<option value="55">55</option>
<option value="56">56</option>
<option value="57">57</option>
<option value="58">58</option>
<option value="59">59</option>
<option value="60">60</option>
<option value="61">61</option>
<option value="62">62</option>
<option value="63">63</option>
<option value="64">64</option>
<option value="65">65</option>
<option value="66">66</option>
<option value="67">67</option>
<option value="68">68</option>
<option value="69">69</option>
<option value="70">70</option>
<option value="71">71</option>
<option value="72">72</option>
<option value="73">73</option>
<option value="74">74</option>
<option value="75">75</option>
<option value="76">76</option>
<option value="77">77</option>
<option value="78">78</option>
<option value="79">79</option>
<option value="80">80</option>
<option value="81">81</option>
<option value="82">82</option>
<option value="83">83</option>
<option value="84">84</option>
<option value="85">85</option>
<option value="86">86</option>
<option value="87">87</option>
<option value="88">88</option>
<option value="89">89</option>
<option value="90">90</option>
<option value="91">91</option>
<option value="92">92</option>
<option value="93">93</option>
<option value="94">94</option>
<option value="95">95</option>
<option value="96">96</option>
<option value="97">97</option>
<option value="98">98</option>
<option value="99">99</option>
</select>
</div>
<div class="computing_act">
<input type="button" value="+" class="add">
</div>
</div>
<i class="icon-rabish" onclick="delCartItem('1339388_0-2')"></i>
</div> </div>
</div>
</div>
</div>
</div>
</div>

</div>
</form>
</div>
<div class="layout_footer">
<div class="normal">
<label class="all_check" checked="true">
<input type="checkbox" class="all_check check_box" checked="true">
<br>
<span>
全选
</span>
</label>
<div class="checkout_info">
<span>
<span class="price">
¥9.9
</span>
<br>
<em>
商品(不含运费)
</em>
</span>
</div>
<a href="order-pay-1.html"  class="btn_checkout">
结算(1)
</a>
</div>
<div class="edit">
<label class="all_check" checked="true">
<input type="checkbox" class="check_box all_check" checked="true">
<span>
全选
</span>
</label>
<a href="javascript:;" class="btn_del">
删除
</a>
</div>
<input type="hidden" id="checkoutTypes" value="0">
</div>
</div>
<div style="display:none;">
<span style="color: #FFFFFF">1727203</span>
<nav></nav>
</div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>