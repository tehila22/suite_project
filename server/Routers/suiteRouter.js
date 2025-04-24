const express = require('express');
const suiteController = require("../Controllers/suiteController")
const suiteRouter = express.Router();

suiteRouter.get('/', suiteController.getAllSuites)
suiteRouter.get('/:id', suiteController.getSuiteById)
suiteRouter.post('/', suiteController.uploads.single('image'), suiteController.addSuite)
suiteRouter.delete('/:id', suiteController.deleteSuite)
suiteRouter.put('/:id', suiteController.uploads.single('image'),suiteController.updateSuite)

module.exports = suiteRouter;