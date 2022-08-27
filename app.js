const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/signup.html",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };
    var Jsondata = JSON.stringify(data);
    const Option = {
        method : "POST",
        auth : "sazzad :9d4863e0e3e00145f94b0e9c32864ca4-us11"
    }

    const url = "https://us11.api.mailchimp.com/3.0/lists/73a9ee9689"
    const request =  https.request(url,Option,function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(Jsondata);
    request.end();
})

app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000);

// api Key
// 9d4863e0e3e00145f94b0e9c32864ca4-us11

// unique Id
// 73a9ee9689.
