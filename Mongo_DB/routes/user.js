const { Router } = require("express");
const app = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
// User Routes
app.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username
    const password=req.body.password

    const newUser = new User({username,password})
    newUser.save().then(res.status(200).send("User Added Successfully"))
});

app.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find()
    .then((courses)=>{
        res.json(courses)
    })
    .catch((err)=>{
        res.status(500).send("Internal server Error !!")
    })
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const course=await Course.findOne({id:req.params.courseId})
    const user=req.user
    if(course){
        // user.purchased_courses.push(course)
        // user.save()
        // .then(res.status(200).send("Course purchased successfully !!"))
        // .catch((err)=>{
        //     res.status(500).send("Internal Server Error")
        // })
        try {
            user.purchased_courses.push(course);
            await user.save();
            res.status(200).send("Course purchased successfully !!");
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          }          
    }else{
        res.status(404).send("Course doesn't exists !!")
    }
});

app.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user=req.user
    // const courses = await user.purchased_courses.find()
    const courses=user.purchased_courses
    if(courses.length===0){
        res.send(" You haven't bought any courses !!")
    }
    else{
        res.json(user.purchased_courses)
    }
});
module.exports=app