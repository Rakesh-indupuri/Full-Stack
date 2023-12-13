const fs=require("fs")

function ReadFile(){
    return new Promise((resolve)=>{
        fs.readFile("sample.txt","utf-8",(error,data)=>{
            resolve(data)
        })
    })
}

async function main(){
    const text=await ReadFile()
    console.log(text)
}
let sum=0
main()
for(let i=0;i<100000;i++){
    sum+=i
}
console.log(sum)