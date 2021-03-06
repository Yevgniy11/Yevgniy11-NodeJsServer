var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
//var path = require('path');
var formidable = require('express-formidable');
var formidableMiddleware = formidable.parse({keepExtensions:true});
router.use(formidableMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Node Js Server Runing</h1>');
});

router.post('/insertSnippetObject', (req, res)=>{
  var title = req.body.title ;
  var likes = req.body.likes;
  var comments = req.body.comments;
  var username = req.body.username;
  var input = req.body.input;

  var jarr = [];
  jarr = JSON.stringify(jarr);
  if(title!=null && likes!=null && input!=null&& username!=null){
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      if(!err){
        var query =  "INSERT INTO SnippetObject( title,likes,comments,username,input) VALUES($1,$2,'"+jarr+"',$3,$4);";
        client.query(query,[title,likes,username,input],(err, result)=>{
          if(!err)
          res.json({'success':"true", "message":"Object inserted to the db successfully",'result':result});
          else {
            res.json({'success':"false", "message":"some thing went wrong",'err':err});
          }
        })
      }
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

router.post('/incrementLikes', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var objectId = req.body.objectId;
    var tempLike = 0;
    var query =  'SELECT likes FROM SnippetObject WHERE id=$1';
    client.query(query,[objectId], (err, result)=>{
      if(!err){
        tempLike = result.rows[0].likes ;
        tempLike+=1;
        var insertQuery ="UPDATE SnippetObject SET likes=$1 WHERE id=$2;";
        client.query(insertQuery,[tempLike,objectId], (err, result)=>{
          if(!err){
            res.json({'success':"true", "message":"Like was incremented",'result':result});
          }
          else {
            res.json({'success':"false", "message":"some thing went wrong,when incrementing the like count",'error':err});
          }
        });

      }
      else {
        res.json({'success':"false", "message":"some thing went wrong,when getting the temp like count",'error':err});
      }
    })
    //res.json({'dd':tempLike});
    if(err)
      res.json({'success':"false", "message":"some thing went wrong, check heroku",'result':result});
  })
});


router.post('/login', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var user = req.body.user;
    var pass = req.body.pass;
    var query = 'SELECT username,password FROM Users WHERE username=$1 AND password=$2;';
    client.query(query,[user,pass],(err, result)=>{
      if(!err){
        if (result.rowCount > 0)
        res.json({'success':"true", "message":"Select is successful",'result':result});
        else
        res.json({'success':"false", "message":"Invalid username or password, try again.",'error':result});
      }
      else
      res.json({'success':"false", "message":"some thing went wrong",'error':err});
    });
    if(err)
      res.json({'success':"false", "message":"some thing went wrong",'error':err});
  })
  });

  router.post('/registerUser', (req, res)=>{
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var user = req.body.username;
      var pass = req.body.password;
      var email = req.body.email;
      if(user!=""&&user!=null&& pass!=""&&pass!=null&&email!=""&&email!=null){
        var userCheckResult = userCheck(user,email,(result)=>{
          if(result.success == 'true'){
            var query = "INSERT INTO Users(username,password,email) VALUES($1,$2,$3);";
            client.query(query,[user,pass,email],(err, result)=>{
              if(!err){
                if (result.rowCount > 0)
                res.json({'success':"true", "message":"User Registerd"});
                res.json({'success':"false", "message":"Invalid username or password, try again."});
              }else
              res.json({'success':"false", "message":"some thing went wrong",'error':err});
            }
          )
        }else
        res.json({'success':"false", "message":result.message});
      });

    }else
    res.json({'success':"false", "message":"Parameters 'email,usermname,password' cant be empty."});
  })
});

function userCheck(username,email,fun){
  var query = "SELECT * FROM Users WHERE username=$1 OR email=$2;";
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    client.query(query,[username,email],(err, result)=>{
      if(!err){
        if (result.rowCount == 0){
          //res.json({'success':"true", "message":"Select is successful",'result':result});
          fun({'success':"true"});
        }
        else {
          fun({'success':"false", "message":"Username or email is taken",'err':err});
        }
      }
      else {
        fun({'success':"false", "message":"Query failed",'err':err});
      }
    })
  })
};
router.post('/select', (req, res)=>{
  pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
    var query =  "SELECT username,password,email FROM Users ;";
    client.query(query, (err, result)=>{
      if(!err)
      res.json({'success':"true", "message":"Select is successful",'result':result});
      else {
        res.json({'success':"false", "message":"some thing went wrong",'error':err});
      }})
    })
  });

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

  router.post('/deleteUserTable', (req, res)=>{
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var query =  'DELETE FROM Users;';
      client.query(query, (err, result)=>{
        if(!err)
        res.json({'success':"true", "message":"Table Created","result":result});
        else {
          res.json({'success':"false", "message":"some thing went wrong.",'err':err});
        }
      })
    })
  });

  router.post('/getFeed', (req, res)=>{
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var query =  'SELECT * FROM SnippetObject;';
      client.query(query, (err, result)=>{
        if(!err)
        res.json({'success':"true", "message":"Table Created","result":result});
        else {
          res.json({'success':"false", "message":"some thing went wrong.",'err':err});
        }
      })
    })
  });

  router.post('/updateComments', (req, res)=>{

    var id = req.body.id;
    var comment = req.body.comment;

    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var query =  "SELECT comments FROM SnippetObject WHERE id=$1 ;";
      client.query(query,[id] ,(err, result)=>{
        if(!err){
          //res.json({'com':result.rows[0]});
          var com = JSON.parse(result.rows[0].comments );
          //res.json({'success':"true",'result':JSON.parse(com)});
          var newObj = com.push(JSON.parse(comment));
          var newCommentValue = JSON.stringify(com);
          //res.json({'success':com,'rr':newCommentValue});
          var updateQuery = "UPDATE SnippetObject SET comments=$1 WHERE id=$2;"
          client.query(updateQuery,[newCommentValue,id], (err, result)=>{
            if(!err){
              res.json({'success':"true", "message":"Update is successful",'result':result});
            }
            else {
              res.json({'success':"false", "message":"failed to save new comment",'error':err});
            }
          })
        }
        else {
          res.json({'success':"false", "message":"cant get the original comments",'error':err});
        }
      })
    })
  });


      router.post('/deleteFromSnippet', (req, res)=>{
        pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
          var query =  "DELETE FROM SnippetObject;";
          client.query(query, (err, result)=>{
            if(!err)
            res.json({'success':"true", "message":"delete is successful",'result':result});
            else {
              res.json({'success':"false", "message":"some thing went wrong",'error':err});
            }})
          })
        });

      module.exports = router;
