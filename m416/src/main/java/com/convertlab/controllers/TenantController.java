package com.convertlab.controllers;

import com.convertlab.beans.*;
import com.convertlab.beans.entity.Tenant;

import com.convertlab.service.TenantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


import java.util.*;


@RestController
@EnableAsync
@Component
public class TenantController {

    private static final Logger log = LoggerFactory.getLogger(TenantController.class);



    @Autowired
    protected TenantService tenantService;

    @RequestMapping(value = "/query/tenant/{tenant_id}", method = RequestMethod.POST)
    public String queryColumnValues(@PathVariable("tenant_id") int tenant_id){
        TenantResponse res = new TenantResponse();

        try {
            List<Tenant> list = tenantService.selectAll();
            res.setRows(list);
            res.setStatus(200);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(res);
        } catch (Exception e) {
            log.error("column value query error {}", e);
            res.setMessage("处理错误，请联系管理员");
            res.setStatus(500);
            ObjectMapper mapper = new ObjectMapper();
            try {
                return mapper.writeValueAsString(res);
            } catch (Exception ex) {
                ex.printStackTrace();
                return "error";
            }

        }
    }

    @RequestMapping(value = "/add/tenant/{tenant_id}", method = RequestMethod.POST)
    public String insertTenant(@RequestBody Tenant tenant, @PathVariable("tenant_id") int tenant_id){
        Response res = new Response();

        try {
            int result = tenantService.insert(tenant);
            res.setMessage(String.valueOf(result));
            res.setStatus(200);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(res);
        } catch (Exception e) {
            log.error("column value query error {}", e);
            res.setMessage("处理错误，请联系管理员");
            res.setStatus(500);
            ObjectMapper mapper = new ObjectMapper();
            try {
                return mapper.writeValueAsString(res);
            } catch (Exception ex) {
                ex.printStackTrace();
                return "error";
            }

        }
    }



//    @RequestMapping(value = "/ads/query/{tenant_id}", method = RequestMethod.POST)
//    public String queryDashboard(@RequestBody DashboardQuery query, @PathVariable("tenant_id") int tenant_id) {
//        Response res = new Response();
//
//        try {
//            String sql_str = customerQuery.getQuery(query, tenant_id);
//
//            log.info("customer query sql is {}", sql_str);
//            List<Map<String, Object>> data = ads.queryForList(sql_str);
//            data = customerQuery.revampByDate(data, query);
//            res.setData(data);
//            res.setStatus(200);
//            ObjectMapper mapper = new ObjectMapper();
//            return mapper.writeValueAsString(res);
//        } catch (Exception e) {
//            log.error("customer query error {}", e);
//            res.setMessage("处理错误，请联系管理员");
//            res.setStatus(500);
//            ObjectMapper mapper = new ObjectMapper();
//            try {
//                return mapper.writeValueAsString(res);
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                return "error";
//            }
//
//        }
//    }



}
