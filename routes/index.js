var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */

router.post('/insertSnippetObject', (req, res)=>{
  var title = req.body.title ;
  var likes = req.body.likes;
  var comments = req.body.comments;

  if(title!=null && likes!=null && comments!=null){
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var query =  "INSERT INTO SnippetObject( title , likes , comments ) VALUES( '"+title+"',"+likes+",'"+comments+"');";
      client.query(query, (err, result)=>{
        if(!err)
        res.json({'success':true, "message":"talbes created",'result':result});
        else {
          res.json({'failed':true, "message":"some thing went wrong",'err':err});
        }
      })
    });
  }else
  {
    res.json({'failed':true, "message":"null values sent"});
  }
});

router.post('/initSnippetObjectDb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE SnippetObject(id SERIAL PRIMARY KEY  , title VARCHAR ,likes INT ,comments VARCHAR);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created"});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});

router.get('/drop', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'DROP TABLE SnippetObject';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created"});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});

router.post('/selectSnippetObject', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM SnippetObject';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'res':result.rows});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});
/*

*/

module.exports = router;
