
const User=require('../models/user.model')


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

module.exports=register