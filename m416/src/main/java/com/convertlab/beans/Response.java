package com.convertlab.beans;

import java.util.List;
import java.util.Map;

/**
 * Created by yue on 17/2/4.
 */
public class Response {
    private int status;

    private String message;

    private List<Map<String , Object>> data;

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

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
}
