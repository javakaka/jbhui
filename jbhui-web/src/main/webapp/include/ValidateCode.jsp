<%@page contentType="image/jpeg" %>
<jsp:useBean id="image" scope="page" class="com.ezcloud.framework.util.ValidateCode" />
<%
String code=image.makeValidateCode(0,0,response.getOutputStream());
session.setAttribute("validateCode", code);
out.clear();
out = pageContext.pushBody();
%>