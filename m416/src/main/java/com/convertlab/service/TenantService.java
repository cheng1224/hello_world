package com.convertlab.service;

import com.convertlab.beans.entity.Tenant;
import com.convertlab.beans.tenant.TenantEntity;

import java.util.List;


public interface TenantService {

    /**
     * 新增标签
     */
    public void addTenant (final TenantEntity tenantEntity) throws Exception;


    public List<Tenant> selectAll() throws Exception;

    int insert(Tenant tenant);

//    /**
//     * 新增标签集
//     */
//    public void addTags (final TagKeyEntity tagKeyEntity) throws Exception;
//
//    /**
//     * 查询所有标签
//     */
//    public PageListEntity<TagEntity> searchAllTags (final int page ,final int size) throws Exception;
//
//    /**
//     * 查询所有标签所属
//     */
//    public List<TagKey> searchAllTagKey () throws Exception;

}


