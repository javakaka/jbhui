<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String imgBasePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>编辑档案</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/admin/editor/kindeditor.js"></script>
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
			NAME: {
				required: true
			},
			SCHOOL: {
				required: true
			},
			SUMMARY: {
				required: true
			},
			ADDRESS: {
				required: true
			}
		}
	});
	
	KindEditor.ready(function(K) {
		$("input[id^='uploadButton_']").each(function(i,v){
			var obj = this;
			var index=i;
			var uploadbutton = K.uploadbutton({
				button : obj,
				fieldName : 'file',
				url : framework.base + "/upload/file/upload.do",
				afterUpload : function(data) {
					var m_type =data.message.type;
					var m_content =data.message.content;
					if (m_type =="success") {
						var url = K.formatUrl(data.url, 'absolute');
						K('#ICON_URL').val(url);
						$("#sumbImg").attr("src",url);
					} else {
						$.message(m_type,m_content);
					}
				},
				afterError : function(str) {
					$.message("error","上传图片出错:"+ str);
				}
			});
			uploadbutton.fileBox.change(function(e) {
				uploadbutton.submit();
			});
		});
	});

});
</script>
</head>
<body>
	<div class="path">
		公益管理 &raquo; 编辑档案
	</div>
	<form id="inputForm" action="update.do" method="post">
		<input type="hidden" id="ID" name="ID" class="text" maxlength="200" value="${row.ID}"/>
		<table class="input">
			<tr>
				<th>
					<span class="requiredField">*</span>缩略图:
				</th>
				<td>
					<input type="text" id="ICON_URL" name="ICON_URL" class="text" maxlength="200" readonly  value="${row.ICON_URL}"/>
					<input type="button" id="uploadButton_0" value="上传" />
					<img src="<%=imgBasePath%>${row.ICON_URL}" style="width:200px;height:200px;" id="sumbImg"/>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>姓名:
				</th>
				<td>
					<input type="text" id="NAME" name="NAME" class="text" maxlength="200" value="${row.NAME}"/>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>学校:
				</th>
				<td>
					<input type="text" id="SCHOOL" name="SCHOOL" class="text" maxlength="200" value="${row.SCHOOL}"/>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>资助计划:
				</th>
				<td>
					<textarea id="SUMMARY" name="SUMMARY" rows="5" cols="50">${row.SUMMARY}</textarea>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>地址:
				</th>
				<td>
					<input type="text" id="ADDRESS" name="ADDRESS" class="text" maxlength="200" value="${row.ADDRESS}"/>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>捐款来源:
				</th>
				<td>
					<input type="text" id="DONATION_SOURCE" name="DONATION_SOURCE" class="text" maxlength="200" value="${row.DONATION_SOURCE}"/>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>已资助金额:
				</th>
				<td>
					<input type="text" id="DONATION_MONEY" name="DONATION_MONEY" class="text" maxlength="200" value="${row.DONATION_MONEY}"/>
				</td>
			</tr>
			<tr>
				<th>
					状态:
				</th>
				<td>
					<select id="STATE" name="STATE" style="width:190px;" maxlength="200" >
						<c:choose>
							<c:when test="${row.STATE == '1'}">
								<option value="1" selected>资助中</option>
								<option value="0" >资助完成</option>
							</c:when>
							<c:when test="${row.STATE == '0'}">
								<option value="1" >资助中</option>
								<option value="0" selected>资助完成</option>
							</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
					</select>
				</td>
			</tr>
			<tr>
				<th>
					&nbsp;
				</th>
				<td>
					<input type="submit" class="button" value="<cc:message key="admin.common.submit" />" />
					<input type="button" id="backButton" class="button" value="<cc:message key="admin.common.back" />" />
				</td>
			</tr>
		</table>
	</form>
</body>
</html>