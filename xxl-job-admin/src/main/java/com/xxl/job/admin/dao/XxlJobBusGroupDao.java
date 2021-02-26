package com.xxl.job.admin.dao;

import com.xxl.job.admin.core.model.XxlJobBusGroup;
import com.xxl.job.admin.core.model.XxlJobUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface XxlJobBusGroupDao {
    int deleteByPrimaryKey(Integer id);

    int insert(XxlJobBusGroup record);

    int insertSelective(XxlJobBusGroup record);

    XxlJobBusGroup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(XxlJobBusGroup record);

    int updateByPrimaryKey(XxlJobBusGroup record);

    List<XxlJobBusGroup> findAll();

    public List<XxlJobBusGroup> pageList(@Param("offset") int offset,
                                     @Param("pagesize") int pagesize);
}