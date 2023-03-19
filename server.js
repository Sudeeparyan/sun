const { json } = require('express');
const express=require('express')
let app=express();
let port = 7800;
const fs=require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.use(express.json())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname +"/views"));

app.get("/",function (req,res){
    res.render("login.ejs")
})

app.get("/login",function(req,res){
    res.render("login.ejs")
})

app.get("/home",function(req,res){
    res.render("home.ejs")
})

app.get("/register",function(req,res){
    res.render("register.ejs")
})

app.post("/register",function(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    console.log(req.body);
    fs.readFile("database.json",function(err,data){
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
                console.log("successfully written")
            }
        }
        )
    });
    res.redirect("/login");
})


app.post("/login",function(req,res){
    let email= req.body.email;
    let password=req.body.password;
    console.log(email,password);
    fs.readFile("database.json",function(err,data){
        if (err) {
            console.log(err);
        }
        const userData = JSON.parse(data);
        if(userData[email] && userData[email].password==password)res.render("home.ejs",{email})
        else res.render("login.ejs",{valid:false , message:"Enter a Vaild Email address"})
    })
});


app.post("/taskDetails",function(req,res){
    let projects=req.body;
    // console.log(projects)
    console.log("csc");
    fs.readFile("userdetails.json",function(err,data){
        if(err){
            console.log(err)
        }
        const existingData=JSON.parse(data);
        const email=Object.keys(existingData);
        if(email.includes(req.body.email)){
            existingData[req.body.email][req.body.taskid]=req.body
        }
        else{
            existingData[req.body.email]={}
            existingData[req.body.email][req.body.taskid]=req.body
        }
        console.log(existingData)
        fs.writeFile("userdetails.json",
        JSON.stringify(existingData,null,2),
        function(err){
            if(err){
                console.log(err)
            }else{
                console.log("successfully written")
            }
        }
        )
    });
    res.redirect("/login");
})

app.post("/showDetails",function(req,res){
    // console.log(req.body);
    fs.readFile("./userdetails.json",(err,data)=>{
        if(!err){
            let userproject=JSON.parse(data);
            let userid=Object.keys(userproject)
            if(userid.includes(req.body.mailId)){
                res.json(userproject[req.body.mailId])
            }
        }

    })
})

//EDIT
app.post("/editTask",(req,res)=>{
var updated = req.body
updated.updatetask.email = req.body.mail
updated.updatetask.statusInput = "Started";
fs.readFile("./userdetails.json",(err,data)=>{
    var userProject=JSON.parse(data);
    var projects=userProject[req.body.mail];
    var keys=Object.keys(projects);
    for(let key of keys){
        if(projects[key].id==updated.mail){
            updated.status=projects[key].status
            delete projects[key];
            key=updated.name;
            projects[key]=updated;
        }
    }
    fs.writeFile("./userdetails.json",
    JSON.stringify(userProject,null,2),
    (err)=>{
        if(!err)res.json({message:"Task Updated Sucessfull"});
    })
})
console.log(updated.updatetask);
});


//delete
// app.post("/editTask",(req,res)=>{
//     var updated = req.body
//     updated.updatetask.email = req.body.mail
//     updated.updatetask.statusInput = "Started";
//     fs.readFile("./userdetails.json",(err,data)=>{
//         var userProject=JSON.parse(data);
//         var projects=userProject[req.body.email];
//         console.log(projects);
//         var keys=Object.keys(projects);
//         for(let key of keys){
//             if(projects[key].id==updatedForm.email){
//                 updatedForm.status=projects[key].status
//                 delete projects[key];
//             }
//         }
//         fs.writeFile("./userdetails.json",
//         JSON.stringify(userProject,null,2),
//         (err)=>{
//             if(!err)res.json({message:"Task Updated Sucessfull"});
//         })
//     })
//     console.log(updated.updatetask);
//     });



app.listen(port, () => {
    console.log(`App islistening on port ${port}`);
});
