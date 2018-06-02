package com.convertlab.beans;

import com.convertlab.beans.entity.Tenant;

import java.util.List;


public class TenantResponse {

    private int status;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Tenant> getRows() {
        return rows;
    }

    public void setRows(List<Tenant> rows) {
        this.rows = rows;
    }

    private String message;

    private List<Tenant> rows;


}
