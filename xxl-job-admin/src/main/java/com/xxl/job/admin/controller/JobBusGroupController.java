package com.xxl.job.admin.controller;

import com.xxl.job.admin.controller.annotation.PermissionLimit;
import com.xxl.job.admin.core.model.XxlJobBusGroup;
import com.xxl.job.admin.core.model.XxlJobUser;
import com.xxl.job.admin.core.util.I18nUtil;
import com.xxl.job.admin.dao.XxlJobBusGroupDao;
import com.xxl.job.core.biz.model.ReturnT;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: GCC.
 * @Date: 2021/2/25 18:47
 */
@Controller
@RequestMapping("/jobbusgroup")
public class JobBusGroupController {

    @Resource
    private XxlJobBusGroupDao xxlJobBusGroupDao;

    @RequestMapping
    @PermissionLimit(adminuser = true)
    public String index(Model model) {

        // 执行器列表
        List<XxlJobBusGroup> groupList = xxlJobBusGroupDao.findAll();
        model.addAttribute("groupList", groupList);

        return "/jobbusgroup/jobbusgroup.index";
    }

    @RequestMapping("/pageList")
    @ResponseBody
    @PermissionLimit(adminuser = true)
    public Map<String, Object> pageList(@RequestParam(required = false, defaultValue = "0") int start,
                                        @RequestParam(required = false, defaultValue = "10") int length) {

        // page list
        List<XxlJobBusGroup> list = xxlJobBusGroupDao.pageList(start, length);

        // package result
        Map<String, Object> maps = new HashMap<String, Object>();
        maps.put("recordsTotal", list.size());		// 总记录数
        maps.put("recordsFiltered", list.size());	// 过滤后的总记录数
        maps.put("data", list);  					// 分页列表
        return maps;
    }

    @RequestMapping("/add")
    @ResponseBody
    @PermissionLimit(adminuser = true)
    public ReturnT<String> add(XxlJobBusGroup xxlJobBusGroup) {

        // valid username
        if (!StringUtils.hasText(xxlJobBusGroup.getName())) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, I18nUtil.getString("system_please_input")+I18nUtil.getString("jobinfo_busgroup_name") );
        }
        // write
        xxlJobBusGroupDao.insertSelective(xxlJobBusGroup);
        return ReturnT.SUCCESS;
    }

    @RequestMapping("/delete")
    @ResponseBody
    @PermissionLimit(adminuser = true)
    public ReturnT<String> delete(XxlJobBusGroup xxlJobBusGroup) {

        // valid id
        if (xxlJobBusGroup.getId()==null) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "ID不能为空");
        }
        // delete
        xxlJobBusGroupDao.deleteByPrimaryKey(xxlJobBusGroup.getId());
        return ReturnT.SUCCESS;
    }

    @RequestMapping("/update")
    @ResponseBody
    @PermissionLimit(adminuser = true)
    public ReturnT<String> update(XxlJobBusGroup xxlJobBusGroup) {

        // valid username
        if (!StringUtils.hasText(xxlJobBusGroup.getName())) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, I18nUtil.getString("system_please_input")+I18nUtil.getString("jobinfo_busgroup_name") );
        }
        // valid id
        if (xxlJobBusGroup.getId()==null) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "ID不能为空");
        }
        // write
        xxlJobBusGroupDao.updateByPrimaryKeySelective(xxlJobBusGroup);
        return ReturnT.SUCCESS;
    }

    @RequestMapping("/selectAll")
    @ResponseBody
    @PermissionLimit(adminuser = true)
    public ReturnT all() {
        // write
        List<XxlJobBusGroup> list = xxlJobBusGroupDao.findAll();
        if(CollectionUtils.isEmpty(list)){
            return new ReturnT(520,"业务组不存在，请添加业务组！");
        }
        return new ReturnT(list);
    }
}
