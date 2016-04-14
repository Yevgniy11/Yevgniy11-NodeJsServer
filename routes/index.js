var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */

router.get('/addnote', (req, res)=>{


  var id = 1;
  var title = 'OK';

  pg.connect(process.env.DATABASE_URL, (err, client, done)=>
  {
    var q = 'INSERT INTO Notes(id, title) VALUES (' + id+','+ title+')';
    client.query(q, (err, result)=>{
      done();
      if(!err)
      res.json({success:true, message:'added note', 'res':result});
    })
  }
);
});

router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO Notes(id, title) VALUES ('1','rr')", function(err, result) {
      done();
      if (err)
      {
        console.error(err); response.send("Error " + err);
      }
      else
      {
        response.render('pages/db', {results: result.rows} );
      }
    });
  });
})
router.get('/getValue', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'INSERT INTO Notes(id, title,note) VALUES (1,1,1);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
    })
  })
});

router.get('/initdb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE Muhamad(id INT, title INT);';
    client.query(query, (err, result)=>{
      if(!err)
        res.json({'success':true, "message":"talbes created"});
    })
  })
});

router.get('/g', function(req, res, next) {

  var result = 'gfgffffasdas';
  console.log('Connected');
  /*var JsoN = {};
  JsoN.yes = "Yep";
  JsoN.why = "Maybe";
  res.json(JsoN);*/
  res.end(result);

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
