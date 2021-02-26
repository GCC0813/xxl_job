package com.xxl.job.admin.core.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 
 * 
 */
public class XxlJobBusGroup{

    private Integer id;

    private String name;


    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public XxlJobBusGroup(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public XxlJobBusGroup() {
    }
}