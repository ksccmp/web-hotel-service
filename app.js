var oracledb = require('oracledb')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')
var app = express();
name = 'Nope';
help = 'Nope';
resuserroomtype = 'Nope';

function simpletimedout(consoletimer1){
  console.timeEnd(consoletimer1)
}


oracledb.autoCommit=true;
oracledb.getConnection(
  {
    user:'database',
    password:'database',
    connectString:'localhost/XE'
  },

  function(err,connection){
    if(err){
      console.error(err.message);
      return;

    }



// GET , POST , DELETE 등등...

app.use(express.static(path.join(__dirname,'/')))

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}))


app.get('/',function(req,res){
  // http://localhost:3000/
  res.sendFile('./home.html', {root: path.join(__dirname, '')})
})

app.get('/logout', function(req, res) {
  sess = req.session;
  if(sess.USER_ID){
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      }else{
        name = 'Nope'
        res.redirect('/')
      }
    })
  }else{
    res.redirect('/')
  }
})

app.get('/stafflogout', function(req, res) {
  sess = req.session;
  if(sess.USER_ID){
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      }else{
        name = 'Nope'
        res.redirect('/employee_home')
      }
    })
  }else{
    res.redirect('/employee_home')
  }
})

app.get('/home',function(req,res){
  res.sendFile('./home.html', {root: path.join(__dirname, '')})
})

app.get('/totalreservation',function(req,res){
  // http://localhost:3000/
  res.sendFile('/totalreservation.html', {root: path.join(__dirname, '')})
})

app.get('/staffmanage',function(req,res){
  // http://localhost:3000/
  res.sendFile('/staffmanage.html', {root: path.join(__dirname, '')})
})
app.get('/customermanage',function(req,res){
  // http://localhost:3000/
  res.sendFile('/customermanage.html', {root: path.join(__dirname, '')})
})
app.get('/calender',function(req,res){
  // http://localhost:3000/
  res.sendFile('/calender.html', {root: path.join(__dirname, '')})
})



app.get('/employee_home',function(req,res){
  // http://localhost:3000/
  res.sendFile('/employee_home.html', {root: path.join(__dirname, '')})
})


app.get('/mypage',function(req,res){
  // http://localhost:3000/

  setTimeout(function() {
    res.sendFile('/mypage.html', {root: path.join(__dirname, '')})
  }, 120);
})


app.get('/staffmypage',function(req,res){
  // http://localhost:3000/

  setTimeout(function() {
    res.sendFile('/staffmypage.html', {root: path.join(__dirname, '')})
  }, 120);
})

app.get('/find',function(req,res){
  // http://localhost:3000/
  res.sendFile('/find.html', {root: path.join(__dirname, '')})
})
app.get('/mypage/getdata',function(req,res){
  // http://localhost:3000/
  var sess = req.session

  var sql = "SELECT * FROM CUSTOMER WHERE customerID = '" + sess.USER_ID +"'";

  connection.execute(sql,function(err,result){
    if(err) {
      console.error(err.message);
      return;
    }

    res.json({
      User_PW : result.rows[0][1],
      User_ID : result.rows[0][0],
      User_Name : result.rows[0][2],
      User_phone : result.rows[0][3],
      User_address : result.rows[0][5],
      User_email : result.rows[0][6],
      User_total :result.rows[0][8] ,
      User_point : result.rows[0][9]

    })


  });
})

app.get('/staffmypage/getstaffdata',function(req,res){
  // http://localhost:3000/
  var sess = req.session

  var sql = "SELECT * FROM Staff WHERE Staffid = '" + sess.USER_ID +"'";

  connection.execute(sql,function(err,result){
    if(err) {
      console.error(err.message);
      return;
    }
    if(result.rows[0]==undefined)
    {
      res.send(`
      <script>
      alert("우선 로그인을 해주세요.");
      location.href='http://localhost:3456/employee_home';
      </script>
      `);
    }else{
    res.json({

      User_ID : result.rows[0][0],
      User_PW : result.rows[0][1],
      User_Name : result.rows[0][2],
      User_phone : result.rows[0][3],
      User_address : result.rows[0][5],
      User_email : result.rows[0][6],
      User_rank :result.rows[0][8] ,
      User_team : result.rows[0][13]

    })
  }


  });
})

app.get('/stafffind',function(req,res){
  // http://localhost:3000/
  res.sendFile('/stafffind.html', {root: path.join(__dirname, '')})
})

app.get('/customer',function(req,res){
  // http://localhost:3000/
  res.sendFile('/customer.html', {root: path.join(__dirname, '')})
})

app.get('/membership',function(req,res){
  // http://localhost:3000/
  res.sendFile('/membership.html', {root: path.join(__dirname, '')})
})

app.get('/mymembership',function(req,res){
  // http://localhost:3000/
  res.sendFile('/mymembership.html', {root: path.join(__dirname, '')})
})

app.get('/mem-res-confirm',function(req, res){
  // http://localhost:3000/
  var sess = req.session;
  var sql = "SELECT BookingID, Startdate, Enddate, RoomNumber, PeopleNumber FROM Booking WHERE CustomerID = '" + sess.USER_NAME + "'";

  connection.execute(sql, function(err, result) {
    if(err) {
      console.error(err.message);
      return;
    }
    checkreservation = result.rows;

    var membookingid = "";
    var memstartdate = "";
    var memenddate = "";
    var memroomnumber = "";
    var mempeoplenumber = "";

    for(var i=0; i<result.rows.length; i++) {
      membookingid += result.rows[i][0] + ",";
      memstartdate += (result.rows[i][1] + "").substring(0, 10) + ",";
      memenddate += (result.rows[i][2] + "").substring(0, 10) + ",";
      memroomnumber += result.rows[i][3] + ",";
      mempeoplenumber += result.rows[i][4] + ",";
    }

    req.session.bookingid = membookingid.split(",");
    req.session.startdate = memstartdate.split(",");
    req.session.enddate = memenddate.split(",");
    req.session.roomnumber = memroomnumber.split(",");
    req.session.peoplenumber = mempeoplenumber.split(",");
  })
    setTimeout(function() {
      res.sendFile('/mem-res-confirm.html', {root: path.join(__dirname, '')})
    }, 220);
  })

app.post('/mypage/modandsave',function(req,res){
  var sess = req.session
  console.log(req.body);
  var sql = "UPDATE customer SET CustomerPW = '"+req.body.pw +"', Email ='" +req.body.email + "' , Address = '" + req.body.address + "', Phone = '" + req.body.phone + "' WHERE CustomerID = '" + sess.USER_ID +"'";


  connection.execute(sql,function(err,result){
    if(err) {
      console.error(err.message);
      return;
    }
    res.send(`
    <script>
    alert("정보가 변경되었습니다.");
    location.href='http://localhost:3456/home';
    </script>
    `);
  });
})


app.post('/staffmypage/staffmodandsave',function(req,res){
  var sess = req.session
  console.log(req.body);
  var sql = "UPDATE staff SET StaffPW = '"+req.body.pw +"', Email ='" +req.body.email + "' , Address = '" + req.body.address + "', Phone = '" + req.body.phone + "' WHERE StaffID = '" + sess.USER_ID +"'";


  connection.execute(sql,function(err,result){
    if(err) {
      console.error(err.message);
      return;
    }
  });
})










  app.post('/mem-res-confirm',function(req, res) {
    var sql = "DELETE FROM Booking WHERE BookingID = " + req.body.userroomtype;

    connection.execute(sql,function(err,result){
      if(err) {
        console.error(err.message);
        return;
      }
      res.send(`
      <script>
      alert("예약이 취소되었습니다.");
      location.href='http://localhost:3456/home';
      </script>
      `);
    });
  });





  app.get('/pay',function (req, res) {
    res.sendFile('./pay.html', {root: path.join(__dirname, '')})
  })

  app.post('/pay', function(req, res) {
    var sql = "SELECT to_char((SELECT to_date('" + req.session.UserCheckIn + "', 'yyyy-mm-dd') FROM dual), 'yyyymmdd') FROM dual";
    var rmnumber;
    var sess = req.session;
    connection.execute(sql, function(err, result) {
      if(err) {
        console.error(err.message);
        return;
      }
      rmnumber = result.rows;
      var jssplit = req.body.payuserroomtype.split(' ');
      var rmid = rmnumber + jssplit[0];

      sql = "SELECT to_number('" + rmid + "') FROM dual";
      connection.execute(sql, function(err, results) {
        if(err) {
          console.error(err.message);
          return;
        }
        sql = "INSERT INTO Booking VALUES (" + results.rows + ", 3, 'card', 1000, '" + req.session.UserCheckOut + "', '" + req.session.UserCheckIn + "', " + jssplit[0] + ", '" + sess.USER_NAME + "', 'No', 'No', 123, 0, 2018)";
        connection.execute(sql, function(err, resultss) {
          if(err) {
            console.error(err.message);
            return;
          }
          res.send(
            `<script>alert("예약되었습니다.");
            location.href='http://localhost:3456/home'
            </script>`)
        });
      });
    });
  });


app.get('/login',function(req,res){
  // http://localhost:3000/
  res.sendFile('/login.html', {root: path.join(__dirname, '')})
})

app.get('/staffjoin',function(req,res){
  // http://localhost:3000/
  res.sendFile('/staffjoin.html', {root: path.join(__dirname, '')})
})

app.get('/stafflogin',function(req,res){
  // http://localhost:3000/
  res.sendFile('/stafflogin.html', {root: path.join(__dirname, '')})
})

app.get('/information',function(req,res){
  // http://localhost:3000/
  res.sendFile('/information.html', {root: path.join(__dirname, '')})
})

app.get('/roomintroduce',function(req,res){
  // http://localhost:3000/
  res.sendFile('/roomintroduce.html', {root: path.join(__dirname, '')})
})

app.post('/setdate',function(req,res){
  var startdate =  req.body.UserCheckIN
  var enddate =  req.body.UserCheckOUT

  var sess = req.session
  sess.UserCheckIn = req.body.UserCheckIN
  sess.UserCheckOut = req.body.UserCheckOUT

  var sql = "SELECT roomnumber FROM room WHERE roomnumber not in (SELECT roomnumber FROM booking WHERE startdate >= '" + startdate + "' and startdate <= '" + enddate + "' or enddate > '" + startdate + "' and enddate <= '" + enddate + "')";

  connection.execute(sql,function(err,result){
    if(err) {
      console.error(err.message);
      return;
    }
    sess.Usable_Room  = result.rows;
    help = result.rows;

  });
  setTimeout(function() {
    res.sendFile('/totalreservation.html',
    {root: path.join(__dirname, '')})
  }, 200);

});

app.post('/totalreservation', function(req, res) {
  if(req.body.startdate == "" || req.body.enddate == "" || req.body.userroomtype == undefined || req.body.paymethod == "") {
    res.send(
      `<script>alert("입력사항을 더 입력해주세요.");
      history.back();
      </script>`)
  }

  else if(req.body.enddate <= req.body.startdate) {
    res.send(
      `<script>alert("날짜를 조정해주세요.");
      history.back();
      </script>`)
  }
  else {
    var jssplit = req.body.userroomtype.split(' ');
    var sql = "SELECT WinePrice FROM Room Where RoomNumber = " + jssplit[0] ;
    req.session.CardName = req.body.paymethod;
    connection.execute(sql, function(err, result) {
        if(err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
        req.session.resprice = result.rows;

        sql = "SELECT Email FROM Customer Where CustomerID = '" + req.session.USER_ID + "'";
        connection.execute(sql, function(err, results) {
          if(err) {
            console.error(err.message);
            return;
          }
          console.log(results.rows);
          req.session.resemail = results.rows;

          sql = "SELECT Phone FROM Customer Where CustomerID = '" + req.session.USER_ID + "'";
          connection.execute(sql, function(err, resultss) {
            if(err) {
              console.error(err.message);
              return;
            }
            console.log(resultss.rows);
            req.session.resphone = resultss.rows;
            resuserroomtype = jssplit[0];

            console.log(req.session.resprice + " " + req.session.resemail + " " + req.session.resphone + " " + resuserroomtype + " " + req.session.CardName);
          });
        });
    });

    setTimeout(function() {
      res.redirect('/pay');
    }, 500);
    //res.redirect('/pay')
  }
});


app.post('/login', function(req, res) {

  if(req.body.ID == "" || req.body.PW == "") {
    res.send(`
    <script>
    alert("아이디 및 비밀번호를 확인해주세요.");
    history.back();
    </script>
    `);
  }
  else {
    var uname = req.body.ID;
    var userpw = req.body.PW

  var sess = req.session
  sess.USER_ID = uname
  sess.USER_PW = userpw

  var sql = "SELECT CustomerPW FROM Customer WHERE CustomerID = '" + uname +"'";

  connection.execute(sql, function(err, result) {
    if(err) {
      console.error(err.message);
      return;
    }

    if(result.rows == req.body.PW) {
      sql = "SELECT Name FROM Customer WHERE CustomerID = '" + uname+"'";
      connection.execute(sql, function(err, results) {
        if(err) {
          console.error(err.message);
          return;
        }
        sess.USER_NAME = results.rows;
        name = results.rows;

      });

      setTimeout(function() {
        res.sendFile(path.join(__dirname,'/home.html'))
      }, 120);



    }
    else {
      res.send(`
      <script>
      alert("아이디 및 비밀번호를 확인해주세요.");
      history.back();
      </script>
      `);
    }
  });
}
});

app.post('/stafflogin', function(req, res) {

  if(req.body.ID == "" || req.body.PW == "") {
    res.send(`
    <script>
    alert("아이디 및 비밀번호를 확인해주세요.");
    history.back();
    </script>
    `);
  }
  else {
    var uname = req.body.ID;
    var userpw = req.body.PW;

  var sess = req.session
  sess.USER_ID = uname
  sess.USER_PW = userpw

  var sql = "SELECT StaffPW FROM Staff WHERE StaffID = '" + uname +"'";

  connection.execute(sql, function(err, result) {
    if(err) {
      console.log("first errer???");
      console.error(err.message);
      return;
    }

    if(result.rows == req.body.PW) {
      sql = "SELECT Name FROM Staff WHERE StaffID = '" + uname+"'";
      connection.execute(sql, function(err, results) {
        if(err) {
          console.log("secnod errer???");
          console.error(err.message);
          return;
        }
        sess.USER_NAME = results.rows;
        name = results.rows;

      });

      setTimeout(function() {
        res.sendFile(path.join(__dirname,'/employee_home.html'))
      }, 120);



    }
    else {
      res.send(`
      <script>
      alert("아이디 및 비밀번호를 확인해주세요.");
      history.back();
      </script>
      `);
    }
  });
}
});

app.post('/searchPW', function(req, res) {
  var sql = "SELECT CustomerPW FROM Customer WHERE Name = '" + req.body.me_name + "' and Phone = '" + req.body.me_phone + "' and CustomerID = '"+req.body.me_id+"'";

  connection.execute(sql, function(err, result) {

    if(result.rows[0]== undefined)
    {
      res.send(
        `<script>alert("입력하신 정보가 맞지 않습니다.");
        history.go(-1);
          </script>`)
    }
    else{


    var id = result.rows[0][0];
    if(err) {

      console.err(err.message);
      return;
    }

    res.send(
    `<script>alert("찾으시는 비밀번호는 `+id+` 입니다.");
    history.go(-1);
      </script>`)
    }
  });
});

app.post('/searchID', function(req, res) {
  var sql = "SELECT CustomerID FROM Customer WHERE Name = '" + req.body.me_name + "' and Phone = '" + req.body.me_mobile + "'";

  connection.execute(sql, function(err, result) {

    if(result.rows[0]== undefined)
    {
      res.send(
        `<script>alert("입력하신 정보가 맞지 않습니다.");
        history.go(-1);
          </script>`)
    }
    else{


    var id = result.rows[0][0];
    if(err) {

      console.err(err.message);
      return;
    }

    res.send(
    `<script>alert("찾으시는 id는 `+id+` 입니다.");
    history.go(-1);
      </script>`)
    }
  });
});

app.post('/join', function(req, res) {
  if(req.body.PassWord.length < 6 || req.body.PassWordCheck.length < 6) {
    res.send(`
    <script>
    alert("비밀번호는 6글자이상이여 합니다.");
    history.back();
    </script>
    `);
  }
  else if(req.body.PassWord != req.body.PassWordCheck) {
    res.send(`
    <script>
    alert("비밀번호가 다릅니다.");
    history.back();
    </script>
    `);
  }
  else {
  var sql = "INSERT INTO Customer VALUES ('" + req.body.ID +"','"+req.body.PassWord+ "', '" + req.body.Name + "', '" + req.body.PhoneNumber + "', '" + req.body.gender + "', '" + req.body.Address+ "', '" + (req.body.first_email+"@"+req.body.last_email)+ "', '" + req.body.Birth+ "', '0','0')";

  connection.execute(sql, function(err, result) {
    if(err) {
      if(err="ORA-00001")
      {
        res.send(`
        <script>
        alert("중복된 아이디 입니다..");
        history.back();
        </script>
        `);
      }
      console.error(err.message);
      return;
    }
    res.redirect('/home');

  });
}
});


app.post('/staffjoin', function(req, res) {
  if(req.body.PassWord.length < 6 || req.body.PassWordCheck.length < 6) {
    res.send(`
    <script>
    alert("비밀번호는 6글자이상이여 합니다.");
    history.back();
    </script>
    `);
  }
  else if(req.body.PassWord != req.body.PassWordCheck) {
    res.send(`
    <script>
    alert("비밀번호가 다릅니다.");
    history.back();
    </script>
    `);
  }
  else {
  var sql = "INSERT INTO Staff VALUES ('" + req.body.ID +"','"+req.body.PassWord+"','"+req.body.Name+ "', '" + req.body.PhoneNumber + "', '" + req.body.gender + "', '" + req.body.Address + "', '" + (req.body.first_email+"@"+req.body.last_email)+ "', '" + req.body.Birth+ "', '사원', 0,'0','우수',18,'영업')";

  connection.execute(sql, function(err, result) {
    if(err) {
      if(err="ORA-00001")
      {
        res.send(`
        <script>
        alert("중복된 아이디 입니다..");
        history.back();
        </script>
        `);
      }
      console.error(err.message);
      return;
    }
    res.redirect('/employee_home');

  });
}
});

app.post('/home', function(req, res) {
  var startdate =  req.body.UserCheckIN
  var enddate =  req.body.UserCheckOUT

  var sess = req.session
  sess.UserCheckIn = req.body.UserCheckIN
  sess.UserCheckOut = req.body.UserCheckOUT
  if(sess.USER_NAME == undefined) {
    res.send(`
        <script>
        alert("로그인 해주세요...");
        history.back();
        </script>
        `);
  }
  else if(!(req.body.UserCheckIN == "" || req.body.UserCheckOUT == "") && (req.body.UserCheckIN >= req.body.UserCheckOUT)) {
    res.send(`
        <script>
        alert("날짜를 조정해주세요.");
        history.back();
        </script>
        `);
  }


  else {
    var sql = "SELECT roomnumber FROM room WHERE roomnumber not in (SELECT roomnumber FROM booking WHERE startdate >= '" + startdate + "' and startdate <= '" + enddate + "' or enddate > '" + startdate + "' and enddate <= '" + enddate + "')";

    connection.execute(sql,function(err,result){
      if(err) {
        console.error(err.message);
        return;
      }
      sess.Usable_Room  = result.rows
      help = result.rows;
    });

    setTimeout(function() {
      res.sendFile('/totalreservation.html', {root: path.join(__dirname, '')})
    }, 300);
  }
})

app.get('/getSession',function(req,res) {
  var sess = req.session

  res.json({
    UserCheckIn : req.session.UserCheckIn,
    UserCheckOut : req.session.UserCheckOut,
    User_Name : sess.USER_NAME,
    USER_ID : sess.USER_ID,
    USER_PW : sess.USER_PW,
    Usable_Room : sess.Usable_Room,
    memBookingID : sess.bookingid,
    memStartDate : sess.startdate,
    memEndDate : sess.enddate,
    memRoomNumber : sess.roomnumber,
    memPeopleNumber : sess.peoplenumber,
    resPrice : sess.resprice,
    resEmail : sess.resemail,
    resPhone : sess.resphone,
    resUserRoomType : resuserroomtype,
    resCardName : sess.CardName,
  })
})




app.post('/searchstaffPW', function(req, res) {
  var sql = "SELECT staffPW FROM STAFF WHERE Name = '" + req.body.me_name + "' and Phone = '" + req.body.me_phone + "' and staffID = '"+req.body.me_id+"'";

  connection.execute(sql, function(err, result) {

    if(result.rows[0]== undefined)
    {
      res.send(
        `<script>alert("입력하신 정보가 맞지 않습니다.");
        history.go(-1);
          </script>`)
    }
    else{


    var id = result.rows[0][0];
    if(err) {

      console.err(err.message);
      return;
    }

    res.send(
    `<script>alert("찾으시는 비밀번호는 `+id+` 입니다.");
    history.go(-1);
      </script>`)
    }
  });
});

app.post('/searchstaffID', function(req, res) {
  var sql = "SELECT staffID FROM Staff WHERE Name = '" + req.body.me_name + "' and Phone = '" + req.body.me_mobile + "'";

  connection.execute(sql, function(err, result) {

    if(result.rows[0]== undefined)
    {
      res.send(
        `<script>alert("입력하신 정보가 맞지 않습니다.");
        history.go(-1);
          </script>`)
    }
    else{


    var id = result.rows[0][0];
    if(err) {

      console.err(err.message);
      return;
    }

    res.send(
    `<script>alert("찾으시는 id는 `+id+` 입니다.");
    history.go(-1);
      </script>`)
    }
  });
});






app.get('/home',function (req,res) {
  res.sendFile('./home.html', {root: path.join(__dirname, '')})
})

app.get('/join',function (req,res) {
  res.sendFile('./join.html', {root: path.join(__dirname, '')})
})

app.listen(3456,function(){
  console.log('localhost:3456으로 가세요.')
})


  }
)
