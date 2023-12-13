let count=0
function increase(){
    count++
    console.log(count)
    setTimeout(increase,1000)
}
increase()