"user strict";
var sql = require("../db.js");

exports.list_all_storm = function (req, res) {
  const cityName = req.query.cityName;
  sql.query(
    `SELECT * FROM storm ORDER BY (city_name = ${cityName}) DESC, detected_time ASC`,
    function (err, result) {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("storm : ", result);
        res.json(result);
      }
    }
  );
};

// export function create_storm(req, res) {
//   sql.query("INSERT INTO storm set ?", req.body , function (err, res) {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//     } else {
//       console.log(res.insertId);
//     }
//   });
// }
