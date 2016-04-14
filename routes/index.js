var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */

router.get('/insertSnippetObject', (req, res)=>{
  var title = req.query.title ;


  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'INSERT INTO SnipetObject(title,like_count,comments) VALUES (1,1,1);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
        else {
          res.json({'failed':true, "message":"some thing went wrong"});
        }
    })
  })
});

router.get('/initSnippetObjectDb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE SnippetObject(pkid SERIAL,title TEXT,like_count INT,comments TEXT);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created"});
    })
  })
});

router.get('/selectKluminati', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM Kluminati;';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
    })
  })
});

router.get('/selectSnippetObject', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM SnippetObject;';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
    })
  })
});

/*
router.get('/drop', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'DROP TABLE SnippetObject;'+'DROP TABLE muhamad;'+'DROP TABLE notes;';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
    })
  })
});
*/

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
