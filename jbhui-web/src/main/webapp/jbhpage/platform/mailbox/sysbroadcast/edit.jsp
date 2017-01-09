<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String contextBasePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>编辑消息</title>
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
			TITLE: {
				required: true,
			},
		ID: "required",
		STATE: "required",
		CONTENT: "required"
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
						$('#iconVeiw').attr("src",url);
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
		站内信管理 &raquo; 编辑消息
	</div>
	<form id="inputForm" action="update.do" method="post">
		<table class="input">
			<tr>
				<th>
					<span class="requiredField">*</span>标题:
				</th>
				<td>
					<input type="text" id="TITLE" name="TITLE" class="text" maxlength="200" value="${row.TITLE}"/>
					<input type="hidden" id="ID" name="ID" class="text" maxlength="200"  value="${row.ID}" />
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>简介:
				</th>
				<td>
					<textarea type="text" id="SUMMARY" name="SUMMARY"  rows="2" cols="50" >${row.SUMMARY}</textarea>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>状态:
				</th>
				<td>
					<select id="STATE" name="STATE" style="width:190px;">
					<c:choose>
							<c:when test="${row.STATE ==1}">
								<option value="">请选择...</option>
								<option value="1" selected>启用</option>
								<option value="2">停用</option>
							</c:when>
							<c:when test="${row.STATE ==2}">
								<option value="">请选择...</option>
								<option value="1" >启用</option>
								<option value="2" selected>停用</option>
							</c:when>
							<c:otherwise>
								<option value="" selected>请选择...</option>
								<option value="1" >启用</option>
								<option value="2">停用</option>
							</c:otherwise>
						</c:choose>
						</select>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>是否置顶:
				</th>
				<td>
					<select id="IS_TOP" name="IS_TOP" style="width:190px;">
					<c:choose>
							<c:when test="${row.IS_TOP ==0}">
								<option value="">请选择...</option>
								<option value="0" selected>否</option>
								<option value="1">是</option>
							</c:when>
							<c:when test="${row.STATE ==1}">
								<option value="">请选择...</option>
								<option value="0" >否</option>
								<option value="1" selected>是</option>
							</c:when>
							<c:otherwise>
								<option value="" selected>请选择...</option>
								<option value="1" >否</option>
								<option value="2">是</option>
							</c:otherwise>
						</c:choose>
						</select>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>标题图片:
				</th>
				<td>
					<input type="text" id="ICON_URL" name="ICON_URL" class="text" maxlength="200" readonly  value="${row.ICON_URL}"/>
					<input type="button" id="uploadButton_0" value="上传" />
				</td>
			</tr>
			<tr>
				<th>
					图片预览:
				</th>
				<td>
					<img id="iconVeiw" name="iconVeiw" src="${row.ICON_URL}" width="150px" height="150px" />
				</td>
			</tr>
			<tr>
				<th>
					消息详情:
				</th>
				<td>
					<textarea id="editor" name="CONTENT" class="editor">${row.CONTENT}</textarea>
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