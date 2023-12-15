/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs=require("fs")
  const app = express();
  app.use(bodyParser.json());
  app.get("/todos",(req,res)=>{
    fs.readFile("todos.json","utf-8",(error,data)=>{
      if(error){
        res.sendStatus(404)
      }
      let todos=JSON.parse(data)
      res.status(200).json(todos)
    })
  })

  app.get("/todos/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    fs.readFile("todos.json","utf-8",(error,data)=>{
      if(error){
        throw error
      }
      let todos=JSON.parse(data)
      const filtered_todos=todos.filter((todo)=>{
        return todo.id==id
      })
      if(filtered_todos.length===0){
        res.status(404).send("Not Found")
      }else{
        res.status(200).json(filtered_todos[0])
      }
    })
  })

  app.post("/todos",(req,res)=>{
    fs.readFile("todos.json","utf-8",(error,data)=>{
      if(error){
        res.sendStatus(404)
      }
      let todos=JSON.parse(data)
      const new_todo={}
      new_todo.id=Math.floor(Math.random() * 1000)+1
      new_todo.title=req.body.title
      new_todo.completed=req.body.completed
      new_todo.description=req.body.description
      todos.push(new_todo)
      fs.writeFile("todos.json",JSON.stringify(todos),(error)=>{
        if(error) throw error
        res.status(201).json(new_todo)
      })
    })
  })
  
  app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile("todos.json","utf-8",(error,data)=>{
      if(error){
        throw error
      }
      let todos=JSON.parse(data)
      const updatedTodo = todos.find((todo) => todo.id == id);
      if (!updatedTodo) {
        res.status(404).send("Not Found");
        return;
      }
      updatedTodo.title = req.body.title;
      updatedTodo.completed = req.body.completed;
      updatedTodo.description = req.body.description;
      fs.writeFile("todos.json",JSON.stringify(todos),(error)=>{
        if(error){
          res.sendStatus(404)
        }
        res.status(200).send("Todo updated successfully!!");
      })
    })
  });

  app.delete("/todos/:id",(req,res)=>{
    fs.readFile("todos.json","utf-8",(error,data)=>{
      if(error){
        throw error
      }
      let todos=JSON.parse(data)
      const id = parseInt(req.params.id);
      const tobeDelated_todo = todos.find((todo) => todo.id == id);
      if (!tobeDelated_todo) {
        res.status(404).send("Not Found");
        return;
      }
      todos=todos.filter((todo)=>todo.id!=id)
      console.log(todos)
      fs.writeFile("todos.json", JSON.stringify(todos), (error) => {
        if (error) {
          throw error
        }
        res.status(200).send("Deleted Successfully !!");
      });
    })
  })

  app.use((req,res)=>{
    res.sendStatus(404)
  })

  // app.listen(3000)
 module.exports = app;