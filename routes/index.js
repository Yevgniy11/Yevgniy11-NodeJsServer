var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  sendQuerry('SELECT * FROM SnippetObject');
  /*var JsoN = {};
  JsoN.yes = "Yep";
  JsoN.why = "Maybe";
  res.json(JsoN);*/

  res.end('dd');
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
