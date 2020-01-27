var map;
var editmode = 1;

function mapInit() {
    map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 17,
        pitch: 0,
        rotation: -15,
        viewMode: '3D',//开启3D视图,默认为关闭
        buildingAnimation: true,//楼块出现是否带动画

        //expandZoomRange: true,
        zooms: [3, 20],
        center: [123.465009, 41.677287],
        layers: [
            new AMap.TileLayer({}),
            // 楼块图层
            new AMap.Buildings({
                zooms: [3, 20]
            }),
            //new AMap.TileLayer.Satellite()
            ]
    });

    map.addControl(new AMap.ControlBar({
        showZoomBar: false,
        showControlButton: true,
        position: {
            right: '10px',
            top: '10px'
        }
    }))
}
mapInit()

function clearMap() {
    map.clearMap();
}

function clearCVB() {
    var polygons = map.getAllOverlays("polygon");
    polygons.forEach(function (polygon) {
        if (polygon.getExtData()["DATATYPE"] !== "STREET") {
            map.remove(polygon);
        }
    });
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        map.remove(marker);
    });
}

function clearVB() {
    var polygons = map.getAllOverlays("polygon");
    polygons.forEach(function (polygon) {
        if (polygon.getExtData()["DATATYPE"] === "VILLAGE") {
            map.remove(polygon);
        }
    });
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        map.remove(marker);
    });
}

function clearB() {
    var markers = map.getAllOverlays("marker");
    markers.forEach(function (marker) {
        map.remove(marker);
    });
}


function clearTables1234() {
    $('#tableStreet').datagrid('loadData', { total: 0, rows: [] });
    $('#tableCommunity').datagrid('loadData', { total: 0, rows: [] });
    $('#tableVillage').datagrid('loadData', { total: 0, rows: [] });
    $('#tableBuilding').datagrid('loadData', { total: 0, rows: [] });
}

function clearTables234() {
    $('#tableCommunity').datagrid('loadData', { total: 0, rows: [] });
    $('#tableVillage').datagrid('loadData', { total: 0, rows: [] });
    $('#tableBuilding').datagrid('loadData', { total: 0, rows: [] });
}

function clearTables34() {
    $('#tableVillage').datagrid('loadData', { total: 0, rows: [] });
    $('#tableBuilding').datagrid('loadData', { total: 0, rows: [] });
}

function clearTables4() {
    $('#tableBuilding').datagrid('loadData', { total: 0, rows: [] });
}

//function drawMarker() {
//    var markers = map.getAllOverlays("marker");
//    var count = 0;
//    markers.forEach(function (marker) {
//        if (marker.Je.draggable === true) {
//            count += 1;
//        }
//    });
//    if (count === 0) {
//        mousetool.marker({
//            draggable: true
//        });
//    }
//}

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

var form, layedit, laydate, layer, element, tree, util, streetSelected, communitySelected, villageSelected, buildingSelected;
layui.use(['form', 'layedit', 'laydate', 'layer', 'element'], function () {
   tree = layui.tree,
   util = layui.util,
    form = layui.form
        , layedit = layui.layedit
        , laydate = layui.laydate
        , layer = layui.layer
        , element = layui.element;
    form.on('select(selectCounties)', function (data) {
        clearMap();
        clearTables1234();
        var value = data.value;
        if (value === "all") {
            map.setCenter([123.465009, 41.677287]);
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetAllStreets`,
                dataType: "json",
                success: function (data) {
                    var streets = data["rows"];
                    streets.forEach(function (street) {
                        if (street["BOUNDS"] !== null) {
                            // draw polygon
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: JSON.parse(street["BOUNDS"]),
                                map: map,
                                strokeColor: "#FFDA00",
                                fillColor: "#FFDA00",
                                extData: {
                                    "ID": street["STREET_ID_CONV"],
                                    "DATATYPE": "STREET"
                                }

                            });
                        } else {
                            // draw fake polygon
                            var lng = street["LNG"];
                            var lat = street["LAT"]
                            var path = [];
                            var distance = 300;
                            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: path,
                                map: map,
                                strokeColor: "#FFDA00",
                                fillColor: "#FFDA00",
                                extData: {
                                    "ID": street["STREET_ID_CONV"],
                                    "DATATYPE": "STREET"
                                }

                            });
                        }
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
            $("#tableStreet").datagrid({
                pageNumber: 1,
                url: `./Level5Address.ashx?m=GetAllStreetsPag`,
                method: 'get'
            });
        } else {
            if (value === "6C2FEA0A905D4A3C887030FA875453BC") {
                map.setCenter([122.836726, 41.985193]);
            } else if (value === "5C0D0AE8E0A74205B96421FF7BB9D589") {
                map.setCenter([122.765409, 41.516827]);
            } else if (value === "FDB394D809084D0D809A0A46AE2119BA") {
                map.setCenter([123.344031, 41.664757]);
            } else if (value === "5893D00F6FED4AD1AECB43D52782D011") {
                map.setCenter([123.469949, 41.805137]);
            } else if (value === "CFDD36585EC54B5EB879D8A5AE67E8FD") {
                map.setCenter([123.584281, 41.9131]);
            } else if (value === "AB3FC6F876C24EC5A06E2DA953542B77") {
                map.setCenter([123.440495, 42.50073]);
            } else if (value === "D44564C69AF74077B88749C870F90EE0") {
                map.setCenter([123.308136, 41.793743]);
            } else if (value === "6B670CF2B1014090AC44BF6CBCE36555") {
                map.setCenter([123.376301, 41.802914]);
            } else if (value === "00580AEB24D34A5BAF63147B61478076") {
                map.setCenter([123.44197, 41.824796]);
            } else if (value === "ABF5D7F455DF4C73BECA99F035C3AE88") {
                map.setCenter([123.355701, 42.741005]);
            } else if (value === "72FAAB41B6A54C47A4A56EC50152EE00") {
                map.setCenter([123.458897, 41.795655]);
            } else if (value === "7946E630410E4C59B7B364657BF3FD8C") {
                map.setCenter([123.449715, 41.714914]);
            } else if (value === "21F930DCD3164BA99D86305DED787F21") {
                map.setCenter([123.420382, 41.789809]);
            }
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetStreetsByCOUNTYID&COUNTYID=${value}`,
                dataType: "json",
                success: function (data) {
                    var streets = data["rows"];
                    streets.forEach(function (street) {
                        if (street["BOUNDS"] !== null) {
                            // draw polygon
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: JSON.parse(street["BOUNDS"]),
                                map: map,
                                strokeColor: "#FFDA00",
                                fillColor: "#FFDA00",
                                extData: {
                                    "ID": street["STREET_ID_CONV"],
                                    "DATATYPE": "STREET"
                                }

                            });
                        } else {
                            // draw fake polygon
                            var lng = street["LNG"];
                            var lat = street["LAT"]
                            var path = [];
                            var distance = 300;
                            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: path,
                                map: map,
                                strokeColor: "#FFDA00",
                                fillColor: "#FFDA00",
                                extData: {
                                    "ID": street["STREET_ID_CONV"],
                                    "DATATYPE": "STREET"
                                }

                            });
                        }
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
            $("#tableStreet").datagrid({
                pageNumber: 1,
                url: `./Level5Address.ashx?m=GetStreetsByCOUNTYIDPag&COUNTYID=${value}`,
                method: 'get'
            });
        }
        //console.log(data.elem); //得到select原始DOM对象
        //console.log(data.value); //得到被选中的值
        //console.log(data.othis); //得到美化后的DOM对象
    });      
});

function unhighlight() {
    
}

function mainDeprecated() {
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetStreetsDefault`,
        dataType: "json",
        success: function (data) {
            var streets = data["data"];
            streets.forEach(function (street) {
                console.log(street);
                if (street["BOUNDS"] !== null) {
                    // draw polygon
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(street["BOUNDS"]),
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00"
                    });
                    polygon.on('click', function (e) {
                        // make sure all polygons and markers are not highlighted then highlight this one as red
                        
                        layer.open({
                            btn: [],
                            maxWidth: 750,
                            shade: 0,
                            title: "街道",
                            end: function () {
                                mousetool.close(true);
                                map.setDefaultCursor("pointer");
                            },
                            content: `<div>
                             <p><span>街道ID:</span> <span>${street["STREET_ID"]}</span></p>
                             <p><span>编码:</span> <span>${street["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${street["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${street["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${street["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${street["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${street["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${street["BOUNDS"]}</span></p>
                             <p><span>来源:</span> <span>${street["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${street["CREATE_DATE"]}</span></p>
                             <p><span>区县ID:</span> <span>${street["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                        });
                    });
                } else {
                    // draw marker
                    //marker = new AMap.Marker({
                    //    icon: "./imgs/street.png",
                    //    position: [street["LNG"], street["LAT"]]
                    //});
                    //marker.setMap(map);
                    // or draw polygon
                    
                    var lng = street["LNG"];
                    var lat = street["LAT"]
                    var path = [];
                    var distance = 50;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00"
                    });
                    polygon.on('click', function (e) {
                        // make sure all polygons and markers are not highlighted then highlight this one as red

                        e.target.setOptions({
                            strokeColor: "#FF0000",
                            fillColor: "#FF0000"
                        });
                        layer.open({
                            btn: [],
                            maxWidth: 750,
                            shade: 0,
                            title: "街道",
                            end: function () {
                                mousetool.close(true);
                                map.setDefaultCursor("pointer");
                            },
                            content: `<div>
                             <p><span>街道ID:</span> <span>${street["STREET_ID"]}</span></p>
                             <p><span>编码:</span> <span>${street["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${street["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${street["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${street["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${street["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${street["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${street["BOUNDS"]}</span></p>
                             <p><span>来源:</span> <span>${street["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${street["CREATE_DATE"]}</span></p>
                             <p><span>区县ID:</span> <span>${street["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                        });
                    });
                }
            });
        },
        error: function () {
            console.log('error');
        }
    });
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetCommunitiesDefault`,
        dataType: "json",
        success: function (data) {
            var communities = data["data"];
            communities.forEach(function (community) {
                if (community["BOUNDS"] !== null) {
                    // draw polygon
                } else {
                    // draw marker
                    //marker = new AMap.Marker({
                    //    icon: "./imgs/community.png",
                    //    position: [community["LNG"], community["LAT"]]
                    //});
                    //marker.setMap(map);
                    // or draw polygon
                    //var long = Number(poi.poiLocation.split(",")[0]);
                    //var lat = Number(poi.poiLocation.split(",")[1]);
                    var lng = community["LNG"];
                    var lat = community["LAT"]
                    var path = [];
                    var distance = 50;
                    var xGaode = Number("0.000" + String(distance /8.295869256724348).replace('.',''));
                    var yGaode = Number("0.000" + String(distance /11.132050921783284).replace('.',''));
                    path.push([Number(((lng - xGaode)-0.00000000000002).toFixed(6)),Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)),Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)),Number(((lat + yGaode)-0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode)-0.00000000000002).toFixed(6)),Number(((lat - yGaode)-0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#FF9E00",
                        fillColor: "#FF9E00"
                    });
                    polygon.on('click', function (e) {
                        layer.open({
                            btn: [],
                            maxWidth: 750,
                            shade: 0,
                            title: "社区",
                            end: function () {
                                mousetool.close(true);
                                map.setDefaultCursor("pointer");
                            },
                            content: `<div>
                             <p><span>社区ID:</span> <span>${community["COMMUNITY_ID"]}</span></p>
                             <p><span>编码:</span> <span>${community["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${community["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${community["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${community["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${community["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${community["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${community["BOUNDS"]}</span></p>
                             <p><span>联系电话:</span> <span>${community["TEL"]}</span></p>
                             <p><span>来源:</span> <span>${community["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${community["CREATE_DATE"]}</span></p>
                             <p><span>街道ID:</span> <span>${community["STREET_ID"]}</span></p>
                             <p><span>区县ID:</span> <span>${community["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                        });
                    });
                }
            });
        },
        error: function () {
            console.log('error');
        }
    });
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetVillagesDefault`,
        dataType: "json",
        success: function (data) {
            var villages = data["data"];
            villages.forEach(function (village) {
                if (village["BOUNDS"] !== null) {
                    console.log(village["BOUNDS"]);
                    //var path = [];
                    //village["BOUNDS"].forEach(function (coord) {
                    //    var lng = Number(coord.split(",")[0]);
                    //    var lat = Number(coord.split(",")[1]);
                    //    path.push([lng, lat]);
                    //})
                    // draw polygon
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(village["BOUNDS"]),
                        map: map,
                        strokeColor: "#7BC4C4",
                        fillColor: "#7BC4C4"
                    });
                    polygon.on('click', function (e) {
                        layer.open({
                            btn: [],
                            maxWidth: 750,
                            shade: 0,
                            title: "小区",
                            end: function () {
                                mousetool.close(true);
                                map.setDefaultCursor("pointer");
                            },
                            content: `<div>
                             <p><span>小区ID:</span> <span>${village["VILLAGE_ID"]}</span></p>
                             <p><span>编码:</span> <span>${village["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${village["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${village["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${village["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${village["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${village["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${village["BOUNDS"]}</span></p>
                             <p><span>来源:</span> <span>${village["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${village["CREATE_DATE"]}</span></p>
                             <p><span>社区ID:</span> <span>${village["COMMUNITY_ID"]}</span></p>
                             <p><span>区县ID:</span> <span>${village["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                        });
                    });
                } else {
                    // draw marker
                    //marker = new AMap.Marker({
                    //    icon: "./imgs/community.png",
                    //    position: [community["LNG"], community["LAT"]]
                    //});
                    //marker.setMap(map);
                    // or draw polygon
                    //var long = Number(poi.poiLocation.split(",")[0]);
                    //var lat = Number(poi.poiLocation.split(",")[1]);
                    var lng = village["LNG"];
                    var lat = village["LAT"]
                    var path = [];
                    var distance = 50;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#7BC4C4",
                        fillColor: "#7BC4C4"
                    });
                    polygon.on('click', function (e) {
                        layer.open({
                            btn: [],
                            maxWidth: 750,
                            shade: 0,
                            title: "小区",
                            end: function () {
                                mousetool.close(true);
                                map.setDefaultCursor("pointer");
                            },
                            content: `<div>
                             <p><span>小区ID:</span> <span>${village["VILLAGE_ID"]}</span></p>
                             <p><span>编码:</span> <span>${village["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${village["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${village["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${village["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${village["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${village["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${village["BOUNDS"]}</span></p>
                             <p><span>来源:</span> <span>${village["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${village["CREATE_DATE"]}</span></p>
                             <p><span>社区ID:</span> <span>${village["COMMUNITY_ID"]}</span></p>
                             <p><span>区县ID:</span> <span>${village["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                        });
                    });
                }
            });
        },
        error: function () {
            console.log('error');
        }
    });
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetBuildingsDefault`,
        dataType: "json",
        success: function (data) {
            var buildings = data["data"];
            buildings.forEach(function (building) {
                marker = new AMap.Marker({
                    position: [building["LNG"], building["LAT"]]
                });
                marker.setMap(map);
                marker.on('click', function (e) {
                    layer.open({
                        btn: [],
                        maxWidth: 750,
                        shade: 0,
                        title: "楼栋",
                        end: function () {
                            mousetool.close(true);
                            map.setDefaultCursor("pointer");
                        },
                        content: `<div>
                             <p><span>楼栋ID:</span> <span>${building["BUILDING_ID"]}</span></p>
                             <p><span>编码:</span> <span>${building["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${building["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${building["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${building["ADDRESS"]}</span></p>
                             <p><span>蓝牌地址:</span> <span>${building["BLUELABEL"]}</span></p>
                             <p><span>是否在地图上:</span> <span>${building["ONMAP"]}</span></p>
                             <p><span>高度:</span> <span>${building["HEIGHT"]}</span></p>
                             <p><span>经度:</span> <span>${building["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${building["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${building["BOUNDS"]}</span></p>
                             <p><span>来源:</span> <span>${building["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${building["CREATE_DATE"]}</span></p>
                             <p><span>父元素:</span> <span>${building["PARENT"]}</span></p>
                             <p><span>小区ID:</span> <span>${building["VILLAGE_ID"]}</span></p>
                             <p><span>区县ID:</span> <span>${building["COUNTY_ID"]}</span></p>
                             <p class="text-center mt-15">  
                                <button type="button" class="layui-btn">编辑</button>
                                <button type="button" class="layui-btn layui-btn-danger">删除</button>
                             </p>
                            </div>`
                    });
                });
            });
            
        },
        error: function () {
            console.log('error');
        }
    });
}

function mainDeprecated2() {
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetAll`,
        dataType: "json",
        success: function (data) {
            var provinces = data["provinces"];
            var cities = data["cities"];
            var counties = data["counties"];
            var streets = data["streets"];
            var communities = data["communities"];
            var villages = data["villages"];
            var buildings = data["buildings"];
            var tree = [];

            provinces.forEach(function (province) {
                province["DATATYPE"] = "PROVINCE";
                tree.push({
                    "text": province["NAME"],
                    "children": [],
                    "attributes": province,
                    "state": "closed"
                });
               });
            cities.forEach(function (city) {
                city["DATATYPE"] = "CITY";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    if (province["attributes"]["PROVINCE_ID_CONV"] === city["PROVINCE_ID_CONV"]) {
                        province["children"].push(
                            {
                                "text": city["NAME"],
                                "children": [],
                                "attributes": city,
                                "state": "closed"
                            }
                        )
                    }
                }
            });
            counties.forEach(function (county) {
                county["DATATYPE"] = "COUNTY";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    for (var j = 0; j < province["children"].length; j++) {
                        var city = province["children"][j];
                        console.log(province);
                        console.log(city);
                        if (city["attributes"]["CITY_ID_CONV"] === county["CITY_ID_CONV"]) {
                            console.log(province);
                            console.log(city);
                            city["children"].push(
                                {
                                    "text": county["NAME"],
                                    "children": [],
                                    "attributes": county,
                                    "state": "closed"
                                }
                            )
                        }
                    }
               
                }
            });
            streets.forEach(function (street) {
                street["DATATYPE"] = "STREET";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    for (var j = 0; j < province["children"].length; j++) {
                        var city = province["children"][j];
                        for (var k = 0; k < city["children"].length; k++) {
                            var county = city["children"][k];
                            if (county["attributes"]["COUNTY_ID_CONV"] === street["COUNTY_ID_CONV"]) {
                                console.log(province);
                                console.log(city);
                                county["children"].push(
                                    {
                                        "text": street["NAME"],
                                        "children": [],
                                        "attributes": street,
                                        "state": "closed"
                                    }
                                )
                            }
                        }               
                    }

                }
            });

            communities.forEach(function (community) {
                community["DATATYPE"] = "COMMUNITY";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    for (var j = 0; j < province["children"].length; j++) {
                        var city = province["children"][j];
                        for (var k = 0; k < city["children"].length; k++) {
                            var county = city["children"][k];
                            for (var l = 0; l < county["children"].length; l++) {
                                var street = county["children"][l];
                                if (street["attributes"]["STREET_ID_CONV"] === community["STREET_ID_CONV"]) {
                                    street["children"].push(
                                        {
                                            "text": community["NAME"],
                                            "children": [],
                                            "attributes": community,
                                            "state": "closed"
                                        }
                                    )
                                }
                            }
                       
                        }
                    }

                }
            });

            villages.forEach(function (village) {
                village["DATATYPE"] = "VILLAGE";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    for (var j = 0; j < province["children"].length; j++) {
                        var city = province["children"][j];
                        for (var k = 0; k < city["children"].length; k++) {
                            var county = city["children"][k];
                            for (var l = 0; l < county["children"].length; l++) {
                                var street = county["children"][l];
                                for (var o = 0; o < street["children"].length; o++) {
                                    var community = street["children"][o];
                                    if (community["attributes"]["COMMUNITY_ID_CONV"] === village["COMMUNITY_ID_CONV"]) {
                                        community["children"].push(
                                            {
                                                "text": village["NAME"],
                                                "children": [],
                                                "attributes": village,
                                                "state": "closed"
                                            }
                                        )
                                    }
                                }

                            }
                        }

                    }
                }
            });

            buildings.forEach(function (building) {
                building["DATATYPE"] = "BUILDING";
                for (var i = 0; i < tree.length; i++) {
                    var province = tree[i];
                    for (var j = 0; j < province["children"].length; j++) {
                        var city = province["children"][j];
                        for (var k = 0; k < city["children"].length; k++) {
                            var county = city["children"][k];
                            for (var l = 0; l < county["children"].length; l++) {
                                var street = county["children"][l];
                                for (var o = 0; o < street["children"].length; o++) {
                                    var community = street["children"][o];
                                    for (var p = 0; p < community["children"].length; p++) {
                                        var village = community["children"][p];
                                        if (village["attributes"]["VILLAGE_ID_CONV"] === building["VILLAGE_ID_CONV"]) {
                                            village["children"].push(
                                                {
                                                    "text": building["NAME"],
                                                    "children": [],
                                                    "attributes": building,
                                                    "state": "closed"
                                                }
                                            )
                                        }
                                    }
                          
                                }

                            }
                        }
                    }
                }
            });
            //tree.push({
            //    "id": 1,
            //    "text": "未归档",
            //    "iconCls": "icon-save",
            //    "children": []
            //});
            //provinces.forEach(function (province) {
            //    tree.push({
            //        "text": province["NAME"],
            //        "iconCls": "icon-save",
            //        "children": [],
            //        "attributes": province,
            //    });
            //});
            //cities.forEach(function (city) {
            //    if (city["PROVINCE_ID"] === null) {
            //        tree[0]["children"].push({
            //            "text": city["NAME"],
            //            "iconCls": "icon-save",
            //            "children": [],
            //            "attributes": city,
            //        }
            //        );
            //    } else {
            //        for (var i = 0; i < tree.length)
            //    }
            //    tree.push({
            //        "text": province["NAME"],
            //        "iconCls": "icon-save",
            //        "children": [],
            //        "attributes": province,
            //    });
            //});
            console.log(tree);
            $('#tt').tree({
                data: tree,
                onClick: function (node) {
                    console.log(node);  // 在用户点击的时候提示
                },
                formatter: function (node) {
                    var s = node.text;
                    if (node.children) {
                        s += '&nbsp;<span class="mr-5" style=\'color:blue\'>(' + node.children.length + ')</span>';
                    }
                   
                    if (node.attributes["DATATYPE"] === "STREET") {
                        s += `<i class="fa fa-eye mr-5" onclick="detailStreet(${nodeS});"></i><i class="fa fa-edit mr-5" onclick="
editStreet(${nodeS});"></i><i class="fa fa-trash-o" onclick="deleteStreet(${nodeS});"></i>`;
                    }
                    if (node.attributes["DATATYPE"] === "COMMUNITY") {
                        s += `<i class="fa fa-eye mr-5" onclick="detailCommunity(this);"></i><i class="fa fa-edit mr-5" onclick="
editCommunity(this);"></i><i class="fa fa-trash-o" onclick="deleteCommunity(this);"></i>`;
                    }
                    if (node.attributes["DATATYPE"] === "VILLAGE") {
                        s += `<i class="fa fa-eye mr-5" onclick="detailVillage(this);"></i><i class="fa fa-edit mr-5" onclick="
editVillage(this);"></i><i class="fa fa-trash-o" onclick="deleteVillage(this);"></i>`;
                    }
                    if (node.attributes["DATATYPE"] === "BUILDING") {
                        s += `<i class="fa fa-eye mr-5" onclick="detailBuilding(this);"></i><i class="fa fa-edit mr-5" onclick="
editBuilding(this);"></i><i class="fa fa-trash-o" onclick="deleteBuilding(this);"></i>`;
                    }
                    return s;
                }
            });

        },
        error: function () {
            console.log('error');
        }
    });
}

function unhighlightAll() {
    var polygons = map.getAllOverlays("polygon");
    var markers = map.getAllOverlays("marker");
    polygons.forEach(function (polygon) {
        if (polygon.getOptions().strokeColor === "#FF0000") {
            if (polygon.getExtData()["DATATYPE"] === "STREET") {
                polygon.setOptions({
                    strokeColor: "#FFDA00",
                    fillColor: "#FFDA00"
                });
            } else if (polygon.getExtData()["DATATYPE"] === "COMMUNITY") {
                polygon.setOptions({
                    strokeColor: "#FF9E00",
                    fillColor: "#FF9E00"
                });
            } else {
                polygon.setOptions({
                    strokeColor: "#7BC4C4",
                    fillColor: "#7BC4C4"
                });
            }
        }
    });
    markers.forEach(function (marker) {
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png', // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        if (marker.getIcon().B.image === "./icons/poi-marker-red.png") {
            marker.setIcon(icon);
        }
    });
}

function main() {
    // send request to get streets from all counties and render them on map and table
    $.ajax({
        type: "get",
        url: `./Level5Address.ashx?m=GetAllStreets`,
        dataType: "json",
        success: function (data) {
            var streets = data["rows"];
            streets.forEach(function (street) {
                if (street["BOUNDS"] !== null) {
                    // draw polygon
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.2,
                        strokeWeight: 1,
                        path: JSON.parse(street["BOUNDS"]),
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00",
                        extData: {
                            "ID": street["STREET_ID_CONV"],
                            "DATATYPE": "STREET"
                        }
                    });
                } else {
                    // draw fake polygon
                    var lng = street["LNG"];
                    var lat = street["LAT"]
                    var path = [];
                    var distance = 300;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00",
                        extData: {
                            "ID": street["STREET_ID_CONV"],
                            "DATATYPE": "STREET"
                        }
                    });
                }
            });
            },
        error: function () {
            console.log('error');
        }
    });

    $('#tableStreet').datagrid({
        url: `./Level5Address.ashx?m=GetAllStreetsPag`,
        method: 'get',
        pagination: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: '#tbS',
        columns: [[
            { field: 'STREET_ID_CONV', title: '街道ID', width: 100, hidden: true },
            { field: 'CODE', title: '编码', width: 100, hidden: true },
            { field: 'NAME', title: '名称', width: 100 },
            { field: 'TYPE', title: '类型', width: 100, hidden: true },
            { field: 'ADDRESS', title: '地址', width: 100 },
            { field: 'LNG', title: '经度', width: 100 },
            { field: 'LAT', title: '纬度', width: 100 },
            { field: 'BOUNDS', title: '边界', width: 100 },
            { field: 'SOURCE', title: '数据来源', width: 100, hidden: true },
            { field: 'CREATE_DATE', title: '创建日期', width: 100, hidden: true },
            { field: 'COUNTY_ID_CONV', title: '区县ID', width: 100, hidden: true },
            {
                field: "STREET_ACTION", title: "操作", width: 100, align: "center", formatter: function (value, row, index) {
                    return `<i class="fa fa-eye mr-5" onclick="detailStreet();"></i><i class="fa fa-edit mr-5" onclick="
editStreet();"></i><i class="fa fa-trash-o" onclick="deleteStreet();"></i>`;
                }
            },
        ]],
        onClickRow: function (index, row) {
            clearCVB();
            clearTables234();
            map.setCenter([row["LNG"], row["LAT"]]);
            unhighlightAll();
            var STREET_ID_CONV = row["STREET_ID_CONV"];
            console.log(STREET_ID_CONV);
            var polygons = map.getAllOverlays("polygon");
            polygons.forEach(function (polygon) {
                //console.log(polygon.getExtData());
                if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
                    polygon.setOptions({
                        strokeColor: '#FF0000',
                        fillColor: '#FF0000'
                    });
                }
            });
            var STREETID = row["STREET_ID_CONV"];
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetCommunitiesBySTREETID&STREETID=${STREETID}`,
                dataType: "json",
                success: function (data) {
                    var communities = data["rows"];
                    communities.forEach(function (community) {
                        if (community["BOUNDS"] !== null) {
                            // draw polygon
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: JSON.parse(community["BOUNDS"]),
                                map: map,
                                strokeColor: "#FF9E00",
                                fillColor: "#FF9E00",
                                extData: {
                                    "ID": community["COMMUNITY_ID_CONV"],
                                    "DATATYPE": "COMMUNITY"
                                }

                            });
                        } else {
                            // draw fake polygon
                            var lng = community["LNG"];
                            var lat = community["LAT"]
                            var path = [];
                            var distance = 300;
                            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: path,
                                map: map,
                                strokeColor: "#FF9E00",
                                fillColor: "#FF9E00",
                                extData: {
                                    "ID": community["COMMUNITY_ID_CONV"],
                                    "DATATYPE": "COMMUNITY"
                                }

                            });
                        }
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
            $("#tableCommunity").datagrid({
                pageNumber: 1,
                url: `./Level5Address.ashx?m=GetCommunitiesBySTREETIDPag&STREETID=${STREETID}`,
                method: 'get'
            });
            //var lng = row["LNG"];
            //var lat = row["LAT"]
            //var path = [];
            //var distance = 300;
            //var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            //var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            //path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            //path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            //path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            //path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            //console.log(path);
            //var polygons = map.getAllOverlays("polygon");
            //polygons.forEach(function (polygon) {
            //    var bounds = [];
            //    polygon.getPath().forEach(function (coord) {
            //        bounds.push([coord["lng"], coord["lat"]]);
            //    });
            //    console.log(bounds);
            //    if (bounds === path) {
            //        polygon.setOptions({
            //            strokeColor: 'FF0000',
            //            fillColor: 'FF0000'
            //        });
            //    } 
            //})
            streetSelected = row;
        }
    });
    $('#tableCommunity').datagrid({
        //url: `./Level5Address.ashx?m=GetAllStreets`,
        method: 'get',
        pagination: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: '#tbC',
        columns: [[
            { field: 'COMMUNITY_ID_CONV', title: '社区ID', width: 100, hidden: true },
            { field: 'CODE', title: '编码', width: 100, hidden: true },
            { field: 'NAME', title: '名称', width: 100 },
            { field: 'TYPE', title: '类型', width: 100, hidden: true },
            { field: 'ADDRESS', title: '地址', width: 100 },
            { field: 'LNG', title: '经度', width: 100 },
            { field: 'LAT', title: '纬度', width: 100 },
            { field: 'BOUNDS', title: '边界', width: 100 },
            { field: 'TEL', title: '联系电话', width: 100 },
            { field: 'SOURCE', title: '数据来源', width: 100, hidden: true },
            { field: 'CREATE_DATE', title: '创建日期', width: 100, hidden: true },
            { field: 'STREET_ID_CONV', title: '街道ID', width: 100, hidden: true },
            { field: 'COUNTY_ID_CONV', title: '区县ID', width: 100, hidden: true },
           {
                field: "COMMUNITY_ACTION", title: "操作", width: 100, align: "center", formatter: function (value, row, index) {
                    return `<i class="fa fa-eye mr-5" onclick="detailCommunity();"></i><i class="fa fa-edit mr-5" onclick="
editCommunity();"></i><i class="fa fa-trash-o" onclick="deleteCommunity();"></i>`;
                }
            },
        ]],
        onClickRow: function (index, row) {
            clearVB();
            clearTables34();
            map.setCenter([row["LNG"], row["LAT"]]);
            unhighlightAll();
            var COMMUNITY_ID_CONV = row["COMMUNITY_ID_CONV"];
            var polygons = map.getAllOverlays("polygon");
            polygons.forEach(function (polygon) {
                if (polygon.getExtData()["ID"] === COMMUNITY_ID_CONV) {
                    polygon.setOptions({
                        strokeColor: '#FF0000',
                        fillColor: '#FF0000'
                    });
                }
            });
            var COMMUNITYID = row["COMMUNITY_ID_CONV"];
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetVillagesByCOMMUNITYID&COMMUNITYID=${COMMUNITYID}`,
                dataType: "json",
                success: function (data) {
                    var villages = data["rows"];
                    villages.forEach(function (village) {
                        if (village["BOUNDS"] !== null) {
                            // draw polygon
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: JSON.parse(village["BOUNDS"]),
                                map: map,
                                strokeColor: "#7BC4C4",
                                fillColor: "#7BC4C4",
                                extData: {
                                    "ID": village["VILLAGE_ID_CONV"],
                                    "DATATYPE": "VILLAGE"
                                }

                            });
                        } else {
                            // draw fake polygon
                            var lng = village["LNG"];
                            var lat = village["LAT"]
                            var path = [];
                            var distance = 300;
                            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                            var polygon = new AMap.Polygon({
                                bubble: true,
                                fillOpacity: 0.4,
                                strokeWeight: 1,
                                path: path,
                                map: map,
                                strokeColor: "#7BC4C4",
                                fillColor: "#7BC4C4",
                                extData: {
                                    "ID": village["VILLAGE_ID_CONV"],
                                    "DATATYPE": "VILLAGE"
                                }

                            });
                        }
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
            $("#tableVillage").datagrid({
                pageNumber: 1,
                url: `./Level5Address.ashx?m=GetVillagesByCOMMUNITYIDPag&COMMUNITYID=${COMMUNITYID}`,
                method: 'get'
            });
            //var lng = row["LNG"];
            //var lat = row["LAT"]
            //var path = [];
            //var distance = 300;
            //var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            //var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            //path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            //path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            //path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            //path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            //console.log(path);
            //var polygons = map.getAllOverlays("polygon");
            //polygons.forEach(function (polygon) {
            //    var bounds = [];
            //    polygon.getPath().forEach(function (coord) {
            //        bounds.push([coord["lng"], coord["lat"]]);
            //    });
            //    console.log(bounds);
            //    if (bounds === path) {
            //        polygon.setOptions({
            //            strokeColor: 'FF0000',
            //            fillColor: 'FF0000'
            //        });
            //    } 
            //})
            communitySelected = row;
        }
    });

    $('#tableVillage').datagrid({
        //url: `./Level5Address.ashx?m=GetAllStreets`,
        method: 'get',
        pagination: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: '#tbV',
        columns: [[
            { field: 'VILLAGE_ID_CONV', title: '小区ID', width: 100, hidden: true },
            { field: 'CODE', title: '编码', width: 100 },
            { field: 'NAME', title: '名称', width: 100 },
            { field: 'TYPE', title: '类型', width: 100, hidden: true },
            { field: 'ADDRESS', title: '地址', width: 100 },
            { field: 'LNG', title: '经度', width: 100 },
            { field: 'LAT', title: '纬度', width: 100 },
            { field: 'BOUNDS', title: '边界', width: 100 },
            { field: 'SOURCE', title: '数据来源', width: 100, hidden: true },
            { field: 'CREATE_DATE', title: '创建日期', width: 100, hidden: true },
            { field: 'COMMUNITY_ID_CONV', title: '社区ID', width: 100, hidden: true },
            { field: 'COUNTY_ID_CONV', title: '区县ID', width: 100, hidden: true }
                 ,{
                field: "VILLAGE_ACTION", title: "操作", width: 100, align: "center", formatter: function (value, row, index) {
                    return `<i class="fa fa-eye mr-5" onclick="detailVillage();"></i><i class="fa fa-edit mr-5" onclick="
editVillage();"></i><i class="fa fa-trash-o" onclick="deleteVillage();"></i>`;
                }
            },
        ]],
        onClickRow: function (index, row) {
            clearB();
            clearTables4();
            map.setCenter([row["LNG"], row["LAT"]]);
            unhighlightAll();
            var VILLAGE_ID_CONV = row["VILLAGE_ID_CONV"];
            var polygons = map.getAllOverlays("polygon");
            polygons.forEach(function (polygon) {
                if (polygon.getExtData()["ID"] === VILLAGE_ID_CONV) {
                    polygon.setOptions({
                        strokeColor: '#FF0000',
                        fillColor: '#FF0000'
                    });
                }
            });
            var VILLAGEID = row["VILLAGE_ID_CONV"];
            $.ajax({
                type: "get",
                url: `./Level5Address.ashx?m=GetBuildingsByVILLAGEID&VILLAGEID=${VILLAGEID}`,
                dataType: "json",
                success: function (data) {
                    var buildings = data["rows"];
                    console.log(buildings);
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-default.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    buildings.forEach(function (building) {
                        marker = new AMap.Marker({
                            icon: icon,
                            position: [building["LNG"], building["LAT"]],
                            extData: {
                                "ID": building["BUILDING_ID_CONV"],
                                "DATATYPE": "BUILDING"
                            }
                        });
                        marker.setMap(map);
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
            $("#tableBuilding").datagrid({
                pageNumber: 1,
                url: `./Level5Address.ashx?m=GetBuildingsByVILLAGEIDPag&VILLAGEID=${VILLAGEID}`,
                method: 'get'
            });
            //var lng = row["LNG"];
            //var lat = row["LAT"]
            //var path = [];
            //var distance = 300;
            //var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            //var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            //path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            //path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            //path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            //path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            //console.log(path);
            //var polygons = map.getAllOverlays("polygon");
            //polygons.forEach(function (polygon) {
            //    var bounds = [];
            //    polygon.getPath().forEach(function (coord) {
            //        bounds.push([coord["lng"], coord["lat"]]);
            //    });
            //    console.log(bounds);
            //    if (bounds === path) {
            //        polygon.setOptions({
            //            strokeColor: 'FF0000',
            //            fillColor: 'FF0000'
            //        });
            //    } 
            //})
            villageSelected = row;
        }
    });
    $('#tableBuilding').datagrid({
        //url: `./Level5Address.ashx?m=GetAllStreets`,
        method: 'get',
        pagination: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: '#tbB',
        columns: [[
            { field: 'BUILDING_ID_CONV', title: '楼栋ID', width: 100, hidden: true },
            { field: 'CODE', title: '编码', width: 100, hidden: true },
            { field: 'NAME', title: '名称', width: 100 },
            { field: 'TYPE', title: '类型', width: 100, hidden: true },
            { field: 'ADDRESS', title: '地址', width: 100 },
            { field: 'BLUELABEL', title: '蓝牌地址', width: 100, hidden: true },
            { field: 'ONMAP', title: '是否在地图', width: 100, hidden: true },
            { field: 'HEIGHT', title: '高度', width: 100, hidden: true },
            { field: 'LNG', title: '经度', width: 100 },
            { field: 'LAT', title: '纬度', width: 100 },
            { field: 'BOUNDS', title: '边界', width: 100 },
            { field: 'SOURCE', title: '数据来源', width: 100, hidden: true },
            { field: 'CREATE_DATE', title: '创建日期', width: 100, hidden: true },
            { field: 'PARENT', title: '父元素', width: 100, hidden: true },
            { field: 'VILLAGE_ID_CONV', title: '小区ID', width: 100, hidden: true },
            { field: 'COUNTY_ID_CONV', title: '区县ID', width: 100, hidden: true }
            , {
                field: "BUILDING_ACTION", title: "操作", width: 100, align: "center", formatter: function (value, row, index) {
                    return `<i class="fa fa-eye mr-5" onclick="detailBuilding();"></i><i class="fa fa-edit mr-5" onclick="
editBuilding();"></i><i class="fa fa-trash-o" onclick="deleteBuilding();"></i>`;
                }
            },
        ]],
        onClickRow: function (index, row) {
            map.setCenter([row["LNG"], row["LAT"]]);
            unhighlightAll();
            var BUILDING_ID_CONV = row["BUILDING_ID_CONV"];
            var markers = map.getAllOverlays("marker");
            var icon = new AMap.Icon({
                size: new AMap.Size(25, 25),
                image: './icons/poi-marker-red.png', // Icon的图像
                imageSize: new AMap.Size(25, 25)
            });
            markers.forEach(function (marker) {
                if (marker.getExtData()["ID"] === BUILDING_ID_CONV) {
                    marker.setIcon(icon);
                }
            });

            //var lng = row["LNG"];
            //var lat = row["LAT"]
            //var path = [];
            //var distance = 300;
            //var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            //var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            //path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            //path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            //path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            //path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            //console.log(path);
            //var polygons = map.getAllOverlays("polygon");
            //polygons.forEach(function (polygon) {
            //    var bounds = [];
            //    polygon.getPath().forEach(function (coord) {
            //        bounds.push([coord["lng"], coord["lat"]]);
            //    });
            //    console.log(bounds);
            //    if (bounds === path) {
            //        polygon.setOptions({
            //            strokeColor: 'FF0000',
            //            fillColor: 'FF0000'
            //        });
            //    } 
            //})
            buildingSelected = row;
        }
       
    });

    var buttonGetSC = document.getElementById('buttonGetSC');
    var buttonGetVB = document.getElementById('buttonGetVB');
    var tablesContainer = document.getElementById('tablesContainer');
    var tablesContainer2 = document.getElementById('tablesContainer2');
    buttonGetVB.addEventListener('click', function (e) {
        e.target.classList.add("layui-btn-disabled");
        buttonGetSC.classList.remove("layui-btn-disabled");
        tablesContainer.style.bottom = "-300px";
        tablesContainer2.style.bottom = "0";
    });
    buttonGetSC.addEventListener('click', function (e) {
        e.target.classList.add("layui-btn-disabled");
        buttonGetVB.classList.remove("layui-btn-disabled");
        tablesContainer.style.bottom = "0";
        tablesContainer2.style.bottom = "-300px";
    });
    var tables = document.getElementsByClassName('panel datagrid panel-htop easyui-fluid');
    var body = document.getElementsByTagName('body')[0];
    var tableS = tables[0];
    var tableV = tables[2];
    tableS.style.marginRight = '2%';
    tableV.style.marginRight = '2%';
    //var sep = document.createElement('div');
    //sep.setAttribute("id", "sep");
    //sep.style.width = '2%';
    //sep.style.position = 'fixed';
    //sep.style.bottom = '0';
    //sep.style.left = '49%';
    //sep.style.height = '250px';
    //sep.style.border = '1px solid #95B8E7';
    //sep.style.backgroundColor = 'white';
    //body.appendChild(sep);

    var buttonToggleTables = document.getElementById('buttonToggleTables');
    var tablesContainer = document.getElementById('tablesContainer');
    var tablesContainer2 = document.getElementById('tablesContainer2');
    var buttonsGroup1 = document.getElementById('buttonsGroup1');
    var sep = document.getElementById('sep');
    buttonToggleTables.addEventListener('click', function (e) {
        if (e.target.classList.contains("toggled")) {
            tablesContainer.style.display = 'flex';
            tablesContainer2.style.display = 'flex';
            buttonsGroup1.style.display = 'flex';
            sep.style.display = 'block';
            $("#buttonToggleTables").css({
                "transform": "rotateX(0deg)"
            });
            e.target.style.bottom = "260px";
            e.target.classList.remove("toggled");

        } else {
            tablesContainer.style.display = 'none';
            tablesContainer2.style.display = 'none';
            buttonsGroup1.style.display = 'none';
            sep.style.display = 'none';
            $("#buttonToggleTables").css({
                "transform": "rotateX(180deg)"
            });
            e.target.style.bottom = "20px";
            e.target.classList.add("toggled");
        }
    });

    //var panelTitles = document.getElementsByClassName('panel-title');
    //var panelTitleStreet = panelTitles[0];
    //var panelTitleCommunity = panelTitles[1];
    //var panelTitleVillage = panelTitles[2];
    //var panelTitleBuilding = panelTitles[3];
    //panelTitleStreet.innerHTML += `<span class="cursorPointer" onclick='createStreet()'>新建街道</span>`;
}

main();

function editStreet() {
    setTimeout(function () {
        var polygon, marker;
        if (streetSelected["BOUNDS"] !== null) {
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: JSON.parse(streetSelected["BOUNDS"]),
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polyEditor.open();
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });

            //polygonSelected.setExtData({ "editor": polyEditor });
        } else {
            console.log('w');
            var lng = streetSelected["LNG"];
            var lat = streetSelected["LAT"]
            var path = [];
            var distance = 300;
            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: path,
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.open();
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });
        }
               var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png',  // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
                  marker = new AMap.Marker({
                icon: icon,
                position: [streetSelected["LNG"], streetSelected["LAT"]],
                draggable: true
                  });
                marker.on('dragging', function (e) {
            var target = e.target;
            var lng = target.getPosition()["lng"];
                    var lat = target.getPosition()["lat"];
                    console.log(lng);
                    var inputLng = document.getElementById('inputLng');
                    var inputLat = document.getElementById('inputLat');
                    //inputLng.disabled = false;
                    inputLng.value = lng;
                    //inputLng.disabled = true;
                    //inputLat.disabled = false;
                    inputLat.value = lat;
                    //inputLat.disabled = true;
            //document.getElementById('inputLng').innerText = lng;
            //document.getElementById('inputLat').innerText = lat;
        });
        marker.setMap(map);

        //var icon = new AMap.Icon({
        //    size: new AMap.Size(25, 25),
        //    image: './icons/poi-marker-default.png',  // Icon的图像
        //    imageSize: new AMap.Size(25, 25)
        //});
        //    marker = new AMap.Marker({
        //        icon: icon,
        //        position: [streetSelected["LNG"], streetSelected["LAT"]],
        //        draggable: true,
        //        visible: false,
        //        extData: {
        //            "DATATYPE": "DRAGGABLE"
        //        }
        //    });
        //marker.on('dragging', function (e) {
        //    var target = e.target;
        //    var lng = target.getPosition()["lng"];
        //    var lat = target.getPosition()["lat"];
        //    document.getElementById('fieldHidden').innerText = lng;
        //    document.getElementById('fieldHidden2').innerText = lat;
        //});
        //marker.setMap(map);
        //var polygonSelected = "";
        //var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });

        //var polygonSelected = "";
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getOptions().strokeColor === "#FF0000") {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑街道",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //map.setDefaultCursor("pointer");
                //var markers = map.getAllOverlays('marker');
                //markers.forEach(function (marker) {
                //    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
                //        map.remove(marker);
                //    }
                //});
                //polygonSelected.getExtData()["editor"].close();
                //map.remove(polygonSelected);
                //if (editmode === 1) {
                //    console.log('w');
                //    if (streetSelected["BOUNDS"] !== null) {
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: JSON.parse(streetSelected["BOUNDS"]),
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }
                //        });
                //    } else {
                //        var lng = streetSelected["LNG"];
                //        var lat = streetSelected["LAT"]
                //        var path = [];
                //        var distance = 300;
                //        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                //        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                //        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                //        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                //        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                //        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: path,
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }

                //        });
                //    }
           
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
                    //<div class="layui-form-item">
//                <label class="layui-form-label">编辑经纬度</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>

//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>
                                    //<div class="layui-form-item">
                //    <label class="layui-form-label">边界</label>
                //    <div class="layui-input-inline">
                //      <input type="text" name="bounds" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["BOUNDS"]}"  disabled="disabled">
                //    </div>
                //  </div>
                    //<div id="fieldHidden" class="layui-form-item hidden">` + streetSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + streetSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + streetSelected["BOUNDS"] + `</div>
                }
            ,
            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editStreetPost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${streetSelected["NAME"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["ADDRESS"]}">
                    </div>
                  </div>
     <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${streetSelected["LNG"]}"  disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["LAT"]}"  disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" disabled="disabled">${streetSelected["BOUNDS"]}</textarea>
    </div>
  </div>





 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        //form.on('switch(switch1)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.show();
        //            }
        //        });
        //        document.getElementById('s2').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.hide();
        //            }
        //        });
        //    }
        //});
        //form.on('switch(switch2)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        polygonSelected.getExtData()["editor"].open();
        //        document.getElementById('s1').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        polygonSelected.getExtData()["editor"].close();
        //    }
        //});
       
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

function editStreetPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var street_name = inputs[0].value;
    var street_address = inputs[1].value;
    var street_lng = document.getElementById('inputLng').value;
    var street_lat = document.getElementById('inputLat').value;
    var street_bounds = document.getElementById('textareaBounds').value;
    if (street_bounds === "null") {
        street_bounds = "";
    }
    var STREETID = streetSelected["STREET_ID_CONV"];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=EditStreet&STREETID=${STREETID}`,
        data: {
            "street_name": street_name, "street_address": street_address, "street_lng": street_lng, "street_lat": street_lat, "street_bounds": street_bounds
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
                //editmode = 2;
        var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
        var polygons = map.getAllOverlays("polygon");
        polygons.forEach(function (polygon) {
            if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
                map.remove(polygon);
            }
        });
                layer.closeAll();

                layer.msg("街道已编辑");
                //setTimeout(function () {
                //    editmode = 1;
                //}, 8000);
                if (street_bounds !== "") {
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(street_bounds),
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00",
                        extData: {
                            "ID": streetSelected["STREET_ID_CONV"],
                            "DATATYPE": "STREET"
                        }
                    });
                } else {
                    var lng = Number(street_lng);
                    var lat = Number(street_lat);
                    var path = [];
                    var distance = 300;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#FFDA00",
                        fillColor: "#FFDA00",
                        extData: {
                            "ID": streetSelected["STREET_ID_CONV"],
                            "DATATYPE": "STREET"
                        }
                    });
                }
                $('#tableStreet').datagrid('reload');
                clearCVB();
                clearTables234();

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });

}


function editCommunity() {
    setTimeout(function () {
        var polygon, marker;
        if (communitySelected["BOUNDS"] !== null) {
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: JSON.parse(communitySelected["BOUNDS"]),
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polyEditor.open();
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });

            //polygonSelected.setExtData({ "editor": polyEditor });
        } else {
            var lng = communitySelected["LNG"];
            var lat = communitySelected["LAT"]
            var path = [];
            var distance = 300;
            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: path,
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.open();
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });
        }
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png',  // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        marker = new AMap.Marker({
            icon: icon,
            position: [communitySelected["LNG"], communitySelected["LAT"]],
            draggable: true
        });
        marker.on('dragging', function (e) {
            var target = e.target;
            var lng = target.getPosition()["lng"];
            var lat = target.getPosition()["lat"];
            console.log(lng);
            var inputLng = document.getElementById('inputLng');
            var inputLat = document.getElementById('inputLat');
            //inputLng.disabled = false;
            inputLng.value = lng;
            //inputLng.disabled = true;
            //inputLat.disabled = false;
            inputLat.value = lat;
            //inputLat.disabled = true;
            //document.getElementById('inputLng').innerText = lng;
            //document.getElementById('inputLat').innerText = lat;
        });
        marker.setMap(map);

        //var icon = new AMap.Icon({
        //    size: new AMap.Size(25, 25),
        //    image: './icons/poi-marker-default.png',  // Icon的图像
        //    imageSize: new AMap.Size(25, 25)
        //});
        //    marker = new AMap.Marker({
        //        icon: icon,
        //        position: [streetSelected["LNG"], streetSelected["LAT"]],
        //        draggable: true,
        //        visible: false,
        //        extData: {
        //            "DATATYPE": "DRAGGABLE"
        //        }
        //    });
        //marker.on('dragging', function (e) {
        //    var target = e.target;
        //    var lng = target.getPosition()["lng"];
        //    var lat = target.getPosition()["lat"];
        //    document.getElementById('fieldHidden').innerText = lng;
        //    document.getElementById('fieldHidden2').innerText = lat;
        //});
        //marker.setMap(map);
        //var polygonSelected = "";
        //var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });

        //var polygonSelected = "";
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getOptions().strokeColor === "#FF0000") {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑社区",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //map.setDefaultCursor("pointer");
                //var markers = map.getAllOverlays('marker');
                //markers.forEach(function (marker) {
                //    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
                //        map.remove(marker);
                //    }
                //});
                //polygonSelected.getExtData()["editor"].close();
                //map.remove(polygonSelected);
                //if (editmode === 1) {
                //    console.log('w');
                //    if (streetSelected["BOUNDS"] !== null) {
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: JSON.parse(streetSelected["BOUNDS"]),
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }
                //        });
                //    } else {
                //        var lng = streetSelected["LNG"];
                //        var lat = streetSelected["LAT"]
                //        var path = [];
                //        var distance = 300;
                //        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                //        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                //        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                //        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                //        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                //        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: path,
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }

                //        });
                //    }

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
                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑经纬度</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
                //                </div>
                //              </div>

                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑边界</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
                //                </div>
                //              </div>
                //<div class="layui-form-item">
                //    <label class="layui-form-label">边界</label>
                //    <div class="layui-input-inline">
                //      <input type="text" name="bounds" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["BOUNDS"]}"  disabled="disabled">
                //    </div>
                //  </div>
                //<div id="fieldHidden" class="layui-form-item hidden">` + streetSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + streetSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + streetSelected["BOUNDS"] + `</div>
            }
            ,
            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editCommunityPost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${communitySelected["NAME"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${communitySelected["ADDRESS"]}">
                    </div>
                  </div>
     <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${communitySelected["LNG"]}"  disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${communitySelected["LAT"]}"  disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" disabled="disabled">${communitySelected["BOUNDS"]}</textarea>
    </div>
  </div>





 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        //form.on('switch(switch1)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.show();
        //            }
        //        });
        //        document.getElementById('s2').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.hide();
        //            }
        //        });
        //    }
        //});
        //form.on('switch(switch2)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        polygonSelected.getExtData()["editor"].open();
        //        document.getElementById('s1').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        polygonSelected.getExtData()["editor"].close();
        //    }
        //});

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

function editCommunityPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var community_name = inputs[0].value;
    var community_address = inputs[1].value;
    var community_lng = document.getElementById('inputLng').value;
    var community_lat = document.getElementById('inputLat').value;
    var community_bounds = document.getElementById('textareaBounds').value;
    if (community_bounds === "null") {
        community_bounds = "";
    }
    var COMMUNITYID = communitySelected["COMMUNITY_ID_CONV"];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=EditCommunity&COMMUNITYID=${COMMUNITYID}`,
        data: {
            "community_name": community_name, "community_address": community_address, "community_lng": community_lng, community_lat: community_lat, "community_bounds": community_bounds
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
                //editmode = 2;
                var COMMUNITY_ID_CONV = communitySelected["COMMUNITY_ID_CONV"];
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (polygon) {
                    if (polygon.getExtData()["ID"] === COMMUNITY_ID_CONV) {
                        map.remove(polygon);
                    }
                });
                layer.closeAll();

                layer.msg("社区已编辑");
                //setTimeout(function () {
                //    editmode = 1;
                //}, 8000);
                if (community_bounds !== "") {
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(community_bounds),
                        map: map,
                        strokeColor: "#FF9E00",
                        fillColor: "#FF9E00",
                        extData: {
                            "ID": communitySelected["COMMUNITY_ID_CONV"],
                            "DATATYPE": "COMMUNITY"
                        }
                    });
                } else {
                    var lng = Number(community_lng);
                    var lat = Number(community_lat);
                    var path = [];
                    var distance = 300;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#FF9E00",
                        fillColor: "#FF9E00",
                        extData: {
                            "ID": communitySelected["COMMUNITY_ID_CONV"],
                            "DATATYPE": "COMMUNITY"
                        }
                    });
                }
                $('#tableCommunity').datagrid('reload');
                clearVB();
                clearTables34();
         

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });

}


function editVillage() {
    setTimeout(function () {
        var polygon, marker;
        if (villageSelected["BOUNDS"] !== null) {
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: JSON.parse(villageSelected["BOUNDS"]),
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polyEditor.open();
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });

            //polygonSelected.setExtData({ "editor": polyEditor });
        } else {
            var lng = villageSelected["LNG"];
            var lat = villageSelected["LAT"]
            var path = [];
            var distance = 300;
            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: path,
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.open();
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });
        }
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png',  // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        marker = new AMap.Marker({
            icon: icon,
            position: [villageSelected["LNG"], villageSelected["LAT"]],
            draggable: true
        });
        marker.on('dragging', function (e) {
            var target = e.target;
            var lng = target.getPosition()["lng"];
            var lat = target.getPosition()["lat"];
            console.log(lng);
            var inputLng = document.getElementById('inputLng');
            var inputLat = document.getElementById('inputLat');
            //inputLng.disabled = false;
            inputLng.value = lng;
            //inputLng.disabled = true;
            //inputLat.disabled = false;
            inputLat.value = lat;
            //inputLat.disabled = true;
            //document.getElementById('inputLng').innerText = lng;
            //document.getElementById('inputLat').innerText = lat;
        });
        marker.setMap(map);

        //var icon = new AMap.Icon({
        //    size: new AMap.Size(25, 25),
        //    image: './icons/poi-marker-default.png',  // Icon的图像
        //    imageSize: new AMap.Size(25, 25)
        //});
        //    marker = new AMap.Marker({
        //        icon: icon,
        //        position: [streetSelected["LNG"], streetSelected["LAT"]],
        //        draggable: true,
        //        visible: false,
        //        extData: {
        //            "DATATYPE": "DRAGGABLE"
        //        }
        //    });
        //marker.on('dragging', function (e) {
        //    var target = e.target;
        //    var lng = target.getPosition()["lng"];
        //    var lat = target.getPosition()["lat"];
        //    document.getElementById('fieldHidden').innerText = lng;
        //    document.getElementById('fieldHidden2').innerText = lat;
        //});
        //marker.setMap(map);
        //var polygonSelected = "";
        //var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });

        //var polygonSelected = "";
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getOptions().strokeColor === "#FF0000") {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑小区",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //map.setDefaultCursor("pointer");
                //var markers = map.getAllOverlays('marker');
                //markers.forEach(function (marker) {
                //    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
                //        map.remove(marker);
                //    }
                //});
                //polygonSelected.getExtData()["editor"].close();
                //map.remove(polygonSelected);
                //if (editmode === 1) {
                //    console.log('w');
                //    if (streetSelected["BOUNDS"] !== null) {
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: JSON.parse(streetSelected["BOUNDS"]),
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }
                //        });
                //    } else {
                //        var lng = streetSelected["LNG"];
                //        var lat = streetSelected["LAT"]
                //        var path = [];
                //        var distance = 300;
                //        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                //        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                //        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                //        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                //        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                //        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: path,
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }

                //        });
                //    }

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
                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑经纬度</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
                //                </div>
                //              </div>

                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑边界</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
                //                </div>
                //              </div>
                //<div class="layui-form-item">
                //    <label class="layui-form-label">边界</label>
                //    <div class="layui-input-inline">
                //      <input type="text" name="bounds" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["BOUNDS"]}"  disabled="disabled">
                //    </div>
                //  </div>
                //<div id="fieldHidden" class="layui-form-item hidden">` + streetSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + streetSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + streetSelected["BOUNDS"] + `</div>
            }
            ,
            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillagePost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${villageSelected["NAME"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${villageSelected["ADDRESS"]}">
                    </div>
                  </div>
     <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${villageSelected["LNG"]}"  disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${villageSelected["LAT"]}"  disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" >${villageSelected["BOUNDS"]}</textarea>
    </div>
  </div>





 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        //form.on('switch(switch1)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.show();
        //            }
        //        });
        //        document.getElementById('s2').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.hide();
        //            }
        //        });
        //    }
        //});
        //form.on('switch(switch2)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        polygonSelected.getExtData()["editor"].open();
        //        document.getElementById('s1').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        polygonSelected.getExtData()["editor"].close();
        //    }
        //});

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

function editVillagePost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var village_name = inputs[0].value;
    var village_address = inputs[1].value;
    var village_lng = document.getElementById('inputLng').value;
    var village_lat = document.getElementById('inputLat').value;
    var village_bounds = document.getElementById('textareaBounds').value;
    if (village_bounds === "null") {
        village_bounds = "";
    }
    var VILLAGEID = villageSelected["VILLAGE_ID_CONV"];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=EditVillage&VILLAGEID=${VILLAGEID}`,
        data: {
            "village_name": village_name, "village_address": village_address, village_lng: village_lng, village_lat: village_lat, "village_bounds": village_bounds
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
                //editmode = 2;
                var VILLAGE_ID_CONV = villageSelected["VILLAGE_ID_CONV"];
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (polygon) {
                    if (polygon.getExtData()["ID"] === VILLAGE_ID_CONV) {
                        map.remove(polygon);
                    }
                });
                layer.closeAll();

                layer.msg("小区已编辑");
                //setTimeout(function () {
                //    editmode = 1;
                //}, 8000);
                if (village_bounds !== "") {
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(village_bounds),
                        map: map,
                        strokeColor: "#7BC4C4",
                        fillColor: "#7BC4C4",
                        extData: {
                            "ID": villageSelected["VILLAGE_ID_CONV"],
                            "DATATYPE": "VILLAGE"
                        }
                    });
                } else {
                    var lng = Number(village_lng);
                    var lat = Number(village_lat);
                    var path = [];
                    var distance = 300;
                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: path,
                        map: map,
                        strokeColor: "#7BC4C4",
                        fillColor: "#7BC4C4",
                        extData: {
                            "ID": villageSelected["VILLAGE_ID_CONV"],
                            "DATATYPE": "VILLAGE"
                        }
                    });
                }
                $('#tableVillage').datagrid('reload');
                clearB();
                clearTables4();


            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });

}


function editBuilding() {
    setTimeout(function () {
        var polygon, marker;
        if (buildingSelected["BOUNDS"] !== null) {
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: JSON.parse(buildingSelected["BOUNDS"]),
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polyEditor.open();
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });

            //polygonSelected.setExtData({ "editor": polyEditor });
        } else {
            var lng = buildingSelected["LNG"];
            var lat = buildingSelected["LAT"]
            var path = [];
            var distance = 300;
            var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
            var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
            path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
            path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
            path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
            path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
            polygon = new AMap.Polygon({
                bubble: true,
                fillOpacity: 0.4,
                strokeWeight: 1,
                path: path,
                map: map,
                strokeColor: "#0000ff",
                fillColor: "#0000ff"
            });
            var polyEditor = new AMap.PolyEditor(map, polygon);
            polygon.setExtData({ "editor": polyEditor });
            polyEditor.open();
            polyEditor.on('adjust', function (event) {
                var bounds = [];
                event.target.getPath().forEach(function (coord) {
                    var lng = coord["lng"];
                    var lat = coord["lat"];
                    bounds.push([lng, lat]);
                });
                document.getElementById('textareaBounds').value = JSON.stringify(bounds);
            });
        }
        var icon = new AMap.Icon({
            size: new AMap.Size(25, 25),
            image: './icons/poi-marker-default.png',  // Icon的图像
            imageSize: new AMap.Size(25, 25)
        });
        marker = new AMap.Marker({
            icon: icon,
            position: [buildingSelected["LNG"], buildingSelected["LAT"]],
            draggable: true
        });
        marker.on('dragging', function (e) {
            var target = e.target;
            var lng = target.getPosition()["lng"];
            var lat = target.getPosition()["lat"];
            console.log(lng);
            var inputLng = document.getElementById('inputLng');
            var inputLat = document.getElementById('inputLat');
            //inputLng.disabled = false;
            inputLng.value = lng;
            //inputLng.disabled = true;
            //inputLat.disabled = false;
            inputLat.value = lat;
            //inputLat.disabled = true;
            //document.getElementById('inputLng').innerText = lng;
            //document.getElementById('inputLat').innerText = lat;
        });
        marker.setMap(map);

        //var icon = new AMap.Icon({
        //    size: new AMap.Size(25, 25),
        //    image: './icons/poi-marker-default.png',  // Icon的图像
        //    imageSize: new AMap.Size(25, 25)
        //});
        //    marker = new AMap.Marker({
        //        icon: icon,
        //        position: [streetSelected["LNG"], streetSelected["LAT"]],
        //        draggable: true,
        //        visible: false,
        //        extData: {
        //            "DATATYPE": "DRAGGABLE"
        //        }
        //    });
        //marker.on('dragging', function (e) {
        //    var target = e.target;
        //    var lng = target.getPosition()["lng"];
        //    var lat = target.getPosition()["lat"];
        //    document.getElementById('fieldHidden').innerText = lng;
        //    document.getElementById('fieldHidden2').innerText = lat;
        //});
        //marker.setMap(map);
        //var polygonSelected = "";
        //var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });

        //var polygonSelected = "";
        //var polygons = map.getAllOverlays("polygon");
        //polygons.forEach(function (polygon) {
        //    if (polygon.getOptions().strokeColor === "#FF0000") {
        //        polygonSelected = polygon;
        //    }
        //});
        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
        //polyEditor.on('adjust', function (event) {
        //    var bounds = [];
        //    event.target.getPath().forEach(function (coord) {
        //        var lng = coord["lng"];
        //        var lat = coord["lat"];
        //        bounds.push([lng, lat]);
        //    });
        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
        //});
        //polygonSelected.setExtData({ "editor": polyEditor });
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑楼栋",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //map.setDefaultCursor("pointer");
                //var markers = map.getAllOverlays('marker');
                //markers.forEach(function (marker) {
                //    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
                //        map.remove(marker);
                //    }
                //});
                //polygonSelected.getExtData()["editor"].close();
                //map.remove(polygonSelected);
                //if (editmode === 1) {
                //    console.log('w');
                //    if (streetSelected["BOUNDS"] !== null) {
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: JSON.parse(streetSelected["BOUNDS"]),
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }
                //        });
                //    } else {
                //        var lng = streetSelected["LNG"];
                //        var lat = streetSelected["LAT"]
                //        var path = [];
                //        var distance = 300;
                //        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                //        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                //        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                //        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                //        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                //        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                //        var polygon = new AMap.Polygon({
                //            bubble: true,
                //            fillOpacity: 0.4,
                //            strokeWeight: 1,
                //            path: path,
                //            map: map,
                //            strokeColor: "#FF0000",
                //            fillColor: "#FF0000",
                //            extData: {
                //                "ID": streetSelected["STREET_ID_CONV"],
                //                "DATATYPE": "STREET"
                //            }

                //        });
                //    }

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
                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑经纬度</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
                //                </div>
                //              </div>

                //<div class="layui-form-item">
                //                <label class="layui-form-label">编辑边界</label>
                //                <div class="layui-input-block">
                //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
                //                </div>
                //              </div>
                //<div class="layui-form-item">
                //    <label class="layui-form-label">边界</label>
                //    <div class="layui-input-inline">
                //      <input type="text" name="bounds" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${streetSelected["BOUNDS"]}"  disabled="disabled">
                //    </div>
                //  </div>
                //<div id="fieldHidden" class="layui-form-item hidden">` + streetSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + streetSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + streetSelected["BOUNDS"] + `</div>
            }
            ,
            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editBuildingPost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${buildingSelected["NAME"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${buildingSelected["ADDRESS"]}">
                    </div>
                  </div>
     <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${buildingSelected["LNG"]}"  disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${buildingSelected["LAT"]}"  disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" disabled="disabled">${buildingSelected["BOUNDS"]}</textarea>
    </div>
  </div>





 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        form.render();
        //form.on('switch(switch1)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.show();
        //            }
        //        });
        //        document.getElementById('s2').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        var markers = map.getAllOverlays('marker');
        //        markers.forEach(function (marker) {
        //            if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
        //                marker.hide();
        //            }
        //        });
        //    }
        //});
        //form.on('switch(switch2)', function (data) {
        //    if (data.elem.checked) {
        //        map.setDefaultCursor("default");
        //        polygonSelected.getExtData()["editor"].open();
        //        document.getElementById('s1').checked = false;
        //        form.render('checkbox');
        //    } else {
        //        polygonSelected.getExtData()["editor"].close();
        //    }
        //});

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

function editBuildingPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var building_name = inputs[0].value;
    var building_address = inputs[1].value;
    var building_lng = document.getElementById('inputLng').value;
    var building_lat = document.getElementById('inputLat').value;
    var building_bounds = document.getElementById('textareaBounds').value;
    if (building_bounds === "null") {
        building_bounds = "";
    }
    var BUILDINGID = buildingSelected["BUILDING_ID_CONV"];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=EditBuilding&BUILDINGID=${BUILDINGID}`,
        data: {
            building_name: building_name, "building_address": building_address, "building_lng": building_lng, building_lat: building_lat, "building_bounds": building_bounds
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
                //editmode = 2;
                var BUILDING_ID_CONV = buildingSelected["BUILDING_ID_CONV"];
                var markers = map.getAllOverlays("marker");
                markers.forEach(function (marker) {
                    if (marker.getExtData()["ID"] === BUILDING_ID_CONV) {
                        map.remove(marker);
                    }
                });
                layer.closeAll();

                layer.msg("楼栋已编辑");
                //setTimeout(function () {
                //    editmode = 1;
                //}, 8000);
                var icon = new AMap.Icon({
                    size: new AMap.Size(25, 25),
                    image: './icons/poi-marker-default.png',  // Icon的图像
                    imageSize: new AMap.Size(25, 25)
                });
                marker = new AMap.Marker({
                    icon: icon,
                    position: [building_lng, building_lat],
                    extData: {
                        "ID": buildingSelected["BUILDING_ID_CONV"],
                        "DATATYPE": "BUILDING"
                    }
                });
                marker.setMap(map);
                //if (building_bounds !== "") {
                //    var polygon = new AMap.Polygon({
                //        bubble: true,
                //        fillOpacity: 0.4,
                //        strokeWeight: 1,
                //        path: JSON.parse(building_bounds),
                //        map: map,
                //        strokeColor: "#FF9E00",
                //        fillColor: "#FF9E00",
                //        extData: {
                //            "ID": communitySelected["COMMUNITY_ID_CONV"],
                //            "DATATYPE": "COMMUNITY"
                //        }
                //    });
                //} else {
                //    var lng = Number(community_lng);
                //    var lat = Number(community_lat);
                //    var path = [];
                //    var distance = 300;
                //    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
                //    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
                //    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
                //    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
                //    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
                //    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
                //    var polygon = new AMap.Polygon({
                //        bubble: true,
                //        fillOpacity: 0.4,
                //        strokeWeight: 1,
                //        path: path,
                //        map: map,
                //        strokeColor: "#FF9E00",
                //        fillColor: "#FF9E00",
                //        extData: {
                //            "ID": communitySelected["COMMUNITY_ID_CONV"],
                //            "DATATYPE": "COMMUNITY"
                //        }
                //    });
                //}
                $('#tableBuilding').datagrid('reload');

         

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });

}



//function editCommunity() {
//    setTimeout(function () {
//        var icon = new AMap.Icon({
//            size: new AMap.Size(25, 25),
//            image: './icons/poi-marker-default.png',  // Icon的图像
//            imageSize: new AMap.Size(25, 25)
//        });
//        marker = new AMap.Marker({
//            icon: icon,
//            position: [communitySelected["LNG"], communitySelected["LAT"]],
//            draggable: true,
//            visible: false,
//            extData: {
//                "DATATYPE": "DRAGGABLE"
//            }
//        });
//        marker.on('dragging', function (e) {
//            var target = e.target;
//            var lng = target.getPosition()["lng"];
//            var lat = target.getPosition()["lat"];
//            document.getElementById('fieldHidden').innerText = lng;
//            document.getElementById('fieldHidden2').innerText = lat;
//        });
//        marker.setMap(map);
//        var polygonSelected = "";
//        var COMMUNITY_ID_CONV = communitySelected["COMMUNITY_ID_CONV"];
//        var polygons = map.getAllOverlays("polygon");
//        polygons.forEach(function (polygon) {
//            if (polygon.getExtData()["ID"] === COMMUNITY_ID_CONV) {
//                polygonSelected = polygon;
//            }
//        });
//        var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        polyEditor.on('adjust', function (event) {
//            var bounds = [];
//            event.target.getPath().forEach(function (coord) {
//                var lng = coord["lng"];
//                var lat = coord["lat"];
//                bounds.push([lng, lat]);
//            });
//            document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        });
//        polygonSelected.setExtData({ "editor": polyEditor });

//        //var polygonSelected = "";
//        //var polygons = map.getAllOverlays("polygon");
//        //polygons.forEach(function (polygon) {
//        //    if (polygon.getOptions().strokeColor === "#FF0000") {
//        //        polygonSelected = polygon;
//        //    }
//        //});
//        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //polyEditor.on('adjust', function (event) {
//        //    var bounds = [];
//        //    event.target.getPath().forEach(function (coord) {
//        //        var lng = coord["lng"];
//        //        var lat = coord["lat"];
//        //        bounds.push([lng, lat]);
//        //    });
//        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        //});
//        //polygonSelected.setExtData({ "editor": polyEditor });
//        layer.open({
//            btn: [],
//            shade: 0,
//            title: "编辑社区",
//            end: function () {
//                map.setDefaultCursor("pointer");
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        map.remove(marker);
//                    }
//                });
//                polygonSelected.getExtData()["editor"].close();
//                map.remove(polygonSelected);
//                if (editmode === 1) {
//                    console.log('w');
//                    if (communitySelected["BOUNDS"] !== null) {
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: JSON.parse(communitySelected["BOUNDS"]),
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": communitySelected["COMMUNITY_ID_CONV"],
//                                "DATATYPE": "COMMUNITY"
//                            }
//                        });
//                    } else {
//                        var lng = communitySelected["LNG"];
//                        var lat = communitySelected["LAT"]
//                        var path = [];
//                        var distance = 300;
//                        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
//                        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
//                        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
//                        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
//                        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
//                        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: path,
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": communitySelected["COMMUNITY_ID_CONV"],
//                                "DATATYPE": "COMMUNITY"
//                            }

//                        });
//                    }

//                    //polygon.on('click', function (event) {
//                    //    map.setZoom(17);
//                    //    map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//                    //    var info = [];
//                    //    info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//                    //    infoWindow = new AMap.InfoWindow({
//                    //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                    //    });
//                    //    infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//                    //});
//                    //      <div class="layui-form-item">
//                    //          <label class="layui-form-label">区域</label>
//                    //          <div class="layui-input-block">
//                    //              <select name="region" required>
//                    //                  <option value="` + row[" VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//                    //    </option></select>
//                    //      </div>
//                    //</div >
//                }
//            },
//            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editCommunityPost(this);">
//                   <div class="layui-form-item">
//                    <label class="layui-form-label">名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${communitySelected["NAME"]}">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${communitySelected["ADDRESS"]}">
//                    </div>
//                  </div>
          
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑经纬度</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>
       
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>

//<div id="fieldHidden" class="layui-form-item hidden">` + communitySelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + communitySelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + communitySelected["BOUNDS"] + `</div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//        });
//        form.render();
//        form.on('switch(switch1)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        marker.show();
//                    }
//                });
//                document.getElementById('s2').checked = false;
//                form.render('checkbox');
//            } else {
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        marker.hide();
//                    }
//                });
//            }
//        });
//        form.on('switch(switch2)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                polygonSelected.getExtData()["editor"].open();
//                document.getElementById('s1').checked = false;
//                form.render('checkbox');
//            } else {
//                polygonSelected.getExtData()["editor"].close();
//            }
//        });

//        //        // 有边界
//        //        if (row["VILLAGE_BOUNDS"] !== null) {
//        //            var polygonSelected = "";
//        //            var polygons = map.getAllOverlays("polygon");
//        //            polygons.forEach(function (polygon) {
//        //                if (polygon.getOptions().strokeColor === "purple") {
//        //                    polygonSelected = polygon;
//        //                }
//        //            });
//        //            var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //            polyEditor.on('adjust', function (event) {
//        //                var bounds = event.target.getPath();
//        //                var list = [];
//        //                bounds.forEach(function (coord) {
//        //                    var lng = coord["lng"];
//        //                    var lat = coord["lat"];
//        //                    list.push([lng, lat]);
//        //                });
//        //                document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//        //            });
//        //            polygonSelected.setExtData({ "editor": polyEditor });
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                    map.remove(polygonSelected);
//        //                    if (editmode === 1) {
//        //                        var polygon = new AMap.Polygon({
//        //                            strokeWeight: 2,
//        //                            strokeOpacity: 1,
//        //                            strokeColor: "purple",
//        //                            strokeStyle: "solid",
//        //                            fillColor: "purple",
//        //                            fillOpacity: 0.2,
//        //                            bubble: true,
//        //                            path: JSON.parse(row["VILLAGE_BOUNDS"]),
//        //                            map: map
//        //                        });
//        //                        polygon.on('click', function (event) {
//        //                            map.setZoom(17);
//        //                            map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//        //                            var info = [];
//        //                            info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//        //                            infoWindow = new AMap.InfoWindow({
//        //                                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//        //                            });
//        //                            infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//        //                        });
//        //                    }
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillage2(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //              <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    polygonSelected.getExtData()["editor"].open();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//        //        // 无边界
//        //        else {
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editVillage1(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //                <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawPolygon();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//    }, 2000);
//}

//function editCommunityPost(e) {
//    var errors = document.getElementsByClassName("clRedError");
//    for (var i = 0; i < errors.length; i++) {
//        errors[i].remove();
//    }
//    var inputs = e.getElementsByTagName('input');
//    var community_name = inputs[0].value;
//    var community_address = inputs[1].value;
//    var community_lng = document.getElementById('fieldHidden').innerText;
//    var community_lat = document.getElementById('fieldHidden2').innerText;
//    var community_bounds = document.getElementById('fieldHidden3').innerText;
//    if (community_bounds === "null") {
//        community_bounds = "";
//    }
//    var COMMUNITYID = communitySelected["COMMUNITY_ID_CONV"];
//    $.ajax({
//        type: "post",
//        url: `./Level5Address.ashx?m=EditCommunity&COMMUNITYID=${COMMUNITYID}`,
//        data: {
//            "community_name": community_name, "community_address": community_address, "community_lng": community_lng, "community_lat": community_lat, "community_bounds": community_bounds
//        },
//        dataType: "json",
//        success: function (data) {
//            if (data.length !== 0) {
//                var div = document.createElement('div');
//                div.classList.add("clRedError");
//                data.forEach(function (error) {
//                    div.innerHTML += `<p class="mb-5">${error}</p>`;
//                })
//                e.appendChild(div);
//            } else {
//                editmode = 2;
//                layer.closeAll();
//                layer.msg("社区已编辑");
//                setTimeout(function () {
//                    editmode = 1;
//                }, 8000);
//                if (community_bounds !== "") {
//                    var polygon = new AMap.Polygon({
//                        bubble: true,
//                        fillOpacity: 0.4,
//                        strokeWeight: 1,
//                        path: JSON.parse(community_bounds),
//                        map: map,
//                        strokeColor: "#FF9E00",
//                        fillColor: "#FF9E00",
//                        extData: {
//                            "ID": communitySelected["COMMUNITY_ID_CONV"],
//                            "DATATYPE": "COMMUNITY"
//                        }
//                    });
//                } else {
//                    var lng = Number(community_lng);
//                    var lat = Number(community_lat);
//                    var path = [];
//                    var distance = 300;
//                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
//                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
//                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
//                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
//                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
//                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
//                    var polygon = new AMap.Polygon({
//                        bubble: true,
//                        fillOpacity: 0.4,
//                        strokeWeight: 1,
//                        path: path,
//                        map: map,
//                        strokeColor: "#FF9E00",
//                        fillColor: "#FF9E00",
//                        extData: {
//                            "ID": communitySelected["COMMUNITY_ID_CONV"],
//                            "DATATYPE": "COMMUNITY"
//                        }
//                    });
//                }
//                $('#tableCommunity').datagrid('reload');
//                clearVB();
//                clearTables34();

//            }
//        },
//        error: function (item, err) {
//            console.log(err);
//        }
//    });

//}

//function editVillage() {
//    setTimeout(function () {
//        var icon = new AMap.Icon({
//            size: new AMap.Size(25, 25),
//            image: './icons/poi-marker-default.png',  // Icon的图像
//            imageSize: new AMap.Size(25, 25)
//        });
//        marker = new AMap.Marker({
//            icon: icon,
//            position: [villageSelected["LNG"], villageSelected["LAT"]],
//            draggable: true,
//            visible: false,
//            extData: {
//                "DATATYPE": "DRAGGABLE"
//            }
//        });
//        marker.on('dragging', function (e) {
//            var target = e.target;
//            var lng = target.getPosition()["lng"];
//            var lat = target.getPosition()["lat"];
//            document.getElementById('fieldHidden').innerText = lng;
//            document.getElementById('fieldHidden2').innerText = lat;
//        });
//        marker.setMap(map);
//        var polygonSelected = "";
//        var VILLAGE_ID_CONV = villageSelected["VILLAGE_ID_CONV"];
//        var polygons = map.getAllOverlays("polygon");
//        polygons.forEach(function (polygon) {
//            if (polygon.getExtData()["ID"] === VILLAGE_ID_CONV) {
//                polygonSelected = polygon;
//            }
//        });
//        var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        polyEditor.on('adjust', function (event) {
//            var bounds = [];
//            event.target.getPath().forEach(function (coord) {
//                var lng = coord["lng"];
//                var lat = coord["lat"];
//                bounds.push([lng, lat]);
//            });
//            document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        });
//        polygonSelected.setExtData({ "editor": polyEditor });

//        //var polygonSelected = "";
//        //var polygons = map.getAllOverlays("polygon");
//        //polygons.forEach(function (polygon) {
//        //    if (polygon.getOptions().strokeColor === "#FF0000") {
//        //        polygonSelected = polygon;
//        //    }
//        //});
//        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //polyEditor.on('adjust', function (event) {
//        //    var bounds = [];
//        //    event.target.getPath().forEach(function (coord) {
//        //        var lng = coord["lng"];
//        //        var lat = coord["lat"];
//        //        bounds.push([lng, lat]);
//        //    });
//        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        //});
//        //polygonSelected.setExtData({ "editor": polyEditor });
//        layer.open({
//            btn: [],
//            shade: 0,
//            title: "编辑小区",
//            end: function () {
//                map.setDefaultCursor("pointer");
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        map.remove(marker);
//                    }
//                });
//                polygonSelected.getExtData()["editor"].close();
//                map.remove(polygonSelected);
//                if (editmode === 1) {
//                    console.log('w');
//                    if (villageSelected["BOUNDS"] !== null) {
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: JSON.parse(villageSelected["BOUNDS"]),
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": villageSelected["VILLAGE_ID_CONV"],
//                                "DATATYPE": "VILLAGE"
//                            }
//                        });
//                    } else {
//                        var lng = villageSelected["LNG"];
//                        var lat = villageSelected["LAT"]
//                        var path = [];
//                        var distance = 300;
//                        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
//                        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
//                        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
//                        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
//                        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
//                        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: path,
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": villageSelected["VILLAGE_ID_CONV"],
//                                "DATATYPE": "VILLAGE"
//                            }

//                        });
//                    }

//                    //polygon.on('click', function (event) {
//                    //    map.setZoom(17);
//                    //    map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//                    //    var info = [];
//                    //    info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//                    //    infoWindow = new AMap.InfoWindow({
//                    //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                    //    });
//                    //    infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//                    //});
//                    //      <div class="layui-form-item">
//                    //          <label class="layui-form-label">区域</label>
//                    //          <div class="layui-input-block">
//                    //              <select name="region" required>
//                    //                  <option value="` + row[" VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//                    //    </option></select>
//                    //      </div>
//                    //</div >
//                }
//            },
//            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillagePost(this);">
//                   <div class="layui-form-item">
//                    <label class="layui-form-label">名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${villageSelected["NAME"]}">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${villageSelected["ADDRESS"]}">
//                    </div>
//                  </div>
          
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑经纬度</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>
       
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>

//<div id="fieldHidden" class="layui-form-item hidden">` + villageSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + villageSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + villageSelected["BOUNDS"] + `</div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//        });
//        form.render();
//        form.on('switch(switch1)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        marker.show();
//                    }
//                });
//                document.getElementById('s2').checked = false;
//                form.render('checkbox');
//            } else {
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        marker.hide();
//                    }
//                });
//            }
//        });
//        form.on('switch(switch2)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                polygonSelected.getExtData()["editor"].open();
//                document.getElementById('s1').checked = false;
//                form.render('checkbox');
//            } else {
//                polygonSelected.getExtData()["editor"].close();
//            }
//        });

//        //        // 有边界
//        //        if (row["VILLAGE_BOUNDS"] !== null) {
//        //            var polygonSelected = "";
//        //            var polygons = map.getAllOverlays("polygon");
//        //            polygons.forEach(function (polygon) {
//        //                if (polygon.getOptions().strokeColor === "purple") {
//        //                    polygonSelected = polygon;
//        //                }
//        //            });
//        //            var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //            polyEditor.on('adjust', function (event) {
//        //                var bounds = event.target.getPath();
//        //                var list = [];
//        //                bounds.forEach(function (coord) {
//        //                    var lng = coord["lng"];
//        //                    var lat = coord["lat"];
//        //                    list.push([lng, lat]);
//        //                });
//        //                document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//        //            });
//        //            polygonSelected.setExtData({ "editor": polyEditor });
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                    map.remove(polygonSelected);
//        //                    if (editmode === 1) {
//        //                        var polygon = new AMap.Polygon({
//        //                            strokeWeight: 2,
//        //                            strokeOpacity: 1,
//        //                            strokeColor: "purple",
//        //                            strokeStyle: "solid",
//        //                            fillColor: "purple",
//        //                            fillOpacity: 0.2,
//        //                            bubble: true,
//        //                            path: JSON.parse(row["VILLAGE_BOUNDS"]),
//        //                            map: map
//        //                        });
//        //                        polygon.on('click', function (event) {
//        //                            map.setZoom(17);
//        //                            map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//        //                            var info = [];
//        //                            info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//        //                            infoWindow = new AMap.InfoWindow({
//        //                                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//        //                            });
//        //                            infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//        //                        });
//        //                    }
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillage2(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //              <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    polygonSelected.getExtData()["editor"].open();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//        //        // 无边界
//        //        else {
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editVillage1(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //                <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawPolygon();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//    }, 2000);
//}

//function editVillagePost(e) {
//    var errors = document.getElementsByClassName("clRedError");
//    for (var i = 0; i < errors.length; i++) {
//        errors[i].remove();
//    }
//    var inputs = e.getElementsByTagName('input');
//    var village_name = inputs[0].value;
//    var village_address = inputs[1].value;
//    var village_lng = document.getElementById('fieldHidden').innerText;
//    var village_lat = document.getElementById('fieldHidden2').innerText;
//    var village_bounds = document.getElementById('fieldHidden3').innerText;
//    if (village_bounds === "null") {
//        village_bounds = "";
//    }
//    var VILLAGEID = villageSelected["VILLAGE_ID_CONV"];
//    $.ajax({
//        type: "post",
//        url: `./Level5Address.ashx?m=EditVillage&VILLAGEID=${VILLAGEID}`,
//        data: {
//            "village_name": village_name, "village_address": village_address, "village_lng": village_lng, "village_lat": village_lat, "village_bounds": village_bounds
//        },
//        dataType: "json",
//        success: function (data) {
//            if (data.length !== 0) {
//                var div = document.createElement('div');
//                div.classList.add("clRedError");
//                data.forEach(function (error) {
//                    div.innerHTML += `<p class="mb-5">${error}</p>`;
//                })
//                e.appendChild(div);
//            } else {
//                editmode = 2;
//                layer.closeAll();
//                layer.msg("小区已编辑");
//                setTimeout(function () {
//                    editmode = 1;
//                }, 8000);
//                if (village_bounds !== "") {
//                    var polygon = new AMap.Polygon({
//                        bubble: true,
//                        fillOpacity: 0.4,
//                        strokeWeight: 1,
//                        path: JSON.parse(village_bounds),
//                        map: map,
//                        strokeColor: "#7BC4C4",
//                        fillColor: "#7BC4C4",
//                        extData: {
//                            "ID": villageSelected["VILLAGE_ID_CONV"],
//                            "DATATYPE": "VILLAGE"
//                        }
//                    });
//                } else {
//                    var lng = Number(village_lng);
//                    var lat = Number(village_lat);
//                    var path = [];
//                    var distance = 300;
//                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
//                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
//                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
//                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
//                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
//                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
//                    var polygon = new AMap.Polygon({
//                        bubble: true,
//                        fillOpacity: 0.4,
//                        strokeWeight: 1,
//                        path: path,
//                        map: map,
//                        strokeColor: "#7BC4C4",
//                        fillColor: "#7BC4C4",
//                        extData: {
//                            "ID": villageSelected["VILLAGE_ID_CONV"],
//                            "DATATYPE": "VILLAGE"
//                        }
//                    });
//                }
//                $('#tableVillage').datagrid('reload');
//                clearB();
//                clearTables4();

//            }
//        },
//        error: function (item, err) {
//            console.log(err);
//        }
//    });

//}


//function editBuilding() {
//    setTimeout(function () {
//        var markerSelected = "";
//        var BUILDING_ID_CONV = buildingSelected["BUILDING_ID_CONV"];
//        var markers = map.getAllOverlays("marker");
//        markers.forEach(function (marker) {
//            if (marker.getExtData()["ID"] === BUILDING_ID_CONV) {
//                markerSelected = marker;
//            }
//        });
//        markerSelected.on('dragging', function (e) {
//            var target = e.target;
//            var lng = target.getPosition()["lng"];
//            var lat = target.getPosition()["lat"];
//            document.getElementById('fieldHidden').innerText = lng;
//            document.getElementById('fieldHidden2').innerText = lat;
//        });

//        var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        polyEditor.on('adjust', function (event) {
//            var bounds = [];
//            event.target.getPath().forEach(function (coord) {
//                var lng = coord["lng"];
//                var lat = coord["lat"];
//                bounds.push([lng, lat]);
//            });
//            document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        });
//        polygonSelected.setExtData({ "editor": polyEditor });

//        //var polygonSelected = "";
//        //var polygons = map.getAllOverlays("polygon");
//        //polygons.forEach(function (polygon) {
//        //    if (polygon.getOptions().strokeColor === "#FF0000") {
//        //        polygonSelected = polygon;
//        //    }
//        //});
//        //var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //polyEditor.on('adjust', function (event) {
//        //    var bounds = [];
//        //    event.target.getPath().forEach(function (coord) {
//        //        var lng = coord["lng"];
//        //        var lat = coord["lat"];
//        //        bounds.push([lng, lat]);
//        //    });
//        //    document.getElementById('fieldHidden3').innerText = JSON.stringify(bounds);
//        //});
//        //polygonSelected.setExtData({ "editor": polyEditor });
//        layer.open({
//            btn: [],
//            shade: 0,
//            title: "编辑楼栋",
//            end: function () {
//                map.setDefaultCursor("pointer");
//                var markers = map.getAllOverlays('marker');
//                markers.forEach(function (marker) {
//                    if (marker.getExtData()["DATATYPE"] === "DRAGGABLE") {
//                        map.remove(marker);
//                    }
//                });
//                polygonSelected.getExtData()["editor"].close();
//                map.remove(polygonSelected);
//                if (editmode === 1) {
//                    console.log('w');
//                    if (villageSelected["BOUNDS"] !== null) {
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: JSON.parse(villageSelected["BOUNDS"]),
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": villageSelected["VILLAGE_ID_CONV"],
//                                "DATATYPE": "VILLAGE"
//                            }
//                        });
//                    } else {
//                        var lng = villageSelected["LNG"];
//                        var lat = villageSelected["LAT"]
//                        var path = [];
//                        var distance = 300;
//                        var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
//                        var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
//                        path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
//                        path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
//                        path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
//                        path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
//                        var polygon = new AMap.Polygon({
//                            bubble: true,
//                            fillOpacity: 0.4,
//                            strokeWeight: 1,
//                            path: path,
//                            map: map,
//                            strokeColor: "#FF0000",
//                            fillColor: "#FF0000",
//                            extData: {
//                                "ID": villageSelected["VILLAGE_ID_CONV"],
//                                "DATATYPE": "VILLAGE"
//                            }

//                        });
//                    }

//                    //polygon.on('click', function (event) {
//                    //    map.setZoom(17);
//                    //    map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//                    //    var info = [];
//                    //    info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//                    //    info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//                    //    infoWindow = new AMap.InfoWindow({
//                    //        content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//                    //    });
//                    //    infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//                    //});
//                    //      <div class="layui-form-item">
//                    //          <label class="layui-form-label">区域</label>
//                    //          <div class="layui-input-block">
//                    //              <select name="region" required>
//                    //                  <option value="` + row[" VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//                    //    </option></select>
//                    //      </div>
//                    //</div >
//                }
//            },
//            content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editBuildingPost(this);">
//                   <div class="layui-form-item">
//                    <label class="layui-form-label">名称</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${buildingSelected["NAME"]}">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">地址</label>
//                    <div class="layui-input-inline">
//                      <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${buildingSelected["ADDRESS"]}">
//                    </div>
//                  </div>
          
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑经纬度</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//                </div>
//              </div>
       
//<div class="layui-form-item">
//                <label class="layui-form-label">编辑边界</label>
//                <div class="layui-input-block">
//                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//                </div>
//              </div>

//<div id="fieldHidden" class="layui-form-item hidden">` + buildingSelected["LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + buildingSelected["LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + buildingSelected["BOUNDS"] + `</div>

// <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//</form>`
//        });
//        form.render();
//        form.on('switch(switch1)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                markerSelected.setDraggable(true);
//                document.getElementById('s2').checked = false;
//                form.render('checkbox');
//            } else {
//                markerSelected.setDraggable(false);
//            }
//        });
//        form.on('switch(switch2)', function (data) {
//            if (data.elem.checked) {
//                map.setDefaultCursor("default");
//                polygonSelected.getExtData()["editor"].open();
//                document.getElementById('s1').checked = false;
//                form.render('checkbox');
//            } else {
//                polygonSelected.getExtData()["editor"].close();
//            }
//        });

//        //        // 有边界
//        //        if (row["VILLAGE_BOUNDS"] !== null) {
//        //            var polygonSelected = "";
//        //            var polygons = map.getAllOverlays("polygon");
//        //            polygons.forEach(function (polygon) {
//        //                if (polygon.getOptions().strokeColor === "purple") {
//        //                    polygonSelected = polygon;
//        //                }
//        //            });
//        //            var polyEditor = new AMap.PolyEditor(map, polygonSelected);
//        //            polyEditor.on('adjust', function (event) {
//        //                var bounds = event.target.getPath();
//        //                var list = [];
//        //                bounds.forEach(function (coord) {
//        //                    var lng = coord["lng"];
//        //                    var lat = coord["lat"];
//        //                    list.push([lng, lat]);
//        //                });
//        //                document.getElementById('fieldHidden3').innerText = JSON.stringify(list);
//        //            });
//        //            polygonSelected.setExtData({ "editor": polyEditor });
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                    map.remove(polygonSelected);
//        //                    if (editmode === 1) {
//        //                        var polygon = new AMap.Polygon({
//        //                            strokeWeight: 2,
//        //                            strokeOpacity: 1,
//        //                            strokeColor: "purple",
//        //                            strokeStyle: "solid",
//        //                            fillColor: "purple",
//        //                            fillOpacity: 0.2,
//        //                            bubble: true,
//        //                            path: JSON.parse(row["VILLAGE_BOUNDS"]),
//        //                            map: map
//        //                        });
//        //                        polygon.on('click', function (event) {
//        //                            map.setZoom(17);
//        //                            map.setCenter([row["VILLAGE_LNG"], row["VILLAGE_LAT"]]);
//        //                            var info = [];
//        //                            info.push(`<p class='input-item mb-5px'>小区名称: ${row["VILLAGE_NAME"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>详细地址: ${row["VILLAGE_ADDRESS"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>区域: ${row["VILLAGE_REGION"]}</p>`);
//        //                            info.push(`<p class='input-item mb-5px'>类型: ${row["VILLAGE_TYPE"]}</p>`);
//        //                            infoWindow = new AMap.InfoWindow({
//        //                                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//        //                            });
//        //                            infoWindow.open(map, new AMap.LngLat(row["VILLAGE_LNG"], row["VILLAGE_LAT"]));
//        //                        });
//        //                    }
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action=""  onsubmit="event.preventDefault();editVillage2(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //              <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    polygonSelected.getExtData()["editor"].open();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    polygonSelected.getExtData()["editor"].close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//        //        // 无边界
//        //        else {
//        //            layer.open({
//        //                btn: [],
//        //                shade: 0,
//        //                title: "编辑小区",
//        //                end: function () {
//        //                    map.setDefaultCursor("pointer");
//        //                    mousetool.close(true);
//        //                },
//        //                content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();editVillage1(this);">
//        //                   <div class="layui-form-item">
//        //                    <label class="layui-form-label">小区名称</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["VILLAGE_NAME"]}">
//        //                    </div>
//        //                  </div>
//        //                  <div class="layui-form-item">
//        //                    <label class="layui-form-label">详细地址</label>
//        //                    <div class="layui-input-inline">
//        //                      <input type="text" name="village_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["VILLAGE_ADDRESS"]}">
//        //                    </div>
//        //                  </div>
//        //              <div class="layui-form-item">
//        //                <label class="layui-form-label">区域</label>
//        //                <div class="layui-input-block">
//        //                  <select name="region" required>
//        //                            <option value="` + row["VILLAGE_REGION"] + `">` + row["VILLAGE_REGION"] + `
//        //                  </option></select>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">类型</label>
//        //                <div class="layui-input-block">
//        //                  <select name="type" lay-filter="aihao"  required>
//        //                    <option value="商务住宅;住宅区;住宅小区">商务住宅;住宅区;住宅小区</option>
//        //                  </select>
//        //                </div>
//        //              </div>

//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑边界</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id='s1'>
//        //                </div>
//        //              </div>
//        //<div class="layui-form-item">
//        //                <label class="layui-form-label">编辑位置</label>
//        //                <div class="layui-input-block">
//        //                  <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id='s2'>
//        //                </div>
//        //              </div>
//        //<div id="fieldHidden" class="layui-form-item hidden">` + row["VILLAGE_LNG"] + `</div><div id="fieldHidden2" class="layui-form-item hidden">` + row["VILLAGE_LAT"] + `</div><div id="fieldHidden3" class="layui-form-item hidden">` + row["VILLAGE_BOUNDS"] + `</div>

//        // <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
//        //</form>`
//        //            });
//        //            form.render();
//        //            form.on('switch(switch1)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawPolygon();
//        //                    document.getElementById('s2').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //            form.on('switch(switch2)', function (data) {
//        //                if (data.elem.checked) {
//        //                    map.setDefaultCursor("default");
//        //                    drawMarker();
//        //                    document.getElementById('s1').checked = false;
//        //                    form.render('checkbox');
//        //                } else {
//        //                    mousetool.close();
//        //                }
//        //            });
//        //        }
//    }, 2000);
//}

////function editVillagePost(e) {
////    var errors = document.getElementsByClassName("clRedError");
////    for (var i = 0; i < errors.length; i++) {
////        errors[i].remove();
////    }
////    var inputs = e.getElementsByTagName('input');
////    var village_name = inputs[0].value;
////    var village_address = inputs[1].value;
////    var village_lng = document.getElementById('fieldHidden').innerText;
////    var village_lat = document.getElementById('fieldHidden2').innerText;
////    var village_bounds = document.getElementById('fieldHidden3').innerText;
////    if (village_bounds === "null") {
////        village_bounds = "";
////    }
////    var VILLAGEID = villageSelected["VILLAGE_ID_CONV"];
////    $.ajax({
////        type: "post",
////        url: `./Level5Address.ashx?m=EditVillage&VILLAGEID=${VILLAGEID}`,
////        data: {
////            "village_name": village_name, "village_address": village_address, "village_lng": village_lng, "village_lat": village_lat, "village_bounds": village_bounds
////        },
////        dataType: "json",
////        success: function (data) {
////            if (data.length !== 0) {
////                var div = document.createElement('div');
////                div.classList.add("clRedError");
////                data.forEach(function (error) {
////                    div.innerHTML += `<p class="mb-5">${error}</p>`;
////                })
////                e.appendChild(div);
////            } else {
////                editmode = 2;
////                layer.closeAll();
////                layer.msg("小区已编辑");
////                setTimeout(function () {
////                    editmode = 1;
////                }, 8000);
////                if (village_bounds !== "") {
////                    var polygon = new AMap.Polygon({
////                        bubble: true,
////                        fillOpacity: 0.4,
////                        strokeWeight: 1,
////                        path: JSON.parse(village_bounds),
////                        map: map,
////                        strokeColor: "#7BC4C4",
////                        fillColor: "#7BC4C4",
////                        extData: {
////                            "ID": villageSelected["VILLAGE_ID_CONV"],
////                            "DATATYPE": "VILLAGE"
////                        }
////                    });
////                } else {
////                    var lng = Number(village_lng);
////                    var lat = Number(village_lat);
////                    var path = [];
////                    var distance = 300;
////                    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
////                    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
////                    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
////                    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
////                    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
////                    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
////                    var polygon = new AMap.Polygon({
////                        bubble: true,
////                        fillOpacity: 0.4,
////                        strokeWeight: 1,
////                        path: path,
////                        map: map,
////                        strokeColor: "#7BC4C4",
////                        fillColor: "#7BC4C4",
////                        extData: {
////                            "ID": villageSelected["VILLAGE_ID_CONV"],
////                            "DATATYPE": "VILLAGE"
////                        }
////                    });
////                }
////                $('#tableVillage').datagrid('reload');
////                clearB();
////                clearTables4();

////            }
////        },
////        error: function (item, err) {
////            console.log(err);
////        }
////    });

////}


//删除小区
function deleteStreet() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除街道",
        content: `<div><div class="mb-15 tc">确定删除街道?</div><div class="text-center"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteStreetPost(this);">删除</button></div></div>`
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

function deleteStreetPost(e) {
    var STREETID = streetSelected['STREET_ID_CONV'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteStreet&STREETID=${STREETID}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                layer.msg('请先删除子元素');
            } else {
                layer.closeAll();
                layer.msg("街道已删除");
                var STREET_ID_CONV = streetSelected["STREET_ID_CONV"];
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (polygon) {
                    if (polygon.getExtData()["ID"] === STREET_ID_CONV) {
                        map.remove(polygon);
                    }
                });
                $('#tableStreet').datagrid('reload');
                clearCVB();
                clearTables234();
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}


//删除小区
function deleteCommunity() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除社区",
        content: `<div><div class="mb-15 tc">确定删除社区?</div><div class="text-center"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteCommunityPost(this);">删除</button></div></div>`
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

function deleteCommunityPost(e) {
    var COMMUNITYID = communitySelected['COMMUNITY_ID_CONV'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteCommunity&COMMUNITYID=${COMMUNITYID}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                layer.msg('请先删除子元素');
            } else {
                layer.closeAll();
                layer.msg("社区已删除");
                var COMMUNITY_ID_CONV = communitySelected["COMMUNITY_ID_CONV"];
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (polygon) {
                    if (polygon.getExtData()["ID"] === COMMUNITY_ID_CONV) {
                        map.remove(polygon);
                    }
                });
                $('#tableCommunity').datagrid('reload');
                clearVB();
                clearTables34();
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}


//删除小区
function deleteVillage() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除小区",
        content: `<div><div class="mb-15 tc">确定删除小区?</div><div class="text-center"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteVillagePost(this);">删除</button></div></div>`
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

function deleteVillagePost(e) {
    var VILLAGEID = villageSelected['VILLAGE_ID_CONV'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteVillage&VILLAGEID=${VILLAGEID}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                layer.msg('请先删除子元素');
            } else {
                layer.closeAll();
                layer.msg("小区已删除");
                var VILLAGE_ID_CONV = villageSelected["VILLAGE_ID_CONV"];
                var polygons = map.getAllOverlays("polygon");
                polygons.forEach(function (polygon) {
                    if (polygon.getExtData()["ID"] === VILLAGE_ID_CONV) {
                        map.remove(polygon);
                    }
                });
                $('#tableVillage').datagrid('reload');
                clearB();
                clearTables4();
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}


//删除小区
function deleteBuilding() {
    layer.open({
        btn: [],
        shade: 0,
        title: "删除楼栋",
        content: `<div><div class="mb-15 tc">确定删除楼栋?</div><div class="text-center"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteBuildingPost(this);">删除</button></div></div>`
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

function deleteBuildingPost(e) {
    var BUILDINGID = buildingSelected['BUILDING_ID_CONV'];
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=DeleteBuilding&BUILDINGID=${BUILDINGID}`,
        dataType: "json",
        success: function (data) {
            if (data.length !== 0) {
                layer.msg('请先删除子元素');
            } else {
                layer.closeAll();
                layer.msg("楼栋已删除");
                var BUILDING_ID_CONV = buildingSelected["BUILDING_ID_CONV"];
                var markers = map.getAllOverlays("marker");
                markers.forEach(function (marker) {
                    if (marker.getExtData()["ID"] === BUILDING_ID_CONV) {
                        map.remove(marker);
                    }
                });
                $('#tableBuilding').datagrid('reload');
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}

function click(e) {
    var lng = e.lnglat.getLng();
    var lat = e.lnglat.getLat();
    console.log(lng);
    console.log(lat);
    var path = [];
    var distance = 300;
    var xGaode = Number("0.000" + String(distance / 8.295869256724348).replace('.', ''));
    var yGaode = Number("0.000" + String(distance / 11.132050921783284).replace('.', ''));
    path.push([Number(((lng - xGaode) - 0.00000000000002).toFixed(6)), Number((lat - yGaode).toFixed(6))]);
    path.push([Number((lng - xGaode).toFixed(6)), Number((lat + yGaode).toFixed(6))]);
    path.push([Number((lng + xGaode).toFixed(6)), Number(((lat + yGaode) - 0.00000000000002).toFixed(6))]);
    path.push([Number(((lng + xGaode) - 0.00000000000002).toFixed(6)), Number(((lat - yGaode) - 0.00000000000002).toFixed(6))]);
    polygon = new AMap.Polygon({
        bubble: true,
        fillOpacity: 0.4,
        strokeWeight: 1,
        path: path,
        map: map,
        strokeColor: "#0000ff",
        fillColor: "#0000ff"
    });
    var polyEditor = new AMap.PolyEditor(map, polygon);
    polygon.setExtData({ "editor": polyEditor });
    polyEditor.open();
    polyEditor.on('adjust', function (event) {
        var bounds = [];
        event.target.getPath().forEach(function (coord) {
            var lng = coord["lng"];
            var lat = coord["lat"];
            bounds.push([lng, lat]);
        });
        document.getElementById('textareaBounds').value = JSON.stringify(bounds);
    });
    var icon = new AMap.Icon({
        size: new AMap.Size(25, 25),
        image: './icons/poi-marker-default.png',  // Icon的图像
        imageSize: new AMap.Size(25, 25)
    });
    marker = new AMap.Marker({
        icon: icon,
        position: [lng, lat],
        draggable: true
    });
    marker.on('dragging', function (e) {
        var target = e.target;
        var lng = target.getPosition()["lng"];
        var lat = target.getPosition()["lat"];
        console.log(lng);
        var inputLng = document.getElementById('inputLng');
        var inputLat = document.getElementById('inputLat');
        //inputLng.disabled = false;
        inputLng.value = lng;
        //inputLng.disabled = true;
        //inputLat.disabled = false;
        inputLat.value = lat;
        //inputLat.disabled = true;
        //document.getElementById('inputLng').innerText = lng;
        //document.getElementById('inputLat').innerText = lat;
    });
    marker.setMap(map);
    map.off('click',click);
}

function createStreet(e) {
    var selectCounties = document.getElementById('selectCounties');
    var countySelected = selectCounties.options[selectCounties.selectedIndex].value;
    if (countySelected === "all") {
        layer.msg('请选择区县');
    } else {
        map.on('click', click);
            layer.open({
        btn: [],
        maxWidth: 750,
        shade: 0,
        title: "新建街道",
        end: function () {
            polygon.getExtData()["editor"].close();
            map.remove(marker);
            map.remove(polygon);
            //mousetool.close(true);
            //map.setDefaultCursor("pointer");
        },
        content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createStreetPost(this);"> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">名称</label> 
    <div class="layui-input-block"> 
     <input type="text" name="street_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div> 

<div class="layui-form-item">
    <label class="layui-form-label">类型</label>
    <div class="layui-input-inline">
      <select name="street_type">
        <option value="">请选择类型</option>
        <option value="地名地址信息;普通地名;街道级地名">地名地址信息;普通地名;街道级地名</option>
        <option value="地名地址信息;普通地名;乡镇级地名">地名地址信息;普通地名;乡镇级地名</option>
      </select>
    </div>
  </div>
   <div class="layui-form-item"> 
    <label class="layui-form-label">地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="street_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>`+
            `      <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" required disabled="disabled"></textarea>
    </div>
  </div>





   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
  </form>`
    });
    form.render();
    //form.on('switch(switch1)', function (data) {
    //    if (data.elem.checked) {
    //        map.setDefaultCursor("default");
    //        drawPolygon();
    //        document.getElementById('s2').checked = false;
    //        form.render('checkbox');
    //    } else {
    //        mousetool.close();
    //    }
    //});
    //form.on('switch(switch2)', function (data) {
    //    if (data.elem.checked) {
    //        map.setDefaultCursor("default");
    //        drawMarker();
    //        document.getElementById('s1').checked = false;
    //        form.render('checkbox');
    //    } else {
    //        mousetool.close();
    //    }
    //});
        //  <div class="layui-form-item"> 
//    <label class="layui-form-label">类型</label> 
//    <div class="layui-input-block"> 
//     <input type="text" name="street_type" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
//    </div> 
//</div>
    //form.on('select(selectProvince)', function (data) {
    //    //TODO执行自己的代码
    //    $.ajax({
    //        type: "get",
    //        url: `./region.json`,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            var value = $("#selectProvince").val();
    //            if (value !== "") {
    //                var selectCity = document.getElementById('selectCity');
    //                selectCity.innerHTML = `<option value="">全部</option>`;
    //                data.forEach(function (i) {
    //                    if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
    //                        selectCity.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
    //                    }
    //                });
    //            }
    //            form.render();
    //        },
    //        error: function (item, err) {
    //            console.log(err);
    //        }
    //    });
    //});

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

    }
    //var mouseTool = new AMap.MouseTool(map);
    //mousetool.polygon({
    //    strokeColor: "#FF33FF",
    //    strokeOpacity: 1,
    //    strokeWeight: 6,
    //    strokeOpacity: 0.2,
    //    fillColor: '#FF33FF',
    //    fillOpacity: 0.4,
    //    // 线样式还支持 'dashed'
    //    strokeStyle: "solid",
    //    // strokeStyle是dashed时有效
    //    // strokeDasharray: [30,10],
    //});

    //mousetool.marker({
    //    draggable: true
    //});
    //m

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
    //<div class="layui-form-item">
    //    <label class="layui-form-label">区域</label>
    //    <div class="layui-input-inline">
    //        <select id="selectProvince" lay-filter="selectProvince"> <option value="">全部</option>
    //            <option value="110000">北京市</option><option value="120000">天津市</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海市</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆市</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option></select>
    //    </div>
    //    <div class="layui-input-inline">
    //        <select id="selectCity" lay-filter="selectCity">
    //            <option value="">全部</option></select>
    //    </div>
    //    <div class="layui-input-inline">
    //        <select id="selectCounty" lay-filter="selectCounty">
    //            <option value="">全部</option>
    //        </select>

    //    </div>
    //</div> 
    //<div class="layui-form-item">
    //    <label class="layui-form-label">添加位置</label>
    //    <div class="layui-input-block">
    //        <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch2" id="s2" />
    //    </div>
    //</div>
    //    <div class="layui-form-item">
    //        <label class="layui-form-label">添加边界</label>
    //        <div class="layui-input-block">
    //            <input type="checkbox" name="close" lay-skin="switch" lay-text="是|否" lay-filter="switch1" id="s1" />
    //        </div>
    //    </div> 


    //<div id="fieldHidden" class="layui-form-item hidden"></div>
    //    <div id="fieldHidden2" class="layui-form-item hidden"></div>
    //    <div id="fieldHidden3" class="layui-form-item hidden"></div> 
  //  <div class="layui-form-item" pane="">
  //      <label class="layui-form-label">绘制</label>
  //      <div class="layui-input-block">
  //          <input type="radio" name="radio" value="经纬度" title="经纬度" checked="">
  //              <input type="radio" name="radio" value="边界" title="边界"
  //  </div>
  //</div>
//    layer.open({
//        btn: [],
//        maxWidth: 750,
//        shade: 0,
//        title: "新建街道",
//        end: function () {
//            polygon.getExtData()["editor"].close();
//            map.remove(marker);
//            map.remove(polygon);
//            //mousetool.close(true);
//            //map.setDefaultCursor("pointer");
//        },
//        content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createStreetPost(this);"> 
//   <div class="layui-form-item"> 
//    <label class="layui-form-label">名称</label> 
//    <div class="layui-input-block"> 
//     <input type="text" name="street_name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
//    </div> 
//   </div> 
//  <div class="layui-form-item"> 
//    <label class="layui-form-label">类型</label> 
//    <div class="layui-input-block"> 
//     <input type="text" name="street_type" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
//    </div> 
//</div>
//   <div class="layui-form-item"> 
//    <label class="layui-form-label">地址</label> 
//    <div class="layui-input-block"> 
//     <input type="text" name="street_address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
//    </div> 
//   </div>`+
//            `      <div class="layui-form-item">
//                    <label class="layui-form-label">经度</label>
//                    <div class="layui-input-inline">
//                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required disabled="disabled">
//                    </div>
//                  </div>
//                  <div class="layui-form-item">
//                    <label class="layui-form-label">纬度</label>
//                    <div class="layui-input-inline">
//                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required   disabled="disabled">
//                    </div>
//                  </div>
// <div class="layui-form-item layui-form-text">
//    <label class="layui-form-label">边界</label>
//    <div class="layui-input-block">
//      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" disabled="disabled"></textarea>
//    </div>
//  </div>




  
//   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
//  </form>`
//    });
//    form.render();
//    //form.on('switch(switch1)', function (data) {
//    //    if (data.elem.checked) {
//    //        map.setDefaultCursor("default");
//    //        drawPolygon();
//    //        document.getElementById('s2').checked = false;
//    //        form.render('checkbox');
//    //    } else {
//    //        mousetool.close();
//    //    }
//    //});
//    //form.on('switch(switch2)', function (data) {
//    //    if (data.elem.checked) {
//    //        map.setDefaultCursor("default");
//    //        drawMarker();
//    //        document.getElementById('s1').checked = false;
//    //        form.render('checkbox');
//    //    } else {
//    //        mousetool.close();
//    //    }
//    //});
//    form.on('select(selectProvince)', function (data) {
//        //TODO执行自己的代码
//        $.ajax({
//            type: "get",
//            url: `./region.json`,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (data) {
//                var value = $("#selectProvince").val();
//                if (value !== "") {
//                    var selectCity = document.getElementById('selectCity');
//                    selectCity.innerHTML = `<option value="">全部</option>`;
//                    data.forEach(function (i) {
//                        if ((i["item_code"].slice(0, 2) === value.slice(0, 2)) && (i["item_code"].slice(2) !== "0000") && (i["item_code"].slice(4, 6) === "00")) {
//                            selectCity.innerHTML += `<option value=${i["item_code"]}>${i["item_name"]}</option>`;
//                        }
//                    });
//                }
//                form.render();
//            },
//            error: function (item, err) {
//                console.log(err);
//            }
//        });
//    });

//    form.on('select(selectCity)', function (data) {
//        //TODO执行自己的代码
//        $.ajax({
//            type: "get",
//            url: `./region.json`,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (data) {
//                var value = $("#selectCity").val();
//                if (value !== "") {
//                    var selectCounty = document.getElementById('selectCounty');
//                    selectCounty.innerHTML = `<option value="">全部</option>`;
//                    data.forEach(function (i2) {
//                        if (value == '110100' || value == "120100" || value == "310100" || value == "500100") {
//                            if (value.slice(0, 3) === (i2["item_code"].slice(0, 3)) && (i2["item_code"].slice(4, 6) !== "00")) {
//                                selectCounty.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
//                            }
//                        } else {
//                            if (value.slice(0, 4) === (i2["item_code"].slice(0, 4)) && (i2["item_code"].slice(4, 6) !== "00")) {
//                                selectCounty.innerHTML += `<option value=${i2["item_code"]}>${i2["item_name"]}</option>`;
//                            }
//                        }
//                    });
//                }
//                form.render();
//            },
//            error: function (item, err) {
//                console.log(err);
//            }
//        });
//    });

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


function createStreetPost(e) {
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
    var name = inputs[0].value;
    var type = selects[0].options[selects[0].selectedIndex].value;
    var address = inputs[2].value;
    console.log(inputs);
    var lng = document.getElementById('inputLng').value;
    var lat = document.getElementById('inputLat').value;
    var bounds = document.getElementById('textareaBounds').value;
    var source = '自建';
    var selectCounties = document.getElementById('selectCounties');
    var countySelected = selectCounties.options[selectCounties.selectedIndex].value;
    var county_id = countySelected;
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=CreateStreet`,
        data: { "name": name, "type": type, "address": address, "lng": lng, "lat": lat, "bounds": bounds, "source": source, "county_id": county_id },
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
                layer.msg("街道已添加");

                $('#tableStreet').datagrid('reload');
                setTimeout(function () {
                    var data = $('#tableStreet').datagrid('getData');
                      var polygon = new AMap.Polygon({
                    bubble: true,
                    fillOpacity: 0.2,
                    strokeWeight: 1,
                    path: JSON.parse(bounds),
                    map: map,
                    strokeColor: "#FFDA00",
                    fillColor: "#FFDA00",
                    extData: {
                        "ID": data["rows"][0]["STREET_ID_CONV"],
                        "DATATYPE": "STREET"
                    }
                });
                }, 1000);
                
              
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
            
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}


function createCommunity(e) {
    var streetChosen = $('#tableStreet').datagrid('getSelected');
    if (streetChosen !== null) {
        var STREET_ID_CONV = streetChosen.STREET_ID_CONV;
        var COUNTY_ID_CONV = streetChosen.COUNTY_ID_CONV;
        map.on('click', click);
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "新建社区",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //mousetool.close(true);
                //map.setDefaultCursor("pointer");
            },
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createCommunityPost(this);"> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">名称</label> 
    <div class="layui-input-block"> 
     <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div> 


   <div class="layui-form-item"> 
    <label class="layui-form-label">地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>`+
                `      <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" required disabled="disabled"></textarea>
    </div>
  </div>
   <div class="layui-form-item"> 
    <label class="layui-form-label">联系电话</label> 
    <div class="layui-input-block"> 
     <input type="text" name="tel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>




   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
  </form>`
        });
        form.render();
        
    } else {
        layer.msg("请选择街道");
    }
}

function createCommunityPost(e) {
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
    var name = inputs[0].value;
    var type = "社区"
    var address = inputs[1].value;
    console.log(inputs);
    var lng = document.getElementById('inputLng').value;
    var lat = document.getElementById('inputLat').value;
    var bounds = document.getElementById('textareaBounds').value;
    var tel = inputs[4].value;
    var source = '自建';
    //var selectCounties = document.getElementById('selectCounties');
    //var countySelected = selectCounties.options[selectCounties.selectedIndex].value;
    var streetChosen = $('#tableStreet').datagrid('getSelected');
    var STREET_ID_CONV = streetChosen.STREET_ID_CONV;
    var COUNTY_ID_CONV = streetChosen.COUNTY_ID_CONV;
    var street_id = STREET_ID_CONV;
    var county_id = COUNTY_ID_CONV;
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=CreateCommunity`,
        data: { "name": name, "type": type, "address": address, "lng": lng, "lat": lat, "bounds": bounds, "tel": tel, "source": source, "street_id": street_id, "county_id": county_id },
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
                layer.msg("社区已添加");
                $('#tableCommunity').datagrid('reload');
                setTimeout(function () {
                    var data = $('#tableCommunity').datagrid('getData');
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(bounds),
                        map: map,
                        strokeColor: "#FF9E00",
                        fillColor: "#FF9E00",
                        extData: {
                            "ID": data["rows"][0]["COMMUNITY_ID_CONV"],
                            "DATATYPE": "COMMUNITY"
                        }

                    });
                }, 1000);


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

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}



function createVillage(e) {
    var communityChosen = $('#tableCommunity').datagrid('getSelected');
    if (communityChosen !== null) {
        //var STREET_ID_CONV = streetChosen.STREET_ID_CONV;
        //var COUNTY_ID_CONV = streetChosen.COUNTY_ID_CONV;
        map.on('click', click);
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "新建小区",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //mousetool.close(true);
                //map.setDefaultCursor("pointer");
            },
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createVillagePost(this);"> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">名称</label> 
    <div class="layui-input-block"> 
     <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div> 


   <div class="layui-form-item"> 
    <label class="layui-form-label">地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>`+
                `      <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" required disabled="disabled"></textarea>
    </div>
  </div>





   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
  </form>`
        });
        form.render();

    } else {
        layer.msg("请选择社区");
    }
}

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
    var name = inputs[0].value;
    var type = "商务住宅;住宅区;住宅小区"
    var address = inputs[1].value;
    console.log(inputs);
    var lng = document.getElementById('inputLng').value;
    var lat = document.getElementById('inputLat').value;
    var bounds = document.getElementById('textareaBounds').value;
    var source = '自建';
    //var selectCounties = document.getElementById('selectCounties');
    //var countySelected = selectCounties.options[selectCounties.selectedIndex].value;
    var communityChosen = $('#tableCommunity').datagrid('getSelected');
    var COMMUNITY_ID_CONV = communityChosen.COMMUNITY_ID_CONV;
    var COUNTY_ID_CONV = communityChosen.COUNTY_ID_CONV;
    var community_id = COMMUNITY_ID_CONV;
    var county_id = COUNTY_ID_CONV;
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=CreateVillage`,
        data: { "name": name, "type": type, "address": address, "lng": lng, "lat": lat, "bounds": bounds, "source": source, "community_id": community_id, "county_id": county_id },
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
                $('#tableVillage').datagrid('reload');
                setTimeout(function () {
                    var data = $('#tableVillage').datagrid('getData');
                    var polygon = new AMap.Polygon({
                        bubble: true,
                        fillOpacity: 0.4,
                        strokeWeight: 1,
                        path: JSON.parse(bounds),
                        map: map,
                        strokeColor: "#7BC4C4",
                        fillColor: "#7BC4C4",
                        extData: {
                            "ID": data["rows"][0]["VILLAGE_ID_CONV"],
                            "DATATYPE": "VILLAGE"
                        }
                    });
                }, 1000);


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

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}



function createBuilding(e) {
    var villageChosen = $('#tableVillage').datagrid('getSelected');
    if (villageChosen !== null) {
        //var STREET_ID_CONV = streetChosen.STREET_ID_CONV;
        //var COUNTY_ID_CONV = streetChosen.COUNTY_ID_CONV;
        map.on('click', click);
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "新建楼栋",
            end: function () {
                polygon.getExtData()["editor"].close();
                map.remove(marker);
                map.remove(polygon);
                //mousetool.close(true);
                //map.setDefaultCursor("pointer");
            },
            content: `<form class="layui-form layui-form-pane" action="" onsubmit="event.preventDefault();createBuildingPost(this);"> 
   <div class="layui-form-item"> 
    <label class="layui-form-label">名称</label> 
    <div class="layui-input-block"> 
     <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div> 


   <div class="layui-form-item"> 
    <label class="layui-form-label">地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="address" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>   <div class="layui-form-item"> 
    <label class="layui-form-label">蓝牌地址</label> 
    <div class="layui-input-block"> 
     <input type="text" name="bluelabel" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required="" /> 
    </div> 
   </div>`+
                `      <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input id="inputLng" type="text" name="lng" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required disabled="disabled">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input id="inputLat" type="text" name="lat" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required disabled="disabled">
                    </div>
                  </div>
 <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">边界</label>
    <div class="layui-input-block">
      <textarea id="textareaBounds" placeholder="请输入内容" class="layui-textarea" required disabled="disabled"></textarea>
    </div>
  </div>





   <button type="submit" class="layui-btn layui-btn-normal fr">保存</button> 
  </form>`
        });
        form.render();

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
    var name = inputs[0].value;
    var type = "地名地址信息;门牌信息;楼栋号"
    var address = inputs[1].value;
    var bluelabel = inputs[2].value;
    console.log(inputs);
    var lng = document.getElementById('inputLng').value;
    var lat = document.getElementById('inputLat').value;
    var bounds = document.getElementById('textareaBounds').value;
    var source = '自建';
    //var selectCounties = document.getElementById('selectCounties');
    //var countySelected = selectCounties.options[selectCounties.selectedIndex].value;
    var villageChosen = $('#tableVillage').datagrid('getSelected');
    var VILLAGE_ID_CONV = villageChosen.VILLAGE_ID_CONV;
    var COUNTY_ID_CONV = villageChosen.COUNTY_ID_CONV;
    var village_id = VILLAGE_ID_CONV;
    var county_id = COUNTY_ID_CONV;
    $.ajax({
        type: "post",
        url: `./Level5Address.ashx?m=CreateBuilding`,
        data: { "name": name, "type": type, "address": address, "bluelabel": bluelabel, "lng": lng, "lat": lat, "bounds": bounds, "source": source, "village_id": village_id, "county_id": county_id },
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
                layer.msg("楼栋已添加");
                $('#tableBuilding').datagrid('reload');
                setTimeout(function () {
                    var data = $('#tableBuilding').datagrid('getData');
                    var icon = new AMap.Icon({
                        size: new AMap.Size(25, 25),
                        image: './icons/poi-marker-default.png',  // Icon的图像
                        imageSize: new AMap.Size(25, 25)
                    });
                    marker = new AMap.Marker({
                        icon: icon,
                        position: [lng, lat],
                        extData: {
                            "ID": data["rows"][0]["BUILDING_ID_CONV"],
                            "DATATYPE": "BUILDING"
                        }
                    });
                    marker.setMap(map);
                }, 1000);


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

            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}


function detailStreet() {
    setTimeout(function () {
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "街道",
            content: `<div>
                             <p><span>街道ID:</span> <span>${streetSelected["STREET_ID_CONV"]}</span></p>
                             <p><span>编码:</span> <span>${streetSelected["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${streetSelected["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${streetSelected["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${streetSelected["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${streetSelected["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${streetSelected["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${streetSelected["BOUNDS"]}</span></p>
                             <p><span>数据来源:</span> <span>${streetSelected["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${streetSelected["CREATE_DATE"]}</span></p>
                             <p><span>区县ID:</span> <span>${streetSelected["COUNTY_ID_CONV"]}</span></p>
                            </div>`
        });
    }, 1000);
}

function detailCommunity() {
    setTimeout(function () {
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "社区",
            content: `<div>
                             <p><span>社区ID:</span> <span>${communitySelected["COMMUNITY_ID_CONV"]}</span></p>
                             <p><span>编码:</span> <span>${communitySelected["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${communitySelected["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${communitySelected["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${communitySelected["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${communitySelected["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${communitySelected["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${communitySelected["BOUNDS"]}</span></p>
                             <p><span>联系电话:</span> <span>${communitySelected["TEL"]}</span></p>
                             <p><span>数据来源:</span> <span>${communitySelected["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${communitySelected["CREATE_DATE"]}</span></p>
                             <p><span>街道ID:</span> <span>${communitySelected["STREET_ID_CONV"]}</span></p>
                             <p><span>区县ID:</span> <span>${communitySelected["COUNTY_ID_CONV"]}</span></p>
                            </div>`
        });
    }, 1000);
}
function detailVillage() {
    setTimeout(function () {
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "小区",
            content: `<div>
                             <p><span>小区ID:</span> <span>${villageSelected["VILLAGE_ID_CONV"]}</span></p>
                             <p><span>编码:</span> <span>${villageSelected["CODE"]}</span></p>
                             <p><span>名称:</span> <span>${villageSelected["NAME"]}</span></p>
                             <p><span>类型:</span> <span>${villageSelected["TYPE"]}</span></p>
                             <p><span>地址:</span> <span>${villageSelected["ADDRESS"]}</span></p>
                             <p><span>经度:</span> <span>${villageSelected["LNG"]}</span></p>
                             <p><span>纬度:</span> <span>${villageSelected["LAT"]}</span></p>
                             <p><span>边界:</span> <span>${villageSelected["BOUNDS"]}</span></p>
                             <p><span>数据来源:</span> <span>${villageSelected["SOURCE"]}</span></p>
                             <p><span>创建日期:</span> <span>${villageSelected["CREATE_DATE"]}</span></p>
                             <p><span>社区ID:</span> <span>${villageSelected["COMMUNITY_ID_CONV"]}</span></p>
                             <p><span>区县ID:</span> <span>${villageSelected["COUNTY_ID_CONV"]}</span></p>
                            </div>`
        });
    }, 1000);
}

function detailBuilding() {
    setTimeout(function () {
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "楼栋",
            content: `<div>
                             <p><span>楼栋ID:</span> <span>${ buildingSelected["BUILDING_ID_CONV"]}</span></p>
            <p><span>编码:</span> <span>${buildingSelected["CODE"]}</span></p>
            <p><span>名称:</span> <span>${buildingSelected["NAME"]}</span></p>
            <p><span>类型:</span> <span>${buildingSelected["TYPE"]}</span></p>
            <p><span>地址:</span> <span>${buildingSelected["ADDRESS"]}</span></p>
            <p><span>蓝牌地址:</span> <span>${buildingSelected["BLUELABEL"]}</span></p>
            <p><span>是否在地图上:</span> <span>${buildingSelected["ONMAP"]}</span></p>
            <p><span>高度:</span> <span>${buildingSelected["HEIGHT"]}</span></p>
            <p><span>经度:</span> <span>${buildingSelected["LNG"]}</span></p>
            <p><span>纬度:</span> <span>${buildingSelected["LAT"]}</span></p>
            <p><span>边界:</span> <span>${buildingSelected["BOUNDS"]}</span></p>
            <p><span>数据来源:</span> <span>${buildingSelected["SOURCE"]}</span></p>
            <p><span>创建日期:</span> <span>${buildingSelected["CREATE_DATE"]}</span></p>
            <p><span>父元素:</span> <span>${buildingSelected["PARENT"]}</span></p>
            <p><span>小区ID:</span> <span>${buildingSelected["VILLAGE_ID_CONV"]}</span></p>
            <p><span>区县ID:</span> <span>${buildingSelected["COUNTY_ID_CONV"]}</span></p>
                            </div>`
        });
    }, 1000);
}

function detailStreetDep(node) {
    console.log(node);
    console.log(typeof node);

    //layer.open({
    //    btn: [],
    //    maxWidth: 750,
    //    shade: 0,
    //    title: "街道",
    //    content: `<div>
    //                         <p><span>街道ID:</span> <span>${street["STREET_ID"]}</span></p>
    //                         <p><span>编码:</span> <span>${street["CODE"]}</span></p>
    //                         <p><span>名称:</span> <span>${street["NAME"]}</span></p>
    //                         <p><span>类型:</span> <span>${street["TYPE"]}</span></p>
    //                         <p><span>地址:</span> <span>${street["ADDRESS"]}</span></p>
    //                         <p><span>经度:</span> <span>${street["LNG"]}</span></p>
    //                         <p><span>纬度:</span> <span>${street["LAT"]}</span></p>
    //                         <p><span>边界:</span> <span>${street["BOUNDS"]}</span></p>
    //                         <p><span>来源:</span> <span>${street["SOURCE"]}</span></p>
    //                         <p><span>创建日期:</span> <span>${street["CREATE_DATE"]}</span></p>
    //                         <p><span>区县ID:</span> <span>${street["COUNTY_ID"]}</span></p>
    //                         <p class="text-center mt-15">  
    //                            <button type="button" class="layui-btn">编辑</button>
    //                            <button type="button" class="layui-btn layui-btn-danger">删除</button>
    //                         </p>
    //                        </div>`
    //});
}
// define a function that gets latest data
// and formats them according to standards 
// then return result as json



//layui.use(['element', 'table', 'laypage'], function () {
//    var element = layui.element;
//    var table = layui.table;
//    var laypage = layui.laypage; //分页
//    //第一个实例
//    table.render({
//        elem: '#demo1'
//        , height: 312
//        , url: './Level5Address.ashx?m=GetStreetsDefault' //数据接口
//        , page: true //开启分页
//        ,
//        cellMinWidth: 80
//        ,
//        cols: [[ //表头
//            { field: 'NAME', title: '名称' }
//            , { field: 'ADDRESS', title: '地址' }
//            , { field: 'LNG', title: '经度' }
//            , { field: 'LAT', title: '纬度' }
//            , { field: 'COUNTY_ID', title: '区县' }
//        ]]
//    });



//    //第一个实例
//    //table.render({
//    //    elem: '#demo2'
//    //    , height: 312
//    //    , url: './Level5Address.ashx?m=GetStreetsDefault' //数据接口
//    //    , page: true //开启分页
//    //    , cols: [[ //表头
//    //        { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
//    //        , { field: 'username', title: '用户名', width: 80 }
//    //        , { field: 'sex', title: '性别', width: 80, sort: true }
//    //        , { field: 'city', title: '城市', width: 80 }
//    //        , { field: 'sign', title: '签名', width: 177 }
//    //        , { field: 'experience', title: '积分', width: 80, sort: true }
//    //        , { field: 'score', title: '评分', width: 80, sort: true }
//    //        , { field: 'classify', title: '职业', width: 80 }
//    //        , { field: 'wealth', title: '财富', width: 135, sort: true }
//    //    ]]
//    //});
//    ////第一个实例
//    //table.render({
//    //    elem: '#demo3'
//    //    , height: 312
//    //    , url: './Level5Address.ashx?m=GetStreetsDefault' //数据接口
//    //    , page: true //开启分页
//    //    , cols: [[ //表头
//    //        { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
//    //        , { field: 'username', title: '用户名', width: 80 }
//    //        , { field: 'sex', title: '性别', width: 80, sort: true }
//    //        , { field: 'city', title: '城市', width: 80 }
//    //        , { field: 'sign', title: '签名', width: 177 }
//    //        , { field: 'experience', title: '积分', width: 80, sort: true }
//    //        , { field: 'score', title: '评分', width: 80, sort: true }
//    //        , { field: 'classify', title: '职业', width: 80 }
//    //        , { field: 'wealth', title: '财富', width: 135, sort: true }
//    //    ]]
//    //});

//    ////第一个实例
//    //table.render({
//    //    elem: '#demo4'
//    //    , height: 312
//    //    , url: './Level5Address.ashx?m=GetStreetsDefault' //数据接口
//    //    , page: true //开启分页
//    //    , cols: [[ //表头
//    //        { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
//    //        , { field: 'username', title: '用户名', width: 80 }
//    //        , { field: 'sex', title: '性别', width: 80, sort: true }
//    //        , { field: 'city', title: '城市', width: 80 }
//    //        , { field: 'sign', title: '签名', width: 177 }
//    //        , { field: 'experience', title: '积分', width: 80, sort: true }
//    //        , { field: 'score', title: '评分', width: 80, sort: true }
//    //        , { field: 'classify', title: '职业', width: 80 }
//    //        , { field: 'wealth', title: '财富', width: 135, sort: true }
//    //    ]]
//    //});


//});


//setTimeout(function () {
//    //document.getElementsByClassName('panel-body-noheader')[0].classList.add("w-100p");
//    //var container1 = document.createElement('div');
//    //container1.setAttribute("id", "buttonOpenClose");
//    //container1.innerHTML += `<span class="bb-lightblue pb-5px mr-20">是否显示小区边界</span><button type="button" class="layui-btn layui-btn-radius layui-btn-normal layui-btn-sm" onclick="openPois(this); disabled">是 <i class="fa fa-check ml-3px"></i></button><button type="button" class="layui-btn layui-btn-primary layui-btn-radius layui-btn-sm" onclick="closePois(this);">否</button>`;
//    //var container2 = document.createElement('div');
//    //container2.setAttribute("id", "buttonOpenClose2");
//    //container2.innerHTML += `<span class="bb-lightblue pb-5px mr-20">是否显示楼宇名称</span><button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm" onclick="showBuildingNames(this);">是</button><button type="button" class="layui-btn layui-btn-normal layui-btn-radius layui-btn-sm" onclick="hideBuildingNames(this); disabled">否<i class="fa fa-check ml-3px"></i></button>`;
//    //form.on('checkbox(checkboxSatelliteLayerFilter)', function (data) {
//    //    if (data.elem.checked === true) {
//    //        map.getLayers()[1].show();
//    //    } else {
//    //        map.getLayers()[1].hide();
//    //    }
//    //});


//    //document.getElementsByClassName('panel')[1].appendChild(container1);
//    //document.getElementsByClassName('panel')[1].appendChild(container2);

//    var container = document.createElement('div');
//    container.setAttribute("id", "buttonShowHidden");
//    container.onclick = function () {
//        if ($("#footer").hasClass("footerHide")) {
//            $("#footer").removeClass("footerHide");
//            $("#container").removeClass("containerShow");
//            $(".CellInformation").removeClass("CellInformationShow");
//            $(".ListBtn").css({
//                "transform": "rotateX(0deg)",
//                "-ms-transform": "rotateX(0deg)", /* IE 9 */
//                "-moz-transform": "rotateX(0deg)", /* Firefox */
//                "-webkit-transform": "rotateX(0deg)", /* Safari 和 Chrome */
//                "-o-transform": "rotateX(0deg)", /* Opera */
//            })
//        } else {
//            $("#footer").addClass("footerHide");
//            $("#container").addClass("containerShow");
//            $(".CellInformation").addClass("CellInformationShow");
//            $(".ListBtn").css({
//                "transform": "rotateX(180deg)",
//                "-ms-transform": "rotateX(180deg)", /* IE 9 */
//                "-moz-transform": "rotateX(180deg)", /* Firefox */
//                "-webkit-transform": "rotateX(180deg)", /* Safari 和 Chrome */
//                "-o-transform": "rotateX(180deg)", /* Opera */
//            })
//        }
//    };
//    container.innerHTML += `<span class="ListBtn"></span>`;
//    document.getElementsByClassName('panel')[1].appendChild(container);
//}, 5000);
