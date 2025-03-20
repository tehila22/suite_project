const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   
    name:{
        type:String,
        minlength:3,
        required:true,
    },
    password:{
       type:String,
       required:true,
    },
    
    email:{
         type:String,//להוסיף בדיקת תקינות
         required:true,
         match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },

    type:{
        type:String,
       
    }
       
   })
   const User = mongoose.model('User',userSchema);

   module.exports=User;

    