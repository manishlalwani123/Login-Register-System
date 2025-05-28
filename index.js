const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    return res.send("Home Page");
});

app.get("/about",(req,res)=>{
    return res.send(`hello ${req.query.name}`);
});
app.get("/profile",(req,res)=>{
return res.send("Profile Page");
});
app.listen(8000,()=> console.log("server"))