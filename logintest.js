var oracledb = require('oracledb');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
name = 'Nope';

oracledb.autoCommit = true;
oracledb.getConnection(
  {
    user : 'system',
    password : 'database!2',
    connectString : 'localhost/XE'
  },

  function(err, connection) {
    if(err) {
      console.error(err.message);;
      return;
    }

    app.use(express.static(path.join(__dirname, '/mydir'))) // 무슨역할이지..
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json())
    app.use(bodyParser.text())

    app.use(session({
      secret: '12312dajfj23rj2po4$#%@#',
      resave: false,
      saveUninitialized: true
    }));

    app.get('/main', function(req, res) {
      res.sendFile('./main.html', {root: path.join(__dirname, '')});
    });

    app.get('/home', function(req, res) {
      res.sendFile('./home.html', {root: path.join(__dirname, '')});
    });

    app.get('/customer', function(req, res) {
      res.sendFile('./customer.html', {root: path.join(__dirname, '')});
    });

    app.get('/membership', function(req, res) {
      res.sendFile('./membership.html', {root: path.join(__dirname, '')});
    });

    app.get('/mymembership', function(req, res) {
      res.sendFile('./mymembership.html', {root: path.join(__dirname, '')});
    });

    app.get('/notice', function(req, res) {
      res.sendFile('./notice.html', {root: path.join(__dirname, '')});
    });

    app.get('/res-confirm', function(req, res) {
      res.sendFile('./res-confirm.html', {root: path.join(__dirname, '')});
    });

    app.get('/totalreservation', function(req, res) {
      res.sendFile('./totalreservation.html', {root: path.join(__dirname, '')});
    });

    app.get('/mem-res-confirm', function(req, res) {
      res.sendFile('./mem-res-confirm.html', {root: path.join(__dirname, '')});
    });

    app.get('/join', function(req, res) {
      res.sendFile('./join.html', {root: path.join(__dirname, '')});
    });

    app.get('/login', function(req, res) {
      res.sendFile('./login.html', {root: path.join(__dirname, '')}); //path.. 뭐지..
    });

    app.get('/searchID', function(req, res) {
      res.sendFile('./searchID.html', {root: path.join(__dirname, '')});
    });

    app.get('/searchPW', function(req, res) {
      res.sendFile('./searchPW.html', {root: path.join(__dirname, '')});
    });

    app.get('/welcome', function(req, res) {
      res.send(`
      <h1>Hello, ${name}</h1>
      <a href="/login">Logout</a>
      `);
    });

    



    app.get('/',function(req,res){
      // http://localhost:3000/
      res.sendFile('./index.html', {root: path.join(__dirname, '')})
    })

    app.post('/reservationscene',function(req,res){
      var ID = req.body.ID
      var sql = "SELECT * FROM ReservationTable WHERE RoomNumber IN (SELECT RoomNumber FROM ReservationTable WHERE StartDate = '" + ID +"')";

      var sess = req.session
      connection.execute(sql, function(err, result) {
        if(err) {
          console.err(err.message);
          return;
        }
        sess.Room_ID = result.rows[0][0];
        sess.Room_Number = result.rows[0][1];
        sess.Room_EndDate = result.rows[0][3];

        res.redirect('/reservation');
        console.log(sess.Room_ID);
      });
    });

    app.get('/reservation',function (req,res) {
      res.sendFile('./reservation.html', {root: path.join(__dirname, '')})
    })

    app.get('/getSession',function(req,res) {
      var sess = req.session
      res.json({
        Room_ID : req.session.Room_ID,
        Room_Number : req.session.Room_Number,
        Room_EndDate : req.session.Room_EndDate
      })
    })

    app.listen(3456, function() {
      console.log("Connected 3456 port!!!");
    });
  }
)