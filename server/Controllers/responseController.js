const Response=require("../Models/responseModel")


const getAllResponse =async (req, res) => {
    await Response.find()
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}

const deleteResponse =async (req, res) => {
    await Response.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "response deleted!": t})
            else
                res.status(404).send("response not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this response": err }))
}

const addResponse =async (req, res) => {
    const newResponse = new Response(req.body);
    await newResponse.save()
        .then(() => res.send({ "response created!": newResponse }))//אם הצלחת
        .catch(err => res.status(400).send({ "Error": err }))// אם לא הצלחת
}

module.exports = {
    getAllResponse,
    deleteResponse,
    addResponse,
   
 }


