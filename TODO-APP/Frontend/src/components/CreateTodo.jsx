import { useState } from "react"

export function CreateTodo(){
    const [title,setTitle] = useState("")
    const [description,setDescription]=useState("")
    return(
        <div>
            <input type="text" placeholder="Title"
             onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <input type="text" placeholder="Description" 
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            />
            <button onClick={()=>{
                fetch("http://localhost:3000/todo",{
                    method:"POST",
                    body:JSON.stringify(
                        {
                            title:title,
                            description:description
                        }
                    ),headers: {
                        "Content-Type": "application/json",
                    }
                }).then(async(res)=>{
                    const json = await res.json()
                    alert("Todo added !!")
                })
            }}>Add a Todo</button>
        </div>
    )
}