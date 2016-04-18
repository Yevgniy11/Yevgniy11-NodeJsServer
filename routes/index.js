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
      var query =  "INSERT INTO SnippetObject( title , likes , comments ) VALUES( '"+title+"',"+like_count+",'"+comments+"');";
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


/*

*/

module.exports = router;
