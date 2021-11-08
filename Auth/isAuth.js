const jwt = require('express-jwt')

function headExtract(req,res){

    if(!req.headers.authorization){
        throw new Error('falha')
    }

  return  req.headers.authorization.split(" ")[1]
}


module.exports = jwt({
    userPorperty:"user",
    secret:process.env.TOKEN_SIGN_SECRET,
    gettoken:headExtract,
    algorithms:["HS256"]
})