<%@ WebHandler Language="C#" Class="Level5AddressAPI" %>

using JJLBS_Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


/// <summary>
/// Level5AddressAPI 的摘要说明
/// </summary>
public class Level5AddressAPI : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        if (context.Request.HttpMethod.ToLower() == "get")
        {
            if (context.Request.QueryString["m"] == "GetVillages")
            {
                context.Response.Write(GetVillages(context));
            }
            if (context.Request.QueryString["m"] == "GetBuildings")
            {
                context.Response.Write(GetBuildings(context));
            }
        }
    }

    public string GetVillages(HttpContext context)
    {
        string outData = "";

        string villageID = context.Request["villageID"] == null ? "" : context.Request["villageID"].ToString();

        string sqlWhere = "";
        string sql = @"SELECT CAST(VILLAGE_ID AS NVARCHAR2(32)) AS VILLAGE_ID,       VILLAGE_NAME,       VILLAGE_LNG,       VILLAGE_LAT,       VILLAGE_BOUNDS  FROM LBS_VILLAGE WHERE 1 = 1 {0}";

        if (villageID != "")
        {
            sqlWhere += " AND VILLAGE_ID = '" + villageID + "'";
        }

        //OracleParameter[] cmdParms = new OracleParameter[]
        //{
        //    new OracleParameter(":VILLAGE_ID",villageID)
        //};

        try
        {
            sql = string.Format(sql, sqlWhere);
            DataTable dt = OraHelper.ExecuteDataSet(sql).Tables[0];
            outData = JsonHelper.DataTable2J(dt);
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return outData;

    }

    public string GetBuildings(HttpContext context)
    {
        string outData = "";

        string buildingID = context.Request["buildingID"] == null ? "" : context.Request["buildingID"].ToString();
        string sqlWhere = "";
        string sql = @"SELECT RAWTOHEX(LV.VILLAGE_ID) AS VILLAGE_ID,       VILLAGE_NAME,       VILLAGE_LNG,       VILLAGE_LAT,       VILLAGE_BOUNDS,       RAWTOHEX(BUILDING_ID) AS BUILDING_ID,       BUILDING_NAME  FROM LBS_VILLAGE LV INNER JOIN LBS_BUILDING LB    ON LV.VILLAGE_ID = LB.VILLAGE_ID WHERE 1 = 1 {0}";
        if (buildingID != "")
        {
            sqlWhere += " AND LB.BUILDING_ID = '" + buildingID + "'";
        }
        //OracleParameter[] cmdParms = new OracleParameter[]
        //{
        //    new OracleParameter(":BUILDING_ID",buildingID)
        //};
        try
        {
            sql = string.Format(sql, sqlWhere);
            DataTable dt = OraHelper.ExecuteDataSet(sql).Tables[0];
            outData = JsonHelper.DataTable2J(dt);
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return outData;

    }

    ///// <summary>
    ///// 获取小区服务
    ///// </summary>
    ///// <param name="villageID"></param>
    ///// <returns></returns>
    //public string GetVillages(HttpContext context)
    //{
    //    string villageID = context.Request["villageID"];
    //    if (villageID == null)
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS from lbs_village");
    //        string json = JsonConvert.SerializeObject(data);
    //        return json;
    //    } else
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select RAWTOHEX(VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS from lbs_village where village_id = '{villageID}'");
    //        string json = JsonConvert.SerializeObject(data);
    //        return json;
    //    }
    //}

    ///// <summary>
    ///// 获取楼宇服务
    ///// </summary>
    ///// <param name="buildingID"></param>
    ///// <returns></returns>
    //public string GetBuildings(HttpContext context)
    //{
    //    string buildingID = context.Request["buildingID"];
    //    if (buildingID == null)
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select RAWTOHEX(lv.VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME from lbs_village lv inner join lbs_building lb on lv.village_id = lb.village_id");
    //        string json = JsonConvert.SerializeObject(data);
    //        return json;
    //    }
    //    else
    //    {
    //        DataSet data = OraHelper.ExecuteDataSet($"select RAWTOHEX(lv.VILLAGE_ID) as VILLAGE_ID, VILLAGE_NAME, VILLAGE_LNG, VILLAGE_LAT, VILLAGE_BOUNDS, RAWTOHEX(BUILDING_ID) as BUILDING_ID, BUILDING_NAME from lbs_village lv inner join lbs_building lb on lv.village_id = lb.village_id where lb.building_id = '{buildingID}'");
    //        string json = JsonConvert.SerializeObject(data);
    //        return json;
    //    }
    //}

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
 