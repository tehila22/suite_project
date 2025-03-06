const Vacationers=require("../Models/suiteModel")


const getAllVacationers =async (req, res) => {
    await Vacationers.find()
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}

const getVacationersById = async (req, res) => {
    try {
        const foundVacationers = await Vacationers.findById(req.params.id);
        if (!foundVacationers) {
            return res.status(404).send("Vacationers not found")
        }
        res.send(foundVacationers);

    }
    catch (err) {
        res.status(500).send({ "error to get this Vacationers ": err })

    }
}
const deleteVacationers =async (req, res) => {
    await Suite.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "Vacationers deleted!": t})
            else
                res.status(404).send("Vacationers not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this Vacationers": err }))
}
const updateVacationers=async (req,res)=>{
   await Suite.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(t=>{
        if(!t)
            return res.status(404).json("Vacationers not found!")
        res.json({"Vacationers updated":t})
    })
    .catch(error=>
        res.status(500).json({"error in server":error})
    )
}


const addVacationers =async (req, res) => {
    const newVacationers = new Vacationers(req.body);
   await newVacationers.save()
        .then(() => res.send({ "Vacationers created!": newVacationers }))//אם הצלחת
        .catch(err => res.status(400).send({ "Error": err }))// אם לא הצלחת
}



module.exports = {
    getAllVacationers,
    getVacationersById,
    deleteVacationers,
    updateVacationers,
    addVacationers
}