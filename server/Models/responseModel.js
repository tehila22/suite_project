const mongoose = require('mongoose');



const responseSchema = new mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    prodDate:{
        type:Date,    
     },
   
    responseContent:{
        type:String,
        minlength:3,
        
    },
    
       
   })
   const Response = mongoose.model('Response',responseSchema);

   module.exports=Response;
