function validate(Schema){
  return function (req,res,next){
    const result=Schema.safeParse(req.body);
    if(!result.success){
      res.status(400).json({
        error:result.error
      })
    }
    else{
      next();
    }

    
  }
}
module.exports=validate;