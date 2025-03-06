const express=require('express')
const userController=require("../Controllers/userController");
const userRouter=express.Router();

userRouter.get('/',userController.getAllUsers)
userRouter.get('/:id',userController.getUserById)
userRouter.post('/',userController.addUser)
userRouter.post('/login',userController.loginUser)
userRouter.delete('/:id',userController.deleteUser)
userRouter.put('/:id',userController.updateUser)

module.exports=userRouter;
