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
        res.json({'success':"true", "message":"Object inserted to the db successfully",'result':result});
        else {
          res.json({'success':"false", "message":"some thing went wrong",'err':err});
        }
      })
    });
  }else
  {
    res.json({'success':"true", "message":"null values sent"});
  }
});

router.post('/selectSnippetObject', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'SELECT * FROM SnippetObject';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':"true", "message":"Select is successful",'result':result.rows});
      else {
        res.json({'success':"false", "message":"some thing went wrong",'error':err});
      }
    })
  })
});

router.post('/login', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var user = req.body.username;
    var pass = req.body.password;
    var query = "SELECT username,password FROM Users WHERE username='"+user+"' AND password='"+pass+"';";
    client.query(query, (err, result)=>{
      if(!err){
        if (result.rowCount > 0)
          res.json({'success':"true", "message":"Select is successful"});
        res.json({'success':"false", "message":"Invalid username or password, try again."});
      }
      else
        res.json({'success':"false", "message":"some thing went wrong",'error':err});
    })})
});

router.post('/registerUser', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var user = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;
    var query = "INSERT INTO Users(username,password,email) VALUES($1,$2,$3);";
    client.query(query,[user],[pass],[email],(err, result)=>{
      if(!err){
        if (result.rowCount > 0)
          res.json({'success':"true", "message":"Select is successful"});
        res.json({'success':"false", "message":"Invalid username or password, try again."});
      }
      else
        res.json({'success':"false", "message":"some thing went wrong",'error':err});
    })})
});

router.post('/select', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var user = req.body.username;
    var pass = req.body.password;
    var query =  "SELECT username,password FROM Users ;";
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':"true", "message":"Select is successful",'result':result});
      else {
        res.json({'success':"false", "message":"some thing went wrong",'error':err});}})})}
);

router.post('/initUsers', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'CREATE TABLE Users(id SERIAL PRIMARY KEY  , password VARCHAR ,username VARCHAR,email VARCHAR);';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':"true", "message":"Table Created","result":result});
      else {
        res.json({'success':"false", "message":"some thing went wrong.",'err':err});
      }
    })
  })
});
router.post('/dropUsers', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  'DROP TABLE Users;';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':"true", "message":"Table droped","result":result});
      else {
        res.json({'success':"false", "message":"some thing went wrong.",'err':err});
      }
    })
  })
});
/*
router.post('/basic', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  '';
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':true, "message":"Select is successful",'result':result.rows});
      else {
        res.json({'success':false, "message":"some thing went wrong",'error':err});}})})}
);
*/
module.exports = router;
