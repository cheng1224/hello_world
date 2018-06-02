package com.convertlab.beans.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "token")
public class Token {
    @Id
    @Column(name = "token_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tokenId;

    @Column(name = "app_id")
    private String appId;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "tenant_id")
    private Integer tenantId;

    private String token;

    private Integer expires;

    @Column(name = "expired_on")
    private Date expiredOn;

    @Column(name = "device_id")
    private String deviceId;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "created_on")
    private Date createdOn;

    private Date timestamp;

    /**
     * @return token_id
     */
    public Integer getTokenId() {
        return tokenId;
    }

    /**
     * @param tokenId
     */
    public void setTokenId(Integer tokenId) {
        this.tokenId = tokenId;
    }

    /**
     * @return app_id
     */
    public String getAppId() {
        return appId;
    }

    /**
     * @param appId
     */
    public void setAppId(String appId) {
        this.appId = appId;
    }

    /**
     * @return customer_id
     */
    public Integer getCustomerId() {
        return customerId;
    }

    /**
     * @param customerId
     */
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    /**
     * @return tenant_id
     */
    public Integer getTenantId() {
        return tenantId;
    }

    /**
     * @param tenantId
     */
    public void setTenantId(Integer tenantId) {
        this.tenantId = tenantId;
    }

    /**
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * @return expires
     */
    public Integer getExpires() {
        return expires;
    }

    /**
     * @param expires
     */
    public void setExpires(Integer expires) {
        this.expires = expires;
    }

    /**
     * @return expired_on
     */
    public Date getExpiredOn() {
        return expiredOn;
    }

    /**
     * @param expiredOn
     */
    public void setExpiredOn(Date expiredOn) {
        this.expiredOn = expiredOn;
    }

    /**
     * @return device_id
     */
    public String getDeviceId() {
        return deviceId;
    }

    /**
     * @param deviceId
     */
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    /**
     * @return is_deleted
     */
    public Boolean getIsDeleted() {
        return isDeleted;
    }

    /**
     * @param isDeleted
     */
    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    /**
     * @return created_on
     */
    public Date getCreatedOn() {
        return createdOn;
    }

    /**
     * @param createdOn
     */
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    /**
     * @return timestamp
     */
    public Date getTimestamp() {
        return timestamp;
    }

    /**
     * @param timestamp
     */
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}