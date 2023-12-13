const fs=require("fs")
function writeFile(){
    return new Promise((resolve,reject)=>{
        let data="Hehhehe 🌝🌝"
        fs.writeFile("sample.txt",data,(error)=>{
            if(error){
                reject(error)
            }
            else{
                fs.readFile("sample.txt","utf-8",(error,data)=>{
                    console.log(data)
                })
            }
        }) 
    })
}

async function main(){
    let value=await writeFile()
    console.log(value)
}

main()