package com.jbh.interceptor.h5;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.Row;

public class UserLoginIntercepter implements HandlerInterceptor{

	private static Logger logger = Logger.getLogger(UserLoginIntercepter.class);
	private String mappingURL;//利用正则映射到需要拦截的路径    
    public void setMappingURL(String mappingURL) {    
           this.mappingURL = mappingURL;    
    }
    
    public String[] allowUrls;
	public void setAllowUrls(String[] allowUrls)
	{  
		this.allowUrls = allowUrls;  
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String url=request.getRequestURL().toString();   
		logger.info("1、preHandle-->>url-->>"+url);
		boolean projectValid =isProjectOverTime();
		if(! projectValid )
		{
			sendError( request,response);
			return false;
		}
		String requestUrl = request.getRequestURI().replace(request.getContextPath(), "");
        if(null != allowUrls && allowUrls.length >=1 )
        {
        	for(String allowUrl : allowUrls)
        	{    
        		if(requestUrl.contains(allowUrl))
        		{
        			logger.info("this uri do not need filter-->>"+allowUrl);
        			return true;
        		}    
        	}  
        }  
        
        HttpSession session =request.getSession();
        Row memberRow =(Row)session.getAttribute("member");
        if( memberRow == null )
        {
        	sendError(request,response);
        	return false;
        }
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.info("2、postHandle-------------------------------->>");
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception exp)
			throws Exception {
		logger.info("3、afterCompletion-----------------------------response CharacterEncoding>>"+response.getCharacterEncoding());
		if(exp != null)
		{
			logger.info("------------------- Exception Info "+exp.getMessage());
		}
		
	}
	
	public void sendError(HttpServletRequest request,HttpServletResponse response) throws IOException, JException
	{
		response.setContentType("text/plain;charset=utf-8");
		response.setHeader("pragma", "no-cache");
		response.setCharacterEncoding("UTF-8");
		response.sendRedirect(request.getContextPath()+"/h5-login.do");
	}
	
	public boolean isProjectOverTime() throws IOException, JException
	{
		boolean bool =true;
		String propPath ="/system.properties";
		Resource resource = new ClassPathResource(propPath);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String projectState =props.getProperty("system.project.state");
		String timeEnd =props.getProperty("system.project.time.end");
		if(StringUtils.isEmptyOrNull(projectState))
		{
			logger.debug("未配置项目的状态key：system.project.state");
			bool =false;
			return bool;
		}
		if(projectState.equals("0") && ! StringUtils.isEmptyOrNull(timeEnd))
		{
			String curTime =DateUtil.getCurrentDateTime();
			long minus =DateUtil.getDayMinusOfTwoTime(curTime, timeEnd);
			logger.debug("判断项目到期时间，剩余天数为："+minus);
			if(minus <= 0)
			{
				bool =false;
				return bool;
			}
		}
		else
		{
			logger.debug("没有配置项目到期时间，默认为不需要判断有效期");
			return true;
		}
		return bool;
	}

}
