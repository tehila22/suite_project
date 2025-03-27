
const User=require("../Models/userModel")


const getAllUsers =async (req, res) => {
    await User.find()
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        if (!foundUser) {
            return res.status(404).send("User not found")
        }
        res.send(foundUser);

    }
    catch (err) {
        res.status(500).send({ "error to get this User ": err })

    }
}
const deleteUser =async (req, res) => {
    await User.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "User deleted!": t})
            else
                res.status(404).send("User not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this User": err }))
}
const updateUser =async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(t=>{
        if(!t)
            return res.status(404).json("User not found!")
        res.json({"User updated":t})
    })
    .catch(error=>
        res.status(500).json({"error in server":error})
    )
}


const addUser = async (req, res) => {
    const newUser = new User(req.body);
    console.log("newUser",newUser);
    
    await newUser.save()
        .then(() => res.send({message: "User created!", user: newUser }))//אם הצלחת
        .catch(err => res.status(400).send({ "Error": err }))// אם לא הצלחת
}

const loginUser = async (req,res)=>{
    const user = await User.findOne({name:req.body.name , password:req.body.password})
    console.log("user",user);
    if(!user){
        res.status(404).send("not found!")
        return;
    }
    res.send(user)
    
}



module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    addUser,
    loginUser
}