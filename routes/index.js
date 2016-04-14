var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */

router.get('/insertData', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'INSERT INTO Kluminati(id, title) VALUES (1,1);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
    })
  })
});

router.get('/initdb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE Kluminati(id INT, title TEXT);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created"});
    })
  })
});

router.get('/select', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM Kluminati;';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created"});
    })
  })
});
module.exports = router;


function dbConnect()
{
  //n1plcpnl0047.prod.ams1.secureserver.net
  var mysql =  require('mysql');
  var connection =  mysql.createConnection({
    host : '160.153.16.35',
    user : 'Kluminati',
    port : '3306',
    password : 'Yevgniy1!',
    database : 'NodeJsServer'
  });
  connection.connect();
  return connection;
}

function sendQuerry(query)
{
  var connection = dbConnect();
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;

    var g={};
    g=rows[0];
    console.log('The solution is: ', g.PKID );
  });

  connection.end();
}
