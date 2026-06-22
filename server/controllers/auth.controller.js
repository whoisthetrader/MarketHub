
const User=require('../models/user.model')
const generateTokens=require('../utils/generateTokens')
const bcrypt=require('bcryptjs')

async function register (req,res,next){
  try{
    const {name,email,password,role}=req.body;
  const existUser= await User.findOne({email})
  if(existUser){
   return res.status(400).json({
    msg: 'email already exists'
   })
  }
  else{
  const newUser= await User.create({
      name,
      email,
      password,
      role
    });
  const newUserCopy= newUser.toObject()
  delete newUserCopy.password
    res.status(201).json({
      msg:"user created successfully",
      data:newUserCopy
    })
   }
   
  }catch (error){
    console.log('something is up with us')
    console.log(error)
    next(error)
  }
 
}

async function login(req,res,next){
 try{
  const {email,password}=req.body
  const findUser=await User.findOne({email})
 
  if(!findUser){
    res.status(404).json({
      msg:'email not found'
    })
    return
   }
   const checkPassword=await bcrypt.compare(password,findUser.password);
   if(!checkPassword){
    return res.status(401).json({
      msg:'your password is wrong'
    })
   }
   const{accessToken,refreshToken}= generateTokens({userId:findUser._id,role:findUser.role})

   res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000
   })
   const findUserCopy=findUser.toObject()
   delete findUserCopy.password

   res.status(200).json({
    accessToken,user:findUserCopy
   })
   
 }catch(error){
  next(error)
 } 
  


}

module.exports={register,login}