
const request = require('request');
/*request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});*/
const oracledb = require('oracledb');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`ÊäÈëÇøÏØ`, region => {
  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : "john",
      password      : "pudong",
        connectString: "localhost:1521/socialclone"
    });
    var bounds = [];
    const result = await connection.execute(
       `SELECT *
       FROM lbs_village
       WHERE village_region like '¿¿?`
        // bind value for :id
    );
	  console.log(result);
/*    result.rows.forEach(function(row){
	var village_code = row["VILLAGE_CODE"];
	request(`https://ditu.amap.com/detail/${village_code}/?src=mypage&callnative=0`, function (error, response, body) {
  		    
            if (body !== undefined){
                console.log(body.indexOf(`"shape":"`));
                if (body.indexOf(`"shape":"`) !== -1) {
                    var start2 = body.indexOf(`"poiid":"`) + 9;
                    var end2 = body.indexOf(`","tag"`);
                    var poiId = body.slice(start2, end2);
                    var path = [];
                    var start = body.indexOf(`"shape":"`)+9;
                    var end = "";
                    if (body.indexOf(`","parentid"`) !== -1){
                        end = body.indexOf(`","parentid"`);
                    } else {
                        end = body.indexOf(`","level"`);
                    }
                    body.slice(start, end).split(";").forEach(function (pointW) {
                        var point = pointW.split(",");
                        var long = Number(point[0]);
                        var lat = Number(point[1]);
                        path.push([long, lat]);
                    });
                    //bounds.push({ "poiId": poiId, "bounds": path });
                    // var end = body.indexOf(`","level"`);
                    // console.log(body.slice(start,end));
                    // console.log('*************************');
                    //poisHousing1to300[i]["poiBounds"] = JSON.stringify(path);
                    // poisHousing[i]["poiBounds"] = JSON.stringify(path);
                    //path = JSON.stringify(bounds);
                    //console.log('apple');
                    //console.log(bounds + ' ' + poiId);
                    //connection.execute(`UPDATE lbs_village SET village_bounds = '${JSON.stringify(path)}' WHERE village_code = '${poiId}'`);
                    var sql = `begin UPDATE lbs_village SET village_bounds = '${JSON.stringify(path)}' WHERE village_code = '${poiId}';commit;end;`;
                    connection.execute(sql, function (err, result) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        console.log(result);

                    });
	            //console.log(`The path is ${path} and poiId is ${poiId}.`);
                  
                }
            }
});
    });*/
      //setTimeout(function () {
      //    console.log(bounds);
      //    bounds.forEach(function (bound) {
      //        connection.execute(
      //            `UPDATE lbs_village
      // SET village_bounds = '${bound["bounds"]}' 
      // WHERE village_code = '${bound["poiId"]}'` 
      //        );
      //    });
      //}, 180000);


  } catch (err) {
    console.error(err);
  }
  //finally {
  //  if (connection) {
  //      try {
  //          console.log('done');
  //      await connection.close();
  //    } catch (err) {
  //      console.error(err);
  //    }
  //  }
  //}
}

run();

  readline.close()
})
