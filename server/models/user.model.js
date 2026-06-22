const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')


const userSchema= new mongoose.Schema({
  
    name:{
      type:String,
      required:true,
      minlength:2,
      maxlength:50,
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },
    password:{
      type:String,
      required:true,
      minlength:8
    },
    role:{
      type:String,
      required:true,
      enum:['customer','admin','vendor'],
      default:'customer'
      
      
    },
    isVendorApproved:{
      type:Boolean,
      default:false
    },
    avatar:{
      type:String,

    },
    refreshToken:{
      type:String
    }
  },{timestamps:true}
)

userSchema.pre('save',async function (next){
  if(!this.isModified('password') ){
    return 
  }
  else{
    this.password=await bcrypt.hash(this.password,10)
  }
  
})

const User=mongoose.model('User',userSchema)

module.exports=User