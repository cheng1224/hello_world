package com.convertlab.beans.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "play_bet")
public class PlayBet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "play_id")
    private String playId;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "bet_money")
    private Long betMoney;

    @Column(name = "tenant_id")
    private Integer tenantId;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return play_id
     */
    public String getPlayId() {
        return playId;
    }

    /**
     * @param playId
     */
    public void setPlayId(String playId) {
        this.playId = playId;
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
     * @return bet_money
     */
    public Long getBetMoney() {
        return betMoney;
    }

    /**
     * @param betMoney
     */
    public void setBetMoney(Long betMoney) {
        this.betMoney = betMoney;
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
     * @return date_created
     */
    public Date getDateCreated() {
        return dateCreated;
    }

    /**
     * @param dateCreated
     */
    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    /**
     * @return last_updated
     */
    public Date getLastUpdated() {
        return lastUpdated;
    }

    /**
     * @param lastUpdated
     */
    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}