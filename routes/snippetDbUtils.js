var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/initSnippetObjectDb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE SnippetObject(id SERIAL PRIMARY KEY  , title VARCHAR ,likes INT ,comments VARCHAR);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"Talbes Created","result":result});
      else {
        res.json({'success':false, "message":"some thing went wrong.",'err':err});
      }
    })
  })
});

router.get('/drop', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'DROP TABLE SnippetObject';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json({'success':false, "message":"Table is not droped",'error':err});
      }
    })
  })
});
module.exports = router;
