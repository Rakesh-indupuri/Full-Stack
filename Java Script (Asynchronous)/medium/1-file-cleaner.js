const fs=require("fs")
const removeSpace=()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("sample.txt","utf-8",(error,data)=>{
            if(error){
                reject(error)
            }
            const text=data.replace(/\s+/g," ")
            fs.writeFile("sample.txt",text,(err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(text)
                }
            })
        })
    })
}

async function main(){
    let data=await removeSpace()
    console.log(data)
}
main()