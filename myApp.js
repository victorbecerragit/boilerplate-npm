var express = require('express');
var app = express();

//** meet the node console  */
console.log("Hello World");

//** Implement a Root-Level Request Logger Middleware */
app.use(function middleware(req, res, next) {
 console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//** start working with express server*/
// app.get("/", function(req, res) {
//  res.send("Hello Express");
//}); 

//** serve an html file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//** serve static assets */
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));


//** server JSON on a specific route  */
//app.get("/json", (req, res) => {
//  res.json({
//    message: "Hello json"
//  });
//});

//** Use the .env variables */
app.get('/json',(req,res)=>{
  if(process.env.MESSAGE_STYLE==="uppercase"){
res.json({
"message":"HELLO JSON"
})
  }else{
    res.json({
      "message":"Hello json"
    })
  }
})


//** Chain Middleware to Create a Time Server */
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
module.exports = app;
