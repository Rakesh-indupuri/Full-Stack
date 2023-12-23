const { Router } = require("express");
const app = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt=require("jsonwebtoken")
// User Routes
app.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username,password}=req.body
    const newUser=new User({username:username,password:password})
    try{
        await newUser.save()
        res.status(200).send("New User added Successfully !!")
    }catch{
        res.status(500).send("Internal Server Error !!")
    }
});

app.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body
    const user=await User.findOne({username:username})
    if(user){
        if(user.password==password){
            const token=jwt.sign({username},process.env.SECRET_KEY)
            res.status(200).json({jwt_token:token})
        }else{
            res.status(401).send("Wrong password")   
        }
    }else{
        res.status(401).send("User not Registered ")
    }
});

app.get('/courses', async (req, res) => {
    try{
        const courses = await Course.find()
        res.status(200).send(courses)
    }catch{
        res.status(500).send("Internal Server Error")
    }
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const id=req.params.courseId
    const course=await Course.findOne({id:id})
    const username=req.user.username
    const user = await User.findOne({username:username})
    console.log(user)
    if(course){
        try{
            user.purchased_courses.push(course)
            await user.save()
            res.status(200).send("Course purchased successfully !!");
        }
        catch(err){
            console.log(err)
            res.status(500).send("Internal Server Error");
        }
    }else{
        res.status(401).send(`There are no such courses with Id ${id}`)
    }
});

app.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username=req.user.username
    try{
        const user = await User.findOne({username:username})
        res.send(user.purchased_courses)
    }catch{
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;