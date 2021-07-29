const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("ListOfPlayers");
  db_connect
    .collection("allPlayers")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/update").post(function (req, res) {
  let db_connect = dbo.getDb("ListOfPlayers");
  let myquery = { playerName: req.body.playerName };
  console.log('THIS IS THE REQUEST',req.body);
  let newvalues = {
    $set: {
      "Elo": req.body.Elo,
      "playerName": req.body.playerName     
    }
  };
  
  db_connect
    .collection("allPlayers")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated", res);
    });
    //Command to change every entry elo
    //db_connect.collection("allPlayers").updateMany({}, {$set: {Elo: 25000}}) 
});

module.exports = recordRoutes;