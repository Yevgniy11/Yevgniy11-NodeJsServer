var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/drop', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'DROP TABLE SnippetObject;';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created",'result':result});
      else {
        res.json({'success':false, "message":"talbes created",'result':err});
      }
    })
  })
});

router.get('/initSnippetObjectDb', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE SnippetObject(id SERIAL PRIMARY KEY  , title TEXT ,likes INT ,comments TEXT);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"talbes created"});
      else {
        res.json({'failed':true, "message":"some thing went wrong",'err':err});
      }
    })
  })
});
