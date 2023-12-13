/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },n*1000)
    })
}

async function main(n){
    let value=await wait(n)
    console.log(value)
}
module.exports = wait;