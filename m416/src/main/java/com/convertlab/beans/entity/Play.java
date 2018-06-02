package com.convertlab.beans.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "play")
public class Play {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 0 彩票类
1 棋牌类
     */
    private String category;

    private String name;

    @Column(name = "group_id")
    private Integer groupId;

    /**
     * 游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖
     */
    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "is_machine")
    private String isMachine;

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
     * 获取0 彩票类
1 棋牌类
     *
     * @return category - 0 彩票类
1 棋牌类
     */
    public String getCategory() {
        return category;
    }

    /**
     * 设置0 彩票类
1 棋牌类
     *
     * @param category 0 彩票类
1 棋牌类
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return group_id
     */
    public Integer getGroupId() {
        return groupId;
    }

    /**
     * @param groupId
     */
    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    /**
     * 获取游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖
     *
     * @return start_time - 游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * 设置游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖
     *
     * @param startTime 游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖
     */
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    /**
     * @return end_time
     */
    public Date getEndTime() {
        return endTime;
    }

    /**
     * @param endTime
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * @return is_machine
     */
    public String getIsMachine() {
        return isMachine;
    }

    /**
     * @param isMachine
     */
    public void setIsMachine(String isMachine) {
        this.isMachine = isMachine;
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