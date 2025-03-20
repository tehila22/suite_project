const Response = require("../Models/responseModel")


const getAllResponse = async (req, res) => {
    await Response.find().populate('userId')
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}

const deleteResponse = async (req, res) => {
    await Response.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "response deleted!": t })
            else
                res.status(404).send("response not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this response": err }))
}

 
const getResponsesBySuiteId = async (req, res) => {
    const  suiteId = req.params.id; 
    console.log(suiteId);
    
    try {
        const responses = await Response.find({ suiteId: suiteId }).populate('userId');
        console.log(responses);

        if (responses.length === 0) {
            return res.status(404).send("No responses found for this suite.");
        }
        res.json(responses);
    } catch (err) {
        console.error("Error fetching responses:", err);
        res.status(500).json({ "Error": err });
    }
};

const addResponse = async (req, res) => {
    const newResponse = new Response(req.body);
    newResponse.prodDate = new Date();
    await newResponse.save()
        .then(() => res.send( newResponse))//אם הצלחת
        .catch(err => res.status(400).send({ "Error": err }))// אם לא הצלחת
}

module.exports = {
    getAllResponse,
    deleteResponse,
    addResponse,
    getResponsesBySuiteId

}


