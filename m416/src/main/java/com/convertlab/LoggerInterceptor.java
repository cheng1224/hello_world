package com.convertlab;

import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

/**
 * Created by yue on 17/5/8.
 */
@Component
public class LoggerInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(LoggerInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse httpServletResponse, Object o) throws Exception {
        String x_request_id = req.getHeader("x_request_id");

        if(Strings.isNullOrEmpty(x_request_id)){
            x_request_id = UUID.randomUUID().toString().replace("-", "");
        }
        MDC.put("x_request_id", x_request_id);
        String tenantId = req.getHeader("x_tenant_id");
        if (Strings.isNullOrEmpty(tenantId)) {
            tenantId =req.getParameter("x_tenant_id");
        }
        MDC.put("x_tenant_id", tenantId);
        long begin_nao_time = System.currentTimeMillis();
        req.setAttribute("begin_time", begin_nao_time);

        //验证用户的有效性，是否token过期，获取tenant_id,
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {


    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        long begin_nao_time = (Long) httpServletRequest.getAttribute("begin_time");
        long interval = System.currentTimeMillis() - begin_nao_time;
        String uri = httpServletRequest.getRequestURI();
        if(interval > 5000){
            log.info("Request time：" +interval+" url："+ uri );
        }
        MDC.remove("x_request_id");
        MDC.remove("x_tenant_id");
    }
}
