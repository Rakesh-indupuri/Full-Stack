const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const app = Router();
// Admin Routes
app.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
    const new_admin=await Admin.create({username:username,password:password})
    if(!new_admin){
        res.status(500).send("Error");
    }else{
        res.status(200).send("Data added ");
    }
});

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title=req.body.title
    const description=req.body.description
    const price=req.body.price
    const img=req.body.link
    const newCourse= new Course({id:Math.floor(Math.random() * 1000),title:title,description:description,price:price,imageLink:img,published:true})
    newCourse.save()
    .then(()=>{
        res.status(200).send("Course added successfully !!")
    })
    .catch((error)=>{
        res.status(500).send("Internal Server Error")
    })
});

app.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then(
    (courses)=>{
        res.json(courses)
    }).catch((error)=>{
        res.status(500).send("Internal Server Error")
    })
});

module.exports = app;