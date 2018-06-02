package com.convertlab.beans.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "play_record")
public class PlayRecord {
    /**
     * 期数
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String category;

    private String name;

    /**
     * 0 未开奖
1 已经开奖
     */
    @Column(name = "is_open")
    private String isOpen;

    @Column(name = "open_date")
    private Date openDate;

    private Integer num1;

    private Integer num2;

    private Integer num3;

    private Integer num4;

    private Integer num5;

    private Integer num6;

    private Integer num7;

    private Integer num8;

    private Integer num9;

    private Integer num10;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;

    /**
     * 获取期数
     *
     * @return id - 期数
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置期数
     *
     * @param id 期数
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return category
     */
    public String getCategory() {
        return category;
    }

    /**
     * @param category
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
     * 获取0 未开奖
1 已经开奖
     *
     * @return is_open - 0 未开奖
1 已经开奖
     */
    public String getIsOpen() {
        return isOpen;
    }

    /**
     * 设置0 未开奖
1 已经开奖
     *
     * @param isOpen 0 未开奖
1 已经开奖
     */
    public void setIsOpen(String isOpen) {
        this.isOpen = isOpen;
    }

    /**
     * @return open_date
     */
    public Date getOpenDate() {
        return openDate;
    }

    /**
     * @param openDate
     */
    public void setOpenDate(Date openDate) {
        this.openDate = openDate;
    }

    /**
     * @return num1
     */
    public Integer getNum1() {
        return num1;
    }

    /**
     * @param num1
     */
    public void setNum1(Integer num1) {
        this.num1 = num1;
    }

    /**
     * @return num2
     */
    public Integer getNum2() {
        return num2;
    }

    /**
     * @param num2
     */
    public void setNum2(Integer num2) {
        this.num2 = num2;
    }

    /**
     * @return num3
     */
    public Integer getNum3() {
        return num3;
    }

    /**
     * @param num3
     */
    public void setNum3(Integer num3) {
        this.num3 = num3;
    }

    /**
     * @return num4
     */
    public Integer getNum4() {
        return num4;
    }

    /**
     * @param num4
     */
    public void setNum4(Integer num4) {
        this.num4 = num4;
    }

    /**
     * @return num5
     */
    public Integer getNum5() {
        return num5;
    }

    /**
     * @param num5
     */
    public void setNum5(Integer num5) {
        this.num5 = num5;
    }

    /**
     * @return num6
     */
    public Integer getNum6() {
        return num6;
    }

    /**
     * @param num6
     */
    public void setNum6(Integer num6) {
        this.num6 = num6;
    }

    /**
     * @return num7
     */
    public Integer getNum7() {
        return num7;
    }

    /**
     * @param num7
     */
    public void setNum7(Integer num7) {
        this.num7 = num7;
    }

    /**
     * @return num8
     */
    public Integer getNum8() {
        return num8;
    }

    /**
     * @param num8
     */
    public void setNum8(Integer num8) {
        this.num8 = num8;
    }

    /**
     * @return num9
     */
    public Integer getNum9() {
        return num9;
    }

    /**
     * @param num9
     */
    public void setNum9(Integer num9) {
        this.num9 = num9;
    }

    /**
     * @return num10
     */
    public Integer getNum10() {
        return num10;
    }

    /**
     * @param num10
     */
    public void setNum10(Integer num10) {
        this.num10 = num10;
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