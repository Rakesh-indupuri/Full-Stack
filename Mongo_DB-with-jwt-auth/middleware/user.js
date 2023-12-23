const jwt=require("jsonwebtoken")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const auth=req.headers.authorization
    if(auth){
        const token=auth.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
        return res.status(401).send("Authorization Failed");
        }
        req.user = user;
        next();
        });
    }else{
        res.status(402).send("Haven't received any token")
    }
}

module.exports = userMiddleware;