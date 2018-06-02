package com.convertlab.service;



import java.util.*;

import com.convertlab.beans.entity.Tenant;
import com.convertlab.beans.mapper.TenantMapper;
import com.convertlab.beans.tenant.TenantEntity;
import com.convertlab.controllers.TenantController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service("TenantService")
@Transactional
public class TenantServiceImpl implements TenantService {

    private static final Logger log = LoggerFactory.getLogger(TenantServiceImpl.class);

    @Autowired
    protected JdbcTemplate ads;

    @Autowired(required = false)
    protected TenantMapper tenantMapper;

    @Override
    public void addTenant(final TenantEntity tenant) throws Exception {
        try {
//            final String sql = BeanOperator.getSqlByObject(SqlTypes.INSERT, obj);
            fillCreatedInfo(tenant);
//            String sql = "insert into tenant('id','name','type','owner','version','create_user','date_created','update_user','last_updated','status','customer_type','channel_source','su_id','remark','category','industry','customer_code') values ";
            String sql = "insert into tenant('name','type','date_created','last_updated') values ";
            sql += "(?,?,?,?)";
            int state = ads.update(sql, tenant.getName(), tenant.getType(), tenant.getDate_created(), tenant.getLast_updated());
            if (1 != state) {
                log.error("insert tag failed!");
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw e;
        }
    }

    public List<Tenant> selectAll(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:mybatis-config.xml");
        return tenantMapper.selectAll();
    }

    @Override
    public int insert(Tenant tenant) {
        tenant = new Tenant();
        tenant.setCategory("0");
        tenant.setName("test");
        tenant.setDateCreated(new Date());
        tenant.setLastUpdated(new Date());
        int result = tenantMapper.insert(tenant);
        return result;
    }

    public void fillCreatedInfo(TenantEntity tenant){
        tenant.setDate_created(new Date());
        tenant.setLast_updated(new Date());
    }

}
