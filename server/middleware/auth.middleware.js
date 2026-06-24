const jwt=require('jsonwebtoken')


function authMiddleware(req,res,next){
  const authToken=req.headers.authorization
  if(!authToken?.startsWith('Bearer ')){
    return res.status(401).json({
      message:'unauthorized'
    })
  }
  const token=authToken.split(' ')[1];

  try{
    const decoded =jwt.verify(token,process.env.JWT_ACCESS_SECRET)

    req.user=decoded
    next()
    
  }catch(error){
    console.log('invalid token')
    console.log(error)
    res.status(401).json({
      message:"invalid or expired token"
    })
  

  }


}

module.exports=authMiddleware