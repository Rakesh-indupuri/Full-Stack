const clock=()=>{
    const date=new Date()
    let hrs=date.getHours()>=10?date.getHours():`0${date.getHours()}`
    let minutes=date.getMinutes()>=10?date.getMinutes():`0${date.getMinutes()}`
    let seconds=date.getSeconds()>=10?date.getSeconds():`0${date.getSeconds()}`
    console.log(hrs+":"+minutes+":"+seconds)
    if(hrs>12){
        console.log(hrs+":"+minutes+":"+seconds+" PM")
    }else{
        console.log(hrs+":"+minutes+":"+seconds+" AM")
    }
}
setInterval(clock,1000)