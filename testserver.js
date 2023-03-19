const express=require('express');
const app=express();
let port = 8080;
const fs=require('fs');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.use(express.json())
app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.static(__dirname+"/views"))

app.get("/",function(req,res){
    res.render("login.ejs")
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

// app.get("/home",(req,res)=>{
//     res.render("home.ejs")
// })

app.get("/register",function(req,res){
    res.render("register.ejs")
})

app.post("/register",function(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    fs.readFile("databasetest.json",function(err,data){
        if(err){
            console.log(err)
        }
        const existingData=JSON.parse(data);
        existingData[email]={name:name,password:password};
        fs.writeFile("database.json",
        JSON.stringify(existingData,null,2),
        function(err){
            if(err){
                console.log(err)
            }else{
                console.log("Successfully Written")
            }
        }
        )
        res.redirect("/login")
    })
})

app.post("/login",function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    fs.readFile("databasetest.json",function(err,data){
        if(err){
            console.log(err)
        }
        const userData=JSON.parse(data);
        if(userData[email]&&userData[email].password==password)res.render("home.ejs",{email})
        else res.render("login.ejs",{vaild:false,message:"Enter a Vaild Email address"})
    })
})

app.post("/taskDetails",function(req,res){
    fs.readFile("userdetails.json",function(err,data){
        if(err){
            console.log(err)
        }
        const existingData=JSON.parse(data);
        const email=Object.keys(existingData);
        
    })
})

app.listen(port, ()=>{
    console.log(`Listening on port no ${port} `)
})