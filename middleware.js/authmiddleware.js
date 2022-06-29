const { verify } = require("jsonwebtoken");
const userJwtSecret = process.env.JWTSECRET || "abc@123"

const usercheckAuth = async(req,res,next)=>{
    const token = req.headers.authorization;
    try{
        const isTokenValid = await verify(token,userJwtSecret);
        if(isTokenValid){
            req.headers.tokenData = isTokenValid;
            next();
        }else{
            res.send({
                code:400,
                msg:"Authentication is required"
            })
        }
    }catch(err){
        console.log(`middleware Got an error ${err}`);
        res.send({
            code:400,
            msg:'Session has been expired Authentication required'
        })
    }


}

module.exports = usercheckAuth;