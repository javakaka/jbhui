package com.jbh.controller.h5.admin;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.service.system.SystemUpload;
import com.ezcloud.framework.util.MapUtils;
import com.ezcloud.framework.util.Message;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsAttributeService;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;

@Controller("hslgPlatformGoodsController")
@RequestMapping({"/jbhpage/platform/goods/profile"})
public class GoodsContrller extends BaseController
{

  @Resource(name = "hslgGoodsTypeService")
  private GoodsTypeService goodsTypeService;

  @Resource(name="hslgGoodsService")
  private GoodsService goodsService;
  
  @Resource(name="hslgGoodsAttributeService")
  private GoodsAttributeService goodsAttributeService;

  @Resource(name="frameworkUploadService")
  private SystemUpload systemUploadService;

  @RequestMapping({"/list"})
  public String list(Pageable pageable, ModelMap model)
  {
    Page page = this.goodsService.queryPage(pageable);
    model.addAttribute("page", page);
    this.goodsService.getRow().clear();
    return "/jbhpage/platform/goods/profile/list";
  }

  @RequestMapping("/add")
  public String add(String id, ModelMap model) {

    return "/jbhpage/platform/goods/profile/add";
  }
  
  @RequestMapping("/save")
  @ResponseBody
  public ResponseVO save(@RequestParam HashMap<String, String> map, RedirectAttributes redirectAttributes) throws Exception { ResponseVO ovo = new ResponseVO();
    Row row = MapUtils.convertMaptoRowWithoutNullField(map);
    String id = row.getString("id", "");
    row.remove("TYPE_NAME");
    int rowNum = 0;
    if (StringUtils.isEmptyOrNull(id))
    {
    	row.put("left_num", row.getString("total_num","0"));
    	rowNum = this.goodsService.insert(row);
    }
    else
    {
      rowNum = this.goodsService.update(row);
    }
    if (rowNum > 0)
    {
      ovo = new ResponseVO(1, "success", "success");
      ovo.put("id", row.getString("id"));
    }
    else
    {
      ovo = new ResponseVO(-1, "fail", "fail");
    }
    return ovo; 
    }
  
  @RequestMapping("/saveDetail")
  @ResponseBody
  public ResponseVO saveDetail(@RequestParam HashMap<String, String> map, RedirectAttributes redirectAttributes) throws Exception { ResponseVO ovo = new ResponseVO();
	  Row row = MapUtils.convertMaptoRowWithoutNullField(map);
	  String detail =row.getString("detail","");
	  if(! StringUtils.isEmptyOrNull(detail))
	  {
		  detail =detail.replace("'", "''");
		  row.put("detail", detail);
	  }
	  
	  int rowNum = 0;
	  rowNum = goodsService.update(row);
	  if (rowNum > 0)
	  {
		  ovo = new ResponseVO(1, "success", "success");
		  ovo.put("id", row.getString("id"));
	  }
	  else
	  {
		  ovo = new ResponseVO(-1, "fail", "fail");
	  }
	  return ovo;
  }

  @RequestMapping("/edit")
  public String edit(String id, ModelMap model) throws Exception
  {
    Row row = new Row();
//    DataSet picture_list =new DataSet();
    if (!StringUtils.isEmptyOrNull(id))
    {
//      row = this.goodsService.findDetail(id);
      row = goodsService.findDetailWithoutPicture(id);
//      picture_list =goodsService.findPictureList(id);
    }
    model.addAttribute("row", row);
//    model.addAttribute("picture_list", picture_list);
    return "/jbhpage/platform/goods/profile/edit";
  }

  /**
   * 商品缩略图、图文详情
   * @param id
   * @param model
   * @return
   * @throws Exception
   */
  @SuppressWarnings("unchecked")
  @RequestMapping("/detail")
  public String queryGoodsDetail(String id, ModelMap model) throws Exception
  {
    DataSet ds = new DataSet();
    DataSet detail_ds = new DataSet();
    if (!StringUtils.isEmptyOrNull(id))
    {
      ds = this.systemUploadService.getAttachList(id, "goods_icon");
      detail_ds = this.systemUploadService.getAttachList(id, "goods_detail_icon");
    }
    Setting setting = SettingUtils.get();
    String site_url = setting.getSiteUrl();
    if (StringUtils.isEmptyOrNull(site_url))
    {
      site_url = "";
    }
    if (ds != null)
    {
      for (int i = 0; i < ds.size(); i++)
      {
        Row row = (Row)ds.get(i);
        String path = row.getString("path", "");
        if (!StringUtils.isEmptyOrNull(path))
        {
          path = site_url + path.replace("..", "");
          row.put("path", path);
          ds.set(i, row);
        }
      }
    }
    if (detail_ds != null)
    {
    	for (int i = 0; i < detail_ds.size(); i++)
    	{
    		Row row = (Row)detail_ds.get(i);
    		String path = row.getString("path", "");
    		if (!StringUtils.isEmptyOrNull(path))
    		{
    			path = site_url + path.replace("..", "");
    			row.put("path", path);
    			detail_ds.set(i, row);
    		}
    	}
    }
    Row goodsRow =goodsService.findRemark(id);
    String detail ="";
    if(goodsRow != null )
    {
    	detail =goodsRow.getString("detail","");
    }
    model.addAttribute("dataset", ds);
    model.addAttribute("datail_dataset", detail_ds);
    model.addAttribute("detail", detail);
    model.addAttribute("id", id);
    return "/jbhpage/platform/goods/profile/detail";
  }

  @RequestMapping("/update")
  public String update(@RequestParam HashMap<String, String> map, RedirectAttributes redirectAttributes) throws Exception {
    Row row = MapUtils.convertMaptoRowWithoutNullField(map);
    this.goodsService.update(row);
    addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
    return "redirect:list.do";
  }
  @RequestMapping("/delete")
  @ResponseBody
  public Message delete(String[] ids) {
    this.goodsService.delete(ids);
    return SUCCESS_MESSAGE;
  }

  @RequestMapping(value={"/check_name"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  @ResponseBody
  public boolean checkName(String NAME)
  {
    if (StringUtils.isEmptyOrNull(NAME))
    {
      return false;
    }
    return this.goodsTypeService.isNameExisted(NAME);
  }

  @RequestMapping(value={"/check_extra_name"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  @ResponseBody
  public boolean checkExtraName(String ID, String NAME)
  {
    if (StringUtils.isEmptyOrNull(NAME))
    {
      return false;
    }
    return this.goodsTypeService.isExtraNameExisted(ID, NAME);
  }
}