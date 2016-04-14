var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */

router.get('/insertSnippetObject', (req, res)=>{
  var title = req.query.title ;
  var like_count = req.query.like_count;
  var comments = req.query.comments;

  if(title!=null && like_count!=null && comments!=null){
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{

    var query =  'INSERT INTO SnippetObject(pkid, title , likes , comments ) VALUES(DEFAULT, dd , 2 , 2 );';
    /*
    "pkid",
    "name": "title",
    "name": "like_count",
    "name": "comments",
    */
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json(
          {'failed':true,
           "message":"some thing went wrong",
           'err':err,
           'req':query
         });
      }
    });
  });
}
else
{
  res.json({'failed':true, "message":"null values sent"});
}
});

router.get('/initSnippetObjectDb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE SnippetObject(pkid SERIAL PRIMARY KEY , title TEXT ,likes INT ,comments TEXT);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created"});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});

router.get('/gg', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'INSERT INTO SnippetObject(pkid, title , likes , comments ) VALUES(1, dd , 2 , 2 );';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created"});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});
router.get('/selectKluminati', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM Kluminati;';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json({'failed':true, "message":"some thing went wrong"});
      }
    })
  })
});
router.get('/insertKluminatiObject', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'INSERT INTO Kluminati(title) VALUES(2);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json({'failed':true, "message":"some thing went wrong"});
      }
    })
  })
});
router.get('/selectSnippetObject', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM SnippetObject;';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json({'failed':true, "message":"some thing went wrong"});
      }
    })
  })
});


router.get('/drop', (req, res)=>{
pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
var query =  'DROP TABLE SnippetObject;';
client.query(query, (err, result)=>{
if(!err)
res.json({'success':true, "message":"talbes created",'result':result});
})
})
});
router.get('/dropKlu', (req, res)=>{
pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
var query =  'DROP TABLE Kluminati;';
client.query(query, (err, result)=>{
if(!err)
res.json({'success':true, "message":"talbes created",'result':result});
})
})
});
router.get('/initKlu', (req, res)=>{
pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
var query =  'CREATE TABLE Kluminati(id SERIAL PRIMARY KEY , title TEXT);';
client.query(query, (err, result)=>{
if(!err)
res.json({'success':true, "message":"talbes created",'result':result});
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
