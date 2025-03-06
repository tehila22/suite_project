const express=require('express');
const responseController=require("../Controllers/responseController");
const responseRouter=express.Router();

responseRouter.get('/',responseController.getAllResponse)
responseRouter.post('/',responseController.addResponse)
responseRouter.delete('/:id',responseController.deleteResponse)

module.exports=responseRouter;