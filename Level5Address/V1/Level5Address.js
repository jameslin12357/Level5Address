var form, layer, element, row, row2;
var editmode = 1;
layui.use(['form', 'layedit', 'laydate', 'layer', 'element'], function () {
    form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
});
var buildingLayer = new AMap.Buildings({ zIndex: 130, merge: false, sort: false, zooms: [3, 20] });
var object3Dlayer = new AMap.Object3DLayer();
var map = new AMap.Map("map", {
    showIndoorMap: false,
    showLabel: true,
    mapStyle: 'amap://styles/light',
    center: [116.401165, 39.902355],
    features: ['bg', 'point', 'road', 'building'],
    viewMode: '3D',
    layers: [
        new AMap.TileLayer({}),
        new AMap.TileLayer.Satellite()
    ]
});
map.addControl(new AMap.Scale());
map.addControl(new AMap.ControlBar({
    showZoomBar: false,
    showControlButton: true,
    position: {
        top: '20px',
        right: '20px'
    }
}));
map.add(buildingLayer);
map.add(object3Dlayer);
map.getLayers()[1].hide();


//编辑器
var mousetool;
map.plugin(["AMap.MouseTool"], function () {
    mousetool = new AMap.MouseTool(map);
    mousetool.on('draw', function (event) {
        // event.obj 为绘制出来的覆盖物对象
        var polygon = event.obj;
        if (polygon.CLASS_NAME === "AMap.Polygon") {
            var bounds = polygon.getPath();
            var list = [];
            bounds.forEach(function (coord) {
                var lng = coord["lng"];
                var lat = coord["lat"];
                list.push([lng, lat]);
            });
            document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
            var drawnPolygons = [];
            map.getAllOverlays("polygon").forEach(function (polygon) {
                var fillColor = polygon.Je.fillColor;
                if (fillColor === "#1791fc") {
                    drawnPolygons.push(polygon);
                }

            });
            if (drawnPolygons.length !== 1) {
                map.remove(drawnPolygons[0]);
            }
            //mousetool.close();

        } else {
            var position = polygon.getPosition();
            var lng = position.lng;
            var lat = position.lat;
            document.getElementById('fieldHidden').innerText = lng;
            document.getElementById('fieldHidden2').innerText = lat;
            polygon.on("dragging", function () {
                var pos = polygon.getPosition();
                document.getElementById('fieldHidden').innerText = pos.lng;
                document.getElementById('fieldHidden2').innerText = pos.lat;
            });
            mousetool.close();
            //var drawnMarkers = [];
            //map.getAllOverlays("marker").forEach(function (marker) {
            //    var icon = marker.Je.icon;
            //    if (icon === undefined) {
            //        drawnMarkers.push(marker);
            //    }
            //});
            //if (drawnMarkers.length !== 1) {
            //    map.remove(drawnMarkers[0]);
            //}
        }
    });
});

function drawPolygon() {
    mousetool.polygon({
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeOpacity: 0.2,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [30,10],
    });
}

function drawMarker() {
    var markers = map.getAllOverlays("marker");
    var count = 0;
    markers.forEach(function (marker) {
        if (marker.Je.draggable === true) {
            count += 1;
        }
    });
    if (count === 0) {
        mousetool.marker({
            draggable: true
        });
    }
}

//var polyEditor = new AMap.PolyEditor(map, polygon);
//polyEditor.on('adjust', function (event) {
//    var p = event.target;
//    var bounds = p.getPath();
//    var list = [];
//    bounds.forEach(function (coord) {
//        var lng = coord["lng"];
//        var lat = coord["lat"];
//        list.push([lng, lat]);
//    });
//    document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//});
//polygon.setExtData({ "editor": polyEditor });

//function IndexByFilterAll(pcc,village_name,hasbounds,hasbuildings) {
//    $.ajax({
//        type: "get",
//        url: `./Level5Address.ashx?m=IndexByFilterAll&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            data.rows.forEach(function (village) {
//                // 有边界
//                if (village.VILLAGE_BOUNDS !== null) {
//                    var polygon = new AMap.Polygon({
//                        strokeWeight: 2,
//                        strokeOpacity: 1,
//                        fillColor: 'green',
//                        fillOpacity: 0.1,
//                        bubble: true,
//                        path: JSON.parse(village.VILLAGE_BOUNDS),
//                        map: map
//                    });
//                    polygon.on('click', function (event) {
//                        map.setCenter([village.VILLAGE_LNG, village.VILLAGE_LAT]);
//                        var info = [];
//                        info.push(`<p class='input-item mb-5px'>小区名称: ${village.VILLAGE_NAME}</p>`);
//                        info.push(`<p class='input-item mb-5px'>详细地址: ${village.VILLAGE_ADDRESS}</p>`);
//                        info.push(`<p class='input-item mb-5px'>区域: ${village.VILLAGE_REGION}</p>`);
//                        info.push(`<p class='input-item mb-5px'>类型: ${village.VILLAGE_TYPE}</p>`);
//                        infoWindow = new AMap.InfoWindow({
//                            content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                        });
//                        infoWindow.open(map, new AMap.LngLat(village.VILLAGE_LNG, village.VILLAGE_LAT));
//                    });
//                }
//                // 无边界
//            });
//        },
//        error: function (item, err) {
//            console.log(err);
//        }
//    });
//}


function IndexByFilterAll() {
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=IndexByFilterAll`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            data.rows.forEach(function (village) {
                // 有边界
                //if (village.VILLAGE_BOUNDS !== null) {
                var polygon = new AMap.Polygon({
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    fillColor: 'green',
                    fillOpacity: 0.1,
                    bubble: true,
                    path: JSON.parse(village.VILLAGE_BOUNDS),
                    map: map
                });
                //polygon.on('click', function (event) {
                //    map.setCenter([village.VILLAGE_LNG, village.VILLAGE_LAT]);
                //    var info = [];
                //    info.push(`<p class='input-item mb-5px'>小区名称: ${village.VILLAGE_NAME}</p>`);
                //    info.push(`<p class='input-item mb-5px'>详细地址: ${village.VILLAGE_ADDRESS}</p>`);
                //    info.push(`<p class='input-item mb-5px'>区域: ${village.VILLAGE_REGION}</p>`);
                //    info.push(`<p class='input-item mb-5px'>类型: ${village.VILLAGE_TYPE}</p>`);
                //    infoWindow = new AMap.InfoWindow({
                //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
                //    });
                //    infoWindow.open(map, new AMap.LngLat(village.VILLAGE_LNG, village.VILLAGE_LAT));
                //});
                //}
                // 无边界
            });
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function IndexByFilterAll2(village_name, hasbuildings) {
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=IndexByFilterAll2&village_name=${village_name}&hasbuildings=${hasbuildings}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            data.rows.forEach(function (village) {
                // 有边界
                //if (village.VILLAGE_BOUNDS !== null) {
                var polygon = new AMap.Polygon({
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    fillColor: 'green',
                    fillOpacity: 0.1,
                    bubble: true,
                    path: JSON.parse(village.VILLAGE_BOUNDS),
                    map: map
                });
                //polygon.on('click', function (event) {
                //    map.setCenter([village.VILLAGE_LNG, village.VILLAGE_LAT]);
                //    var info = [];
                //    info.push(`<p class='input-item mb-5px'>小区名称: ${village.VILLAGE_NAME}</p>`);
                //    info.push(`<p class='input-item mb-5px'>详细地址: ${village.VILLAGE_ADDRESS}</p>`);
                //    info.push(`<p class='input-item mb-5px'>区域: ${village.VILLAGE_REGION}</p>`);
                //    info.push(`<p class='input-item mb-5px'>类型: ${village.VILLAGE_TYPE}</p>`);
                //    infoWindow = new AMap.InfoWindow({
                //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
                //    });
                //    infoWindow.open(map, new AMap.LngLat(village.VILLAGE_LNG, village.VILLAGE_LAT));
                //});
                //}
                // 无边界
            });
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

//复选框获取带有楼宇小区数据
$('#checkboxHasBuildings').checkbox({
    labelWidth: 50,
    onChange: function (checked) {
        var village_name = document.getElementById('inputSearchVillage').value;
        //var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
        var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
        map.clearMap();
        //IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
        IndexByFilterAll2(village_name, hasbuildings);

        $("#dg").datagrid({
            pageNumber: 1,
            url: `./Level5Address.ashx?m=IndexByFilter2&village_name=${village_name}&hasbuildings=${hasbuildings}`,
            method: 'get',
            onLoadSuccess: function (data) {
                document.getElementsByClassName('datagrid-row')[0].click();
            }
        });
        //var province = $("#selectProvince").find("option:selected").text();
        //var city = $("#selectCity").find("option:selected").text();
        //var county = $("#selectCounty").find("option:selected").text();
        //if (province === "全部") {
        //    province = "%";
        //}
        //if (city === "全部") {
        //    city = "%";
        //}
        //if (county === "全部") {
        //    county = "%";
        //}
        //var pcc = province + "/" + city + "/" + county;
        //var village_name = document.getElementById('inputSearchVillage').value;
        //var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
        //var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
        //map.clearMap();
        //IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
        //$("#dg").datagrid({
        //    pageNumber: 1,
        //    url: `./Level5Address.ashx?m=IndexByFilter&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
        //    method: 'get',
        //    onLoadSuccess: function (data) {
        //        document.getElementsByClassName('datagrid-row')[0].click();
        //    }
        //});
    }
});

//复选框获取带有边界小区数据
//$('#checkboxHasBounds').checkbox({
//    labelWidth: 50,
//    onChange: function (checked) {
//        var province = $("#selectProvince").find("option:selected").text();
//        var city = $("#selectCity").find("option:selected").text();
//        var county = $("#selectCounty").find("option:selected").text();
//        if (province === "全部") {
//            province = "%";
//        }
//        if (city === "全部") {
//            city = "%";
//        }
//        if (county === "全部") {
//            county = "%";
//        }
//        var pcc = province + "/" + city + "/" + county;
//        var village_name = document.getElementById('inputSearchVillage').value;
//        var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
//        var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
//        map.clearMap();
//        IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
//        $("#dg").datagrid({
//            pageNumber: 1,
//            url: `./Level5Address.ashx?m=IndexByFilter&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
//            method: 'get',
//            onLoadSuccess: function (data) {
//                document.getElementsByClassName('datagrid-row')[0].click();
//            }
//        });
//    }
//});

//搜索小区
function searchVillage(e) {
    //var province = $("#selectProvince").find("option:selected").text();
    //var city = $("#selectCity").find("option:selected").text();
    //var county = $("#selectCounty").find("option:selected").text();
    //if (province === "全部") {
    //    province = "%";
    //}
    //if (city === "全部") {
    //    city = "%";
    //}
    //if (county === "全部") {
    //    county = "%";
    //}
    //var pcc = province + "/" + city + "/" + county;
    var village_name = document.getElementById('inputSearchVillage').value;
    //var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
    var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
    map.clearMap();
    //IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
    IndexByFilterAll2(village_name, hasbuildings);

    $("#dg").datagrid({
        pageNumber: 1,
        url: `./Level5Address.ashx?m=IndexByFilter2&village_name=${village_name}&hasbuildings=${hasbuildings}`,
        method: 'get',
        onLoadSuccess: function (data) {
            document.getElementsByClassName('datagrid-row')[0].click();
        }
    });
}


//打开/关闭小区边界
function openPois(e) {
    e.classList.remove("layui-btn-primary");
    e.classList.add("layui-btn-normal");
    e.innerHTML += `<i class="fa fa-check ml-3px"></i>`;
    e.setAttribute("disabled", true);
    var sibling = e.nextSibling;
    sibling.classList.remove("layui-btn-normal");
    sibling.classList.add("layui-btn-primary");
    sibling.innerHTML = `否`;
    sibling.removeAttribute("disabled");
    var polygons = map.getAllOverlays("polygon");
    polygons.forEach(function (polygon) {
        if (polygon.getOptions().strokeStyle === "solid") {
            polygon.show();
        }        
    });
}

function closePois(e) {
    e.classList.remove("layui-btn-primary");
    e.classList.add("layui-btn-normal");
    e.innerHTML += `<i class="fa fa-check ml-3px"></i>`;
    e.setAttribute("disabled", true);
    var sibling = e.previousSibling;
    sibling.classList.remove("layui-btn-normal");
    sibling.classList.add("layui-btn-primary");
    sibling.innerHTML = `是`;
    sibling.removeAttribute("disabled");
    var polygons = map.getAllOverlays("polygon");
    polygons.forEach(function (polygon) {
        if (polygon.getOptions().strokeStyle === "solid") {
            polygon.hide();
        }
    });
}

//显示/关闭楼宇名称
function showBuildingNames(e) {
    e.classList.remove("layui-btn-primary");
    e.classList.add("layui-btn-normal");
    e.innerHTML += `<i class="fa fa-check ml-3px"></i>`;
    e.setAttribute("disabled", true);
    var sibling = e.nextSibling;
    sibling.classList.remove("layui-btn-normal");
    sibling.classList.add("layui-btn-primary");
    sibling.innerHTML = `否`;
    sibling.removeAttribute("disabled");
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        marker.setLabel({ content: `<div class="labelMarker">${marker.getExtData()["building_name"]}</div>` });
        //get each marker ext data and set label to data which will setup label and disable point 
    });
    //var overlays = map.getAllOverlays("polygon");
    //overlays.forEach(function (overlay) {
    //    overlay.show();
    //});
}

function hideBuildingNames(e) {

    e.classList.remove("layui-btn-primary");
    e.classList.add("layui-btn-normal");
    e.innerHTML += `<i class="fa fa-check ml-3px"></i>`;
    e.setAttribute("disabled", true);
    var sibling = e.previousSibling;
    sibling.classList.remove("layui-btn-normal");
    sibling.classList.add("layui-btn-primary");
    sibling.innerHTML = `是`;
    sibling.removeAttribute("disabled");
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        marker.setLabel({});
        //get each marker ext data and set label to data which will setup label and disable point 
    });
    //var overlays = map.getAllOverlays("polygon");
    //overlays.forEach(function (overlay) {
    //    overlay.hide();
    //});
}

$("#dg").datagrid({
    columns: [[
        { field: "VILLAGE_NAME", title: "小区名称", width: 100, align: "center" },
        { field: "VILLAGE_ADDRESS", title: "详细地址", width: 120, align: "center" },
        { field: "VILLAGE_REGION", title: "区域", width: 80, align: "center" },
        { field: "VILLAGE_TYPE", title: "类型", width: 80, align: "center" },
        { field: "VILLAGE_COUNT", title: "楼宇数", width: 50, align: "center" },
        //{
        //    field: "VILLAGE_HASBOUNDS", title: "边界", width: 50, align: "center", formatter: function (value, row, index) {
        //        if (row.VILLAGE_BOUNDS !== null) {
        //            return "有";
        //        } else {
        //            return "无";
        //        }
        //    }
        //},
        {
            field: "VILLAGE_ACTION", title: "操作", width: 50, align: "center", formatter: function (value, row, index) {
                return `<i class="fa fa-eye mr-5" data-lng="${row.VILLAGE_LNG}" data-lat="${row.VILLAGE_LAT}" data-bounds="${row.VILLAGE_BOUNDS}" data-guid="${row.VILLAGE_ID}" onclick="detailsVillage(this);"></i><i class="fa fa-edit mr-5" data-guid="${row.VILLAGE_ID}" onclick="
editVillage(this);"></i><i class="fa fa-trash-o" data-guid="${row.VILLAGE_ID}" onclick="deleteVillage(this);"></i>`;
            }
        },
    ]]
});

$("#dg2").datagrid({
    columns: [[
        { field: "BUILDING_NAME", title: "楼宇名称", width: 80, align: "center" },
        { field: "BUILDING_ADDRESS", title: "详细地址", width: 80, align: "center" },
        { field: "BLUELABEL", title: "蓝牌地址码", width: 80, align: "center" },
        {
            field: "BUILDING_ACTION", title: "操作", width: 50, align: "center", formatter: function (value, row, index) {
                return `<i class=\"fa fa-eye mr-5\" data-lng="${row.LNG}" data-lat="${row.LAT}" data-bounds="${row.BUILDING_BOUNDS}" data-guid="${row.BUILDING_ID}" 
onclick="detailsBuilding(this);"></i><i class=\"fa fa-edit mr-5 \" data-guid="${row.BUILDING_ID} " onclick="editBuilding(this); "></i><i class=\"fa fa-trash-o \" data-guid="${row.BUILDING_ID} " onclick="deleteBuilding(this); "></i>`;
            }
        }
    ]]
});

$('.datagrid-pager.pagination').pagination({
    displayMsg: "显示 {total} 条 中 {from} 到 {to} 条"
});

function changePolygonsColor() {
    var polygons = map.getAllOverlays("polygon");
    var villages = [];
    polygons.forEach(function (polygon) {
        if (polygon.getOptions().strokeStyle === "solid") {
            villages.push(polygon);
        }
    });
    villages.forEach(function (village) {
        village.setOptions({
            strokeColor: 'green',
            fillColor: 'green'
        });
    });
}

function removeMarkers() {
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        map.remove(marker);
    });
}

$('#dg').datagrid({
    onClickRow: function (index, field, value) { 
        row = field;
        changePolygonsColor();
        removeMarkers();
        map.setZoom(17);
        map.setCenter([field.VILLAGE_LNG, field.VILLAGE_LAT]);
        var polygons = map.getAllOverlays("polygon");
        var villages = [];
        polygons.forEach(function (polygon) {
            if (polygon.getOptions().strokeStyle === "solid") {
                villages.push(polygon);
            }
        });
        villages.forEach(function (village) {
            var bounds = village.getPath();
            var list = [];
            bounds.forEach(function (coord) {
                var lng = coord["lng"];
                var lat = coord["lat"];
                list.push([lng, lat]);
            });
            var boundsStringified = JSON.stringify(list);
            if (boundsStringified === field.VILLAGE_BOUNDS) {
                village.setOptions({
                    strokeColor: 'purple',
                    fillColor: 'purple'
                });
            }
        });
        if (field.VILLAGE_COUNT !== 0) {
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetBuildings&villageid=${field.VILLAGE_ID}`,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (buildings) {
                    var Prisms = [];
                 
                    buildings.forEach(function (building) {
                        var icon = new AMap.Icon({
                            size: new AMap.Size(25, 25),
                            image: './icons/poi-marker-default.png',  // Icon的图像
                            imageSize: new AMap.Size(25, 25)
                        });
                        var marker = new AMap.Marker({
                            position: new AMap.LngLat(building.LNG, building.LAT),
                            label: {},
                            extData: { building_name: building.BUILDING_NAME },
                            icon: icon
                        });
                        marker.on("dragging", function () {
                            var pos = marker.getPosition();
                            document.getElementById('fieldHidden').innerText = pos.lng;
                            document.getElementById('fieldHidden2').innerText = pos.lat;
                        });
                        map.add(marker);
                      
                        if (building.ONMAP === 0) {
                            var bounds = JSON.parse(building.BUILDING_BOUNDS).map(function (path) {
                                return new AMap.LngLat(path[0], path[1]);
                            });
                                // 创建 Object3D 对象
                                var prism = new AMap.Object3D.Prism({
                                    path: bounds,
                                    height: building.BUILDING_HEIGHT,
                                    color: 'rgba(211,211,211,0.9)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
                                });
                                // 开启透明度支持
                                prism.transparent = true;
                                // 添加至 3D 图层
                                Prisms.push(prism);
                            }
                    });
                       if (Prisms.length !== 0) {
                        Prisms.forEach(function (prism) {
                            object3Dlayer.add(prism);
                        });
                    }
                    //buildings.forEach(function (building) {
                    //    // 有边界
                    //    if (building.BUILDING_BOUNDS !== null) {
                    //        var icon = new AMap.Icon({
                    //            size: new AMap.Size(25, 25),
                    //            image: './icons/poi-marker-default.png',  // Icon的图像
                    //            imageSize: new AMap.Size(25, 25)
                    //        });
                    //        var marker = new AMap.Marker({
                    //            position: new AMap.LngLat(building.LNG, building.LAT),
                    //            label: {},
                    //            extData: { building_name: building.BUILDING_NAME },
                    //            icon: icon
                    //        });
                    //        marker.on("dragging", function () {
                    //            var pos = marker.getPosition();
                    //            document.getElementById('fieldHidden').innerText = pos.lng;
                    //            document.getElementById('fieldHidden2').innerText = pos.lat;
                    //        });
                    //        map.add(marker);
                    //        var bounds = JSON.parse(building.BUILDING_BOUNDS).map(function (path) {
                    //            return new AMap.LngLat(path[0], path[1]);
                    //        });
                    //        if (building.ONMAP === 0) {
                    //            // 创建 Object3D 对象
                    //            var prism = new AMap.Object3D.Prism({
                    //                path: bounds,
                    //                height: building.BUILDING_HEIGHT,
                    //                color: 'rgba(211,211,211,0.9)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
                    //            });
                    //            // 开启透明度支持
                    //            prism.transparent = true;
                    //            // 添加至 3D 图层
                    //            Prisms.push(prism);
                    //        }
                    //    }
                    //    // 无边界
                    //    else {
                    //        var icon = new AMap.Icon({
                    //            size: new AMap.Size(25, 25),
                    //            image: './icons/poi-marker-default.png',  // Icon的图像
                    //            imageSize: new AMap.Size(25, 25)
                    //        });
                    //        var marker = new AMap.Marker({
                    //            position: new AMap.LngLat(building.LNG, building.LAT),
                    //            label: {},
                    //            extData: { building_name: building.BUILDING_NAME },
                    //            icon: icon
                    //        });
                    //        marker.on("dragging", function () {
                    //            var pos = marker.getPosition();
                    //            document.getElementById('fieldHidden').innerText = pos.lng;
                    //            document.getElementById('fieldHidden2').innerText = pos.lat;
                    //        });
                    //        map.add(marker);
                    //    }
                    //});
                    //if (Prisms.length !== 0) {
                    //    Prisms.forEach(function (prism) {
                    //        object3Dlayer.add(prism);
                    //    });
                    //}
                },
                error: function (item, err) {
                    console.log(err);
                }
            });
            $("#dg2").datagrid({
                pageNumber: 1,
                pageSize: 50,
                pageList: [50],
                url: `./Level5Address.ashx?m=GetBuildingsPaginated&villageid=${field.VILLAGE_ID}&text=`,
                method: 'get',
                onLoadSuccess: function (data) {
                }
            });
        }
        // 有边界
        //if (field.VILLAGE_BOUNDS !== null) {
            //map.setZoom(17);
            //map.setCenter([field.VILLAGE_LNG, field.VILLAGE_LAT]);
            //var polygons = map.getAllOverlays("polygon");
            //var villages = [];
            //polygons.forEach(function (polygon) {
            //    if (polygon.getOptions().strokeStyle === "solid") {
            //        villages.push(polygon);
            //    }
            //});
            //villages.forEach(function (village) {
            //    var bounds = village.getPath();
            //    var list = [];
            //    bounds.forEach(function (coord) {
            //        var lng = coord["lng"];
            //        var lat = coord["lat"];
            //        list.push([lng, lat]);
            //    });
            //    var boundsStringified = JSON.stringify(list);
            //    if (boundsStringified === field.VILLAGE_BOUNDS) {
            //        village.setOptions({
            //            strokeColor: 'purple',
            //            fillColor: 'purple'
            //        });
            //    }
            //});
        //}
        // 无边界
        //else {
        //    map.setZoom(17);
        //    map.setCenter([field.VILLAGE_LNG, field.VILLAGE_LAT]);
        //}
    }
});

$('#dg2').datagrid({
    onClickRow: function (index, field, value) {
        row2 = field;
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png',  // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        var markers = map.getAllOverlays("marker");
        markers.forEach(function (marker) {
            marker.setIcon(icon);
        });
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-red.png', // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        markers.forEach(function (marker) {
            if (marker.getPosition()["lng"] == field.LNG && marker.getPosition()["lat"] == field.LAT) {
                marker.setIcon(icon);
            }
        });
        map.setCenter([field.LNG, field.LAT]);

        //// 有边界
        //if (field.BUILDING_BOUNDS !== null) {
        //    var icon = new AMap.Icon({
        //        size: new AMap.Size(25, 25),
        //        image: './icons/poi-marker-red.png', // Icon的图像
        //        imageSize: new AMap.Size(25, 25)
        //    });
        //    markers.forEach(function (marker) {
        //        if (marker.getPosition()["lng"] == field.LNG && marker.getPosition()["lat"] == field.LAT) {
        //            marker.setIcon(icon);
        //        }
        //    });
        //}
        //// 无边界
        //else {
        //    var icon = new AMap.Icon({
        //        size: new AMap.Size(25, 25),
        //        image: './icons/poi-marker-red.png', // Icon的图像
        //        imageSize: new AMap.Size(25, 25)
        //    });
        //    markers.forEach(function (marker) {
        //        if (marker.getPosition()["lng"] == field.LNG && marker.getPosition()["lat"] == field.LAT) {
        //            marker.setIcon(icon);
        //        }
        //    });
        //}
    }
});

//获取小区
function getVillage(e) {
    var selectP = document.getElementById('selectProvince');
    var selectC = document.getElementById('selectCity');
    var selectCT = document.getElementById('selectCounty');
    var province = $("#selectProvince").find("option:selected").text();
    var city = $("#selectCity").find("option:selected").text();
    var county = $("#selectCounty").find("option:selected").text();
    var adcode = document.getElementById('selectCounty').value;
    var region = province + "/" + city + "/" + county;
    if (province !== "全部" && city !== "全部" && county !== "全部") {
        $.ajax({
            type: "get",
            url: `./Level5Address.ashx?m=Regionexists&region=${region}`,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data[0]["COUNT"] === 0) {
                    $.ajax({
                        type: "get",
                        url: `https://restapi.amap.com/v3/place/text?key=c7aeb11746b35a92b7b6eee3178a05e4&keywords=&types=120302&city=${adcode}&children=1&offset=5&page=1&extensions=all`,
                        dataType: "json",
                        success: function (data) {
                            var count = data["count"];
                            var times = 0;
                            if (count !== 0) {
                                var div = document.createElement('div');
                                div.setAttribute('id', 'pb');
                                div.innerHTML += `<div class="layui-progress layui-progress-big layui-bg-orange" lay-filter="pb" lay-showpercent="true"">
  <div class="layui-progress-bar" lay-percent="0%"></div>
</div>`;
                                document.getElementsByTagName('body')[0].appendChild(div);
                                var currentP = 10;
                                //  set your counter to 1
                                function myLoop() {           //  create a loop function
                                    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                                        element.progress('pb', `${String(currentP)}%`);
                                        currentP += 10;                    //  increment the counter
                                        if (currentP <= 100) {            //  if the counter < 10, call the loop function
                                            myLoop();             //  ..  again which will trigger another
                                        } else {
                                            document.getElementById('pb').remove(); layer.msg("小区已更新");
                                        }//  ..  setTimeout()
                                    }, 1000)
                                }
                                myLoop();
                                times = Math.ceil(count / 20);
                                for (var i = 0; i < times; i++) {
                                    var page = i + 1;
                                    console.log('this is page' + page);
                                    $.ajax({
                                        type: "get",
                                        url: `https://restapi.amap.com/v3/place/text?key=c7aeb11746b35a92b7b6eee3178a05e4&keywords=&types=120302&city=${adcode}&children=1&offset=20&page=${page}&extensions=all`,
                                        dataType: "json",
                                        success: function (data2) {
                                            data2["pois"].forEach(function (poi) {
                                                var region = `${poi["pname"]}/${poi["cityname"]}/${poi["adname"]}`;
                                                var lnglat = poi["location"];
                                                var lng = Number(lnglat.split(',')[0]);
                                                var lat = Number(lnglat.split(',')[1]);
                                                $.ajax({
                                                    type: "post",
                                                    url: `./Level5Address.ashx?m=CreateVillages`,
                                                    data: { "village_code": poi["id"], "village_name": poi["name"], "village_address": poi["address"], "village_region": region, "village_type": poi["type"], "village_x": lng, "village_y": lat, "village_lng": lng, "village_lat": lat, "source": "高德" },
                                                    dataType: "json",
                                                    success: function (data) {
                                                        if (data.length !== 0) {
                                                            console.log('error');
                                                        } else {
                                                            console.log('inserted');
                                                        }
                                                    },
                                                    error: function (item, err) {
                                                        console.log(err);
                                                    }
                                                });
                                            });
                                        },
                                        error: function () {
                                            console.log('error');
                                        }
                                    });
                                }
                            }
                        },
                        error: function () {
                            console.log('error');
                        }
                    });
                }
            },
            error: function () {
                console.log('error');
            }
        });
    }
}

//添加小区
function createVillage(e) {
  

    //var province = $("#selectProvince").find("option:selected").text();
    //var city = $("#selectCity").find("option:selected").text();
    //var county = $("#selectCounty").find("option:selected").text();
    //if (province !== "全部" && city !== "全部" && county !== "全部") {
    //    var optionsProvince = document.getElementById('selectProvince').innerHTML.split("><");
    //    var optionsCity = document.getElementById('selectCity').innerHTML.split("><");
    //    var optionsCounty = document.getElementById('selectCounty').innerHTML.split("><");
    //    var selectedProvince = $("#selectProvince").find("option:selected").text();
    //    var selectedCity = $("#selectCity").find("option:selected").text();
    //    var selectedCounty = $("#selectCounty").find("option:selected").text();
    //    var optionsProvinceF = "";
    //    var optionsCityF = "";
    //    var optionsCountyF = "";
    //    for (var i = 0; i < optionsProvince.length; i++) {
    //        if (i !== 0) {
    //            if (i !== optionsProvince.length - 1) {
    //                if (optionsProvince[i].split('>')[1].split('<')[0] === selectedProvince) {
    //                    optionsProvinceF += "<" + optionsProvince[i].split('>')[0] + `selected="">` + optionsProvince[i].split('>')[1] + ">";
    //                } else {
    //                    optionsProvinceF += "<" + optionsProvince[i] + ">";
    //                }
    //            } else {
    //                if (optionsProvince[i].split('>')[1].split('<')[0] === selectedProvince) {
    //                    optionsProvinceF += "<" + optionsProvince[i].split('>')[0] + `selected="">` + optionsProvince[i].split('>')[1];
    //                } else {
    //                    optionsProvinceF += "<" + optionsProvince[i];
    //                }
    //            }
    //        }
    //    }
    //    for (var i = 0; i < optionsCity.length; i++) {
    //        if (i !== 0) {
    //            if (i !== optionsCity.length - 1) {
    //                if (optionsCity[i].split('>')[1].split('<')[0] === selectedCity) {
    //                    optionsCityF += "<" + optionsCity[i].split('>')[0] + `selected="">` + optionsCity[i].split('>')[1] + ">";
    //                } else {
    //                    optionsCityF += "<" + optionsCity[i] + ">";
    //                }
    //            } else {
    //                if (optionsCity[i].split('>')[1].split('<')[0] === selectedCity) {
    //                    optionsCityF += "<" + optionsCity[i].split('>')[0] + `selected="">` + optionsCity[i].split('>')[1];
    //                } else {
    //                    optionsCityF += "<" + optionsCity[i];
    //                }
    //            }
    //        }
    //    }
    //    for (var i = 0; i < optionsCounty.length; i++) {
    //        if (i !== 0) {
    //            if (i !== optionsCounty.length - 1) {
    //                if (optionsCounty[i].split('>')[1].split('<')[0] === selectedCounty) {
    //                    optionsCountyF += "<" + optionsCounty[i].split('>')[0] + `selected="">` + optionsCounty[i].split('>')[1] + ">";
    //                } else {
    //                    optionsCountyF += "<" + optionsCounty[i] + ">";
    //                }
    //            } else {
    //                if (optionsCounty[i].split('>')[1].split('<')[0] === selectedCounty) {
    //                    optionsCountyF += "<" + optionsCounty[i].split('>')[0] + `selected="">` + optionsCounty[i].split('>')[1];
    //                } else {
    //                    optionsCountyF += "<" + optionsCounty[i];
    //                }
    //            }
    //        }
    //    }
        //var selectProvince = `<select id="selectProvinceTemp" required>` + optionsProvinceF + `</select>`;
        //var selectCity = `<select id="selectCityTemp" required>` + optionsCityF + `</select>`;
        //var selectCounty = `<select id="selectCountyTemp" required>` + optionsCountyF + `</select>`;
  
        //var province = $("#selectProvince").find("option:selected").text();
        //var city = $("#selectCity").find("option:selected").text();
        //var county = $("#selectCounty").find("option:selected").text();
    //var selectProvince = `<select id="selectProvinceTemp" required> <option value="">全部</option>
    //        <option value="110000">北京市</option><option value="120000">天津市</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海市</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆市</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option></select>`;
    //var selectCity = `<select id="selectCityTemp" required></select>`;
    //var selectCounty = `<select id="selectCountyTemp" required></select>`;

    //var d = "";
    //$.ajax({
    //    type: "get",
    //    url: `./region.json`,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        console.log(data);
    //        d = data;

    //        d.forEach(function (item) {
    //            if (item["item_code"].slice(2) === '0000') {
    //                selectProvince.innerHTML += `<option value=${item["item_code"]}>${item["item_name"]}</option>`;
    //            }
    //        });
    //        selectProvince.innerHTML += '</select>';
    //        //var selectP = document.getElementById('selectProvince');
    //        //var selectC = document.getElementById('selectCity');
    //        //var selectCT = document.getElementById('selectCounty');
    //        //selectP.innerHTML += selectProvince;
    //        //selectP.addEventListener('change', function (e) {
    //        //    var value = e.target.value;
    //        //    if (value !== "") {
    //        //        selectC.innerHTML = `<option value="">全部</option>`;
    //        //        d.forEach(function (i) {
    //        //            if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
    //        //                selectC.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
    //        //            }
    //        //        });
    //        //    }
    //        //});
    //        //selectC.addEventListener('change', function (e) {
    //        //    var value = e.target.value;
    //        //    if (value !== "") {
    //        //        selectCT.innerHTML = `<option value="">全部</option>`;
    //        //        d.forEach(function (i2) {
    //        //            if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
    //        //                if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
    //        //                    selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
    //        //                }
    //        //            } else {
    //        //                if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
    //        //                    selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
    //        //                }
    //        //            }
    //        //        });
    //        //    }
    //        //});

    //    },
    //    error: function (item, err) {
    //        console.log(err);
    //    }
    //});
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "新建小区",
            end: function () {
                mousetool.close(true);
                map.setDefaultCursor("pointer");
            },
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createVillagePost(this);"> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">小区名称</label> 
    <div class="layui-input-block"> 
     <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">详细地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>`+ ` 
   <div class="layui-form-item"> 
    <label class="layui-form-label">区域</label> 
    <div class="layui-input-inline">
      <select id="selectProvince" lay-filter="selectProvince"> <option value="">全部</option>
            <option value="110000">北京市</option><option value="120000">天津市</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海市</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆市</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option></select>
    </div>
    <div class="layui-input-inline">
     <select id="selectCity" lay-filter="selectCity">
 <option value="">全部</option></select>
    </div>
    <div class="layui-input-inline">
          <select id="selectCounty" lay-filter="selectCounty">
 <option value="">全部</option>
</select>

    </div> 
   </div> 

   <div id="fieldHidden" class="layui-form-item hidden"></div>
   <div id="fieldHidden2" class="layui-form-item hidden"></div>
   <div id="fieldHidden3" class="layui-form-item hidden"></div> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">添加位置</label> 
    <div class="layui-input-block"> 
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" /> 
    </div> 
   </div> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">添加边界</label> 
    <div class="layui-input-block"> 
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" /> 
    </div> 
   </div> 

   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
  </form>`
        });
        form.render();
        form.on('switch(switch1)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                drawPolygon();
                document.getElementById('s2').checked = false;
                form.render('checkbox');
            } else {
                mousetool.close();
            }
        });
        form.on('switch(switch2)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                drawMarker();
                document.getElementById('s1').checked = false;
                form.render('checkbox');
            } else {
                mousetool.close();
            }
        });
    form.on('select(selectProvince)', function (data) {
        //TODO执行自己的代码
          $.ajax({
        type: "get",
        url: `./region.json`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
              success: function (data) {
                  var value = $("#selectProvince").val();
                  if (value !== "") {
                      var selectCity = document.getElementById('selectCity');
                      selectCity.innerHTML = `<option value="">全部</option>`;
                    data.forEach(function (i) {
                        if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
                            selectCity.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
                        }
                    });
                }
            form.render();
              },
              error: function (item, err) {
                  console.log(err);
              }
          });
    });

    form.on('select(selectCity)', function (data) {
        //TODO执行自己的代码
        $.ajax({
            type: "get",
            url: `./region.json`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var value = $("#selectCity").val();
                if (value !== "") {
                    var selectCounty = document.getElementById('selectCounty');
                    selectCounty.innerHTML = `<option value="">全部</option>`;
                                    data.forEach(function (i2) {
                        if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
                            if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
                                selectCounty.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
                            }
                        } else {
                            if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
                                selectCounty.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
                            }
                        }
                    });
                }
                form.render();
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    });
        
            //selectP.addEventListener('change', function (e) {
            //    var value = e.target.value;
            //    if (value !== "") {
            //        selectC.innerHTML = `<option value="">全部</option>`;
            //        d.forEach(function (i) {
            //            if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
            //                selectC.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
            //            }
            //        });
            //    }
            //});
            //selectC.addEventListener('change', function (e) {
            //    var value = e.target.value;
            //    if (value !== "") {
            //        selectCT.innerHTML = `<option value="">全部</option>`;
            //        d.forEach(function (i2) {
            //            if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
            //                if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
            //                    selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
            //                }
            //            } else {
            //                if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
            //                    selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
            //                }
            //            }
            //        });
            //    }
            //});


     //var selectP = document.getElementById('selectProvinceTemp');
     //       var selectC = document.getElementById('selectCityTemp');
     //      selectP.addEventListener('change', function (e) {
     //          var value = e.target.value;
     //          console.log(value);
     //           //if (value !== "") {
     //           //    selectC.innerHTML = `<option value="">全部</option>`;
     //           //    d.forEach(function (i) {
     //           //        if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
     //           //            selectC.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
     //           //        }
     //           //    });
     //           //}
     //       });
     //       selectC.addEventListener('change', function (e) {
     //           var value = e.target.value;
     //           console.log(value);

     //           //if (value !== "") {
     //           //    selectCT.innerHTML = `<option value="">全部</option>`;
     //           //    d.forEach(function (i2) {
     //           //        if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
     //           //            if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
     //           //                selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
     //           //            }
     //           //        } else {
     //           //            if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
     //           //                selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
     //           //            }
     //           //        }
     //           //    });
     //           //}
     //       });
    }
    //else {
    //    layer.msg("请选择省份,城市,和区县");
    //}


function createVillagePost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    //if (document.getElementById('fieldHidden3').innerText === "") {
    //    var div = document.createElement('div');
    //    div.classList.add("clRedError");
    //    div.innerHTML += `<p class="mb-5">请输入边界</p>`;
    //    e.appendChild(div);
    //} else if (document.getElementById('fieldHidden').innerText === "" || document.getElementById('fieldHidden2').innerText === "") {
    //    var div = document.createElement('div');
    //    div.classList.add("clRedError");
    //    div.innerHTML += `<p class="mb-5">请输入位置</p>`;
    //    e.appendChild(div);
    //} else {
        var inputs = e.getElementsByTagName('input');
        var selects = e.getElementsByTagName('select');
        var village_name = inputs[0].value;
        var village_address = inputs[1].value;
        var village_region = $('#selectProvince').find(":selected").text() + '/' + $('#selectCity').find(":selected").text() + '/' + $('#selectCounty').find(":selected").text();
        var village_type = "商务住宅;住宅区;住宅小区";
        var village_lng = document.getElementById('fieldHidden').innerText;
        var village_lat = document.getElementById('fieldHidden2').innerText;
        var village_bounds = document.getElementById('fieldHidden3').innerText;
        var source = "自建";
        $.ajax({
            type: "post",
            url: `./Level5Address.ashx?m=CreateVillage`,
            data: { "village_name": village_name, "village_address": village_address, "village_region": village_region, "village_type": village_type, "village_lng": village_lng, "village_lat": village_lat, "village_bounds": village_bounds, "source": source },
            dataType: "json",
            success: function (data) {
                if (data.length !== 0) {
                    var div = document.createElement('div');
                    div.classList.add("clRedError");
                    data.forEach(function (error) {
                        div.innerHTML += `<p class="mb-5">${error}</p>`;
                    })
                    e.appendChild(div);
                } else {
                    layer.closeAll();
                    layer.msg("小区已添加");
                    var polygon = new AMap.Polygon({
                        strokeWeight: 2,
                        strokeOpacity: 1,
                        fillColor: 'green',
                        fillOpacity: 0.1,
                        bubble: true,
                        path: JSON.parse(village_bounds),
                        map: map
                    });
                    //polygon.on('click', function (event) {
                    //    map.setZoom(17);
                    //    map.setCenter([village_lng, village_lat]);
                    //    var info = [];
                    //    info.push(`<p class='input-item mb-5px'>小区名称: ${village_name}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>详细地址: ${village_address}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>区域: ${village_region}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>类型: ${village_type}</p>`);
                    //    infoWindow = new AMap.InfoWindow({
                    //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
                    //    });
                    //    infoWindow.open(map, new AMap.LngLat(village_lng, village_lat));
                    //});
                    //var polyEditor = new AMap.PolyEditor(map, polygon);
                    //polyEditor.on('adjust', function (event) {
                    //    var p = event.target;
                    //    var bounds = p.getPath();
                    //    var list = [];
                    //    bounds.forEach(function (coord) {
                    //        var lng = coord["lng"];
                    //        var lat = coord["lat"];
                    //        list.push([lng, lat]);
                    //    });
                    //    document.getElementById('fieldHidden3').innerText = JSON.stringify(list);O
                    //});
                    //polygon.setExtData({ "editor": polyEditor });
                    $('#dg').datagrid('reload');
                }
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    }


//小区详情
function detailsVillage() {    
    setTimeout(function () {
        layer.open({
            btn: [],
            //move: false,
            //offset: ['100px', '80%'],
            shade: 0,
            title: "小区信息",
            content: `<div class="mb-10"><span class="mr-5 bold">小区名称:</span><span>${row["VILLAGE_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row["VILLAGE_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">区域:</span><span>${row["VILLAGE_REGION"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row["VILLAGE_TYPE"]}</span></div>`
        });
        //// 有边界
        //if (row["VILLAGE_BOUNDS"] !== null) {
        //    layer.open({
        //        btn: [],
        //        move: false,
        //        offset: ['100px', '80%'],
        //        shade: 0,
        //        title: "小区信息",
        //        content: `<div class="mb-10"><span class="mr-5 bold">小区名称:</span><span>${row["VILLAGE_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row["VILLAGE_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">区域:</span><span>${row["VILLAGE_REGION"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row["VILLAGE_TYPE"]}</span></div>`
        //    });
        //}
        //// 无边界
        //else {
        //    layer.open({
        //        btn: [],
        //        move: false,
        //        offset: ['100px', '80%'],
        //        shade: 0,
        //        title: "小区信息",
        //        content: `<div class="mb-10"><span class="mr-5 bold">小区名称:</span><span>${row["VILLAGE_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row["VILLAGE_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">区域:</span><span>${row["VILLAGE_REGION"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row["VILLAGE_TYPE"]}</span></div>`
        //    });
        //}
    }, 1500);
}

//编辑小区
function editVillage() {
    setTimeout(function () {
        var polygonSelected = "";
        var polygons = map.getAllOverlays("polygon");
        polygons.forEach(function (polygon) {
            if (polygon.getOptions().strokeColor === "purple") {
                polygonSelected = polygon;
            }
        });
        var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        polyEditor.on('adjust', function (event) {
            var bounds = event.target.getPath();
            var list = [];
            bounds.forEach(function (coord) {
                var lng = coord["lng"];
                var lat = coord["lat"];
                list.push([lng, lat]);
            });
            document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
        });
        polygonSelected.setExtData({ "editor": polyEditor });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑小区",
            end: function () {
                map.setDefaultCursor("pointer");
                mousetool.close(true);
                polygonSelected.getExtData()["editor"].close();
                map.remove(polygonSelected);
                if (editmode === 1) {
                    var polygon = new AMap.Polygon({
                        strokeWeight: 2,
                        strokeOpacity: 1,
                        strokeColor: "purple",
                        strokeStyle: "solid",
                        fillColor: "purple",
                        fillOpacity: 0.2,
                        bubble: true,
                        path: JSON.parse(row["VILLAGE_BOUNDS"]),
                        map: map
                    });
                    //polygon.on('click', function (event) {
                    //    map.setZoom(17);
                    //    map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
                    //    var info = [];
                    //    info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
                    //    info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
                    //    infoWindow = new AMap.InfoWindow({
                    //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
                    //    });
                    //    infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
                    //});
              //      <div class="layui-form-item">
              //          <label class="layui-form-label">区域</label>
              //          <div class="layui-input-block">
              //              <select name="region" required>
              //                  <option value="` + row[" VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
              //    </option></select>
              //      </div>
              //</div >
                }
            },
            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillagePost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">小区名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">详细地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
                    </div>
                  </div>
          
<div class="layui-form-item">
                <label class="layui-form-label">编辑位置</label>
                <div class="layui-input-block">
                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
                </div>
              </div>
       
<div class="layui-form-item">
                <label class="layui-form-label">编辑边界</label>
                <div class="layui-input-block">
                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
                </div>
              </div>

<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        form.on('switch(switch1)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                polygonSelected.getExtData()["editor"].open();
                document.getElementById('s2').checked = false;
                form.render('checkbox');
            } else {
                polygonSelected.getExtData()["editor"].close();
            }
        });
        form.on('switch(switch2)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                drawMarker();
                document.getElementById('s1').checked = false;
                form.render('checkbox');
            } else {
                mousetool.close();
            }
        });
//        // 有边界
//        if (row["VILLAGE_BOUNDS"] !== null) {
//            var polygonSelected = "";
//            var polygons = map.getAllOverlays("polygon");
//            polygons.forEach(function (polygon) {
//                if (polygon.getOptions().strokeColor === "purple") {
//                    polygonSelected = polygon;
//                }
//            });
//            var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//            polyEditor.on('adjust', function (event) {
//                var bounds = event.target.getPath();
//                var list = [];
//                bounds.forEach(function (coord) {
//                    var lng = coord["lng"];
//                    var lat = coord["lat"];
//                    list.push([lng, lat]);
//                });
//                document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//            });
//            polygonSelected.setExtData({ "editor": polyEditor });
//            layer.open({
//                btn: [],
//                shade: 0,
//                title: "编辑小区",
//                end: function () {
//                    map.setDefaultCursor("pointer");
//                    mousetool.close(true);
//                    polygonSelected.getExtData()["editor"].close();
//                    map.remove(polygonSelected);
//                    if (editmode === 1) {
//                        var polygon = new AMap.Polygon({
//                            strokeWeight: 2,
//                            strokeOpacity: 1,
//                            strokeColor: "purple",
//                            strokeStyle: "solid",
//                            fillColor: "purple",
//                            fillOpacity: 0.2,
//                            bubble: true,
//                            path: JSON.parse(row["VILLAGE_BOUNDS"]),
//                            map: map
//                        });
//                        polygon.on('click', function (event) {
//                            map.setZoom(17);
//                            map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//                            var info = [];
//                            info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//                            info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//                            info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//                            info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//                            infoWindow = new AMap.InfoWindow({
//                                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                            });
//                            infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//                        });
//                    }
//                },
//                content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillage2(this);">
//                   <div class="layui-form-item">
//                    <label class="layui-form-label">小区名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">详细地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//                    </div>
//                  </div>
//              <div class="layui-form-item">
//                <label class="layui-form-label">区域</label>
//              <div class="layui-input-block">
//                  <select name="region" required>
//                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//                  </option></select>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">类型</label>
//                <div class="layui-input-block">
//                  <select name="type" lay-filter="aihao"  required>
//                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//                  </select>
//                </div>
//              </div>
       
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑位置</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>
//<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//            });
//            form.render();
//            form.on('switch(switch1)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    polygonSelected.getExtData()["editor"].open();
//                    document.getElementById('s2').checked = false;
//                    form.render('checkbox');
//                } else {
//                    polygonSelected.getExtData()["editor"].close();
//                }
//            });
//            form.on('switch(switch2)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    drawMarker();
//                    document.getElementById('s1').checked = false;
//                    form.render('checkbox');
//                } else {
//                    mousetool.close();
//                }
//            });
//        }
//        // 无边界
//        else {
//            layer.open({
//                btn: [],
//                shade: 0,
//                title: "编辑小区",
//                end: function () {
//                    map.setDefaultCursor("pointer");
//                    mousetool.close(true);
//                },
//                content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editVillage1(this);">
//                   <div class="layui-form-item">
//                    <label class="layui-form-label">小区名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">详细地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//                    </div>
//                  </div>
//              <div class="layui-form-item">
//                <label class="layui-form-label">区域</label>
//                <div class="layui-input-block">
//                  <select name="region" required>
//                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//                  </option></select>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">类型</label>
//                <div class="layui-input-block">
//                  <select name="type" lay-filter="aihao"  required>
//                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//                  </select>
//                </div>
//              </div>

//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑位置</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>
//<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//            });
//            form.render();
//            form.on('switch(switch1)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    drawPolygon();
//                    document.getElementById('s2').checked = false;
//                    form.render('checkbox');
//                } else {
//                    mousetool.close();
//                }
//            });
//            form.on('switch(switch2)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    drawMarker();
//                    document.getElementById('s1').checked = false;
//                    form.render('checkbox');
//                } else {
//                    mousetool.close();
//                }
//            });
//        }
    }, 2000);
}

//function editVillage1(e) {
//    var errors = document.getElementsByClassName("clRedError");
//    for (var i = 0; i < errors.length; i++) {
//        errors[i].remove();
//    }
//    var inputs = e.getElementsByTagName('input');
//    var village_name = inputs[0].value;
//    var village_address = inputs[1].value;
//    var village_region = inputs[2].value;
//    var village_type = inputs[3].value;
//    var village_lng = document.getElementById('fieldHidden').innerText;
//    var village_lat = document.getElementById('fieldHidden2').innerText;
//    var village_bounds = document.getElementById('fieldHidden3').innerText;
//    if (village_bounds === "null") {
//        village_bounds = "";
//    }
//    var village_id = row["VILLAGE_ID"];
//        $.ajax({
//            type: "post",
//            url: `./Level5Address.ashx?m=EditVillage&villageid=${village_id}`,
//            data: {
//                "village_name": village_name, "village_address": village_address, "village_region": village_region, "village_type": village_type, "village_lng": village_lng, "village_lat": village_lat, "village_bounds": village_bounds
//            },
//            dataType: "json",
//            success: function (data) {
//                if (data.length !== 0) {
//                    var div = document.createElement('div');
//                    div.classList.add("clRedError");
//                    data.forEach(function (error) {
//                        div.innerHTML += `<p class="mb-5">${error}</p>`;
//                    })
//                    e.appendChild(div);
//                } else {
//                    layer.closeAll();
//                    layer.msg("小区已编辑");
//                    if (village_bounds !== "") {
//                        var polygon = new AMap.Polygon({
//                            strokeWeight: 2,
//                            strokeOpacity: 1,
//                            strokeColor: "green",
//                            strokeStyle: 'solid',
//                            fillColor: "green",
//                            fillOpacity: 0.2,
//                            bubble: true,
//                            path: JSON.parse(village_bounds),
//                            map: map
//                        });
//                        //polygon.on('click', function (event) {
//                        //    map.setZoom(17);
//                        //    map.setCenter([village_lng, village_lat]);
//                        //    var info = [];
//                        //    info.push(`<p class='input-item mb-5px'>小区名称: ${village_name}</p>`);
//                        //    info.push(`<p class='input-item mb-5px'>详细地址: ${village_address}</p>`);
//                        //    info.push(`<p class='input-item mb-5px'>区域: ${row[village_region]}</p>`);
//                        //    info.push(`<p class='input-item mb-5px'>类型: ${row[village_type]}</p>`);
//                        //    infoWindow = new AMap.InfoWindow({
//                        //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                        //    });
//                        //    infoWindow.open(map, new AMap.LngLat(village_lng, village_lat));
//                        //});
//                    }
//                    $('#dg').datagrid('reload');
//                }
//            },
//            error: function (item, err) {
//            }
//        });
    
//}

function editVillagePost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var village_name = inputs[0].value;
    var village_address = inputs[1].value;
    //var village_region = inputs[2].value;
    //var village_type = '商务住宅;住宅区;住宅小区';
    var village_lng = document.getElementById('fieldHidden').innerText;
    var village_lat = document.getElementById('fieldHidden2').innerText;
    var village_bounds = document.getElementById('fieldHidden3').innerText;
    var village_id = row["VILLAGE_ID"];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=EditVillage&villageid=${village_id}`,
        data: {
            "village_name": village_name, "village_address": village_address, "village_lng": village_lng, "village_lat": village_lat, "village_bounds": village_bounds
        },
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                var div = document.createElement('div');
                div.classList.add("clRedError");
                data.forEach(function (error) {
                    div.innerHTML += `<p class="mb-5">${error}</p>`;
                })
                e.appendChild(div);
            } else {
                editmode = 2;
                layer.closeAll();
                layer.msg("小区已编辑");
                setTimeout(function () {
                    editmode = 1;
                }, 8000);
                var polygon = new AMap.Polygon({
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    strokeColor: "green",
                    strokeStyle: 'solid',
                    fillColor: "green",
                    fillOpacity: 0.2,
                    bubble: true,
                    path: JSON.parse(village_bounds),
                    map: map
                });
                //polygon.on('click', function (event) {
                //    map.setZoom(17);
                //    map.setCenter([village_lng, village_lat]);
                //    var info = [];
                //    info.push(`<p class='input-item mb-5px'>小区名称: ${village_name}</p>`);
                //    info.push(`<p class='input-item mb-5px'>详细地址: ${village_address}</p>`);
                //    info.push(`<p class='input-item mb-5px'>区域: ${row[village_region]}</p>`);
                //    info.push(`<p class='input-item mb-5px'>类型: ${row[village_type]}</p>`);
                //    infoWindow = new AMap.InfoWindow({
                //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
                //    });
                //    infoWindow.open(map, new AMap.LngLat(village_lng, village_lat));
                //});
                $('#dg').datagrid('reload');
                }
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    
}

//删除小区
function deleteVillage() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除小区",
        content: `<div><div class="mb-15 tc">确定删除小区?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteVillagePost1(this);">删除</button></div></div>`
    });
    //// 有边界
    //if (row["VILLAGE_BOUNDS"] !== null) {
    //    layer.open({
    //        btn: [],
    //        shade: 0,
    //        title: "删除小区",
    //        content: `<div><div class="mb-15 tc">确定删除小区?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteVillagePost1(this);">删除</button></div></div>`
    //    });
    //}
    //// 无边界
    //else {
    //    layer.open({
    //        btn: [],
    //        shade: 0,
    //        title: "删除小区",
    //        content: `<div><div class="mb-15 tc">确定删除小区?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteVillagePost2(this);">删除</button></div></div>`
    //    });
    //}
}

function deleteVillagePost1(e) {
    var village_id = row['VILLAGE_ID'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteVillage&villageid=${village_id}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                layer.msg('请先删除楼宇');
            } else {
                layer.closeAll();
                layer.msg("小区已删除");
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (p) {
                    if (p.getOptions().strokeColor === "purple") {
                        map.remove(p);
                    }
                });
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
            layer.msg('请先删除相应楼宇');
        }
    });
}

function deleteVillagePost2(e) {
    var village_id = row['VILLAGE_ID'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteVillage&villageid=${village_id}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
            } else {
                layer.closeAll();
                layer.msg("小区已删除");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}


//搜索楼宇
function searchBuilding(e) {
    var text = document.getElementById("inputSearchBuilding").value;
    var villageSelected = $('#dg').datagrid('getSelected');
    if (villageSelected !== null) {
        $("#dg2").datagrid({
            pageNumber: 1,
            url: `./Level5Address.ashx?m=GetBuildingsPaginated&text=${text}&villageid=${villageSelected.VILLAGE_ID}`,
            method: 'get',
            onLoadSuccess: function (data) {

                //$("#dg").datagrid('selectRow',0);
            }
        });
    } else {
        layer.msg("请选择小区");
    }
}

//获取楼宇
function getBuildingNumber(str) {
    var r = str.match(/[a-zA-Z]/);
    if (r !== null) {
        return str.slice(r["index"]);
    } else {
        var r2 = str.match(/\d/);
        if (r2 !== null) {
            return str.slice(r2["index"]);
        } else {
            return str;
        }
    }
}

function getBuilding(e) {
    var selectP = document.getElementById('selectProvince');
    var selectC = document.getElementById('selectCity');
    var selectCT = document.getElementById('selectCounty');
    var province = $("#selectProvince").find("option:selected").text();
    var city = $("#selectCity").find("option:selected").text();
    var county = $("#selectCounty").find("option:selected").text();
    var adcode = document.getElementById('selectCounty').value;
    var region = province + "/" + city + "/" + county;
    if (province !== "全部" && city !== "全部" && county !== "全部") {
        $.ajax({
            type: "get",
            url: `./Level5Address.ashx?m=Regionexists2&region=${region}`,
            dataType: "json",
            success: function (data) {
                if (data[0]["COUNT"] === 0) {
                    $.ajax({
                        type: "get",
                        url: `https://restapi.amap.com/v3/place/text?key=c7aeb11746b35a92b7b6eee3178a05e4&keywords=&types=190403&city=${adcode}&children=1&offset=5&page=1&extensions=all`,
                        dataType: "json",
                        success: function (data) {
                            var count = data["count"];
                            var times = 0;
                            if (count !== 0) {
                                var div = document.createElement('div');
                                div.setAttribute('id', 'pb');
                                div.innerHTML += `<div class="layui-progress layui-progress-big layui-bg-orange" lay-filter="pb" lay-showpercent="true"">
  <div class="layui-progress-bar" lay-percent="0%"></div>
</div>`;
                                document.getElementsByTagName('body')[0].appendChild(div);
                                var currentP = 10;
                                function myLoop() {           //  create a loop function
                                    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                                        element.progress('pb', `${String(currentP)}%`);
                                        currentP += 10;                    //  increment the counter
                                        if (currentP <= 100) {            //  if the counter < 10, call the loop function
                                            myLoop();             //  ..  again which will trigger another
                                        } else {
                                            document.getElementById('pb').remove(); layer.msg("楼宇已更新");
                                        }//  ..  setTimeout()
                                    }, 1000)
                                }
                                myLoop();
                                times = Math.ceil(count / 20);
                                console.log(count);
                                for (var i = 0; i < times; i++) {
                                    var page = i + 1;
                                    console.log('this is page' + page);
                                    $.ajax({
                                        type: "get",
                                        url: `https://restapi.amap.com/v3/place/text?key=c7aeb11746b35a92b7b6eee3178a05e4&keywords=&types=190403&city=${adcode}&children=1&offset=20&page=${page}&extensions=all`,
                                        dataType: "json",
                                        success: function (data2) {
                                            console.log(data2);
                                            data2["pois"].forEach(function (poi) {
                                                var region = `${poi["pname"]}/${poi["cityname"]}/${poi["adname"]}`;
                                                var lnglat = poi["location"];
                                                var lng = Number(lnglat.split(',')[0]);
                                                var lat = Number(lnglat.split(',')[1]);
                                                var building_number = getBuildingNumber(poi["name"]);
                                                $.ajax({
                                                    type: "post",
                                                    url: `./Level5Address.ashx?m=CreateBuildings`,
                                                    data: { "building_code": poi["id"], "building_number": building_number, "building_name": poi["name"], "building_address": poi["address"], "building_region": region, "building_type": poi["type"], "building_x": lng, "building_y": lat, "building_lng": lng, "building_lat": lat, "village_id": poi["parent"], "source": "高德" },
                                                    dataType: "json",
                                                    success: function (data) {
                                                        if (data.length !== 0) {
                                                            console.log('error');
                                                        } else {
                                                            console.log('inserted');
                                                        }
                                                    },
                                                    error: function (item, err) {
                                                        console.log(err);
                                                    }
                                                });
                                            });
                                        },
                                        error: function () {
                                            console.log('error');
                                        }
                                    });
                                }
                            }
                        },
                        error: function () {
                            console.log('error');
                        }
                    });
                }
            },
            error: function () {
                console.log('error');
            }
        });
    }
}

//新建楼宇
function createBuilding(e) {
    var villageSelected = $('#dg').datagrid('getSelected');
    if (villageSelected !== null) {
        var villageId = villageSelected.VILLAGE_ID;
        var villageRegion = villageSelected.VILLAGE_REGION;
        //var optionsProvince = document.getElementById('selectProvince').innerHTML;
        //var optionsCity = document.getElementById('selectCity').innerHTML;
        //var optionsCounty = document.getElementById('selectCounty').innerHTML;
        //var selectProvince = `<select id="selectProvinceTemp" required>` + optionsProvince.slice(28) + `</select>`;
        //var selectCity = `<select id="selectCityTemp" required>` + optionsCity.slice(28) + `</select>`;
        //var selectCounty = `<select id="selectCountyTemp" required>` + optionsCounty.slice(28) + `</select>`;
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            end: function () {
                mousetool.close(true);
                map.setDefaultCursor("pointer");
            },
            title: "新建楼宇",
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createBuildingPost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">楼宇号码</label>
                <div class="layui-input-block">
                      <input type="text" name="building_number" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
              <div class="layui-form-item">
                    <label class="layui-form-label">楼宇名称</label>
                <div class="layui-input-block">
                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">详细地址</label>
                <div class="layui-input-block">
                      <input type="text" name="building_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
 <div class="layui-form-item">
                    <label class="layui-form-label">蓝牌地址码</label>
                <div class="layui-input-block">
                      <input type="text" name="bluelabel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
 <div class="layui-form-item">
                    <label class="layui-form-label">高度</label>
                <div class="layui-input-block">
                      <input type="text" name="building_height" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>

<div id="fieldHidden" class="layui-form-item hidden"></div><div id="fieldHidden2" class="layui-form-item hidden"></div><div id="fieldHidden3" class="layui-form-item hidden"></div>

 <div id="fieldHidden4" class="layui-form-item hidden">` + villageId + `</div><div id="fieldHidden5" class="layui-form-item hidden">` + villageRegion + `</div>
<div class="layui-form-item">
    <label class="layui-form-label">添加位置</label>
    <div class="layui-input-block">
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" />
    </div>
   </div>
   <div class="layui-form-item">
    <label class="layui-form-label">添加边界</label>
    <div class="layui-input-block">
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" />
    </div>
   </div>

   <div class="layui-form-item">
    <label class="layui-form-label">是否绘制</label>
    <div class="layui-input-block">
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s3" />
    </div>
   </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        form.on('switch(switch1)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                drawPolygon();
                document.getElementById('s2').checked = false;
                form.render('checkbox');
            } else {
                mousetool.close();
            }
        });
        form.on('switch(switch2)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                drawMarker();
                document.getElementById('s1').checked = false;
                form.render('checkbox');
            } else {
                mousetool.close();
            }
        });
    } else {
        layer.msg("请选择小区");
    }
}

function createBuildingPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    //if (document.getElementById('fieldHidden3').innerText === "") {
    //    var div = document.createElement('div');
    //    div.classList.add("clRedError");
    //    div.innerHTML += `<p class="mb-5">请输入边界</p>`;
    //    e.appendChild(div);
    //} else if (document.getElementById('fieldHidden').innerText === "" || document.getElementById('fieldHidden2').innerText === "") {
    //    var div = document.createElement('div');
    //    div.classList.add("clRedError");
    //    div.innerHTML += `<p class="mb-5">请输入位置</p>`;
    //    e.appendChild(div);
    //} else {
        var inputs = e.getElementsByTagName('input');
        var selects = e.getElementsByTagName('select');
        var building_number = inputs[0].value;
        var building_name = inputs[1].value;
        var building_address = inputs[2].value;
        var bluelabel = inputs[3].value;
        var building_height = inputs[4].value;
        var building_region = document.getElementById('fieldHidden5').innerText;
        var building_type = '地名地址信息;门牌信息;楼栋号';
        var building_lng = document.getElementById('fieldHidden').innerText;
        var building_lat = document.getElementById('fieldHidden2').innerText;
        var building_bounds = document.getElementById('fieldHidden3').innerText;
        var village_id = document.getElementById('fieldHidden4').innerText;
        var source = "自建";
        var onmap = 0;
        if (!document.getElementById('s3').checked) {
            var onmap = 1;
        }
        
        $.ajax({
            type: "post",
            url: `./Level5Address.ashx?m=CreateBuilding`,
            data: { "building_number": building_number, "building_name": building_name, "building_address": building_address, "bluelabel": bluelabel, "building_height":building_height, "building_region": building_region, "building_type": building_type, "building_lng": building_lng, "building_lat": building_lat, "building_bounds": building_bounds, "village_id": village_id, "source": source, "onmap": onmap },
            dataType: "json",
            success: function (data) {
                if (data.length !== 0) {
                    var div = document.createElement('div');
                    div.classList.add("clRedError");
                    data.forEach(function (error) {
                        div.innerHTML += `<p class="mb-5">${error}</p>`;
                    })
                    e.appendChild(div);
                } else {
                    layer.closeAll();
                    layer.msg("楼宇已添加");
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-default.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(building_lng, building_lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: building_name,
                        icon: icon // 添加 Icon 图标 URL
                    });
                    map.add(marker);
                    if (document.getElementById('s3').checked) {
                        var bounds = JSON.parse(building_bounds).map(function (path) {
                            return new AMap.LngLat(path[0], path[1]);
                        });
                        var prism = new AMap.Object3D.Prism({
                            path: bounds,
                            height: building_height,
                            color: 'rgba(211,211,211,0.9)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
                        });
                        // 开启透明度支持
                        prism.transparent = true;
                        object3Dlayer.add(prism);
                    }
                
                    //var polygon = new AMap.Polygon({
                    //    strokeWeight: 2,
                    //    strokeOpacity: 1,
                    //    strokeColor: "blue",
                    //    fillOpacity: 0,
                    //    strokeStyle: 'dashed',
                    //    bubble: true,
                    //    path: JSON.parse(building_bounds),
                    //    map: map
                    //});
                    //var polyEditor = new AMap.PolyEditor(map, polygon);
                    //polyEditor.on('adjust', function (event) {
                    //    var p = event.target;
                    //    var bounds = p.getPath();
                    //    var list = [];
                    //    bounds.forEach(function (coord) {
                    //        var lng = coord["lng"];
                    //        var lat = coord["lat"];
                    //        list.push([lng, lat]);
                    //    });
                    //    document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
                    //});
                    //polygon.setExtData({ "editor": polyEditor });
                    $('#dg2').datagrid('reload');
                }
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    }


//楼宇详情
function detailsBuilding() {
    setTimeout(function () {
        layer.open({
            btn: [],
            //move: false,
            //offset: ['100px', '80%'],
            shade: 0,
            title: "楼宇信息",
            content: `<div class="mb-10"><span class="mr-5 bold">楼宇名称:</span><span>${row2["BUILDING_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row2["BUILDING_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">蓝牌地址码:</span><span>${row2["BLUELABEL"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row2["TYPE"]}</span></div>`
        });
        //// 有边界
        //if (row2["BUILDING_BOUNDS"] !== null) {
        //    layer.open({
        //        btn: [],
        //        move: false,
        //        offset: ['100px', '80%'],
        //        shade: 0,
        //        title: "楼宇信息",
        //        content: `<div class="mb-10"><span class="mr-5 bold">楼宇名称:</span><span>${row2["BUILDING_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row2["BUILDING_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">蓝牌地址码:</span><span>${row2["BLUELABEL"]}</span></div><div  class="mb-10"><span class="mr-5 bold">区域:</span><span>${row2["REGION"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row2["TYPE"]}</span></div>`
        //    });
        //}
        //// 无边界
        //else {
        //    layer.open({
        //        btn: [],
        //        move: false,
        //        offset: ['100px', '80%'],
        //        shade: 0,
        //        title: "小区信息",
        //        content: `<div class="mb-10"><span class="mr-5 bold">楼宇名称:</span><span>${row2["BUILDING_NAME"]}</span></div><div  class="mb-10"><span class="mr-5 bold">详细地址:</span><span>${row2["BUILDING_ADDRESS"]}</span></div><div  class="mb-10"><span class="mr-5 bold">蓝牌地址码:</span><span>${row2["BLUELABEL"]}</span></div><div  class="mb-10"><span class="mr-5 bold">区域:</span><span>${row2["REGION"]}</span></div><div  class="mb-10"><span class="mr-5 bold">类型:</span><span>${row2["TYPE"]}</span></div>`
        //    });
        //}
    }, 2000);
}
// 
//<div class="layui-form-item">
//    <label class="layui-form-label">高度</label>
//    <div class="layui-input-block">
//        <input type="text" name="building_height" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2[" BUILDING_HEIGHT"]}" required>
//                    </div>
//</div>
//<div class="layui-form-item">
//    <label class="layui-form-label">区域</label>
//    <div class="layui-input-block">
//        <select name="region" required>
//            <option value="` + row2[" REGION"] + `">` + row2["REGION"] + `
//                  </option></select>
//</div>
//              </div >
//编辑楼宇
function editBuilding() {
    setTimeout(function () {
        var polygon = new AMap.Polygon({
            strokeWeight: 2,
            strokeOpacity: 1,
            strokeColor: "red",
            fillOpacity: 0,
            strokeStyle: 'dashed',
            bubble: true,
            path: JSON.parse(row2["BUILDING_BOUNDS"]),
            map: map
        });
        var polyEditor = new AMap.PolyEditor(map, polygon);
        polyEditor.on('adjust', function (event) {
            var bounds = event.target.getPath();
            var list = [];
            bounds.forEach(function (coord) {
                var lng = coord["lng"];
                var lat = coord["lat"];
                list.push([lng, lat]);
            });
            document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
        });
        polygon.setExtData({ "editor": polyEditor });
        var marker = "";
        var markers = map.getAllOverlays("marker");
        markers.forEach(function (m) {
            var icon = m.getIcon();
            if (icon.B.image === "./icons/poi-marker-red.png") {
                marker = m;
            }
        });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑楼宇",
            end: function () {
                map.setDefaultCursor("pointer");
                polygon.getExtData()["editor"].close();
                map.remove(polygon);
                var markers = map.getAllOverlays("marker");
                markers.forEach(function (m) {
                    var icon = m.getIcon();
                    if (icon.B.image === "./icons/poi-marker-red.png") {
                        map.remove(m);
                    }
                });
                if (editmode === 1) {
                    console.log('w');
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-red.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(row2["LNG"], row2["LAT"]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        label: {},
                        extData: { building_name: row2["BUILDING_NAME"] },
                        icon: icon
                    });
                    marker.on("dragging", function () {
                        var pos = marker.getPosition();
                        document.getElementById('fieldHidden').innerText = pos.lng;
                        document.getElementById('fieldHidden2').innerText = pos.lat;
                    });
                    map.add(marker);
                }
            },
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editBuilding1(this);">
                  <div class="layui-form-item">
                    <label class="layui-form-label">楼宇号码</label>
                    <div class="layui-input-inline">
                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NUMBER"]}" required>
                    </div>
                  </div>
<div class="layui-form-item">
                    <label class="layui-form-label">楼宇名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NAME"]}" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">详细地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="building_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_ADDRESS"]}" required>
                    </div>
                  </div>
 <div class="layui-form-item">
                    <label class="layui-form-label">蓝牌地址码</label>
                <div class="layui-input-block">
                      <input type="text" name="bluelabel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BLUELABEL"]}" required>
                    </div>
                  </div>

      

<div id="fieldHidden" class="layui-form-item hidden">` + row2["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row2["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row2["BUILDING_BOUNDS"] + `</div>
<div class="layui-form-item">
    <label class="layui-form-label">编辑位置</label>
    <div class="layui-input-block">
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" />
    </div>
   </div>
   <div class="layui-form-item">
    <label class="layui-form-label">编辑边界</label>
    <div class="layui-input-block">
     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" />
    </div>
   </div>



 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        form.on('switch(switch1)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                polygon.getExtData()["editor"].open();
                document.getElementById('s2').checked = false;
                form.render('checkbox');
            } else {
                polygon.getExtData()["editor"].close();
            }
        });
        form.on('switch(switch2)', function (data) {
            if (data.elem.checked) {
                map.setDefaultCursor("default");
                marker.setDraggable(true);
                document.getElementById('s1').checked = false;
                form.render('checkbox');
            } else {
                marker.setDraggable(false);
            }
        });

//        // 有边界
//        if (row2["BUILDING_BOUNDS"] !== null) {
//            var polygon = new AMap.Polygon({
//                strokeWeight: 2,
//                strokeOpacity: 1,
//                strokeColor: "red",
//                fillOpacity: 0,
//                strokeStyle: 'dashed',
//                bubble: true,
//                path: JSON.parse(row2["BUILDING_BOUNDS"]),
//                map: map
//            });
//            var polyEditor = new AMap.PolyEditor(map, polygon);
//            polyEditor.on('adjust', function (event) {
//                var bounds = event.target.getPath();
//                var list = [];
//                bounds.forEach(function (coord) {
//                    var lng = coord["lng"];
//                    var lat = coord["lat"];
//                    list.push([lng, lat]);
//                });
//                document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//            });
//            polygon.setExtData({ "editor": polyEditor });
//            var marker = "";
//            var markers = map.getAllOverlays("marker");
//            markers.forEach(function (m) {
//                var icon = m.getIcon();
//                if (icon.B.image === "./icons/poi-marker-red.png") {
//                    marker = m;
//                }
//            });
//            layer.open({
//                btn: [],
//                shade: 0,
//                title: "编辑楼宇",
//                end: function () {
//                    map.setDefaultCursor("pointer");
//                    polygon.getExtData()["editor"].close();
//                    map.remove(polygon);
//                    var markers = map.getAllOverlays("marker");
//                    markers.forEach(function (m) {
//                        var icon = m.getIcon();
//                        if (icon.B.image === "./icons/poi-marker-red.png") {
//                            map.remove(m);
//                        }
//                    });
//                    if (editmode === 1) {
//                        console.log('w');
//                        var icon = new AMap.Icon({
//                            size: new AMap.Size(25, 25),
//                            image: './icons/poi-marker-red.png',  // Icon的图像
//                            imageSize: new AMap.Size(25, 25)
//                        });
//                        var marker = new AMap.Marker({
//                            position: new AMap.LngLat(row2["LNG"], row2["LAT"]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//                            label: {},
//                            extData: { building_name: row2["BUILDING_NAME"] },
//                            icon: icon
//                        });
//                        marker.on("dragging", function () {
//                            var pos = marker.getPosition();
//                            document.getElementById('fieldHidden').innerText = pos.lng;
//                            document.getElementById('fieldHidden2').innerText = pos.lat;
//                        });
//                        map.add(marker);
//                    }
//                },
//                content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editBuilding1(this);">
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">楼宇号码</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NUMBER"]}" required>
//                    </div>
//                  </div>
//<div class="layui-form-item">
//                    <label class="layui-form-label">楼宇名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NAME"]}" required>
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">详细地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_ADDRESS"]}" required>
//                    </div>
//                  </div>
// <div class="layui-form-item">
//                    <label class="layui-form-label">蓝牌地址码</label>
//                <div class="layui-input-block">
//                      <input type="text" name="bluelabel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BLUELABEL"]}" required>
//                    </div>
//                  </div>
// <div class="layui-form-item">
//                    <label class="layui-form-label">高度</label>
//                <div class="layui-input-block">
//                      <input type="text" name="building_height" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_HEIGHT"]}" required>
//                    </div>
//                  </div>
//                <div class="layui-form-item">
//                <label class="layui-form-label">区域</label>
//                <div class="layui-input-block">
//                  <select name="region" required>
//                            <option value="` + row2["REGION"] + `">` + row2["REGION"] + `
//                  </option></select>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">类型</label>
//                <div class="layui-input-block">
//                  <select name="type" lay-filter="aihao" required>
//                    <option value="地名地址信息;门牌信息;楼栋号">地名地址信息;门牌信息;楼栋号</option>
//                  </select>
//                </div>
//              </div>
//<div id="fieldHidden" class="layui-form-item hidden">` + row2["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row2["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row2["BUILDING_BOUNDS"] + `</div>

//   <div class="layui-form-item">
//    <label class="layui-form-label">编辑边界</label>
//    <div class="layui-input-block">
//     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" />
//    </div>
//   </div>
//<div class="layui-form-item">
//    <label class="layui-form-label">编辑位置</label>
//    <div class="layui-input-block">
//     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" />
//    </div>
//   </div>


// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//            });
//            form.render();
//            form.on('switch(switch1)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    polygon.getExtData()["editor"].open();
//                    document.getElementById('s2').checked = false;
//                    form.render('checkbox');
//                } else {
//                    polygon.getExtData()["editor"].close();
//                }
//            });
//            form.on('switch(switch2)', function (data) {
//                if (data.elem.checked) {
//                    map.setDefaultCursor("default");
//                    marker.setDraggable(true);
//                    document.getElementById('s1').checked = false;
//                    form.render('checkbox');
//                } else {
//                    marker.setDraggable(false);
//                }
//            });
//        }
//        // 无边界
//        else {
//            var marker = "";
//            var markers = map.getAllOverlays("marker");
//            markers.forEach(function (m) {
//                var icon = m.getIcon();
//                if (icon.B.image === "./icons/poi-marker-red.png") {
//                    marker = m;
//                }
//            });
//                layer.open({
//                    btn: [],
//                    shade: 0,
//                    title: "编辑楼宇",
//                    end: function () {
//                        map.setDefaultCursor("pointer");
//                        mousetool.close(true);
//                        var markers = map.getAllOverlays("marker");
//                        markers.forEach(function (m) {
//                            var icon = m.getIcon();
//                            if (icon.B.image === "./icons/poi-marker-red.png") {
//                                map.remove(m);
//                            }
//                        });
//                        if (editmode === 1) {
//                            var icon = new AMap.Icon({
//                                size: new AMap.Size(25, 25),
//                                image: './icons/poi-marker-default.png',  // Icon的图像
//                                imageSize: new AMap.Size(25, 25)
//                            });
//                            var marker = new AMap.Marker({
//                                position: new AMap.LngLat(row2["LNG"], row2["LAT"]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//                                label: {},
//                                extData: { building_name: row2["BUILDING_NAME"] },
//                                icon: icon
//                            });
//                            marker.on("dragging", function () {
//                                var pos = marker.getPosition();
//                                document.getElementById('fieldHidden').innerText = pos.lng;
//                                document.getElementById('fieldHidden2').innerText = pos.lat;
//                            });
//                            map.add(marker);
//                        }
//                    },
//                    content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editBuilding2(this);" >
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">楼宇号码</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NUMBER"]}" required>
//                    </div>
//                  </div>
//<div class="layui-form-item">
//                    <label class="layui-form-label">楼宇名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_NAME"]}" required>
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">详细地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="building_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_ADDRESS"]}" required>
//                    </div>
//                  </div>
// <div class="layui-form-item">
//                    <label class="layui-form-label">蓝牌地址码</label>
//                <div class="layui-input-block">
//                      <input type="text" name="bluelabel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BLUELABEL"]}" required>
//                    </div>
//                  </div>
// <div class="layui-form-item">
//                    <label class="layui-form-label">高度</label>
//                <div class="layui-input-block">
//                      <input type="text" name="building_height" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" value="${row2["BUILDING_HEIGHT"]}" required>
//                    </div>
//                  </div>
//                <div class="layui-form-item">
//                <label class="layui-form-label">区域</label>
//                <div class="layui-input-block">
//                  <select name="region" required>
//                            <option value="` + row2["REGION"] + `">` + row2["REGION"] + `
//                  </option></select>
//                </div>
//              </div>
//<div class="layui-form-item">
//                <label class="layui-form-label">类型</label>
//                <div class="layui-input-block">
//                  <select name="type" lay-filter="aihao" required>
//                    <option value="地名地址信息;门牌信息;楼栋号">地名地址信息;门牌信息;楼栋号</option>
//                  </select>
//                </div>
//              </div>
//<div id="fieldHidden" class="layui-form-item hidden">` + row2["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row2["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row2["BUILDING_BOUNDS"] + `</div>
//   <div class="layui-form-item">
//    <label class="layui-form-label">编辑边界</label>
//    <div class="layui-input-block">
//     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" />
//    </div>
//   </div>
//<div class="layui-form-item">
//    <label class="layui-form-label">编辑位置</label>
//    <div class="layui-input-block">
//     <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" />
//    </div>
//   </div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//                });
//                form.render();
//                form.on('switch(switch1)', function (data) {
//                    if (data.elem.checked) {
//                        map.setDefaultCursor("default");
//                        drawPolygon();
//                        document.getElementById('s2').checked = false;
//                        form.render('checkbox');
//                    } else {
//                        mousetool.close();
//                    }
//                });
//                           form.on('switch(switch2)', function (data) {
//                    if (data.elem.checked) {
//                        map.setDefaultCursor("default");
//                        marker.setDraggable(true);
//                        document.getElementById('s1').checked = false;
//                        form.render('checkbox');
//                    } else {
//                        marker.setDraggable(false);
//                    }
//                });
//            }
    }, 1500);
} 
  

                           

            
            


function editBuilding1(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var building_number = inputs[0].value;
    var building_name = inputs[1].value;
    var building_address = inputs[2].value;
    var bluelabel = inputs[3].value;
    //var building_height = inputs[4].value;
    //var building_region = inputs[5].value;
    //var building_type = '地名地址信息;门牌信息;楼栋号';
    var building_lng = document.getElementById('fieldHidden').innerText;
    var building_lat = document.getElementById('fieldHidden2').innerText;
    var building_bounds = document.getElementById('fieldHidden3').innerText;
    //if (building_bounds === "null") {
    //    building_bounds = "";
    //}
    var building_id = row2["BUILDING_ID"];
        $.ajax({
            type: "post",
            url: `./Level5Address.ashx?m=EditBuilding&buildingid=${building_id}`,
            data: { "building_number": building_number, "building_name": building_name, "building_address": building_address, "bluelabel": bluelabel, "building_lng": building_lng, "building_lat": building_lat, "building_bounds": building_bounds },
            dataType: "json",
            success: function (data) {
                if (data.length !== 0) {
                    var div = document.createElement('div');
                    div.classList.add("clRedError");
                    data.forEach(function (error) {
                        div.innerHTML += `<p class="mb-5">${error}</p>`;
                    })
                    e.appendChild(div);
                } else {
                    editmode = 2;
                    layer.closeAll();
                    setTimeout(function () {
                        editmode = 1;
                    }, 8000);
                    layer.msg("楼宇已编辑");
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-default.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(building_lng, building_lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        label: {},
                        extData: { building_name: building_name },
                        icon: icon
                    });
                    marker.on("dragging", function () {
                        var pos = marker.getPosition();
                        document.getElementById('fieldHidden').innerText = pos.lng;
                        document.getElementById('fieldHidden2').innerText = pos.lat;
                    });
                    map.add(marker);
                    $('#dg2').datagrid('reload');
                }
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    
}


function editBuilding2(e) {
      var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
        var inputs = e.getElementsByTagName('input');
        var building_number = inputs[0].value;
        var building_name = inputs[1].value;
        var building_address = inputs[2].value
        var bluelabel = inputs[3].value
    var building_height = inputs[4].value;
    var building_region = inputs[5].value;
    var building_type = inputs[6].value;
    var building_lng = document.getElementById('fieldHidden').innerText;
    var building_lat = document.getElementById('fieldHidden2').innerText;
    var building_bounds = document.getElementById('fieldHidden3').innerText;
    var building_id = row2["BUILDING_ID"];
        $.ajax({
            type: "post",
            url: `./Level5Address.ashx?m=EditBuilding&buildingid=${building_id}`,
            data: { "building_number": building_number, "building_name": building_name, "building_address": building_address, "bluelabel": bluelabel, "building_height": building_height, "building_region": building_region, "building_type": building_type, "building_lng": building_lng, "building_lat": building_lat, "building_bounds": building_bounds },
            dataType: "json",
            success: function (data) {
                if (data.length !== 0) {
                    var div = document.createElement('div');
                    div.classList.add("clRedError");
                    data.forEach(function (error) {
                        div.innerHTML += `<p class="mb-5">${error}</p>`;
                    })
                    e.appendChild(div);
                } else {
                    editmode = 2;
                    layer.closeAll();
                    setTimeout(function () {
                        editmode = 1;
                    }, 8000);
                    layer.msg("楼宇已编辑");
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-default.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(building_lng, building_lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        label: {},
                        extData: { building_name: building_name },
                        icon: icon
                    });
                    marker.on("dragging", function () {
                        var pos = marker.getPosition();
                        document.getElementById('fieldHidden').innerText = pos.lng;
                        document.getElementById('fieldHidden2').innerText = pos.lat;
                    });
                    map.add(marker);
                    $('#dg2').datagrid('reload');
                }
            },
            error: function (item, err) {
                console.log(err);
            }
        });
    
}

//删除楼宇
function deleteBuilding() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除楼宇",
        content: `<div><div class="mb-15 tc">确定删除楼宇?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteBuildingPost1(this);">删除</button></div></div>`
    });
    //// 有边界
    //if (row2["BUILDING_BOUNDS"] !== null) {
    //    layer.open({
    //        btn: [],
    //        shade: 0,
    //        title: "删除楼宇",
    //        content: `<div><div class="mb-15 tc">确定删除楼宇?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteBuildingPost1(this);">删除</button></div></div>`
    //    });
    //}
    //// 无边界
    //else {
    //    layer.open({
    //        btn: [],
    //        shade: 0,
    //        title: "删除楼宇",
    //        content: `<div><div class="mb-15 tc">确定删除楼宇?</div><div class="tr"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteBuildingPost2(this);">删除</button></div></div>`
    //    });
    //}
}

function deleteBuildingPost1(e) {
    var building_id = row2['BUILDING_ID'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteBuilding&buildingid=${building_id}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
            } else {
                layer.closeAll();
                layer.msg("楼宇已删除");
                var markers = map.getAllOverlays("marker");
                markers.forEach(function (m) {
                    var icon = m.getIcon();
                    if (icon.B.image === "./icons/poi-marker-red.png") {
                        map.remove(m);
                    }
                });
                $('#dg2').datagrid('reload');
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

//function deleteBuildingPost2(e) {
//    var building_id = row2['BUILDING_ID'];
//    $.ajax({
//        type: "post",
//        url: `./Level5Address.ashx?m=DeleteBuilding&buildingid=${building_id}`,
//        dataType: "json",
//        success: function (data) {
//            if (data.length !== 0) {
//            } else {
//                layer.closeAll();
//                layer.msg("楼宇已删除");
//                var markers = map.getAllOverlays("marker");
//                markers.forEach(function (m) {
//                    var icon = m.getIcon();
//                    if (icon.B.image === "./icons/poi-marker-red.png") {
//                        map.remove(m);
//                    }
//                });
//                $('#dg2').datagrid('reload');
//            }
//        },
//        error: function (item, err) {
//            console.log(err);
//        }
//    });
//}

//下拉框
// by default province(filled), city, county dropdowns, hasbounds(unchecked), hasbuildings(unchecked) checkboxes, search bar(empty), and
// beijing map
// if user clicks on province, city, county dropdowns, hasbounds, hasbuildings checkboxes, or search bar, then
// matching villages are pulled from database =>
// 1. if user clicks on province dropdown, then city dropdown is generated and matching villages are pulled
// 2. if user clicks on city dropdown, then county dropdown is generated and matching villages are pulled
// 3. if user clicks on county dropdown, then matching villages are pulled
// 4. if user clicks on checkbox#1, then matching villages are pulled
// 5. if user clicks on checkbox#2, then matching villages are pulled
// 6. if user clicks on searchbar, then matching villages are pulled
// when user clicks on any of above, matching villages are rendered and paginated but for options
// 1 and 2 additional dropdowns are created
// for example, if user clicks on county dropdown, then two requests are sent to API and
// dataset#1 will be used to render villages and dataset#2 will be used to paginate villages on bottom left
// for instance, in this case, 500 villages are returned for rendering and 10 villages are returned for pagination
// due to data source issues, some of records are abnormal thus need to treat records differently
// 1. for rendering, first clear map then for each record check if it has bounds (is it normal), if yes
// then use bounds to draw green polygon and attach click event to it to generate popup with record info 
// else do nothing 
// 2. for pagination, pass returned data into bottom left table so normal or not they are inserted
// 3. for select, if record is normal highlight row and turn matching polygon into purple and move to lng lat else
// highlight row and move to lng lat
// 4. for select and detail, if record is normal same as select except create popup with info if popup is closed detail page
// is removed but record is still selected (record and graphic are together) else if abnormal same as select except create popup with info if popup is closed detail page
// is removed but record is still selected
// 5. for select and edit, if record is normal same as select except add editor to purple polygon and yield form1 with
// button attached to editor if user exits close form1, close marker editor plus drawn markers, remove purple
// polygon and redraw purple polygon using original data and bind click event with original data ELSE
// save data to database, close form1, close marker editor plus drawn markers, remove purple polygon, draw green polygon
// and add click event with popup using latest data, show popup success, refreshes table1 data else 
// if record is not normal, same as select except yield form2 and if user exits close form2, close both editors plus
// drawn shapes, else save data to database, close form2, close both editors plus drawn shapes, draw green polygon 
// and add click event with popup using latest data if bounds is provided, show popup success, refreshes table1 data
// 6. for select and delete, if record is normal same as select except create popup with delete if popup is closed delete page
// is closed but record is still selected else delete row from database, close modal, show popup, remove purple polygon from map, refreshes table1, if abnormal same as select except create popup with delete if popup is closed delete page
// is closed but record is still selected else delete row from database, close modal, show popup, refreshes table1
// *** If village is selected, run a function to turn all polygons as green
// *** If village is selected, run a function to remove all buildings (markers)
// *** If village is selected, check if village has buildings, if not do nothing else
// *** then two requests are sent to API and
// dataset#1 will be used to render buildings and dataset#2 will be used to paginate buildings on bottom right
// for instance, in this case, 50 buildings are returned for rendering and 10 buildings are returned for pagination
// due to data source issues, some of records are abnormal thus need to treat records differently
// 1. for rendering, for each record check if it has bounds (is it normal), either way use lng lat 
// to draw blue marker 
// 2. for pagination, pass returned data into bottom right table so normal or not they are inserted
// 3. for select, if record is normal highlight row and turn matching marker into red else
// highlight row and turn matching marker into red
// 4. for select and detail, if record is normal same as select except create popup with info if popup is closed detail page
// is removed but record is still selected (record and graphic are together) else if abnormal same as select except create popup with info if popup is closed detail page
// is removed but record is still selected
// 5. for select and edit, if record is normal same as select except add red polygon using bounds with red editor and yield form1 with
// button attached to editor if user exits close form1, remove red marker, remove red
// polygon with editor, and redraw red marker using original data and ELSE
// save data to database, close form1, remove red marker, remove red
// polygon with editor, draw red marker using latest data, show popup success, refreshes table2 data else 
// if record is not normal, same as select except yield form2 and if user exits close form2, close editor plus
// drawn shape, remove red marker, and redraw red marker using original data else save data to database, close form2, close editor plus drawn shape, remove red marker, and redraw red marker using latest data 
// show popup success, refreshes table2 data
// 6. for select and delete, if record is normal same as select except create popup with delete if popup is closed delete page
// is closed but record is still selected else delete row from database, close modal, show popup, remove red marker, update table2 if abnormal same as select except create popup with delete if popup is closed delete page
// is closed but record is still selected else delete row from database, close modal, show popup, remove red marker, update table2

// edit building, if building is not on map, redraw building using object3d with latest data
// delete building, if building is not on map, delete building using object3d

// create village => render form, if user exits close everything else save data to database, close everything, show popup, add green polygon 
// with click event info popup using latest data, update table1
// create building => render form, if user exits close everything else save data to database, close everything, show popup, add blue marker using latest data, update table2
// if user chose draw option, use object3d to draw building on map


//var village_name = document.getElementById('inputSearchVillage').value;
//var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
IndexByFilterAll();
$("#dg").datagrid({
    pageNumber: 1,
    pageSize: 50,
    pageList: [50],
    url: `./Level5Address.ashx?m=IndexByFilter`,
    method: 'get',
    onLoadSuccess: function (data) {
        document.getElementsByClassName('datagrid-row')[0].click();
    }
});

//var d = "";
//$.ajax({
//    type: "get",
//    url: `./region.json`,
//    contentType: "application/json; charset=utf-8",
//    dataType: "json",
//    success: function (data) {
//        d = data;
//        var selectProvince = ``;
//        d.forEach(function (item) {
//            if (item["item_code"].slice(2) === '0000') {
//                selectProvince += `<option value=${item["item_code"]}>${item["item_name"]}</option>`;
//            }
//        });
//        var selectP = document.getElementById('selectProvince');
//        var selectC = document.getElementById('selectCity');
//        var selectCT = document.getElementById('selectCounty');
//        selectP.innerHTML += selectProvince;
//        selectP.addEventListener('change', function (e) {
//            var value = e.target.value;
//            if (value !== "") {
//                selectC.innerHTML = `<option value="">全部</option>`;
//                d.forEach(function (i) {
//                    if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
//                        selectC.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
//                    }
//                });
//            }
//            var province = $("#selectProvince").find("option:selected").text();
//            var city = $("#selectCity").find("option:selected").text();
//            var county = $("#selectCounty").find("option:selected").text();
//            if (province === "全部") {
//                province = "%";
//            }
//            if (city === "全部") {
//                city = "%";
//            }
//            if (county === "全部") {
//                county = "%";
//            }
//            var pcc = province + "/" + city + "/" + county;
//            var village_name = document.getElementById('inputSearchVillage').value;
//            var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
//            var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
//            map.clearMap();
//            IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
//            $("#dg").datagrid({
//                pageNumber: 1,
//                url: `./Level5Address.ashx?m=IndexByFilter&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
//                method: 'get',
//                onLoadSuccess: function (data) {
//                    document.getElementsByClassName('datagrid-row')[0].click();
//                }
//            });
//        });
//        selectC.addEventListener('change', function (e) {
//            var value = e.target.value;
//            if (value !== "") {
//                selectCT.innerHTML = `<option value="">全部</option>`;
//                d.forEach(function (i2) {
//                    if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
//                        if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
//                            selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
//                        }
//                    } else {
//                        if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
//                            selectCT.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
//                        }
//                    }
//                });
//            }
//            var province = $("#selectProvince").find("option:selected").text();
//            var city = $("#selectCity").find("option:selected").text();
//            var county = $("#selectCounty").find("option:selected").text();
//            if (province === "全部") {
//                province = "%";
//            }
//            if (city === "全部") {
//                city = "%";
//            }
//            if (county === "全部") {
//                county = "%";
//            }
//            var pcc = province + "/" + city + "/" + county;
//            var village_name = document.getElementById('inputSearchVillage').value;
//            var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
//            var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
//            map.clearMap();
//            IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
//            $("#dg").datagrid({
//                pageNumber: 1,
//                url: `./Level5Address.ashx?m=IndexByFilter&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
//                method: 'get',
//                onLoadSuccess: function (data) {
//                    document.getElementsByClassName('datagrid-row')[0].click();
//                }
//            });
//        });
//        selectCT.addEventListener('change', function (e) {
//            var value = e.target.value;
//            var province = $("#selectProvince").find("option:selected").text();
//            var city = $("#selectCity").find("option:selected").text();
//            var county = $("#selectCounty").find("option:selected").text();
//            if (province === "全部") {
//                province = "%";
//            }
//            if (city === "全部") {
//                city = "%";
//            }
//            if (county === "全部") {
//                county = "%";
//            }
//            var pcc = province + "/" + city + "/" + county;
//            var village_name = document.getElementById('inputSearchVillage').value;
//            var hasbounds = $('#checkboxHasBounds').checkbox('options').checked ? "1" : "0";
//            var hasbuildings = $('#checkboxHasBuildings').checkbox('options').checked ? "1" : "0";
//            map.clearMap();
//            IndexByFilterAll(pcc, village_name, hasbounds, hasbuildings);
//            $("#dg").datagrid({
//                pageNumber: 1,
//                url: `./Level5Address.ashx?m=IndexByFilter&pcc=${pcc}&village_name=${village_name}&hasbounds=${hasbounds}&hasbuildings=${hasbuildings}`,
//                method: 'get',
//                onLoadSuccess: function (data) {
//                    document.getElementsByClassName('datagrid-row')[0].click();
//                }
//            });
//        });
//    },
//    error: function (item, err) {
//        console.log(err);
//    }
//});

setTimeout(function () {
    document.getElementsByClassName('panel-body-noheader')[0].classList.add("w-100p");
    //var container1 = document.createElement('div');
    //container1.setAttribute("id", "buttonOpenClose");
    //container1.innerHTML += `<span class="bb-lightblue pb-5px mr-20">是否显示小区边界</span><button type="button" class="layui-btn layui-btn-radius layui-btn-normal layui-btn-sm" onclick="openPois(this); disabled">是 <i class="fa fa-check ml-3px"></i></button><button type="button" class="layui-btn layui-btn-primary layui-btn-radius layui-btn-sm" onclick="closePois(this);">否</button>`;
    //var container2 = document.createElement('div');
    //container2.setAttribute("id", "buttonOpenClose2");
    //container2.innerHTML += `<span class="bb-lightblue pb-5px mr-20">是否显示楼宇名称</span><button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm" onclick="showBuildingNames(this);">是</button><button type="button" class="layui-btn layui-btn-normal layui-btn-radius layui-btn-sm" onclick="hideBuildingNames(this); disabled">否<i class="fa fa-check ml-3px"></i></button>`;
    //form.on('checkbox(checkboxSatelliteLayerFilter)', function (data) {
    //    if (data.elem.checked === true) {
    //        map.getLayers()[1].show();
    //    } else {
    //        map.getLayers()[1].hide();
    //    }
    //});
 
  
    //document.getElementsByClassName('panel')[1].appendChild(container1);
    //document.getElementsByClassName('panel')[1].appendChild(container2);

    var container = document.createElement('div');
    container.setAttribute("id", "buttonShowHidden");
    container.onclick = function () {
        if ($("#footer").hasClass("footerHide")) {
            $("#footer").removeClass("footerHide");
            $("#container").removeClass("containerShow"); 
            $(".CellInformation").removeClass("CellInformationShow");
            $(".ListBtn").css({
                "transform": "rotateX(0deg)",
                "-ms-transform": "rotateX(0deg)", /* IE 9 */
                "-moz-transform": "rotateX(0deg)", /* Firefox */
                "-webkit-transform": "rotateX(0deg)", /* Safari 和 Chrome */
                "-o-transform": "rotateX(0deg)", /* Opera */
            })
        } else {
            $("#footer").addClass("footerHide");
            $("#container").addClass("containerShow");
            $(".CellInformation").addClass("CellInformationShow");
            $(".ListBtn").css({
                "transform": "rotateX(180deg)",
                "-ms-transform": "rotateX(180deg)", /* IE 9 */
                "-moz-transform": "rotateX(180deg)", /* Firefox */
                "-webkit-transform": "rotateX(180deg)", /* Safari 和 Chrome */
                "-o-transform": "rotateX(180deg)", /* Opera */
            })
        }
    };
    container.innerHTML += `<span class="ListBtn"></span>`;
    document.getElementsByClassName('panel')[1].appendChild(container);
}, 5000);
