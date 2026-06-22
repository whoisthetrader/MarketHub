const jwt= require('jsonwebtoken')

function gernerateToken({userId,role}){

  
  const accessToken=jwt.sign({id:userId,role},process.env.JWT_ACCESS_SECRET,{expiresIn:'15m'})
  const refreshToken=jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET,{expiresIn:'7d'})

  return {accessToken ,refreshToken}

}

module.exports=gernerateToken