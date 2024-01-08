const express = require("express")
const app= express()
const cors = require("cors");
const {createTodo,updateTodo} = require("./types")
const {todo} =require("./db")
app.use(express.json())
app.use(cors())
app.post("/todo",async (req,res)=>{
    const data=req.body
    const parseData=createTodo.safeParse(data)
    if(!parseData.success){
        res.status(411).json({
            "msg":"Invalid Input"
        })
        return;
    }
    const newTodo=new todo({
        title:data.title,
        description:data.description,
        completed:false})
    await newTodo.save()
    res.json({
        msg:"Todo created Successfully!!"
    })
})

app.get("/todos",async (req,res)=>{
    const todos=await todo.find()
    res.status(200).json(todos)
})

app.put("/completed",async (req,res)=>{
    const data=req.body
    const parseData=updateTodo.safeParse(data)
    if(!parseData.success){
        res.status(411).json({
            msg:"Invalid Input"
        })
        return;
    }
    await todo.update({
        _id:data.id
    },{
        completed:true
    })
    res.status(200).json({
        msg:"Todo marked as completed!!"
    })
})
app.listen(3000);