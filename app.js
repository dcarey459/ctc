//jshint esversion:6

const express = require("express");
path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/agencies.html", function(req, res) {
  res.sendFile(__dirname + "/agencies.html");
});

app.get("/application.html", function(req, res) {
  res.sendFile(__dirname + "/application.html");
});

app.get("/buyAcar.html", function(req, res) {
  res.sendFile(__dirname + "/buyAcar.html");
});

app.get("/buyahome.html", function(req, res) {
  res.sendFile(__dirname + "/buyahome.html");
});

app.get("/carbrevealedbook.html", function(req, res) {
  res.sendFile(__dirname + "/carbrevealedbook.html");
});

app.get("/close.html", function(req, res) {
  res.sendFile(__dirname + "/close.html");
});

app.get("/ctcworkbook.html", function(req, res) {
  res.sendFile(__dirname + "/ctcworkbook.html");
});

app.get("/downpayment.html", function(req, res) {
  res.sendFile(__dirname + "/downpayment.html");
});

app.get("/failureCreditApp.html", function(req, res) {
  res.sendFile(__dirname + "/failureCreditApp.html");
});
app.get("/first.html", function(req, res) {
  res.sendFile(__dirname + "/first.html");
});

app.get("/houseHunt.html", function(req, res) {
  res.sendFile(__dirname + "/houseHunt.html");
});

app.get("/inspection.html", function(req, res) {
  res.sendFile(__dirname + "/inspection.html");
});

app.get("/offer.html", function(req, res) {
  res.sendFile(__dirname + "/offer.html");
});

app.get("/signup.html", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/signup_failure.html", function(req, res) {
  res.sendFile(__dirname + "/signup_failure.html");
});

app.get("/signup_login.html", function(req, res) {
  res.sendFile(__dirname + "/signup_login.html");
});

app.get("/signup_success.html", function(req, res) {
  res.sendFile(__dirname + "/signup_success.html");
});

app.get("/successCreditApp.html", function(req, res) {
  res.sendFile(__dirname + "/successCreditApp.html");
});


/******************FREEDOWNLOAD CODE*****************************************/
app.get('/', function (req, res) {
    res.send('<a href="/getdoc">Free Download</a>');
});

app.get('/getdoc', function (req, res) {
    res.download(path.join(__dirname, 'ctcFreeDload.pdf'), function (err) {
        console.log(err);
    });
});

// app.get('/public/docs', function (req, res) {
//     res.send('<a href="/getdoc">Free Download</a>');
// });
//
// app.get('/getdoc', function (req, res) {
//     res.download(path.join(__dirname, 'public/docs/ctcFreeDload.pdf'), function (err) {
//         console.log(err);
//     });
// });

// app.post("/signup_login.html", function(req, res){
//   res.sendFile(__dirname + "/signup_login.html");
// });

// This is the format Json we send to mailchimp per their API
app.post("/signup_login.html", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const phone = req.body.phone;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            PHONE: phone
        }
      }
    ]
};
  const jsonData = JSON.stringify(data);
/***********************************************/

  const url = "https://us5.api.mailchimp.com/3.0/lists/baa45728b8";
  const options = {
    method: "POST",
    auth: "Darrell1:d18d05bccab6860756896f01d9e25fb4-us5"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/signup_success.html");
    } else {
      res.sendFile(__dirname + "/signup_failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

// app.post("/signup_failure.html", function(req, res) {
//   res.redirect("/application");
// });


app.post("/signup_failure.html", function(req, res) {
  res.redirect("/signup_login.html");
});

// app.post("/signup_success.html", function(req, res) {
//   res.redirect("/signup_success.html");
// });


// app.listen(3000, function(){
//   console.log("Listen on port 3000");
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Listen on port 3000");
});
