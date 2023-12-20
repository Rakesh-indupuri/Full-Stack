const jwt = require('jsonwebtoken');
const jwtPassword = "secret";
const zod=require("zod")
function signJwt(username, password) {
    const my_user=zod.string().email()
    const my_password=zod.string().min(6)
    const check1=my_user.safeParse(username)
    const check2=my_password.safeParse(password)
    if(!check1.success || !check2.success){
        return null;
    }
    return jwt.sign({username:username},"abcd");
}

function verifyJwt(token) {
    try{
        jwt.verify(token,jwtPassword)
        return true
    }catch(err){
        return false
    }
}

function decodeJwt(token) {
    const info=jwt.decode(token)
    if(info==null){
        return false;
    }
    else{
        return true;
    }
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}