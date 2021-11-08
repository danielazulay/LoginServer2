const router = require('express').Router()

const userService =require('../service/user.service')
const isAuth = require('../Auth/isAuth')
const userModel = require('../model/user.model')
router.post("/signUp",async(req,res)=>{
try{


    const UserService = new userService(req.body)
    const emailregex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
    const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g
    if(!UserService.isValid(UserService.email,emailregex)){
        return  res.status(400).json({error:"email nao valido"})
    }


    if(!UserService.isValid(UserService.password,passwordregex)){
        return  res.status(400).json({error:"password fraco"})
    }

    if(await UserService.isValidUser(UserService.email)){
       
      return  res.status(400).json({error: "usuario nao valido"})
    }

const newUser = await UserService.createUser()

console.log
return res.status(201).json(newUser)

}catch(err){

    console.log(err)
}

})


router.post("/login",async(req,res)=>{
try{
    
    const UserService = new userService(req.body)

    const loginReult = await UserService.login()

if(loginReult){

    return res.status(200).json(loginReult)

}

   
    return res.status(400).json("login falhou") 

}catch(err){
console.log(err)

}



})



router.get("/profile",isAuth,async(req,res)=>{

 console.log(req.user)
 return res.status(200).json(req.user)

})


router.put("/editUser",isAuth,async(req,res)=>{

    try{
        const data = req.body
console.log(req.user)
const {_id}=req.user

        const result = await userModel.findOneAndUpdate(
            {_id: _id},
            {$set:{...data}},
            {new:true}
        )
        console.log(result)
       return res.status(200).json(result)
    
    }catch(err){
    console.log(err)
    
    }
   
   })
router.get('/userDetailed/:id',async(req,res)=>{

    try{

      
        const {id}= req.params
        console.log("--->"+id)
        const result = await userModel.findOne(
            {_id:id}
        )

        return res.status(200).json(result)

    }catch(err){console.log(err)}

})

router.put('/user/:id',async(req,res)=>{

    try{

      
        const {id}= req.params
        const data = req.body
        const result = await userModel.findOneAndUpdate(
            {_id: id},{...data},{new:true}
        )

        return res.status(200).json(result)

    }catch(err){console.log(err)}

})

   
module.exports = router