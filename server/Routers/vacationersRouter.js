const express=require('express')
const vacationersController=require("../Controllers/vacatioersController")
const vacatioersRouter=express.Router();

vacatioersRouter.get('/',vacationersController.getAllVacationers)
vacatioersRouter.get('/:id',vacationersController.getVacationersById)
vacatioersRouter.post('/',vacationersController.addVacationers)
vacatioersRouter.delete('/:id',vacationersController.deleteVacationers)
vacatioersRouter.put('/:id',vacationersController.updateVacationers)

module.exports=vacatioersRouter;