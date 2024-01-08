const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:9014093842@cluster0.fiubyou.mongodb.net/");

const TodoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo=mongoose.model('todos',TodoSchema)

module.exports={
    todo
}