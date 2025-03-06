const mongoose = require('mongoose');


const vacationersSchema = new mongoose.Schema({
   
    zimmerId:{//לבדוק
        type:mongoose.Schema.ObjectId,
        ref:'Suite',
        required:true,
    },
     userId:{//לבדוק
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
     startDate:{
        type:Date,
        
     },
     endDate:{
        type:Date,
        
     },
   
  
    
       
   })
   const Vacationers = mongoose.model('Vacationers',vacationersSchema);

   module.exports=Vacationers;