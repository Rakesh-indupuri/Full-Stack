const express=require("express")
const app=express()
app.use(express.json())
// const sum=(n)=>{
//     let sum=0
//     for(let i=0;i<=n;i++){
//         sum+=i;
//     }
//     return sum;
// }

// app.get("/",(req,res)=>{
//     const n=req.query.input;
//     res.sendStatus(200)
//     res.send("sum is:"+sum(n))
// })

var users=[
    {
        name:"Pavan",
        kidneys:[
            {
                healthy:false
            },{
                healthy:true
            }
        ]
    }
]

app.get("/",(req,res)=>{
    user=users[0]
    const total_kidneys=(user.kidneys).length
    let healthy_kidneys=0
    let unhealthy_kidneys=0
    console.log(users[0].kidneys)
    for(let i=0;i<total_kidneys;i++){
        if(user.kidneys[i].healthy){
            healthy_kidneys++
        }
    }
    unhealthy_kidneys=total_kidneys-healthy_kidneys
    res.status(200).json(
        {
            total_kidneys:total_kidneys,
            healthy_kidneys:healthy_kidneys,
            unhealthy_kidneys:unhealthy_kidneys
        }
    )
})

app.post("/",(req,res)=>{
    const new_kidney=req.body.healthy
    users[0].kidneys.push({
        healthy:new_kidney,
    })
    res.status(200).send(
        "Added successfully !!"
    )
})

app.put("/",(req,res)=>{
    let healthy_kidneys=0
    for(let i = users[0].kidneys.length - 1; i >= 0; i--){
        if(!users[0].kidneys[i].healthy){
            healthy_kidneys++
        }
    }
    if(healthy_kidneys===0){
        res.status(411).send(" You have no unhealthy kidneys !!")
    }else{
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true
    }
    res.status(200).send("Sucessfully made all the unhealthy kidneys to Healthy !!")
}
})

app.delete("/",(req,res)=>{
    // users[0].kidneys.splice(users[0].kidneys.length-1,1)
    let unhealthy_kidneys=0
    for(let i = users[0].kidneys.length - 1; i >= 0; i--){
        if(!users[0].kidneys[i].healthy){
            unhealthy_kidneys++
        }
    }
    if(unhealthy_kidneys===0){
        res.status(411).send(" You have no unhealthy kidneys !!")
    }else{
    for(let i = users[0].kidneys.length - 1; i >= 0; i--){
        if(!users[0].kidneys[i].healthy){
            users[0].kidneys.splice(i,1)
        }
    }
    res.status(200).send("Deleted all unhealthy kidneys successfully !!!")
}
})
app.listen(3000)