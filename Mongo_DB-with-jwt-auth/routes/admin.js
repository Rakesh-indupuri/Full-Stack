const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt=require("jsonwebtoken")
//('dotenv').config();
const {Admin, Course} = require("../db");
const app = Router();
const jwtPassword="1234"
// Admin Routes
app.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
    const newUser=new Admin({username:username,password:password})
    try{
        await newUser.save()
        res.status(200).send("Admin added Successfully !!")
    }catch{
        res.status(500).send("Internal server Error")
    }
});

app.post('/signin', async (req, res) => {
    //Implement admin signup logic
    const {username,password} = req.body
    const admin = await Admin.findOne({username:username})
    if(admin){
        if(admin.password===password){
            const token=jwt.sign({username},process.env.SECRET_KEY)
            res.status(200).send({jwt_token:token})
            //res.header('Authorization',`Bearer  ${token}`).send({jwt_token:token})
        }else{
            res.send("Wrong Password !!")
        }
    }else{
        res.status(404).send("Admin doesn't exist")
    }
});



app.post('/courses', adminMiddleware, async (req, res) => {
    const {title,description,price,link}=req.body
    const newCourse = new Course({id:Math.floor(Math.random()*1000),title:title,description:description,price:price,imageLink:link,published:true})
    try{
        await newCourse.save()
        res.status(200).send("New course added Successfully !!")
    }catch{
        res.status(500).send("Internal Server Error")
    }
});

app.get('/courses', adminMiddleware, async (req, res) => {
    try{
        const courses = await Course.find()
        res.status(200).json(courses)
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
});

module.exports = app;