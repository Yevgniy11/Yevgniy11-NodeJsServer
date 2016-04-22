var express = require('express');
var router = express.Router();
var pg = require('pg');

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

  if(title!=null && likes!=null && comments!=null){
    pg.connect(process.env.DATABASE_URL, (err, client, done)=>{
      var query =  "INSERT INTO SnippetObject( title,likes,comments,username,input) VALUES($1,$2,$3,$4,$5);";

      client.query(query,[title,likes,comments,username,input],(err, result)=>{
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
            res.json({'success':"true", "message":"Insert is successful",'result':result});
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
    })})
  });

  router.get('/key',(req,res)=>{
    var connectionString = "postgres://agcyhphanaohru:Se2XX6hID2-23PsP_f86-k0dFW@ec2-54-163-254-231.compute-1.amazonaws.com:5432:/dfd216d1sm2ejf";
    pg.connect(connectionString, (err, client, done)=>{
      var query =  "SELECT username,password FROM Users ;";
      client.query(query, (err, result)=>{
        if(!err)
        res.json({'success':"true", "message":"Select is successful",'result':result});
        else {
          res.json({'success':"false", "message":"some thing went wrong",'error':err});
        }})})
        //res.json({'success':"false", "message":"some thing went wrong",'error':connectionString});
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
      /*
      getFeed
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
