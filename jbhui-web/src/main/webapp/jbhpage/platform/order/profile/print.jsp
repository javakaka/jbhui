<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>打印订单信息</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/input.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript">
$().ready(function() {
	var $inputForm = $("#inputForm");
	
	//[@flash_message /]
	
	// 表单验证
	$inputForm.validate({
		rules: {
			ID: "required",
			MONEY: "required"
		},
		messages:{
			MONEY:{
				required: "订单金额不能为空"
			}
		}
	});
	
});
</script>
</head>
<body>
	<div class="path">
	</div>
	<input type="hidden" name="ID" class="text" maxlength="200" value="${row.ID}"/>
		<table class="input">
		<tr>
				<th>
					用户信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					姓名： ${row.USERNAME} 手机:${row.TELEPHONE}
				</td>
			</tr>
			<tr>
				<th>
					订单编号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					${row.ORDER_NO}
				</td>
			</tr>
			<tr>
				<th>
					订单金额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					${row.MONEY}
				</td>
			</tr>
			<tr>
				<th>
					支付方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					<c:choose>
						<c:when test="${row.PAY_TYPE == 2}">支付宝支付
						</c:when>
						<c:when test="${row.PAY_TYPE == 5}">水票支付
						</c:when>
						<c:when test="${row.PAY_TYPE == 4}">货到付款
						</c:when>
						<c:otherwise>未付款
						</c:otherwise>
					</c:choose>
				</td>
			</tr>
			<tr>
				<th>
					支付状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					<c:choose>
						<c:when test="${row.STATE == 0}">待付款
						</c:when>
						<c:when test="${row.STATE == 1}">已付款未到账
						</c:when>
						<c:when test="${row.STATE == 2}">已到账待收货
						</c:when>
						<c:when test="${row.STATE == 3}">已收货
						</c:when>
						<c:otherwise>待付款
						</c:otherwise>
					</c:choose>
				</td>
			</tr>
			<tr>
				<th>
					送货地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					邮编：${row.ZIP_CODE} 详细地址：${row.ADDRESS} 收货人：${row.RECEIVE_NAME} 收货人电话：${row.RECEIVE_TEL}
				</td>
			</tr>
			<tr>
				<th>
					期望配送时间:
				</th>
				<td>
					${row.ORDER_MESSAGE}
				</td>
			</tr>
			<tr>
				<th>
					配送员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					${row.DELIVERY_NAME }
				</td>
			</tr>
			<tr>
				<th>
					配送状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
				</th>
				<td>
					<c:choose>
						<c:when test="${row.TRANSFER_STATE == 0}">未配送
						</c:when>
						<c:when test="${row.TRANSFER_STATE == 1}">配送中
						</c:when>
						<c:when test="${row.TRANSFER_STATE == 2}">配送完成
						</c:when>
						<c:otherwise>未配送
						</c:otherwise>
					</c:choose>
				</td>
			</tr>
		</table>
		<div style="width: 200px; margin: 0 auto;font-size: 16px;font-weight: bold;">
		订单商品列表
		</div>
		<table id="listTable" class="list" >
		<tr>
			<th>
				<a href="javascript:;" >商品名称</a>
			</th>
			<th>
				<a href="javascript:;" >商品数量</a>
			</th>
			<th>
				<a href="javascript:;" >商品价格</a>
			</th>
			<th>
				<a href="javascript:;" >商品金额小记</a>
			</th>
		</tr>
		<c:forEach items="${items}" var="item" varStatus="status">
			<tr>
				<td>
					${item.GOODS_NAME }
				</td>
				<td>
					${item.GOODS_NUM }
				</td>
				<td>
					${item.GOODS_PRICE }
				</td>
				<td>
					${item.GOODS_MONEY }
				</td>
			</tr>
		</c:forEach>
		</table>
		<div style="width: 200px; margin: 0 auto;">
			<input type="button" class="button" value="打印"  onclick="window.print()"/>
			<input type="button" id="backButton" class="button" value="<cc:message key="admin.common.back" />" />
		</div>
</body>
</html>