package com.convertlab.beans.entity;

import javax.persistence.*;

@Table(name = "card_dimension")
public class CardDimension {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer color;

    private Integer number;

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
     * @return color
     */
    public Integer getColor() {
        return color;
    }

    /**
     * @param color
     */
    public void setColor(Integer color) {
        this.color = color;
    }

    /**
     * @return number
     */
    public Integer getNumber() {
        return number;
    }

    /**
     * @param number
     */
    public void setNumber(Integer number) {
        this.number = number;
    }
}