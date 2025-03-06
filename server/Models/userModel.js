const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   
    name:{
        type:String,
        minlength:3,
        required:true,
    },
    password:{
       type:String,
    },
    
    email:{
        type:String,//להוסיף בדיקת תקינות
    },

    type:{
        type:String,
        
    }
       
   })
   const User = mongoose.model('User',userSchema);

   module.exports=User;

    