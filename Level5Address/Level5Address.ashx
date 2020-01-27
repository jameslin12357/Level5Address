<%@ WebHandler Language="C#" Class="Level5Address" %>

using JJLBS_Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OracleClient;
using System.Linq;
using System.Web;


/// <summary>
/// Level5Address 的摘要说明
/// </summary>
public class Level5Address : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        if (context.Request.HttpMethod.ToLower() == "get")
        {
            if (context.Request.QueryString["m"] == "GetBuildings")
            {
                context.Response.Write(GetBuildings(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsPaginated")
            {
                context.Response.Write(GetBuildingsPaginated(context));
            }
            if (context.Request.QueryString["m"] == "Regionexists")
            {
                context.Response.Write(Regionexists(context));
            }
            if (context.Request.QueryString["m"] == "DetailsVillage")
            {
                context.Response.Write(DetailsVillage(context));
            }
            if (context.Request.QueryString["m"] == "Regionexists2")
            {
                context.Response.Write(Regionexists2(context));
            }
            if (context.Request.QueryString["m"] == "DetailsBuilding")
            {
                context.Response.Write(DetailsBuilding(context));
            }
            if (context.Request.QueryString["m"] == "IndexByFilter")
            {
                context.Response.Write(IndexByFilter(context));
            }
            if (context.Request.QueryString["m"] == "IndexByFilterAll")
            {
                context.Response.Write(IndexByFilterAll(context));
            }
            if (context.Request.QueryString["m"] == "IndexByFilter2")
            {
                context.Response.Write(IndexByFilter2(context));
            }
            if (context.Request.QueryString["m"] == "IndexByFilterAll2")
            {
                context.Response.Write(IndexByFilterAll2(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsNotOnMap")
            {
                context.Response.Write(GetBuildingsNotOnMap(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsNotOnMapMCMY")
            {
                context.Response.Write(GetBuildingsNotOnMapMCMY(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsNotOnMapJNTR")
            {
                context.Response.Write(GetBuildingsNotOnMapJNTR(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsJNSYJYL")
            {
                context.Response.Write(GetBuildingsJNSYJYL(context));
            }
            if (context.Request.QueryString["m"] == "GetStreetsDefaultOld")
            {
                context.Response.Write(GetStreetsDefaultOld(context));
            }
            if (context.Request.QueryString["m"] == "GetStreetsDefault")
            {
                context.Response.Write(GetStreetsDefault(context));
            }
            if (context.Request.QueryString["m"] == "GetCommunitiesDefault")
            {
                context.Response.Write(GetCommunitiesDefault(context));
            }
            if (context.Request.QueryString["m"] == "GetVillagesDefault")
            {
                context.Response.Write(GetVillagesDefault(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsDefault")
            {
                context.Response.Write(GetBuildingsDefault(context));
            }
            if (context.Request.QueryString["m"] == "GetAll")
            {
                context.Response.Write(GetAll(context));
            }
            if (context.Request.QueryString["m"] == "GetAllStreets")
            {
                context.Response.Write(GetAllStreets(context));
            }
            if (context.Request.QueryString["m"] == "GetAllStreetsPag")
            {
                context.Response.Write(GetAllStreetsPag(context));
            }
            if (context.Request.QueryString["m"] == "GetStreetsByCOUNTYID")
            {
                context.Response.Write(GetStreetsByCOUNTYID(context));
            }
            if (context.Request.QueryString["m"] == "GetStreetsByCOUNTYIDPag")
            {
                context.Response.Write(GetStreetsByCOUNTYIDPag(context));
            }
            if (context.Request.QueryString["m"] == "GetCommunitiesBySTREETID")
            {
                context.Response.Write(GetCommunitiesBySTREETID(context));
            }
            if (context.Request.QueryString["m"] == "GetCommunitiesBySTREETIDPag")
            {
                context.Response.Write(GetCommunitiesBySTREETIDPag(context));
            }
            if (context.Request.QueryString["m"] == "GetVillagesByCOMMUNITYID")
            {
                context.Response.Write(GetVillagesByCOMMUNITYID(context));
            }
            if (context.Request.QueryString["m"] == "GetVillagesByCOMMUNITYIDPag")
            {
                context.Response.Write(GetVillagesByCOMMUNITYIDPag(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsByVILLAGEID")
            {
                context.Response.Write(GetBuildingsByVILLAGEID(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildingsByVILLAGEIDPag")
            {
                context.Response.Write(GetBuildingsByVILLAGEIDPag(context));
            }

            if (context.Request.QueryString["m"] == "GetAllCommunities")
            {
                context.Response.Write(GetAllCommunities(context));
            }
            if (context.Request.QueryString["m"] == "GetAllVillages")
            {
                context.Response.Write(GetAllVillages(context));
            }



        }
        if (context.Request.HttpMethod.ToLower() == "post")
        {
            if (context.Request.QueryString["m"] == "CreateVillages")
            {
                context.Response.Write(CreateVillages(context));
            }
            //if (context.Request.QueryString["m"] == "CreateVillage")
            //{
            //    context.Response.Write(CreateVillage(context));
            //}
            if (context.Request.QueryString["m"] == "CreateStreet")
            {
                context.Response.Write(CreateStreet(context));
            }
            if (context.Request.QueryString["m"] == "CreateCommunity")
            {
                context.Response.Write(CreateCommunity(context));
            }
            if (context.Request.QueryString["m"] == "CreateVillage")
            {
                context.Response.Write(CreateVillage(context));
            }
            if (context.Request.QueryString["m"] == "CreateBuilding")
            {
                context.Response.Write(CreateBuilding(context));
            }
            //if (context.Request.QueryString["m"] == "EditVillage")
            //{
            //    context.Response.Write(EditVillage(context));
            //}
            if (context.Request.QueryString["m"] == "EditStreet")
            {
                context.Response.Write(EditStreet(context));
            }
            if (context.Request.QueryString["m"] == "EditCommunity")
            {
                context.Response.Write(EditCommunity(context));
            }
            if (context.Request.QueryString["m"] == "EditVillage")
            {
                context.Response.Write(EditVillage(context));
            }
            if (context.Request.QueryString["m"] == "EditBuilding")
            {
                context.Response.Write(EditBuilding(context));
            }
            //if (context.Request.QueryString["m"] == "DeleteVillage")
            //{
            //    context.Response.Write(DeleteVillage(context));
            //}
            if (context.Request.QueryString["m"] == "DeleteStreet")
            {
                context.Response.Write(DeleteStreet(context));
            }
            if (context.Request.QueryString["m"] == "DeleteCommunity")
            {
                context.Response.Write(DeleteCommunity(context));
            }
            if (context.Request.QueryString["m"] == "DeleteVillage")
            {
                context.Response.Write(DeleteVillage(context));
            }
            //if (context.Request.QueryString["m"] == "CreateBuildings")
            //{
            //    context.Response.Write(CreateBuildings(context));
            //}
            //if (context.Request.QueryString["m"] == "CreateBuilding")
            //{
            //    context.Response.Write(CreateBuilding(context));
            //}
            //if (context.Request.QueryString["m"] == "EditBuilding")
            //{
            //    context.Response.Write(EditBuilding(context));
            //}
            if (context.Request.QueryString["m"] == "DeleteBuilding")
            {
                context.Response.Write(DeleteBuilding(context));
            }
        }
    }

    /// <summary>
    /// 获取小区相关楼宇
    /// </summary>
    /// <param name="villageid"></param>
    /// <returns></returns>
    /*
    List<OracleParameter> listOP = new List<OracleParameter>();
    listOP.Add(new OracleParameter(":villageid", villageid));
    OracleParameter[] pars = listOP.ToArray();
    */
    public string GetBuildings(HttpContext context)
    {
        string villageid = context.Request["villageid"];
        if (villageid == null || villageid == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":VILLAGEID", villageid)
            };
        string sql = @"SELECT * FROM LBS_BUILDING WHERE VILLAGE_ID = :VILLAGEID";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }



    //List<OracleParameter> listOP = new List<OracleParameter>();
    //listOP.Add(new OracleParameter(":villageid", villageid));
    //    listOP.Add(new OracleParameter(":s", start));
    //    listOP.Add(new OracleParameter(":e", end));
    /// <summary>
    /// 获取小区相关楼宇(分页)
    /// </summary>
    /// <param name="villageid"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetBuildingsPaginated(HttpContext context)
    {
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        string villageid = context.Request["villageid"];
        string text = context.Request["text"];
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        string start = ((pageInt * rowsInt) - rowsInt).ToString();
        string end = (pageInt * rowsInt).ToString();
        if (villageid == null || villageid == "" || text == null)
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":VILLAGEID", villageid),
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        OracleParameter[] paras2 = new OracleParameter[] {
                new OracleParameter(":VILLAGEID", villageid)
            };
        if (text == "")
        {
            string sql = @"SELECT *
    FROM (SELECT R.*, ROWNUM AS RN
            FROM (SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID,
                         BUILDING_NAME,
                         BUILDING_NUMBER,
                         BUILDING_ADDRESS,
                         BUILDING_BOUNDS,
                         BLUELABEL,
                         BUILDING_HEIGHT,
                         REGION,
                         TYPE,
                         LNG,
                         LAT,
                         VILLAGE_ID
                    FROM LBS_BUILDING LB
                   WHERE LB.VILLAGE_ID = :VILLAGEID
                   ORDER BY CREATE_DATE DESC) R) RTWO
   WHERE RTWO.RN > :S
     AND RTWO.RN <= :E";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            string sql2 = @"SELECT COUNT(*) AS TOTAL
  FROM LBS_BUILDING LB
 WHERE LB.VILLAGE_ID = :VILLAGEID";
            DataSet dataCount = OraHelper.ExecuteDataSet(sql2, paras2);
            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
            string json = JsonConvert.SerializeObject(data);
            json = json.Substring(9, json.Length - 10);
            string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
            return jsonf;
        }
        else
        {
            string sql = @"SELECT *
    FROM (SELECT R.*, ROWNUM AS RN
            FROM (SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID,
                         BUILDING_NAME,
                         BUILDING_NUMBER,
                         BUILDING_ADDRESS,
                         BUILDING_BOUNDS,
                         BLUELABEL
                         REGION,
                         TYPE,
                         LNG,
                         LAT,
                         VILLAGE_ID
                    FROM LBS_BUILDING LB
                   WHERE LB.VILLAGE_ID = :VILLAGEID AND LB.BUILDING_NAME LIKE '%" + text +
               @"%' ORDER BY CREATE_DATE DESC) R) RTWO
   WHERE RTWO.RN > :S
     AND RTWO.RN <= :E";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            string sql2 = @"SELECT COUNT(*) AS TOTAL
  FROM LBS_BUILDING LB
 WHERE LB.VILLAGE_ID = :VILLAGEID AND LB.BUILDING_NAME LIKE '%" + text + @"%'";
            DataSet dataCount = OraHelper.ExecuteDataSet(sql2, paras2);
            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
            string json = JsonConvert.SerializeObject(data);
            json = json.Substring(9, json.Length - 10);
            string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
            return jsonf;
        }
    }



    ///// <summary>
    ///// 下拉框获取城市数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="city"></param>
    ///// <returns></returns>
    //public string IndexByCity(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string city = context.Request["city"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    // say page = 5 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    // say page = 1 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    if (city == null)
    //    {
    //        return "404";
    //    }



    //    DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{city}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //    DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data2 = ohp.Query($"select * from lbs_building");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //    //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //    string json = JsonConvert.SerializeObject(data);
    //    json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    ////var result = new { total = count, rows = json };
    //    ////return JsonConvert.SerializeObject(result);
    //    return jsonf;

    //}

    ///// <summary>
    ///// 下拉框获取区县数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="region"></param>
    ///// <returns></returns>
    //public string IndexByRegion(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string region = context.Request["region"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    if (region == null)
    //    {
    //        return "404";
    //    }
    //    DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{region}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //    DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{region}%'");
    //    //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data2 = ohp.Query($"select * from lbs_building");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //    //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //    string json = JsonConvert.SerializeObject(data);
    //    json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    //var result = new { total = count, rows = json };
    //    //return JsonConvert.SerializeObject(result);
    //    return jsonf;
    //}

    ///// <summary>
    ///// 搜索小区(按区县)
    ///// </summary>
    ///// <param name="text"></param>
    ///// <param name="region"></param>
    ///// <returns></returns>
    //public string SearchByRegion(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string text = context.Request["text"];
    //    string region = context.Request["region"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    if (text == "")
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{region}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{region}%'");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        //var result = new { total = count, rows = json };
    //        //return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }
    //    else
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{region}%' and lv.village_name like '%{text}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{region}%' and lv.village_name like '%{text}%'");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        //var result = new { total = count, rows = json };
    //        //return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }

    //}


    ///// <summary>
    ///// 搜索小区(按城市)
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="region"></param>
    ///// <returns></returns>
    //public string SearchByCity(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string text = context.Request["text"];
    //    string city = context.Request["city"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    if (text == "")
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{city}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        //var result = new { total = count, rows = json };
    //        //return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }
    //    else
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{city}%' and lv.village_name like '%{text}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{city}%' and lv.village_name like '%{text}%'");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        //var result = new { total = count, rows = json };
    //        //return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }

    //}

    /// <summary>
    /// 区县是否存在
    /// </summary>
    /// <param name="region"></param>
    /// <returns></returns>
    public string Regionexists(HttpContext context)
    {
        string region = context.Request["region"];
        if (region == null || region == "")
        {
            return "404";
        }
        List<OracleParameter> listOP = new List<OracleParameter>();
        listOP.Add(new OracleParameter(":region", region));
        string sql = @"select count(*) as count from lbs_village where village_region = :region";
        DataSet data = OraHelper.ExecuteDataSet(sql, listOP.ToArray());
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }


    /// <summary>
    /// 添加小区批量
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string CreateVillages(HttpContext context)
    {

        string village_code = context.Request.Form["village_code"];
        string village_name = context.Request.Form["village_name"];
        string village_address = context.Request.Form["village_address"];
        string village_region = context.Request.Form["village_region"];
        string village_type = context.Request.Form["village_type"];
        string village_x = context.Request.Form["village_x"];
        string village_y = context.Request.Form["village_y"];
        string village_lng = context.Request.Form["village_lng"];
        string village_lat = context.Request.Form["village_lat"];
        string source = context.Request.Form["source"];
        string sqlAdd = @"insert into lbs_village
  (village_code,
   village_name,
   village_address,
   village_region,
   village_type,
   village_x,
   village_y,
   village_lng,
   village_lat,
   source)
values
  (:village_code,
   :village_name,
   :village_address,
   :village_region,
   :village_type,
   :village_x,
   :village_y,
   :village_lng,
   :village_lat,
   :source)";

        OracleParameter[] paramas = new OracleParameter[]
        {
            new OracleParameter("village_code",village_code),
            new OracleParameter("village_name",village_name),
            new OracleParameter("village_address",village_address),
            new OracleParameter("village_region",village_region),
            new OracleParameter("village_type",village_type),
            new OracleParameter("village_x",village_x),
            new OracleParameter("village_y",village_y),
            new OracleParameter("village_lng",village_lng),
            new OracleParameter("village_lat",village_lat),
            new OracleParameter("source",source)
        };

        int result = OraHelper.ExecuteNonQuery(sqlAdd,paramas);
        return "[]";


    }

    /// <summary>
    /// 添加小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    //    public string CreateVillage(HttpContext context)
    //    {
    //        string village_name = context.Request.Form["village_name"];
    //        string village_address = context.Request.Form["village_address"];
    //        string village_region = context.Request.Form["village_region"];
    //        string village_type = context.Request.Form["village_type"];
    //        string village_lng = context.Request.Form["village_lng"];
    //        string village_lat = context.Request.Form["village_lat"];
    //        string village_bounds = context.Request.Form["village_bounds"];
    //        string source = context.Request.Form["source"];
    //        List<string> errors = new List<string>();
    //        if (village_name.Length == 0)
    //        {
    //            errors.Add("小区名称不能为空");
    //        }
    //        if (village_address.Length == 0)
    //        {
    //            errors.Add("小区详细地址不能为空");
    //        }
    //        if (village_region.Length == 0 || village_region.Contains("全部"))
    //        {
    //            errors.Add("小区区域不能为空");
    //        }
    //        if (village_type.Length == 0)
    //        {
    //            errors.Add("小区类型不能为空");
    //        }
    //        if (village_lng.Length == 0)
    //        {
    //            errors.Add("小区经度不能为空");
    //        }
    //        if (village_lat.Length == 0)
    //        {
    //            errors.Add("小区纬度不能为空");
    //        }
    //        if (village_bounds.Length == 0)
    //        {
    //            errors.Add("小区边界不能为空");
    //        }
    //        if (source.Length == 0)
    //        {
    //            errors.Add("小区来源不能为空");
    //        }
    //        if (errors.Count > 0)
    //        {
    //            return JsonConvert.SerializeObject(errors);
    //        }
    //        else
    //        {
    //            OracleParameter[] paras = new OracleParameter[] {
    //                new OracleParameter(":VILLAGENAME", village_name),
    //                new OracleParameter(":VILLAGEADDRESS", village_address),
    //                new OracleParameter(":VILLAGEREGION", village_region),
    //                new OracleParameter(":VILLAGETYPE", village_type),
    //                new OracleParameter(":VILLAGELNG", village_lng),
    //                new OracleParameter(":VILLAGELAT", village_lat),
    //                new OracleParameter(":VILLAGEBOUNDS", village_bounds),
    //                new OracleParameter(":SOURCE", source)
    //            };
    //            string sql = @"BEGIN
    //  INSERT INTO LBS_VILLAGE
    //    (VILLAGE_NAME,
    //     VILLAGE_ADDRESS,
    //     VILLAGE_REGION,
    //     VILLAGE_TYPE,
    //     VILLAGE_X,
    //     VILLAGE_Y,
    //     VILLAGE_LNG,
    //     VILLAGE_LAT,
    //     VILLAGE_BOUNDS,
    //     SOURCE)
    //  VALUES
    //    (:VILLAGENAME,
    //    :VILLAGEADDRESS,
    //    :VILLAGEREGION,
    //    :VILLAGETYPE,
    //    :VILLAGELNG,
    //    :VILLAGELAT,
    //    :VILLAGELNG,
    //    :VILLAGELAT,
    //    :VILLAGEBOUNDS,
    //    :SOURCE);
    //  COMMIT;
    //END;
    //";
    //            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //            return "[]";
    //        }
    //    }

    /// <summary>
    /// 添加小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string CreateStreet(HttpContext context)
    {
        string name = context.Request.Form["name"];
        string type = context.Request.Form["type"];
        string address = context.Request.Form["address"];
        string lng = context.Request.Form["lng"];
        string lat = context.Request.Form["lat"];
        string bounds = context.Request.Form["bounds"];
        string source = context.Request.Form["source"];
        string county_id = context.Request.Form["county_id"];
        List<string> errors = new List<string>();
        if (name.Length == 0)
        {
            errors.Add("街道名称不能为空");
        }
        if (type.Length == 0)
        {
            errors.Add("街道类型不能为空");
        }
        if (address.Length == 0)
        {
            errors.Add("街道地址不能为空");
        }
        if (lng.Length == 0)
        {
            errors.Add("街道经度不能为空");
        }
        if (lat.Length == 0)
        {
            errors.Add("街道纬度不能为空");
        }
        if (bounds.Length == 0)
        {
            errors.Add("街道边界不能为空");
        }
        if (source.Length == 0)
        {
            errors.Add("街道数据来源不能为空");
        }
        if (county_id.Length == 0)
        {
            errors.Add("街道区县ID不能为空");
        }
        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":NAME", name),
                new OracleParameter(":TYPE", type),
                new OracleParameter(":ADDRESS", address),
                new OracleParameter(":LNG", lng),
                new OracleParameter(":LAT", lat),
                new OracleParameter(":BOUNDS", bounds),
                new OracleParameter(":SOURCE", source),
                new OracleParameter(":COUNTY_ID", county_id)
            };
            string sql = @"BEGIN
  INSERT INTO LBS_STREET
    (NAME,
     TYPE,
     ADDRESS,
        X,
        Y,
     LNG,
     LAT,
     BOUNDS,
     SOURCE,
     COUNTY_ID)
  VALUES
    (:NAME,
    :TYPE,
    :ADDRESS,
    :LNG,
    :LAT,
    :LNG,
    :LAT,
    :BOUNDS,
    :SOURCE,
    :COUNTY_ID);
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }

    /// <summary>
    /// 添加小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string CreateCommunity(HttpContext context)
    {
        string name = context.Request.Form["name"];
        string type = context.Request.Form["type"];
        string address = context.Request.Form["address"];
        string lng = context.Request.Form["lng"];
        string lat = context.Request.Form["lat"];
        string bounds = context.Request.Form["bounds"];
        string tel = context.Request.Form["tel"];
        string source = context.Request.Form["source"];
        string street_id = context.Request.Form["street_id"];
        string county_id = context.Request.Form["county_id"];
        List<string> errors = new List<string>();
        if (name.Length == 0)
        {
            errors.Add("社区名称不能为空");
        }
        if (type.Length == 0)
        {
            errors.Add("社区类型不能为空");
        }
        if (address.Length == 0)
        {
            errors.Add("社区地址不能为空");
        }
        if (lng.Length == 0)
        {
            errors.Add("社区经度不能为空");
        }
        if (lat.Length == 0)
        {
            errors.Add("社区纬度不能为空");
        }
        if (bounds.Length == 0)
        {
            errors.Add("社区边界不能为空");
        }
        if (tel.Length == 0)
        {
            errors.Add("社区联系电话不能为空");
        }
        if (source.Length == 0)
        {
            errors.Add("社区数据来源不能为空");
        }
        if (street_id.Length == 0)
        {
            errors.Add("社区街道ID不能为空");
        }
        if (county_id.Length == 0)
        {
            errors.Add("社区区县ID不能为空");
        }
        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":NAME", name),
                new OracleParameter(":TYPE", type),
                new OracleParameter(":ADDRESS", address),
                new OracleParameter(":LNG", lng),
                new OracleParameter(":LAT", lat),
                new OracleParameter(":BOUNDS", bounds),
                new OracleParameter(":TEL", tel),
                new OracleParameter(":SOURCE", source),
                new OracleParameter(":STREET_ID", street_id),
                new OracleParameter(":COUNTY_ID", county_id)
            };
            string sql = @"BEGIN
  INSERT INTO LBS_COMMUNITY
    (NAME,
     TYPE,
     ADDRESS,
        X,
        Y,
     LNG,
     LAT,
     BOUNDS,
    TEL,
     SOURCE,
    STREET_ID,
     COUNTY_ID)
  VALUES
    (:NAME,
    :TYPE,
    :ADDRESS,
    :LNG,
    :LAT,
    :LNG,
    :LAT,
    :BOUNDS,
    :TEL,
    :SOURCE,
    :STREET_ID,
    :COUNTY_ID);
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }

    /// <summary>
    /// 添加小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string CreateVillage(HttpContext context)
    {
        string name = context.Request.Form["name"];
        string type = context.Request.Form["type"];
        string address = context.Request.Form["address"];
        string lng = context.Request.Form["lng"];
        string lat = context.Request.Form["lat"];
        string bounds = context.Request.Form["bounds"];
        string source = context.Request.Form["source"];
        string community_id = context.Request.Form["community_id"];
        string county_id = context.Request.Form["county_id"];
        List<string> errors = new List<string>();
        if (name.Length == 0)
        {
            errors.Add("小区名称不能为空");
        }
        if (type.Length == 0)
        {
            errors.Add("小区类型不能为空");
        }
        if (address.Length == 0)
        {
            errors.Add("小区地址不能为空");
        }
        if (lng.Length == 0)
        {
            errors.Add("小区经度不能为空");
        }
        if (lat.Length == 0)
        {
            errors.Add("小区纬度不能为空");
        }
        if (bounds.Length == 0)
        {
            errors.Add("小区边界不能为空");
        }
        if (source.Length == 0)
        {
            errors.Add("小区数据来源不能为空");
        }
        if (community_id.Length == 0)
        {
            errors.Add("小区社区ID不能为空");
        }
        if (county_id.Length == 0)
        {
            errors.Add("小区区县ID不能为空");
        }
        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":NAME", name),
                new OracleParameter(":TYPE", type),
                new OracleParameter(":ADDRESS", address),
                new OracleParameter(":LNG", lng),
                new OracleParameter(":LAT", lat),
                new OracleParameter(":BOUNDS", bounds),
                new OracleParameter(":SOURCE", source),
                new OracleParameter(":COMMUNITY_ID", community_id),
                new OracleParameter(":COUNTY_ID", county_id)
            };
            string sql = @"BEGIN
  INSERT INTO LBS_VILLAGE
    (NAME,
     TYPE,
     ADDRESS,
        X,
        Y,
     LNG,
     LAT,
     BOUNDS,
     SOURCE,
    COMMUNITY_ID,
     COUNTY_ID)
  VALUES
    (:NAME,
    :TYPE,
    :ADDRESS,
    :LNG,
    :LAT,
    :LNG,
    :LAT,
    :BOUNDS,
    :SOURCE,
    :COMMUNITY_ID,
    :COUNTY_ID);
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }

    /// <summary>
    /// 添加小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string CreateBuilding(HttpContext context)
    {
        string name = context.Request.Form["name"];
        string type = context.Request.Form["type"];
        string address = context.Request.Form["address"];
        string bluelabel = context.Request.Form["bluelabel"];
        string lng = context.Request.Form["lng"];
        string lat = context.Request.Form["lat"];
        string bounds = context.Request.Form["bounds"];
        string source = context.Request.Form["source"];
        string village_id = context.Request.Form["village_id"];
        string county_id = context.Request.Form["county_id"];
        List<string> errors = new List<string>();
        if (name.Length == 0)
        {
            errors.Add("楼栋名称不能为空");
        }
        if (type.Length == 0)
        {
            errors.Add("楼栋类型不能为空");
        }
        if (address.Length == 0)
        {
            errors.Add("楼栋地址不能为空");
        }
        if (bluelabel.Length == 0)
        {
            errors.Add("楼栋蓝牌地址不能为空");
        }
        if (lng.Length == 0)
        {
            errors.Add("楼栋经度不能为空");
        }
        if (lat.Length == 0)
        {
            errors.Add("楼栋纬度不能为空");
        }
        if (bounds.Length == 0)
        {
            errors.Add("楼栋边界不能为空");
        }
        if (source.Length == 0)
        {
            errors.Add("楼栋数据来源不能为空");
        }
        if (village_id.Length == 0)
        {
            errors.Add("楼栋小区ID不能为空");
        }
        if (county_id.Length == 0)
        {
            errors.Add("楼栋区县ID不能为空");
        }
        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":NAME", name),
                new OracleParameter(":TYPE", type),
                new OracleParameter(":ADDRESS", address),
                new OracleParameter(":BLUELABEL", bluelabel),
                new OracleParameter(":LNG", lng),
                new OracleParameter(":LAT", lat),
                new OracleParameter(":BOUNDS", bounds),
                new OracleParameter(":SOURCE", source),
                new OracleParameter(":VILLAGE_ID", village_id),
                new OracleParameter(":COUNTY_ID", county_id)
            };
            string sql = @"BEGIN
  INSERT INTO LBS_BUILDING
    (NAME,
     TYPE,
     ADDRESS,
BLUELABEL,
        X,
        Y,
     LNG,
     LAT,
     BOUNDS,
     SOURCE,
    VILLAGE_ID,
     COUNTY_ID)
  VALUES
    (:NAME,
    :TYPE,
    :ADDRESS,
    :BLUELABEL,
    :LNG,
    :LAT,
    :LNG,
    :LAT,
    :BOUNDS,
    :SOURCE,
    :VILLAGE_ID,
    :COUNTY_ID);
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }

    /// <summary>
    /// 小区详情
    /// </summary>
    /// <param name="villageid"></param>
    /// <returns></returns>
    public string DetailsVillage(HttpContext context)
    {
        string villageid = context.Request["villageid"];
        if (villageid == null || villageid == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":VILLAGEID", villageid)
            };
        string sql = @"SELECT * FROM LBS_VILLAGE WHERE VILLAGE_ID = :VILLAGEID";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }

    //        /// <summary>
    //        /// 编辑小区
    //        /// </summary>
    //        /// <param></param>
    //        /// <returns></returns>
    //        public string EditVillage(HttpContext context)
    //        {
    //            string villageid = context.Request["villageid"];
    //            if (villageid == null || villageid == "")
    //            {
    //                return "404";
    //            }
    //            string village_name = context.Request.Form["village_name"];
    //            string village_address = context.Request.Form["village_address"];
    //            //string village_region = context.Request.Form["village_region"];
    //            //string village_type = context.Request.Form["village_type"];
    //            string village_lng = context.Request.Form["village_lng"];
    //            string village_lat = context.Request.Form["village_lat"];
    //            string village_bounds = context.Request.Form["village_bounds"];
    //            List<string> errors = new List<string>();
    //            if (village_name.Length == 0)
    //            {
    //                errors.Add("小区名称不能为空");
    //            }
    //            if (village_address.Length == 0)
    //            {
    //                errors.Add("小区详细地址不能为空");
    //            }
    //            //if (village_region.Length == 0)
    //            //{
    //            //    errors.Add("区域不能为空");
    //            //}
    //            //if (village_type.Length == 0)
    //            //{
    //            //    errors.Add("类型不能为空");
    //            //}
    //            if (village_lng.Length == 0)
    //            {
    //                errors.Add("小区经度不能为空");
    //            }
    //            if (village_lat.Length == 0)
    //            {
    //                errors.Add("小区纬度不能为空");
    //            }
    //            if (village_bounds.Length == 0)
    //            {
    //                errors.Add("小区边界不能为空");
    //            }
    //            //VILLAGE_REGION  = :VILLAGEREGION,

    //            if (errors.Count > 0)
    //            {
    //                return JsonConvert.SerializeObject(errors);
    //            }
    //            else
    //            {
    //                OracleParameter[] paras = new OracleParameter[] {
    //                new OracleParameter(":VILLAGENAME", village_name),
    //                new OracleParameter(":VILLAGEADDRESS", village_address),
    //                //new OracleParameter(":VILLAGEREGION", village_region),
    //                //new OracleParameter(":VILLAGETYPE", village_type),
    //                new OracleParameter(":VILLAGELNG", village_lng),
    //                new OracleParameter(":VILLAGELAT", village_lat),
    //                new OracleParameter(":VILLAGEBOUNDS", village_bounds),
    //                new OracleParameter(":VILLAGEID", villageid)
    //            };
    //                string sql = @"BEGIN
    //  UPDATE LBS_VILLAGE
    //     SET VILLAGE_NAME    = :VILLAGENAME,
    //         VILLAGE_ADDRESS = :VILLAGEADDRESS,

    // VILLAGE_X = :VILLAGELNG,
    //     VILLAGE_Y = :VILLAGELAT,
    //     VILLAGE_LNG = :VILLAGELNG,
    //     VILLAGE_LAT = :VILLAGELAT,
    //         VILLAGE_BOUNDS  = :VILLAGEBOUNDS
    //   WHERE VILLAGE_ID = :VILLAGEID;
    //  COMMIT;
    //END;
    //";
    //                DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //                return "[]";
    //            }
    //        }


    /// <summary>
    /// 编辑街道
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string EditStreet(HttpContext context)
    {
        string STREETID = context.Request["STREETID"];
        if (STREETID == null || STREETID == "")
        {
            return "404";
        }
        string street_name = context.Request.Form["street_name"];
        string street_address = context.Request.Form["street_address"];
        string street_lng = context.Request.Form["street_lng"];
        string street_lat = context.Request.Form["street_lat"];
        string street_bounds = context.Request.Form["street_bounds"];
        List<string> errors = new List<string>();
        //if (street_name.Length == 0)
        //{
        //    errors.Add("街道名称不能为空");
        //}
        //if (street_address.Length == 0)
        //{
        //    errors.Add("街道地址不能为空");
        //}
        //if (street_lng.Length == 0)
        //{
        //    errors.Add("街道经度不能为空");
        //}
        //if (street_lat.Length == 0)
        //{
        //    errors.Add("街道纬度不能为空");
        //}
        //if (street_bounds.Length == 0)
        //{
        //    errors.Add("街道边界不能为空");
        //}
        //VILLAGE_REGION  = :VILLAGEREGION,

        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":STREETNAME", street_name),
                new OracleParameter(":STREETADDRESS", street_address),
                new OracleParameter(":STREETLNG", street_lng),
                new OracleParameter(":STREETLAT", street_lat),
                new OracleParameter(":STREETBOUNDS", street_bounds),
                new OracleParameter(":STREETID", STREETID)
            };
            string sql = @"BEGIN
  UPDATE LBS_STREET
     SET NAME    = :STREETNAME,
         ADDRESS = :STREETADDRESS,
        
 X = :STREETLNG,
     Y = :STREETLAT,
     LNG = :STREETLNG,
     LAT = :STREETLAT,
         BOUNDS  = :STREETBOUNDS
   WHERE STREET_ID = :STREETID;
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }


    /// <summary>
    /// 编辑街道
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string EditCommunity(HttpContext context)
    {
        string COMMUNITYID = context.Request["COMMUNITYID"];
        if (COMMUNITYID == null || COMMUNITYID == "")
        {
            return "404";
        }
        string community_name = context.Request.Form["community_name"];
        string community_address = context.Request.Form["community_address"];
        string community_lng = context.Request.Form["community_lng"];
        string community_lat = context.Request.Form["community_lat"];
        string community_bounds = context.Request.Form["community_bounds"];
        List<string> errors = new List<string>();
        //if (street_name.Length == 0)
        //{
        //    errors.Add("街道名称不能为空");
        //}
        //if (street_address.Length == 0)
        //{
        //    errors.Add("街道地址不能为空");
        //}
        //if (street_lng.Length == 0)
        //{
        //    errors.Add("街道经度不能为空");
        //}
        //if (street_lat.Length == 0)
        //{
        //    errors.Add("街道纬度不能为空");
        //}
        //if (street_bounds.Length == 0)
        //{
        //    errors.Add("街道边界不能为空");
        //}
        //VILLAGE_REGION  = :VILLAGEREGION,

        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":COMMUNITYNAME", community_name),
                new OracleParameter(":COMMUNITYADDRESS", community_address),
                new OracleParameter(":COMMUNITYLNG", community_lng),
                new OracleParameter(":COMMUNITYLAT", community_lat),
                new OracleParameter(":COMMUNITYBOUNDS", community_bounds),
                new OracleParameter(":COMMUNITYID", COMMUNITYID)
            };
            string sql = @"BEGIN
  UPDATE LBS_COMMUNITY
     SET NAME    = :COMMUNITYNAME,
         ADDRESS = :COMMUNITYADDRESS,
        
 X = :COMMUNITYLNG,
     Y = :COMMUNITYLAT,
     LNG = :COMMUNITYLNG,
     LAT = :COMMUNITYLAT,
         BOUNDS  = :COMMUNITYBOUNDS
   WHERE COMMUNITY_ID = :COMMUNITYID;
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }



    /// <summary>
    /// 编辑街道
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string EditVillage(HttpContext context)
    {
        string VILLAGEID = context.Request["VILLAGEID"];
        if (VILLAGEID == null || VILLAGEID == "")
        {
            return "404";
        }
        string village_name = context.Request.Form["village_name"];
        string village_address = context.Request.Form["village_address"];
        string village_lng = context.Request.Form["village_lng"];
        string village_lat = context.Request.Form["village_lat"];
        string village_bounds = context.Request.Form["village_bounds"];
        List<string> errors = new List<string>();
        //if (street_name.Length == 0)
        //{
        //    errors.Add("街道名称不能为空");
        //}
        //if (street_address.Length == 0)
        //{
        //    errors.Add("街道地址不能为空");
        //}
        //if (street_lng.Length == 0)
        //{
        //    errors.Add("街道经度不能为空");
        //}
        //if (street_lat.Length == 0)
        //{
        //    errors.Add("街道纬度不能为空");
        //}
        //if (street_bounds.Length == 0)
        //{
        //    errors.Add("街道边界不能为空");
        //}
        //VILLAGE_REGION  = :VILLAGEREGION,

        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":VILLAGENAME", village_name),
                new OracleParameter(":VILLAGEADDRESS", village_address),
                new OracleParameter(":VILLAGELNG", village_lng),
                new OracleParameter(":VILLAGELAT", village_lat),
                new OracleParameter(":VILLAGEBOUNDS", village_bounds),
                new OracleParameter(":VILLAGEID", VILLAGEID)
            };
            string sql = @"BEGIN
  UPDATE LBS_VILLAGE
     SET NAME    = :VILLAGENAME,
         ADDRESS = :VILLAGEADDRESS,
 X = :VILLAGELNG,
     Y = :VILLAGELAT,
     LNG = :VILLAGELNG,
     LAT = :VILLAGELAT,
         BOUNDS  = :VILLAGEBOUNDS
   WHERE VILLAGE_ID = :VILLAGEID;
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }


    /// <summary>
    /// 编辑街道
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string EditBuilding(HttpContext context)
    {
        string BUILDINGID = context.Request["BUILDINGID"];
        if (BUILDINGID == null || BUILDINGID == "")
        {
            return "404";
        }
        string building_name = context.Request.Form["building_name"];
        string building_address = context.Request.Form["building_address"];
        string building_lng = context.Request.Form["building_lng"];
        string building_lat = context.Request.Form["building_lat"];
        string building_bounds = context.Request.Form["building_bounds"];
        List<string> errors = new List<string>();
        //if (street_name.Length == 0)
        //{
        //    errors.Add("街道名称不能为空");
        //}
        //if (street_address.Length == 0)
        //{
        //    errors.Add("街道地址不能为空");
        //}
        //if (street_lng.Length == 0)
        //{
        //    errors.Add("街道经度不能为空");
        //}
        //if (street_lat.Length == 0)
        //{
        //    errors.Add("街道纬度不能为空");
        //}
        //if (street_bounds.Length == 0)
        //{
        //    errors.Add("街道边界不能为空");
        //}
        //VILLAGE_REGION  = :VILLAGEREGION,

        if (errors.Count > 0)
        {
            return JsonConvert.SerializeObject(errors);
        }
        else
        {
            OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":BUILDINGNAME", building_name),
                new OracleParameter(":BUILDINGADDRESS", building_address),
                new OracleParameter(":BUILDINGLNG", building_lng),
                new OracleParameter(":BUILDINGLAT", building_lat),
                new OracleParameter(":BUILDINGBOUNDS", building_bounds),
                new OracleParameter(":BUILDINGID", BUILDINGID)
            };
            string sql = @"BEGIN
  UPDATE LBS_BUILDING
     SET NAME    = :BUILDINGNAME,
         ADDRESS = :BUILDINGADDRESS,
 X = :BUILDINGLNG,
     Y = :BUILDINGLAT,
     LNG = :BUILDINGLNG,
     LAT = :BUILDINGLAT,
         BOUNDS  = :BUILDINGBOUNDS
   WHERE BUILDING_ID = :BUILDINGID;
  COMMIT;
END;
";
            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
            return "[]";
        }
    }

    //        /// <summary>
    //        /// 删除小区
    //        /// </summary>
    //        /// <param></param>
    //        /// <returns></returns>
    //        public string DeleteVillage(HttpContext context)
    //        {
    //            string villageid = context.Request["villageid"];
    //            if (villageid == null || villageid == "")
    //            {
    //                return "404";
    //            }
    //            OracleParameter[] paras = new OracleParameter[] {
    //                new OracleParameter(":VILLAGEID", villageid)
    //            };
    //            string sql = @"BEGIN
    //  DELETE FROM LBS_VILLAGE WHERE VILLAGE_ID = :VILLAGEID;
    //  COMMIT;
    //END;
    //";
    //            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //            return "[]";
    //        }

    /// <summary>
    /// 删除小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string DeleteStreet(HttpContext context)
    {
        string STREETID = context.Request["STREETID"];
        if (STREETID == null || STREETID == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":STREETID", STREETID)
            };
        string sql = @"BEGIN
  DELETE FROM LBS_STREET WHERE STREET_ID = :STREETID;
  COMMIT;
END;
";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        return "[]";
    }


    /// <summary>
    /// 删除小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string DeleteCommunity(HttpContext context)
    {
        string COMMUNITYID = context.Request["COMMUNITYID"];
        if (COMMUNITYID == null || COMMUNITYID == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":COMMUNITYID", COMMUNITYID)
            };
        string sql = @"BEGIN
  DELETE FROM LBS_COMMUNITY WHERE COMMUNITY_ID = :COMMUNITYID;
  COMMIT;
END;
";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        return "[]";
    }


    /// <summary>
    /// 删除小区
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string DeleteVillage(HttpContext context)
    {
        string VILLAGEID = context.Request["VILLAGEID"];
        if (VILLAGEID == null || VILLAGEID == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":VILLAGEID", VILLAGEID)
            };
        string sql = @"BEGIN
  DELETE FROM LBS_VILLAGE WHERE VILLAGE_ID = :VILLAGEID;
  COMMIT;
END;
";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        return "[]";
    }

    /// <summary>
    /// 搜索楼宇(按小区)
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="text"></param>
    /// <param name="villageid"></param>
    /// <returns></returns>
    public string GetBuildingsPaginatedSearch(HttpContext context)
    {
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        string text = context.Request["text"];
        string villageid = context.Request["villageid"];
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        if (text == "")
        {
            List<OracleParameter> listOP = new List<OracleParameter>();
            listOP.Add(new OracleParameter(":villageid", villageid));
            listOP.Add(new OracleParameter(":s", start));
            listOP.Add(new OracleParameter(":e", end));
            string sql = @"select * from(select r.*, rownum as rn from(select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, REGION, TYPE, LNG, LAT, VILLAGE_ID, BLUELABEL from lbs_building lb  where lb.village_id = :villageid order by create_date desc) r) rtwo where rtwo.rn > :s and rtwo.rn <= :e";
            DataSet data = OraHelper.ExecuteDataSet(sql, listOP.ToArray());
            List<OracleParameter> listOP2 = new List<OracleParameter>();
            listOP2.Add(new OracleParameter(":villageid", villageid));
            string sql2 = @"select count(*) as total from lbs_building lb where lb.village_id = :villageid";
            DataSet dataCount = OraHelper.ExecuteDataSet(sql2, listOP2.ToArray());
            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
            string json = JsonConvert.SerializeObject(data);
            json = json.Substring(9, json.Length - 10);
            string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
            //var result = new { total = count, rows = json };
            //return JsonConvert.SerializeObject(result);
            return jsonf;
        }
        else
        {
            List<OracleParameter> listOP = new List<OracleParameter>();
            listOP.Add(new OracleParameter(":villageid", villageid));
            listOP.Add(new OracleParameter(":s", start));
            listOP.Add(new OracleParameter(":e", end));
            string sql = @"select * from(select r.*, rownum as rn from(select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, REGION, TYPE, LNG, LAT, VILLAGE_ID, BLUELABEL from lbs_building lb  where lb.village_id = :villageid and lb.building_name like '%" + text + @"%' order by create_date desc) r) rtwo where rtwo.rn > :s and rtwo.rn <= :e";
            DataSet data = OraHelper.ExecuteDataSet(sql, listOP.ToArray());
            //DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, REGION, TYPE, LNG, LAT, VILLAGE_ID, BLUELABEL from lbs_building lb  where lb.village_id = '{villageid}'  and lb.building_name like '%{text}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
            List<OracleParameter> listOP2 = new List<OracleParameter>();
            listOP2.Add(new OracleParameter(":villageid", villageid));
            string sql2 = @"select count(*) as total from lbs_building lb where lb.village_id = :villageid and lb.building_name like '%" + text + @"%'";
            DataSet dataCount = OraHelper.ExecuteDataSet(sql2, listOP2.ToArray());


            //DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_building lb where lb.village_id = '{villageid}' and lb.building_name like '%{text}%'");
            //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
            //DataSet data2 = ohp.Query($"select * from lbs_building");
            //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
            //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
            //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
            string json = JsonConvert.SerializeObject(data);
            json = json.Substring(9, json.Length - 10);
            string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
            //var result = new { total = count, rows = json };
            //return JsonConvert.SerializeObject(result);
            return jsonf;
        }
    }


    /// <summary>
    /// 区县是否存在2
    /// </summary>
    /// <param name="region"></param>
    /// <returns></returns>
    //public string regionexists2(HttpContext context)
    //{
    //    string region = context.Request["region"];
    //    if (region == null)
    //    {
    //        return "404";
    //    }
    //    DataSet data = OraHelper.ExecuteDataSet($"select count(*) as count from lbs_building where region = '{region}'");
    //    string json = JsonConvert.SerializeObject(data);
    //    return json;
    //}

    /// <summary>
    /// 区县是否存在2
    /// </summary>
    /// <param name="region"></param>
    /// <returns></returns>
    public string Regionexists2(HttpContext context)
    {
        string region = context.Request["region"];
        if (region == null || region == "")
        {
            return "404";
        }
        List<OracleParameter> listOP = new List<OracleParameter>();
        listOP.Add(new OracleParameter(":region", region));
        string sql = @"select count(*) as count from lbs_building where region = :region";
        DataSet data = OraHelper.ExecuteDataSet(sql, listOP.ToArray());
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }


    /// <summary>
    /// 添加楼宇批量
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    //public string CreateBuildings(HttpContext context)
    //{

    //    string building_code = context.Request.Form["building_code"];
    //    string building_number = context.Request.Form["building_number"];
    //    string building_name = context.Request.Form["building_name"];
    //    string building_address = context.Request.Form["building_address"];
    //    string building_region = context.Request.Form["building_region"];
    //    string building_type = context.Request.Form["building_type"];
    //    string building_x = context.Request.Form["building_x"];
    //    string building_y = context.Request.Form["building_y"];
    //    string building_lng = context.Request.Form["building_lng"];
    //    string building_lat = context.Request.Form["building_lat"];
    //    string village_id = context.Request.Form["village_id"];
    //    string source = context.Request.Form["source"];
    //    DataSet data = OraHelper.ExecuteDataSet($"begin insert into lbs_building (code, building_number, building_name, building_address, region, type, x, y, lng, lat, village_id, source) values ('{building_code}','{building_number}','{building_name}','{building_address}','{building_region}','{building_type}','{building_x}','{building_y}','{building_lng}','{building_lat}',(select village_id from lbs_village where village_code = '{village_id}' and rownum<2),'{source}');commit;end;");
    //    return "[]";


    //}


    /// <summary>
    /// 添加楼宇
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    //    public string CreateBuilding(HttpContext context)
    //    {
    //        string building_number = context.Request.Form["building_number"];
    //        string building_name = context.Request.Form["building_name"];
    //        string building_address = context.Request.Form["building_address"];
    //        string bluelabel = context.Request.Form["bluelabel"];
    //        string building_height = context.Request.Form["building_height"];
    //        string building_region = context.Request.Form["building_region"];
    //        string building_type = context.Request.Form["building_type"];
    //        string building_lng = context.Request.Form["building_lng"];
    //        string building_lat = context.Request.Form["building_lat"];
    //        string building_bounds = context.Request.Form["building_bounds"];
    //        string village_id = context.Request.Form["village_id"];
    //        //string building_bounds = HttpContext.Request.Form["building_bounds"];
    //        //string building_x = HttpContext.Request.Form["building_x"];
    //        //string building_y = HttpContext.Request.Form["building_y"];
    //        //string building_lng = HttpContext.Request.Form["building_lng"];
    //        //string building_lat = HttpContext.Request.Form["building_lat"];
    //        string source = context.Request.Form["source"];
    //        string onmap = context.Request.Form["onmap"];
    //        List<string> errors = new List<string>();
    //        if (building_number.Length == 0)
    //        {
    //            errors.Add("楼宇号码不能为空");
    //        }
    //        if (building_name.Length == 0)
    //        {
    //            errors.Add("楼宇名称不能为空");
    //        }
    //        if (building_address.Length == 0)
    //        {
    //            errors.Add("楼宇详细地址不能为空");
    //        }
    //        if (bluelabel.Length == 0)
    //        {
    //            errors.Add("楼宇蓝牌地址码不能为空");
    //        }
    //        if (building_height.Length == 0)
    //        {
    //            errors.Add("楼宇高度不能为空");
    //        }
    //        if (building_region.Length == 0)
    //        {
    //            errors.Add("楼宇区域不能为空");
    //        }
    //        if (building_type.Length == 0)
    //        {
    //            errors.Add("楼宇类型不能为空");
    //        }
    //        //if (building_bounds.Length == 0)
    //        //{
    //        //    errors.Add("楼宇边界不能为空");
    //        //}
    //        if (building_lng.Length == 0)
    //        {
    //            errors.Add("楼宇经度不能为空");
    //        }
    //        if (building_lat.Length == 0)
    //        {
    //            errors.Add("楼宇纬度不能为空");
    //        }
    //        if (building_bounds.Length == 0)
    //        {
    //            errors.Add("楼宇边界不能为空");
    //        }
    //        if (village_id.Length == 0)
    //        {
    //            errors.Add("小区ID不能为空");
    //        }
    //        if (source.Length == 0)
    //        {
    //            errors.Add("楼宇来源不能为空");
    //        }
    //        if (onmap.Length == 0)
    //        {
    //            errors.Add("楼宇是否在地图上不能为空");
    //        }
    //        if (errors.Count > 0)
    //        {
    //            return JsonConvert.SerializeObject(errors);
    //        }
    //        else
    //        {
    //            OracleParameter[] paras = new OracleParameter[] {
    //                new OracleParameter(":BUILDINGNUMBER", building_number),
    //                new OracleParameter(":BUILDINGNAME", building_name),
    //                new OracleParameter(":BUILDINGADDRESS", building_address),
    //                new OracleParameter(":BLUELABEL", bluelabel),
    //                new OracleParameter(":BUILDINGHEIGHT", building_height),
    //                new OracleParameter(":BUILDINGREGION", building_region),
    //                new OracleParameter(":BUILDINGTYPE", building_type),
    //                new OracleParameter(":BUILDINGLNG", building_lng),
    //                new OracleParameter(":BUILDINGLAT", building_lat),
    //                new OracleParameter(":BUILDINGBOUNDS", building_bounds),
    //                new OracleParameter(":VILLAGEID", village_id),
    //                new OracleParameter(":SOURCE", source),
    //                new OracleParameter(":ONMAP", onmap)

    //                };
    //            string sql = @"BEGIN
    //  INSERT INTO LBS_BUILDING
    //    (
    //     BUILDING_NUMBER,
    //     BUILDING_NAME,
    //     BUILDING_ADDRESS,
    //     BLUELABEL,
    //     BUILDING_HEIGHT,
    //     REGION,
    //     TYPE,
    //     X,
    //     Y,
    //     LNG,
    //     LAT,
    //     BUILDING_BOUNDS,
    //     VILLAGE_ID,
    //     SOURCE,
    //     ONMAP
    //)
    //  VALUES
    //    (
    //    :BUILDINGNUMBER,
    //    :BUILDINGNAME,
    //    :BUILDINGADDRESS,
    //    :BLUELABEL,
    //    :BUILDINGHEIGHT,
    //    :BUILDINGREGION,
    //    :BUILDINGTYPE,
    //    :BUILDINGLNG,
    //    :BUILDINGLAT,
    //    :BUILDINGLNG,
    //    :BUILDINGLAT,
    //    :BUILDINGBOUNDS,
    //    :VILLAGEID,
    //    :SOURCE,
    //    :ONMAP
    //    );
    //  COMMIT;
    //END;
    //";
    //            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //            return "[]";
    //        };
    //    }



    /// <summary>
    /// 楼宇详情
    /// </summary>
    /// <param name="buildingid"></param>
    /// <returns></returns>
    public string DetailsBuilding(HttpContext context)
    {
        string buildingid = context.Request["buildingid"];
        if (buildingid == null || buildingid == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":BUILDINGID", buildingid)
            };
        string sql = @"SELECT * FROM LBS_BUILDING WHERE BUILDING_ID = :BUILDINGID";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }

    //    /// <summary>
    //    /// 编辑小区
    //    /// </summary>
    //    /// <param></param>
    //    /// <returns></returns>
    //    public string EditBuilding(HttpContext context)
    //    {
    //        string buildingid = context.Request["buildingid"];
    //        if (buildingid == null || buildingid == "")
    //        {
    //            return "404";
    //        }
    //        string building_number = context.Request.Form["building_number"];
    //        string building_name = context.Request.Form["building_name"];
    //        string building_address = context.Request.Form["building_address"];
    //        string bluelabel = context.Request.Form["bluelabel"];
    //        //string building_height = context.Request.Form["building_height"];
    //        //string building_region = context.Request.Form["building_region"];
    //        //string building_type = context.Request.Form["building_type"];
    //        string building_lng = context.Request.Form["building_lng"];
    //        string building_lat = context.Request.Form["building_lat"];
    //        string building_bounds = context.Request.Form["building_bounds"];
    //        List<string> errors = new List<string>();
    //        if (building_number.Length == 0)
    //        {
    //            errors.Add("楼宇号码不能为空");
    //        }
    //        if (building_name.Length == 0)
    //        {
    //            errors.Add("楼宇名称不能为空");
    //        }
    //        if (building_address.Length == 0)
    //        {
    //            errors.Add("详细地址不能为空");
    //        }
    //        if (bluelabel.Length == 0)
    //        {
    //            errors.Add("蓝牌地址码不能为空");
    //        }
    //        //if (building_region.Length == 0)
    //        //{
    //        //    errors.Add("区域不能为空");
    //        //}
    //        //if (building_type.Length == 0)
    //        //{
    //        //    errors.Add("类型不能为空");
    //        //}
    //        if (building_lng.Length == 0)
    //        {
    //            errors.Add("楼宇经度不能为空");
    //        }
    //        if (building_lat.Length == 0)
    //        {
    //            errors.Add("楼宇纬度不能为空");
    //        }
    //        if (building_bounds.Length == 0)
    //        {
    //            errors.Add("楼宇边界不能为空");
    //        }
    //        if (errors.Count > 0)
    //        {
    //            return JsonConvert.SerializeObject(errors);
    //        }
    //        else
    //        {
    //            OracleParameter[] paras = new OracleParameter[] {
    //                 new OracleParameter(":BUILDINGNUMBER", building_number),
    //                new OracleParameter(":BUILDINGNAME", building_name),
    //                new OracleParameter(":BUILDINGADDRESS", building_address),
    //                new OracleParameter(":BLUELABEL", bluelabel),
    //                //new OracleParameter(":BUILDINGHEIGHT", building_height),
    //                //new OracleParameter(":BUILDINGREGION", building_region),
    //                //new OracleParameter(":BUILDINGTYPE", building_type),
    //                new OracleParameter(":BUILDINGLNG", building_lng),
    //                new OracleParameter(":BUILDINGLAT", building_lat),
    //                new OracleParameter(":BUILDINGBOUNDS", building_bounds),
    //                new OracleParameter(":BUILDINGID", buildingid)
    //            };
    //            string sql = @"BEGIN
    //  UPDATE LBS_BUILDING
    //     SET BUILDING_NUMBER = :BUILDINGNUMBER,
    //         BUILDING_NAME = :BUILDINGNAME,
    //         BUILDING_ADDRESS  = :BUILDINGADDRESS,
    //         BLUELABEL    = :BLUELABEL,
    //           X = :BUILDINGLNG,
    //     Y = :BUILDINGLAT,
    //     LNG = :BUILDINGLNG,
    //     LAT = :BUILDINGLAT,
    //BUILDING_BOUNDS = :BUILDINGBOUNDS
    //   WHERE BUILDING_ID = :BUILDINGID;
    //  COMMIT;
    //END;
    //";
    //            DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //            return "[]";
    //        }
    //    }

    /// <summary>
    /// 删除楼宇
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public string DeleteBuilding(HttpContext context)
    {
        string buildingid = context.Request["buildingid"];
        if (buildingid == null || buildingid == "")
        {
            return "404";
        }
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":BUILDINGID", buildingid)
            };
        string sql = @"BEGIN
  DELETE FROM LBS_BUILDING WHERE BUILDING_ID = :BUILDINGID;
  COMMIT;
END;
";
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        return "[]";
    }

    ///// <summary>
    ///// 复选框获取带有楼宇小区数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="city"></param>
    ///// <returns></returns>
    //public string IndexByCityRegionHasBuildings(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string cityregion = context.Request["cityregion"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    // say page = 5 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    // say page = 1 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    if (cityregion == null)
    //    {
    //        return "404";
    //    }
    //    DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0 order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //    DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0");
    //    //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data2 = ohp.Query($"select * from lbs_building");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //    //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //    string json = JsonConvert.SerializeObject(data);
    //    json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    ////var result = new { total = count, rows = json };
    //    ////return JsonConvert.SerializeObject(result);
    //    return jsonf;

    //}


    ///// <summary>
    ///// 复选框获取带有边界小区数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="city"></param>
    ///// <returns></returns>
    //public string IndexByCityRegionHasBounds(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string cityregion = context.Request["cityregion"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    // say page = 5 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    // say page = 1 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    if (cityregion == null)
    //    {
    //        return "404";
    //    }
    //    DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' and lv.village_bounds is not null order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //    DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%' and lv.village_bounds is not null");
    //    //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data2 = ohp.Query($"select * from lbs_building");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //    //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //    string json = JsonConvert.SerializeObject(data);
    //    json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    ////var result = new { total = count, rows = json };
    //    ////return JsonConvert.SerializeObject(result);
    //    return jsonf;

    //}

    ///// <summary>
    ///// //复选框获取带有楼宇边界小区数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="city"></param>
    ///// <returns></returns>
    //public string IndexByCityRegionHasBuildingsBounds(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string cityregion = context.Request["cityregion"];
    //    string stateFinal = context.Request["stateFinal"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    // say page = 5 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    // say page = 1 and rows = 10
    //    // limit = 10 and offset = (page - 1)*rows
    //    if (cityregion == null)
    //    {
    //        return "404";
    //    }
    //    if (stateFinal == "1")
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0 order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        ////var result = new { total = count, rows = json };
    //        ////return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }
    //    else if (stateFinal == "2")
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' and lv.village_bounds is not null order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%' and lv.village_bounds is not null");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        ////var result = new { total = count, rows = json };
    //        ////return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }
    //    else
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0 and lv.village_bounds is not null order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //        DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%' and (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) != 0 and lv.village_bounds is not null");
    //        //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //        //DataSet data2 = ohp.Query($"select * from lbs_building");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //        //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //        //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //        string json = JsonConvert.SerializeObject(data);
    //        json = json.Substring(9, json.Length - 10);
    //        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //        ////var result = new { total = count, rows = json };
    //        ////return JsonConvert.SerializeObject(result);
    //        return jsonf;
    //    }
    //}

    ///// <summary>
    ///// 下拉框获取区县数据
    ///// </summary>
    ///// <param name="page"></param>
    ///// <param name="rows"></param>
    ///// <param name="region"></param>
    ///// <returns></returns>
    //public string IndexByCityRegion(HttpContext context)
    //{
    //    string page = context.Request["page"];
    //    string rows = context.Request["rows"];
    //    string cityregion = context.Request["cityregion"];
    //    var pageInt = int.Parse(page);
    //    var rowsInt = int.Parse(rows);
    //    var start = (pageInt * rowsInt) - rowsInt;
    //    var end = pageInt * rowsInt;
    //    if (cityregion == null)
    //    {
    //        return "404";
    //    }
    //    DataSet data = OraHelper.ExecuteDataSet($"select * from(select r.*, rownum as rn from(select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS,  (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv  where lv.village_region like '%{cityregion}%' order by create_date desc) r) rtwo where rtwo.rn > {start} and rtwo.rn <= {end}");
    //    DataSet dataCount = OraHelper.ExecuteDataSet($"select count(*) as total from lbs_village lv where lv.village_region like '%{cityregion}%'");
    //    //DataSet data = ohp.Query($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_ADDRESS, VILLAGE_REGION, VILLAGE_TYPE, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, (select count(*) from lbs_building lb where lb.village_id = (lv.village_id)) as village_count from lbs_village lv where lv.village_region like '%{city}%'");
    //    //DataSet data2 = ohp.Query($"select * from lbs_building");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id = (select village_id from lbs_village lv where lv.village_name = '元电职工住宅A区')");
    //    //DataSet data2 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.region like '%{city}%'");
    //    //DataSet data3 = ohp.Query($"select RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME, BUILDING_ADDRESS, LNG, LAT from lbs_building lb where lb.village_id in (select village_id from lbs_village lv where rownum<2 and lv.village_region like '%{city}%' )");
    //    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //    string json = JsonConvert.SerializeObject(data);
    //    json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    //var result = new { total = count, rows = json };
    //    //return JsonConvert.SerializeObject(result);
    //    return jsonf;
    //}


    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string IndexByFilter(HttpContext context)
    {
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        string region = "大东区";
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
                       lv.VILLAGE_NAME,
                       lv.VILLAGE_ADDRESS,
                       lv. VILLAGE_REGION,
                       lv.VILLAGE_TYPE,
                       lv.VILLAGE_LNG,
                       lv.VILLAGE_LAT,
                       lv.VILLAGE_BOUNDS,
                       to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       CASE
                         WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
                          0
                         ELSE
                          ALLBUILDING.VILLAGE_COUNT
                       END VILLAGE_COUNT
                  FROM LBS_VILLAGE LV
                  LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
                 WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'
                 ORDER BY lv.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID                   WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;


        //            if (stateFinal == "1")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "2")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "3")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;


        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            else
        //            {
        //                if (text != "")
        //                {

        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    //                    string sql = @"SELECT *
        //                    //  FROM (SELECT R.*, ROWNUM AS RN
        //                    //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                    //                       VILLAGE_NAME,
        //                    //                       VILLAGE_ADDRESS,
        //                    //                       VILLAGE_REGION,
        //                    //                       VILLAGE_TYPE,
        //                    //                       VILLAGE_LNG,
        //                    //                       VILLAGE_LAT,
        //                    //                       VILLAGE_BOUNDS,
        //                    //                       (SELECT COUNT(*)
        //                    //                          FROM LBS_BUILDING LB
        //                    //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                    //                  FROM LBS_VILLAGE LV
        //                    //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                    //                 ORDER BY CREATE_DATE DESC) R) RTWO
        //                    // WHERE RTWO.RN > :S
        //                    //   AND RTWO.RN <= :E
        //                    //";

        //                    string sql = @"SELECT LV.*,
        //         CASE
        //           WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
        //            0
        //           ELSE
        //            ALLBUILDING.VILLAGE_COUNT
        //         END VILLAGE_COUNT
        //    FROM (SELECT *
        //            FROM (SELECT T.*, ROWNUM RN
        //                    FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                                 VILLAGE_NAME,
        //                                 VILLAGE_ADDRESS,
        //                                 VILLAGE_REGION,
        //                                 VILLAGE_TYPE,
        //                                 VILLAGE_LNG,
        //                                 VILLAGE_LAT,
        //                                 VILLAGE_BOUNDS,
        //                                 to_char(lv.CREATE_DATE,
        //                                         'yyyy-mm-dd hh24:mi:ss') CREATE_DATE
        //                            FROM LBS_VILLAGE LV
        //                           WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                           ORDER BY lv.CREATE_DATE DESC) T)
        //           WHERE RN > :S AND RN <= :E ) LV
        //    LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
        //                 FROM LBS_BUILDING LB
        //                WHERE LB.VILLAGE_ID IS NOT NULL
        //                GROUP BY LB.VILLAGE_ID) ALLBUILDING
        //      ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID";

        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
    }



    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string IndexByFilterAll(HttpContext context)
    {
        string region = "大东区";
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
                       lv.VILLAGE_NAME,
                       lv.VILLAGE_ADDRESS,
                       lv. VILLAGE_REGION,
                       lv.VILLAGE_TYPE,
                       lv.VILLAGE_LNG,
                       lv.VILLAGE_LAT,
                       lv.VILLAGE_BOUNDS,
                       to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       CASE
                         WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
                          0
                         ELSE
                          ALLBUILDING.VILLAGE_COUNT
                       END VILLAGE_COUNT
                  FROM LBS_VILLAGE LV
                  LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
                 WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'
                 ORDER BY lv.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID  
                 WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%" + village_name + "%'";
        //}
        //if (hasbounds == "1")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        //}
        //if (hasbuildings == "1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount, sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;

        //            string pcc = context.Request["pcc"];
        //            string stateFinal = context.Request["stateFinal"];
        //            string text = context.Request["text"];
        //            if (stateFinal == "1")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "2")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "3")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;


        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            else
        //            {
        //                if (text != "")
        //                {

        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
    }


    //       /// <summary>
    //       /// 筛选数据
    //       /// </summary>
    //       /// <param name="page"></param>
    //       /// <param name="rows"></param>
    //       /// <param name="pcc"></param>
    //       /// <param name="stateFinal"></param>
    //       /// <param name="text"></param>
    //       /// <returns></returns>
    //       public string IndexByFilter(HttpContext context)
    //       {
    //           string page = context.Request["page"];
    //           string rows = context.Request["rows"];
    //           string pcc = context.Request["pcc"];//地址区域索引
    //           string village_name = context.Request["village_name"];//小区名字
    //           string hasbounds  = context.Request["hasbounds"];//是否有小区边界
    //           string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //           var pageInt = int.Parse(page);
    //           var rowsInt = int.Parse(rows);
    //           var start = (pageInt * rowsInt) - rowsInt;
    //           var end = pageInt * rowsInt;
    //           OracleParameter[] paras = new OracleParameter[] {
    //               new OracleParameter(":S", start),
    //               new OracleParameter(":E", end)
    //           };
    //           string sqlWhere = " 1=1 ";
    //           string sql = @"SELECT *
    // FROM (SELECT T.*, ROWNUM RN
    //         FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
    //                      lv.VILLAGE_NAME,
    //                      lv.VILLAGE_ADDRESS,
    //                      lv. VILLAGE_REGION,
    //                      lv.VILLAGE_TYPE,
    //                      lv.VILLAGE_LNG,
    //                      lv.VILLAGE_LAT,
    //                      lv.VILLAGE_BOUNDS,
    //                      to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                      CASE
    //                        WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
    //                         0
    //                        ELSE
    //                         ALLBUILDING.VILLAGE_COUNT
    //                      END VILLAGE_COUNT
    //                 FROM LBS_VILLAGE LV
    //                 LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //                             FROM LBS_BUILDING LB
    //                            WHERE LB.VILLAGE_ID IS NOT NULL
    //                            GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //                   ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
    //                WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'   AND {0}
    //                ORDER BY lv.CREATE_DATE DESC) T)
    //WHERE RN > :S AND RN <= :E ";
    //           string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //                             FROM LBS_BUILDING LB
    //                            WHERE LB.VILLAGE_ID IS NOT NULL
    //                            GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //                   ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID  WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%' AND {0}";

    //           if (village_name != "")
    //           {
    //               sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
    //           }
    //           if (hasbounds=="1")
    //           {
    //               sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
    //           }
    //           if (hasbuildings=="1")
    //           {
    //               sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
    //           }
    //           sqlCount = string.Format(sqlCount,sqlWhere);
    //           DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //           int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           sql = string.Format(sql, sqlWhere);
    //           DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           string json = JsonConvert.SerializeObject(data);
    //           json = json.Substring(9, json.Length - 10);
    //           string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           return jsonf;


    //           //            if (stateFinal == "1")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND (SELECT COUNT(*)
    //           //          FROM LBS_BUILDING LB
    //           //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND (SELECT COUNT(*)
    //           //          FROM LBS_BUILDING LB
    //           //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            if (stateFinal == "2")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            if (stateFinal == "3")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;


    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            else
    //           //            {
    //           //                if (text != "")
    //           //                {

    //           //                    string sql = @"SELECT *
    //           //  FROM (SELECT R.*, ROWNUM AS RN
    //           //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           // WHERE RTWO.RN > :S
    //           //   AND RTWO.RN <= :E
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    //                    string sql = @"SELECT *
    //           //                    //  FROM (SELECT R.*, ROWNUM AS RN
    //           //                    //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                    //                       VILLAGE_NAME,
    //           //                    //                       VILLAGE_ADDRESS,
    //           //                    //                       VILLAGE_REGION,
    //           //                    //                       VILLAGE_TYPE,
    //           //                    //                       VILLAGE_LNG,
    //           //                    //                       VILLAGE_LAT,
    //           //                    //                       VILLAGE_BOUNDS,
    //           //                    //                       (SELECT COUNT(*)
    //           //                    //                          FROM LBS_BUILDING LB
    //           //                    //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                    //                  FROM LBS_VILLAGE LV
    //           //                    //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //                    //                 ORDER BY CREATE_DATE DESC) R) RTWO
    //           //                    // WHERE RTWO.RN > :S
    //           //                    //   AND RTWO.RN <= :E
    //           //                    //";

    //           //                    string sql = @"SELECT LV.*,
    //           //         CASE
    //           //           WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
    //           //            0
    //           //           ELSE
    //           //            ALLBUILDING.VILLAGE_COUNT
    //           //         END VILLAGE_COUNT
    //           //    FROM (SELECT *
    //           //            FROM (SELECT T.*, ROWNUM RN
    //           //                    FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                                 VILLAGE_NAME,
    //           //                                 VILLAGE_ADDRESS,
    //           //                                 VILLAGE_REGION,
    //           //                                 VILLAGE_TYPE,
    //           //                                 VILLAGE_LNG,
    //           //                                 VILLAGE_LAT,
    //           //                                 VILLAGE_BOUNDS,
    //           //                                 to_char(lv.CREATE_DATE,
    //           //                                         'yyyy-mm-dd hh24:mi:ss') CREATE_DATE
    //           //                            FROM LBS_VILLAGE LV
    //           //                           WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                           ORDER BY lv.CREATE_DATE DESC) T)
    //           //           WHERE RN > :S AND RN <= :E ) LV
    //           //    LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //           //                 FROM LBS_BUILDING LB
    //           //                WHERE LB.VILLAGE_ID IS NOT NULL
    //           //                GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //           //      ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID";

    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //       }


    //       /// <summary>
    //       /// 筛选数据
    //       /// </summary>
    //       /// <param name="page"></param>
    //       /// <param name="rows"></param>
    //       /// <param name="pcc"></param>
    //       /// <param name="stateFinal"></param>
    //       /// <param name="text"></param>
    //       /// <returns></returns>
    //       public string IndexByFilterAll(HttpContext context)
    //       {
    //           string pcc = context.Request["pcc"];//地址区域索引
    //           string village_name = context.Request["village_name"];//小区名字
    //           string hasbounds = context.Request["hasbounds"];//是否有小区边界
    //           string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //           string sqlWhere = " 1=1 ";
    //           string sql = @"SELECT *
    // FROM (SELECT T.*, ROWNUM RN
    //         FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
    //                      lv.VILLAGE_NAME,
    //                      lv.VILLAGE_ADDRESS,
    //                      lv. VILLAGE_REGION,
    //                      lv.VILLAGE_TYPE,
    //                      lv.VILLAGE_LNG,
    //                      lv.VILLAGE_LAT,
    //                      lv.VILLAGE_BOUNDS,
    //                      to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                      CASE
    //                        WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
    //                         0
    //                        ELSE
    //                         ALLBUILDING.VILLAGE_COUNT
    //                      END VILLAGE_COUNT
    //                 FROM LBS_VILLAGE LV
    //                 LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //                             FROM LBS_BUILDING LB
    //                            WHERE LB.VILLAGE_ID IS NOT NULL
    //                            GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //                   ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
    //                WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'   AND {0}
    //                ORDER BY lv.CREATE_DATE DESC) T)
    //";
    //           string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //                             FROM LBS_BUILDING LB
    //                            WHERE LB.VILLAGE_ID IS NOT NULL
    //                            GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //                   ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID  WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%' AND {0}";

    //           if (village_name != "")
    //           {
    //               sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%" + village_name + "%'";
    //           }
    //           if (hasbounds == "1")
    //           {
    //               sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
    //           }
    //           if (hasbuildings == "1")
    //           {
    //               sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
    //           }
    //           sqlCount = string.Format(sqlCount, sqlWhere);
    //           DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //           int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           sql = string.Format(sql, sqlWhere);
    //           DataSet data = OraHelper.ExecuteDataSet(sql);
    //           string json = JsonConvert.SerializeObject(data);
    //           json = json.Substring(9, json.Length - 10);
    //           string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           return jsonf;

    //           //            string pcc = context.Request["pcc"];
    //           //            string stateFinal = context.Request["stateFinal"];
    //           //            string text = context.Request["text"];
    //           //            if (stateFinal == "1")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND (SELECT COUNT(*)
    //           //          FROM LBS_BUILDING LB
    //           //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND (SELECT COUNT(*)
    //           //          FROM LBS_BUILDING LB
    //           //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            if (stateFinal == "2")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //   AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            if (stateFinal == "3")
    //           //            {
    //           //                if (text != "")
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;


    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //                    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //    AND (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //           //            else
    //           //            {
    //           //                if (text != "")
    //           //                {

    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //                else
    //           //                {
    //           //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
    //           //                       VILLAGE_NAME,
    //           //                       VILLAGE_ADDRESS,
    //           //                       VILLAGE_REGION,
    //           //                       VILLAGE_TYPE,
    //           //                       VILLAGE_LNG,
    //           //                       VILLAGE_LAT,
    //           //                       VILLAGE_BOUNDS,
    //           //                       (SELECT COUNT(*)
    //           //                          FROM LBS_BUILDING LB
    //           //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
    //           //                  FROM LBS_VILLAGE LV
    //           //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

    //           //                 ORDER BY CREATE_DATE DESC
    //           //";
    //           //                    DataSet data = OraHelper.ExecuteDataSet(sql);
    //           //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
    //           //  FROM LBS_VILLAGE LV
    //           // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
    //           //";
    //           //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
    //           //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //           //                    string json = JsonConvert.SerializeObject(data);
    //           //                    json = json.Substring(9, json.Length - 10);
    //           //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //           //                    return jsonf;
    //           //                }
    //           //            }
    //       }



    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string IndexByFilter2(HttpContext context)
    {
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        string village_name = context.Request["village_name"];//小区名字
                                                              //string hasbounds = context.Request["hasbounds"];//是否有小区边界
        string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        string region = "大东区";
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
                       lv.VILLAGE_NAME,
                       lv.VILLAGE_ADDRESS,
                       lv. VILLAGE_REGION,
                       lv.VILLAGE_TYPE,
                       lv.VILLAGE_LNG,
                       lv.VILLAGE_LAT,
                       lv.VILLAGE_BOUNDS,
                       to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       CASE
                         WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
                          0
                         ELSE
                          ALLBUILDING.VILLAGE_COUNT
                       END VILLAGE_COUNT
                  FROM LBS_VILLAGE LV
                  LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
                 WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'   AND {0}
                 ORDER BY lv.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID  WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%' AND {0}";

        if (village_name != "")
        {
            sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%" + village_name + "%'";
        }
        //if (hasbounds == "1")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        //}
        if (hasbuildings == "1")
        {
            sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        }
        sqlCount = string.Format(sqlCount, sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;


        //            if (stateFinal == "1")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "2")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "3")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;


        //                }
        //                else
        //                {
        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            else
        //            {
        //                if (text != "")
        //                {

        //                    string sql = @"SELECT *
        //  FROM (SELECT R.*, ROWNUM AS RN
        //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC) R) RTWO
        // WHERE RTWO.RN > :S
        //   AND RTWO.RN <= :E
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    //                    string sql = @"SELECT *
        //                    //  FROM (SELECT R.*, ROWNUM AS RN
        //                    //          FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                    //                       VILLAGE_NAME,
        //                    //                       VILLAGE_ADDRESS,
        //                    //                       VILLAGE_REGION,
        //                    //                       VILLAGE_TYPE,
        //                    //                       VILLAGE_LNG,
        //                    //                       VILLAGE_LAT,
        //                    //                       VILLAGE_BOUNDS,
        //                    //                       (SELECT COUNT(*)
        //                    //                          FROM LBS_BUILDING LB
        //                    //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                    //                  FROM LBS_VILLAGE LV
        //                    //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                    //                 ORDER BY CREATE_DATE DESC) R) RTWO
        //                    // WHERE RTWO.RN > :S
        //                    //   AND RTWO.RN <= :E
        //                    //";

        //                    string sql = @"SELECT LV.*,
        //         CASE
        //           WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
        //            0
        //           ELSE
        //            ALLBUILDING.VILLAGE_COUNT
        //         END VILLAGE_COUNT
        //    FROM (SELECT *
        //            FROM (SELECT T.*, ROWNUM RN
        //                    FROM (SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                                 VILLAGE_NAME,
        //                                 VILLAGE_ADDRESS,
        //                                 VILLAGE_REGION,
        //                                 VILLAGE_TYPE,
        //                                 VILLAGE_LNG,
        //                                 VILLAGE_LAT,
        //                                 VILLAGE_BOUNDS,
        //                                 to_char(lv.CREATE_DATE,
        //                                         'yyyy-mm-dd hh24:mi:ss') CREATE_DATE
        //                            FROM LBS_VILLAGE LV
        //                           WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                           ORDER BY lv.CREATE_DATE DESC) T)
        //           WHERE RN > :S AND RN <= :E ) LV
        //    LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
        //                 FROM LBS_BUILDING LB
        //                WHERE LB.VILLAGE_ID IS NOT NULL
        //                GROUP BY LB.VILLAGE_ID) ALLBUILDING
        //      ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID";

        //                    DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
    }


    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string IndexByFilterAll2(HttpContext context)
    {
        //string pcc = context.Request["pcc"];//地址区域索引
        string village_name = context.Request["village_name"];//小区名字
                                                              //string hasbounds = context.Request["hasbounds"];//是否有小区边界
        string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        string region = "大东区";
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(lv.VILLAGE_ID) AS VILLAGE_ID,
                       lv.VILLAGE_NAME,
                       lv.VILLAGE_ADDRESS,
                       lv. VILLAGE_REGION,
                       lv.VILLAGE_TYPE,
                       lv.VILLAGE_LNG,
                       lv.VILLAGE_LAT,
                       lv.VILLAGE_BOUNDS,
                       to_char(lv.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       CASE
                         WHEN ALLBUILDING.VILLAGE_COUNT IS NULL THEN
                          0
                         ELSE
                          ALLBUILDING.VILLAGE_COUNT
                       END VILLAGE_COUNT
                  FROM LBS_VILLAGE LV
                  LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID
                 WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'   AND {0}
                 ORDER BY lv.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
                              FROM LBS_BUILDING LB
                             WHERE LB.VILLAGE_ID IS NOT NULL
                             GROUP BY LB.VILLAGE_ID) ALLBUILDING
                    ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID  WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%' AND {0}";

        if (village_name != "")
        {
            sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%" + village_name + "%'";
        }
        if (hasbuildings == "1")
        {
            sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        }
        sqlCount = string.Format(sqlCount, sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;

        //            string pcc = context.Request["pcc"];
        //            string stateFinal = context.Request["stateFinal"];
        //            string text = context.Request["text"];
        //            if (stateFinal == "1")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND (SELECT COUNT(*)
        //          FROM LBS_BUILDING LB
        //         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "2")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //   AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            if (stateFinal == "3")
        //            {
        //                if (text != "")
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;


        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //                    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //    AND (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) != 0 AND LV.VILLAGE_BOUNDS IS NOT NULL
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
        //            else
        //            {
        //                if (text != "")
        //                {

        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //   AND LV.VILLAGE_NAME LIKE '%" + text + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //                else
        //                {
        //                    string sql = @"SELECT RAWTOHEX(VILLAGE_ID) AS VILLAGE_ID,
        //                       VILLAGE_NAME,
        //                       VILLAGE_ADDRESS,
        //                       VILLAGE_REGION,
        //                       VILLAGE_TYPE,
        //                       VILLAGE_LNG,
        //                       VILLAGE_LAT,
        //                       VILLAGE_BOUNDS,
        //                       (SELECT COUNT(*)
        //                          FROM LBS_BUILDING LB
        //                         WHERE LB.VILLAGE_ID = (LV.VILLAGE_ID)) AS VILLAGE_COUNT
        //                  FROM LBS_VILLAGE LV
        //                 WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'

        //                 ORDER BY CREATE_DATE DESC
        //";
        //                    DataSet data = OraHelper.ExecuteDataSet(sql);
        //                    string sql2 = @"SELECT COUNT(*) AS TOTAL
        //  FROM LBS_VILLAGE LV
        // WHERE LV.VILLAGE_REGION LIKE '%" + pcc + @"%'
        //";
        //                    DataSet dataCount = OraHelper.ExecuteDataSet(sql2);
        //                    int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //                    string json = JsonConvert.SerializeObject(data);
        //                    json = json.Substring(9, json.Length - 10);
        //                    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        //                    return jsonf;
        //                }
        //            }
    }


    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetBuildingsNotOnMap(HttpContext context)
    {
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID, 
                CODE,
                ADDRESS,
                HEIGHT,
                REGION,
                TYPE,
                X,
                Y,
                LNG,
                LAT,
                CREATE_DATE,
                NAME,
                SOURCE,
                BLUELABEL,
                BOUNDS,
                ONMAP
                FROM LBS_BUILDING_DEP WHERE ONMAP = 0";
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetBuildingsNotOnMapMCMY(HttpContext context)
    {
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID, 
                 CODE,
                ADDRESS,
                HEIGHT,
                REGION,
                TYPE,
                X,
                Y,
                LNG,
                LAT,
                CREATE_DATE,
                NAME,
                SOURCE,
                BLUELABEL,
                BOUNDS,
                ONMAP
                FROM LBS_BUILDING_DEP WHERE ONMAP = 0 AND VILLAGE_ID = '169746C4E77A4470BF4DA603C8B95E07'";
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetBuildingsNotOnMapJNTR(HttpContext context)
    {
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID, 
                 CODE,
                ADDRESS,
                HEIGHT,
                REGION,
                TYPE,
                X,
                Y,
                LNG,
                LAT,
                CREATE_DATE,
                NAME,
                SOURCE,
                BLUELABEL,
                BOUNDS,
                ONMAP
                FROM LBS_BUILDING_DEP WHERE ONMAP = 0 AND NAME LIKE '%济南唐人中心%'";
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetBuildingsJNSYJYL(HttpContext context)
    {
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT RAWTOHEX(BUILDING_ID) AS BUILDING_ID, 
                 CODE,
                ADDRESS,
                HEIGHT,
                REGION,
                TYPE,
                X,
                Y,
                LNG,
                LAT,
                CREATE_DATE,
                NAME,
                SOURCE,
                BLUELABEL,
                BOUNDS,
                ONMAP
                FROM LBS_BUILDING_DEP WHERE NAME LIKE '%济南唐人中心%' OR NAME LIKE '%茂昌名邸%' OR NAME LIKE '%福景佳苑%'"; ;
        sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        return json;
    }



    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetStreetsDefaultOld(HttpContext context)
    {
        string page = context.Request["page"];
        string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(limit);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(LS.STREET_ID) AS STREET_ID,
                       LS.CODE,
                       LS.NAME,
                       LS.TYPE,
                       LS.ADDRESS,
                       LS.X,
                       LS.Y,
                       LS.LNG,
                       LS.LAT,
                       LS.BOUNDS,
                       LS.SOURCE,
                       to_char(LS.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID
  FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
 INNER JOIN LBS_STREET LS
    ON LCO.COUNTY_ID = LS.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'
                 ORDER BY LS.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
 INNER JOIN LBS_STREET LS
    ON LCO.COUNTY_ID = LS.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'";
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
        return jsonf;
    }

    //        /// <summary>
    //        /// 获取楼宇
    //        /// </summary>
    //        /// <returns></returns>
    //        public string GetStreetsDefault(HttpContext context)
    //        {
    //            //string page = context.Request["page"];
    //            //string limit = context.Request["limit"];
    //            //string pcc = context.Request["pcc"];//地址区域索引
    //            //string village_name = context.Request["village_name"];//小区名字
    //            ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
    //            //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //            //string region = "大东区";
    //            //var pageInt = int.Parse(page);
    //            //var rowsInt = int.Parse(limit);
    //            //var start = (pageInt * rowsInt) - rowsInt;
    //            //var end = pageInt * rowsInt;
    //            //OracleParameter[] paras = new OracleParameter[] {
    //            //    new OracleParameter(":S", start),
    //            //    new OracleParameter(":E", end)
    //            //};
    //            string sqlWhere = " 1=1 ";
    //            string sql = @"SELECT *
    //  FROM (SELECT T.*, ROWNUM RN
    //          FROM (SELECT RAWTOHEX(LS.STREET_ID) AS STREET_ID,
    //                       LS.CODE,
    //                       LS.NAME,
    //                       LS.TYPE,
    //                       LS.ADDRESS,
    //                       LS.X,
    //                       LS.Y,
    //                       LS.LNG,
    //                       LS.LAT,
    //                       LS.BOUNDS,
    //                       LS.SOURCE,
    //                       to_char(LS.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                       RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID
    //  FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    // WHERE LC.NAME LIKE '%沈阳市%'
    //                 ORDER BY LS.CREATE_DATE DESC) T)
    // ";
    //            string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    // WHERE LC.NAME LIKE '%沈阳市%'";
    //            DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //            //sql = string.Format(sql, sqlWhere);
    //            DataSet data = OraHelper.ExecuteDataSet(sql);
    //            string json = JsonConvert.SerializeObject(data);
    //            json = json.Substring(9, json.Length - 10);
    //            string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
    //            return jsonf;
    //        }

    //        /// <summary>
    //        /// 获取楼宇
    //        /// </summary>
    //        /// <returns></returns>
    //        public string GetCommunitiesDefault(HttpContext context)
    //        {
    //            //string page = context.Request["page"];
    //            //string limit = context.Request["limit"];
    //            //string pcc = context.Request["pcc"];//地址区域索引
    //            //string village_name = context.Request["village_name"];//小区名字
    //            ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
    //            //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //            //string region = "大东区";
    //            //var pageInt = int.Parse(page);
    //            //var rowsInt = int.Parse(limit);
    //            //var start = (pageInt * rowsInt) - rowsInt;
    //            //var end = pageInt * rowsInt;
    //            //OracleParameter[] paras = new OracleParameter[] {
    //            //    new OracleParameter(":S", start),
    //            //    new OracleParameter(":E", end)
    //            //};
    //            string sqlWhere = " 1=1 ";
    //            string sql = @"SELECT *
    //  FROM (SELECT T.*, ROWNUM RN
    //          FROM (SELECT RAWTOHEX(LCOM.COMMUNITY_ID) AS COMMUNITY_ID,
    //                       LCOM.CODE,
    //                       LCOM.NAME,
    //                       LCOM.TYPE,
    //                       LCOM.ADDRESS,
    //                       LCOM.X,
    //                       LCOM.Y,
    //                       LCOM.LNG,
    //                       LCOM.LAT,
    //                       LCOM.BOUNDS,
    //                       LCOM.TEL,
    //                       LCOM.SOURCE,
    //                       to_char(LCOM.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                       RAWTOHEX(LCOM.STREET_ID) AS STREET_ID,
    //                       RAWTOHEX(LCOM.COUNTY_ID) AS COUNTY_ID
    //  FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    // WHERE LC.NAME LIKE '%沈阳市%'
    //                 ORDER BY LCOM.CREATE_DATE DESC) T)
    // ";
    //            string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    // WHERE LC.NAME LIKE '%沈阳市%'";
    //            DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //            //sql = string.Format(sql, sqlWhere);
    //            DataSet data = OraHelper.ExecuteDataSet(sql);
    //            string json = JsonConvert.SerializeObject(data);
    //            json = json.Substring(9, json.Length - 10);
    //            string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
    //            return jsonf;
    //        }

    //        /// <summary>
    //        /// 获取楼宇
    //        /// </summary>
    //        /// <returns></returns>
    //        public string GetVillagesDefault(HttpContext context)
    //        {
    //            //string page = context.Request["page"];
    //            //string limit = context.Request["limit"];
    //            //string pcc = context.Request["pcc"];//地址区域索引
    //            //string village_name = context.Request["village_name"];//小区名字
    //            ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
    //            //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //            //string region = "大东区";
    //            //var pageInt = int.Parse(page);
    //            //var rowsInt = int.Parse(limit);
    //            //var start = (pageInt * rowsInt) - rowsInt;
    //            //var end = pageInt * rowsInt;
    //            //OracleParameter[] paras = new OracleParameter[] {
    //            //    new OracleParameter(":S", start),
    //            //    new OracleParameter(":E", end)
    //            //};
    //            string sqlWhere = " 1=1 ";
    //            string sql = @"SELECT *
    //  FROM (SELECT T.*, ROWNUM RN
    //          FROM (SELECT RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID,
    //                       LV.CODE,
    //                       LV.NAME,
    //                       LV.TYPE,
    //                       LV.ADDRESS,
    //                       LV.X,
    //                       LV.Y,
    //                       LV.LNG,
    //                       LV.LAT,
    //                       LV.BOUNDS,
    //                       LV.SOURCE,
    //                       to_char(LV.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                       RAWTOHEX(LV.COMMUNITY_ID) AS COMMUNITY_ID,
    //                       RAWTOHEX(LV.COUNTY_ID) AS COUNTY_ID
    //  FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    //INNER JOIN LBS_VILLAGE LV
    //    ON LV.COMMUNITY_ID = LCOM.COMMUNITY_ID
    // WHERE LC.NAME LIKE '%沈阳市%'
    //                 ORDER BY LV.CREATE_DATE DESC) T)
    // ";
    //            string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    //INNER JOIN LBS_VILLAGE LV
    //    ON LV.COMMUNITY_ID = LCOM.COMMUNITY_ID
    // WHERE LC.NAME LIKE '%沈阳市%'";
    //            DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //            //sql = string.Format(sql, sqlWhere);
    //            DataSet data = OraHelper.ExecuteDataSet(sql);
    //            string json = JsonConvert.SerializeObject(data);
    //            json = json.Substring(9, json.Length - 10);
    //            string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
    //            return jsonf;
    //        }

    //        /// <summary>
    //        /// 获取楼宇
    //        /// </summary>
    //        /// <returns></returns>
    //        public string GetBuildingsDefault(HttpContext context)
    //        {
    //            //string page = context.Request["page"];
    //            //string limit = context.Request["limit"];
    //            //string pcc = context.Request["pcc"];//地址区域索引
    //            //string village_name = context.Request["village_name"];//小区名字
    //            ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
    //            //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
    //            //string region = "大东区";
    //            //var pageInt = int.Parse(page);
    //            //var rowsInt = int.Parse(limit);
    //            //var start = (pageInt * rowsInt) - rowsInt;
    //            //var end = pageInt * rowsInt;
    //            //OracleParameter[] paras = new OracleParameter[] {
    //            //    new OracleParameter(":S", start),
    //            //    new OracleParameter(":E", end)
    //            //};
    //            string sqlWhere = " 1=1 ";
    //            string sql = @"SELECT *
    //  FROM (SELECT T.*, ROWNUM RN
    //          FROM (SELECT RAWTOHEX(LB.BUILDING_ID) AS BUILDING_ID,
    //                       LB.CODE,
    //                       LB.NAME,
    //                       LB.TYPE,
    //                       LB.ADDRESS,
    //                       LB.BLUELABEL,
    //                       LB.ONMAP,
    //                       LB.HEIGHT,
    //                       LB.X,
    //                       LB.Y,
    //                       LB.LNG,
    //                       LB.LAT,
    //                       LB.BOUNDS,
    //                       LB.SOURCE,
    //                       to_char(LB.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
    //                       LB.PARENT,
    //                       RAWTOHEX(LB.VILLAGE_ID) AS VILLAGE_ID,
    //                       RAWTOHEX(LB.COUNTY_ID) AS COUNTY_ID
    //  FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    //INNER JOIN LBS_VILLAGE LV
    //    ON LV.COMMUNITY_ID = LCOM.COMMUNITY_ID
    //INNER JOIN LBS_BUILDING LB
    //    ON LB.VILLAGE_ID = LV.VILLAGE_ID
    // WHERE LC.NAME LIKE '%沈阳市%'
    //                 ORDER BY LB.CREATE_DATE DESC) T)
    // ";
    //            string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
    // INNER JOIN LBS_COUNTY LCO
    //    ON LC.CITY_ID = LCO.CITY_ID
    // INNER JOIN LBS_STREET LS
    //    ON LCO.COUNTY_ID = LS.COUNTY_ID
    //INNER JOIN LBS_COMMUNITY LCOM
    //    ON LS.STREET_ID = LCOM.STREET_ID
    //INNER JOIN LBS_VILLAGE LV
    //    ON LV.COMMUNITY_ID = LCOM.COMMUNITY_ID
    //INNER JOIN LBS_BUILDING LB
    //    ON LB.VILLAGE_ID = LV.VILLAGE_ID
    // WHERE LC.NAME LIKE '%沈阳市%'";
    //            DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //            int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    //            //sql = string.Format(sql, sqlWhere);
    //            DataSet data = OraHelper.ExecuteDataSet(sql);
    //            string json = JsonConvert.SerializeObject(data);
    //            json = json.Substring(9, json.Length - 10);
    //            string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
    //            return jsonf;
    //        }


    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetStreetsDefault(HttpContext context)
    {
        //string page = context.Request["page"];
        //string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(limit);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(LS.STREET_ID) AS STREET_ID,
                       LS.CODE,
                       LS.NAME,
                       LS.TYPE,
                       LS.ADDRESS,
                       LS.X,
                       LS.Y,
                       LS.LNG,
                       LS.LAT,
                       LS.BOUNDS,
                       LS.SOURCE,
                       to_char(LS.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID
  FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
 INNER JOIN LBS_STREET LS
    ON LCO.COUNTY_ID = LS.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'
                 ORDER BY LS.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
 INNER JOIN LBS_STREET LS
    ON LCO.COUNTY_ID = LS.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'";
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
        return jsonf;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetCommunitiesDefault(HttpContext context)
    {
        //string page = context.Request["page"];
        //string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(limit);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(LCOM.COMMUNITY_ID) AS COMMUNITY_ID,
                       LCOM.CODE,
                       LCOM.NAME,
                       LCOM.TYPE,
                       LCOM.ADDRESS,
                       LCOM.X,
                       LCOM.Y,
                       LCOM.LNG,
                       LCOM.LAT,
                       LCOM.BOUNDS,
                       LCOM.TEL,
                       LCOM.SOURCE,
                       to_char(LCOM.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       RAWTOHEX(LCOM.STREET_ID) AS STREET_ID,
                       RAWTOHEX(LCOM.COUNTY_ID) AS COUNTY_ID
  FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID

INNER JOIN LBS_COMMUNITY LCOM
    ON LCO.COUNTY_ID = LCOM.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'
                 ORDER BY LCOM.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID

INNER JOIN LBS_COMMUNITY LCOM
    ON LCO.COUNTY_ID = LCOM.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'";
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
        return jsonf;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetVillagesDefault(HttpContext context)
    {
        //string page = context.Request["page"];
        //string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(limit);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID,
                       LV.CODE,
                       LV.NAME,
                       LV.TYPE,
                       LV.ADDRESS,
                       LV.X,
                       LV.Y,
                       LV.LNG,
                       LV.LAT,
                       LV.BOUNDS,
                       LV.SOURCE,
                       to_char(LV.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       RAWTOHEX(LV.COMMUNITY_ID) AS COMMUNITY_ID,
                       RAWTOHEX(LV.COUNTY_ID) AS COUNTY_ID
  FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
INNER JOIN LBS_VILLAGE LV
    ON LCO.COUNTY_ID = LV.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'
                 ORDER BY LV.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
INNER JOIN LBS_VILLAGE LV
    ON LCO.COUNTY_ID = LV.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'";
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
        return jsonf;
    }

    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetBuildingsDefault(HttpContext context)
    {
        //string page = context.Request["page"];
        //string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(limit);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT RAWTOHEX(LB.BUILDING_ID) AS BUILDING_ID,
                       LB.CODE,
                       LB.NAME,
                       LB.TYPE,
                       LB.ADDRESS,
                       LB.BLUELABEL,
                       LB.ONMAP,
                       LB.HEIGHT,
                       LB.X,
                       LB.Y,
                       LB.LNG,
                       LB.LAT,
                       LB.BOUNDS,
                       LB.SOURCE,
                       to_char(LB.CREATE_DATE, 'yyyy-mm-dd hh24:mi:ss') CREATE_DATE,
                       LB.PARENT,
                       RAWTOHEX(LB.VILLAGE_ID) AS VILLAGE_ID,
                       RAWTOHEX(LB.COUNTY_ID) AS COUNTY_ID
  FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
INNER JOIN LBS_BUILDING LB
    ON LCO.COUNTY_ID = LB.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'
                 ORDER BY LB.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_CITY LC
 INNER JOIN LBS_COUNTY LCO
    ON LC.CITY_ID = LCO.CITY_ID
INNER JOIN LBS_BUILDING LB
    ON LCO.COUNTY_ID = LB.COUNTY_ID
 WHERE LC.NAME LIKE '%沈阳市%'";
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"code\": 0,\"msg\": \"\",\"count\": " + count + ",\"data\": " + json + "}";
        return jsonf;
    }


    /// <summary>
    /// 获取楼宇
    /// </summary>
    /// <returns></returns>
    public string GetAll(HttpContext context)
    {
        //string page = context.Request["page"];
        //string limit = context.Request["limit"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //string region = "大东区";
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(limit);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT LP.*，RAWTOHEX(LP.PROVINCE_ID) AS PROVINCE_ID_CONV
  FROM LBS_PROVINCE LP";
        string sql2 = @"SELECT LC.*, RAWTOHEX(LC.CITY_ID) AS CITY_ID_CONV, RAWTOHEX(LC.PROVINCE_ID) AS PROVINCE_ID_CONV
  FROM LBS_CITY LC";
        string sql3 = @"SELECT LCO.*, RAWTOHEX(LCO.COUNTY_ID) AS COUNTY_ID_CONV, RAWTOHEX(LCO.CITY_ID) AS CITY_ID_CONV
  FROM LBS_COUNTY LCO";
        string sql4 = @"SELECT LS.*, RAWTOHEX(LS.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID_CONV
  FROM LBS_STREET LS";
        string sql5 = @"SELECT LCM.*, RAWTOHEX(LCM.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LCM.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LCM.COUNTY_ID) AS COUNTY_ID_CONV
  FROM LBS_COMMUNITY LCM";
        string sql6 = @"SELECT LV.*, RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LV.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LV.COUNTY_ID) AS COUNTY_ID_CONV
  FROM LBS_VILLAGE LV";
        string sql7 = @"SELECT LB.*, RAWTOHEX(LB.BUILDING_ID) AS BUILDING_ID_CONV, RAWTOHEX(LB.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LB.COUNTY_ID) AS COUNTY_ID_CONV
  FROM LBS_BUILDING LB";

        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        DataSet data2 = OraHelper.ExecuteDataSet(sql2);
        DataSet data3 = OraHelper.ExecuteDataSet(sql3);
        DataSet data4 = OraHelper.ExecuteDataSet(sql4);
        DataSet data5 = OraHelper.ExecuteDataSet(sql5);
        DataSet data6 = OraHelper.ExecuteDataSet(sql6);
        DataSet data7 = OraHelper.ExecuteDataSet(sql7);
        string json = JsonConvert.SerializeObject(data);
        string json2 = JsonConvert.SerializeObject(data2);
        string json3 = JsonConvert.SerializeObject(data3);
        string json4 = JsonConvert.SerializeObject(data4);
        string json5 = JsonConvert.SerializeObject(data5);
        string json6 = JsonConvert.SerializeObject(data6);
        string json7 = JsonConvert.SerializeObject(data7);
        json = json.Substring(9, json.Length - 10);
        json2 = json2.Substring(9, json2.Length - 10);
        json3 = json3.Substring(9, json3.Length - 10);
        json4 = json4.Substring(9, json4.Length - 10);
        json5 = json5.Substring(9, json5.Length - 10);
        json6 = json6.Substring(9, json6.Length - 10);
        json7 = json7.Substring(9, json7.Length - 10);
        string jsonf = "{\"provinces\": " + json + ",\"cities\": " + json2 + ",\"counties\": " + json3 + ",\"streets\": " + json4 + ",\"communities\": " + json5 + ",\"villages\": " + json6 + ",\"buildings\": " + json7 + "}";
        return jsonf;
    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetAllStreets(HttpContext context)
    {
        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LS.*, RAWTOHEX(LS.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_STREET LS
                 ORDER BY LS.CREATE_DATE DESC) T)
 ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_STREET LS";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetAllStreetsPag(HttpContext context)
    {
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LS.*, RAWTOHEX(LS.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_STREET LS
                 ORDER BY LS.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_STREET LS";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetStreetsByCOUNTYID(HttpContext context)
    {
        string COUNTYID = context.Request["COUNTYID"];

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LS.*, RAWTOHEX(LS.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_STREET LS WHERE COUNTY_ID ='" + COUNTYID + @"' ORDER BY LS.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_STREET LS WHERE COUNTY_ID ='" + COUNTYID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetStreetsByCOUNTYIDPag(HttpContext context)
    {
        string COUNTYID = context.Request["COUNTYID"];
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LS.*, RAWTOHEX(LS.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LS.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_STREET LS WHERE COUNTY_ID ='" + COUNTYID + @"' ORDER BY LS.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_STREET LS WHERE COUNTY_ID ='" + COUNTYID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetCommunitiesBySTREETID(HttpContext context)
    {
        string STREETID = context.Request["STREETID"];

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LCM.*, RAWTOHEX(LCM.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LCM.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LCM.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_COMMUNITY LCM WHERE STREET_ID ='" + STREETID + @"' ORDER BY LCM.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_COMMUNITY LCM WHERE STREET_ID ='" + STREETID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetCommunitiesBySTREETIDPag(HttpContext context)
    {
        string STREETID = context.Request["STREETID"];
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT  LCM.*, RAWTOHEX(LCM.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LCM.STREET_ID) AS STREET_ID_CONV, RAWTOHEX(LCM.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_COMMUNITY LCM WHERE STREET_ID ='" + STREETID + @"' ORDER BY LCM.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_COMMUNITY LCM WHERE STREET_ID ='" + STREETID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }
    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetVillagesByCOMMUNITYID(HttpContext context)
    {
        string COMMUNITYID = context.Request["COMMUNITYID"];

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LV.*, RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LV.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LV.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_VILLAGE LV WHERE COMMUNITY_ID ='" + COMMUNITYID + @"' ORDER BY LV.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV WHERE COMMUNITY_ID ='" + COMMUNITYID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetVillagesByCOMMUNITYIDPag(HttpContext context)
    {
        string COMMUNITYID = context.Request["COMMUNITYID"];
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LV.*, RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LV.COMMUNITY_ID) AS COMMUNITY_ID_CONV, RAWTOHEX(LV.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_VILLAGE LV WHERE COMMUNITY_ID ='" + COMMUNITYID + @"' ORDER BY LV.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV WHERE COMMUNITY_ID ='" + COMMUNITYID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }
    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetBuildingsByVILLAGEID(HttpContext context)
    {
        string VILLAGEID = context.Request["VILLAGEID"];

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LB.*, RAWTOHEX(LB.BUILDING_ID) AS BUILDING_ID_CONV, RAWTOHEX(LB.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LB.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_BUILDING LB WHERE VILLAGE_ID ='" + VILLAGEID + @"' ORDER BY LB.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_BUILDING LB WHERE VILLAGE_ID ='" + VILLAGEID + @"'";


        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetBuildingsByVILLAGEIDPag(HttpContext context)
    {
        string VILLAGEID = context.Request["VILLAGEID"];
        string page = context.Request["page"];
        string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        var pageInt = int.Parse(page);
        var rowsInt = int.Parse(rows);
        var start = (pageInt * rowsInt) - rowsInt;
        var end = pageInt * rowsInt;
        OracleParameter[] paras = new OracleParameter[] {
                new OracleParameter(":S", start),
                new OracleParameter(":E", end)
            };
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT * FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LB.*, RAWTOHEX(LB.BUILDING_ID) AS BUILDING_ID_CONV, RAWTOHEX(LB.VILLAGE_ID) AS VILLAGE_ID_CONV, RAWTOHEX(LB.COUNTY_ID) AS COUNTY_ID_CONV
                  FROM LBS_BUILDING LB WHERE VILLAGE_ID ='" + VILLAGEID + @"' ORDER BY LB.CREATE_DATE DESC) T)
 WHERE RN > :S AND RN <= :E ";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_BUILDING LB WHERE VILLAGE_ID ='" + VILLAGEID + @"'";

        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql, paras);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }





    //string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV LEFT JOIN (SELECT LB.VILLAGE_ID, COUNT(*) AS VILLAGE_COUNT
    //                      FROM LBS_BUILDING LB
    //                     WHERE LB.VILLAGE_ID IS NOT NULL
    //                     GROUP BY LB.VILLAGE_ID) ALLBUILDING
    //            ON LV.VILLAGE_ID = ALLBUILDING.VILLAGE_ID                   WHERE LV.VILLAGE_REGION LIKE '%" + region + @"%'";

    //if (village_name != "")
    //{
    //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
    //}
    ////if (hasbounds=="1")
    ////{
    ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
    ////}
    //if (hasbuildings=="1")
    //{
    //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
    //}
    //sqlCount = string.Format(sqlCount,sqlWhere);
    //DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
    //int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
    ////sql = string.Format(sql, sqlWhere);
    //DataSet data = OraHelper.ExecuteDataSet(sql, paras);
    //string json = JsonConvert.SerializeObject(data);
    //json = json.Substring(9, json.Length - 10);
    //    string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
    //    return jsonf;

    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetAllCommunities(HttpContext context)
    {

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LCM.*, RAWTOHEX(LCM.COMMUNITY_ID) AS COMMUNITY_ID_CONV
                  FROM LBS_COMMUNITY LCM ORDER BY LCM.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_COMMUNITY LCM";


        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }



    /// <summary>
    /// 筛选数据
    /// </summary>
    /// <param name="page"></param>
    /// <param name="rows"></param>
    /// <param name="pcc"></param>
    /// <param name="stateFinal"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public string GetAllVillages(HttpContext context)
    {

        //string page = context.Request["page"];
        //string rows = context.Request["rows"];
        //string pcc = context.Request["pcc"];//地址区域索引
        //string village_name = context.Request["village_name"];//小区名字
        ////string hasbounds  = context.Request["hasbounds"];//是否有小区边界
        //string hasbuildings = context.Request["hasbuildings"];//是否有楼宇
        //var pageInt = int.Parse(page);
        //var rowsInt = int.Parse(rows);
        //var start = (pageInt * rowsInt) - rowsInt;
        //var end = pageInt * rowsInt;
        //OracleParameter[] paras = new OracleParameter[] {
        //    new OracleParameter(":S", start),
        //    new OracleParameter(":E", end)
        //};
        string sqlWhere = " 1=1 ";
        string sql = @"SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (SELECT LV.*, RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID_CONV
                  FROM LBS_VILLAGE LV ORDER BY LV.CREATE_DATE DESC) T)";
        string sqlCount = @"SELECT COUNT(*) AS TOTAL FROM LBS_VILLAGE LV";


        //if (village_name != "")
        //{
        //    sqlWhere += @" AND LV.VILLAGE_NAME LIKE '%"+ village_name + "%'";
        //}
        ////if (hasbounds=="1")
        ////{
        ////    sqlWhere += @" AND LV.VILLAGE_BOUNDS IS NOT NULL ";
        ////}
        //if (hasbuildings=="1")
        //{
        //    sqlWhere += @" AND ALLBUILDING.VILLAGE_COUNT > 0 ";
        //}
        //sqlCount = string.Format(sqlCount,sqlWhere);
        DataSet dataCount = OraHelper.ExecuteDataSet(sqlCount);
        int count = int.Parse(dataCount.Tables[0].Rows[0].ItemArray[0].ToString());
        //sql = string.Format(sql, sqlWhere);
        DataSet data = OraHelper.ExecuteDataSet(sql);
        string json = JsonConvert.SerializeObject(data);
        json = json.Substring(9, json.Length - 10);
        string jsonf = "{\"total\":" + count + ",\"rows\":" + json + "}";
        return jsonf;



    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
 