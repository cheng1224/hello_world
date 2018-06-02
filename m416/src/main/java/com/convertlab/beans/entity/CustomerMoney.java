package com.convertlab.beans.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "customer_money")
public class CustomerMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 0 充值、提现
1 游戏输赢

     */
    private String category;

    private Long money;

    @Column(name = "money_total")
    private Long moneyTotal;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "tenant_id")
    private Integer tenantId;

    @Column(name = "is_play")
    private String isPlay;

    @Column(name = "play_type")
    private String playType;

    @Column(name = "play_id")
    private Integer playId;

    /**
     * 0 金额减少
1 金额增加
     */
    @Column(name = "is_add")
    private String isAdd;

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
     * 获取0 充值、提现
1 游戏输赢

     *
     * @return category - 0 充值、提现
1 游戏输赢

     */
    public String getCategory() {
        return category;
    }

    /**
     * 设置0 充值、提现
1 游戏输赢

     *
     * @param category 0 充值、提现
1 游戏输赢

     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * @return money
     */
    public Long getMoney() {
        return money;
    }

    /**
     * @param money
     */
    public void setMoney(Long money) {
        this.money = money;
    }

    /**
     * @return money_total
     */
    public Long getMoneyTotal() {
        return moneyTotal;
    }

    /**
     * @param moneyTotal
     */
    public void setMoneyTotal(Long moneyTotal) {
        this.moneyTotal = moneyTotal;
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
     * @return is_play
     */
    public String getIsPlay() {
        return isPlay;
    }

    /**
     * @param isPlay
     */
    public void setIsPlay(String isPlay) {
        this.isPlay = isPlay;
    }

    /**
     * @return play_type
     */
    public String getPlayType() {
        return playType;
    }

    /**
     * @param playType
     */
    public void setPlayType(String playType) {
        this.playType = playType;
    }

    /**
     * @return play_id
     */
    public Integer getPlayId() {
        return playId;
    }

    /**
     * @param playId
     */
    public void setPlayId(Integer playId) {
        this.playId = playId;
    }

    /**
     * 获取0 金额减少
1 金额增加
     *
     * @return is_add - 0 金额减少
1 金额增加
     */
    public String getIsAdd() {
        return isAdd;
    }

    /**
     * 设置0 金额减少
1 金额增加
     *
     * @param isAdd 0 金额减少
1 金额增加
     */
    public void setIsAdd(String isAdd) {
        this.isAdd = isAdd;
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