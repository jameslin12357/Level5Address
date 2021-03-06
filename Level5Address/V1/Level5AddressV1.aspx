﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Level5Address.aspx.cs" Inherits="JJLBS_Web.JJLBSResource.Page.LBS.Level5Address.Level5Address" %>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Layui</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="layui-v2.5.4/layui/css/layui.css" rel="stylesheet" />
    <link href="Level5Address.css" rel="stylesheet" />
  <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>
<body>
              
<%--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
  <legend>默认风格的Tab</legend>
</fieldset>
 
<div class="layui-tab">
  <ul class="layui-tab-title">
    <li class="layui-this">网站设置</li>
    <li>用户管理</li>
    <li>权限分配</li>
    <li>商品管理</li>
    <li>订单管理</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">
      1. 高度默认自适应，也可以随意固宽。
      <br>2. Tab进行了响应式处理，所以无需担心数量多少。
    </div>
    <div class="layui-tab-item">内容2</div>
    <div class="layui-tab-item">内容3</div>
    <div class="layui-tab-item">内容4</div>
    <div class="layui-tab-item">内容5</div>
  </div>
</div>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>动态操作Tab</legend>
</fieldset>
 
<div class="layui-tab" lay-filter="demo" lay-allowclose="true">
  <ul class="layui-tab-title">
    <li class="layui-this" lay-id="11">网站设置</li>
    <li lay-id="22">用户管理</li>
    <li lay-id="33">权限分配</li>
    <li lay-id="44">商品管理</li>
    <li lay-id="55">订单管理</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">内容1</div>
    <div class="layui-tab-item">内容2</div>
    <div class="layui-tab-item">内容3</div>
    <div class="layui-tab-item">内容4</div>
    <div class="layui-tab-item">内容5</div>
  </div>
</div>
<div class="site-demo-button" style="margin-bottom: 0;">
  <button class="layui-btn site-demo-active" data-type="tabAdd">新增Tab项</button>
  <button class="layui-btn site-demo-active" data-type="tabDelete">删除：商品管理</button>
  <button class="layui-btn site-demo-active" data-type="tabChange">切换到：用户管理</button>
</div>--%>
 
<!-- 示例-970 -->
<%--<ins class="adsbygoogle" style="display:inline-block;width:970px;height:90px" data-ad-client="ca-pub-6111334333458862" data-ad-slot="3820120620"></ins>--%>
  
<%--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>Hash地址定位</legend>
</fieldset>
<div class="layui-tab" lay-filter="test">
  <ul class="layui-tab-title">
    <li class="layui-this" lay-id="11">网站设置</li>
    <li lay-id="22">用户管理</li>
    <li lay-id="33">权限分配</li>
    <li lay-id="44">商品管理</li>
    <li lay-id="55">订单管理</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">
      点击该Tab的任一标题，观察地址栏变化，再刷新页面。选项卡将会自动定位到上一次切换的项
    </div>
    <div class="layui-tab-item">内容2</div>
    <div class="layui-tab-item">内容3</div>
    <div class="layui-tab-item">内容4</div>
    <div class="layui-tab-item">内容5</div>
  </div>
</div>--%>
 
<%--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>简洁风格的Tab</legend>
</fieldset>--%>
 
<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
  <ul class="layui-tab-title">
    <li class="layui-this">街道</li>


  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">
        <table id="demo1" lay-filter="test1"></table>
    </div>

  </div>
</div> 
<%--    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
  <ul class="layui-tab-title">
    <li class="layui-this">社区</li>


  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">
        <table id="demo2" lay-filter="test2"></table>
    </div>
   
  </div>
</div> --%>

<%--    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
  <ul class="layui-tab-title">
    <li class="layui-this">小区</li>
   

  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">
        <table id="demo3" lay-filter="test3"></table>
    </div>
   
  </div>
</div> 

    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
  <ul class="layui-tab-title">
    <li class="layui-this">楼栋</li>
 

  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">
        <table id="demo4" lay-filter="test4"></table>
    </div>

  </div>
</div> --%>
<%-- 
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>卡片风格的Tab</legend>
</fieldset>
 
<div class="layui-tab layui-tab-card">
  <ul class="layui-tab-title">
    <li class="layui-this">网站设置</li>
    <li>用户管理</li>
    <li>权限分配</li>
    <li>商品管理</li>
    <li>订单管理</li>
  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">默认宽度是相对于父元素100%适应的，你也可以固定宽度。</div>
    <div class="layui-tab-item">2</div>
    <div class="layui-tab-item">3</div>
    <div class="layui-tab-item">4</div>
    <div class="layui-tab-item">5</div>
    <div class="layui-tab-item">6</div>
  </div>
</div>
 
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>当Tab数超过一定宽度</legend>
</fieldset>
 
<div class="layui-tab layui-tab-card" style="width: 290px;">
  <ul class="layui-tab-title">
    <li class="layui-this">网站设置</li>
    <li>用户管理</li>
    <li>权限分配</li>
    <li>商品管理</li>
    <li>订单管理</li>
  </ul>
  <div class="layui-tab-content" style="height: 100px;">
    <div class="layui-tab-item layui-show">
      1. 宽度足够，就不会出现右上图标；宽度不够，就会开启展开功能。
      <br>2. 如果你的宽度是自适应的，Tab会自动判断是否需要展开，并适用于所有风格。
    </div>
    <div class="layui-tab-item">2</div>
    <div class="layui-tab-item">3</div>
    <div class="layui-tab-item">4</div>
    <div class="layui-tab-item">5</div>
    <div class="layui-tab-item">6</div>
  </div>
</div>
 --%>
<%--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
  <legend>带删除功能的Tab</legend>
</fieldset>
 
<div class="layui-tab layui-tab-card" lay-allowclose="true">
  <ul class="layui-tab-title">
    <li class="layui-this">网站设置</li>
    <li>用户基本管理</li>
    <li>权限分配</li>
    <li>商品管理</li>
    <li>订单管理</li>
  </ul>
  <div class="layui-tab-content" style="height: 150px;">
    <div class="layui-tab-item layui-show">
      1. 我个人比较喜欢卡片风格的，所以你发现又是以卡片的风格举例
      2. 删除功能适用于所有风格
    </div>
    <div class="layui-tab-item">2</div>
    <div class="layui-tab-item">3</div>
    <div class="layui-tab-item">4</div>
    <div class="layui-tab-item">5</div>
    <div class="layui-tab-item">6</div>
  </div>
</div>             
          --%>
<%--<script src="//res.layui.com/layui/dist/layui.js" charset="utf-8"></script>
<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
--%>
       <script src="../../../HtmlLibs/easyui/jquery.min.js"></script>
    <script src="../../../HtmlLibs/easyui/jquery.easyui.min.js"></script>
    <script src="../../../HtmlLibs/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script src="https://webapi.amap.com/maps?v=1.4.15&amp;key=3cd18e86c129259575068fdb7f2522e0&amp;plugin=AMap.PolyEditor,AMap.Scale,AMap.ControlBar,Map3D"></script>
    <!--<script src="../../../HtmlLibs/layui/layui.js"></script>-->
    <script src="layui-v2.5.4/layui/layui.js"></script>
    <script src="Level5Address.js"></script>


</body>
</html>
