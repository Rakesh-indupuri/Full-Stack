 const jwt = require("jsonwebtoken")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const auth=req.headers.authorization
    try{
        if(auth){
            const token=auth.split(" ")[1]
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }else{
            res.status(401).send("Haven't Recieved any token")
        }
    }
    catch{
        res.status(500).send("Internal Server Error !!")
    }
}
module.exports = adminMiddleware;