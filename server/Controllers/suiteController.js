const Suite = require("../Models/suiteModel")
const multer = require('multer')
const path = require('path');

const getAllSuites = async (req, res) => {
    await Suite.find()
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}

const getSuiteById = async (req, res) => {
    try {
        const foundSuite = await Suite.findById(req.params.id);
        if (!foundSuite) {
            return res.status(404).send("zimmer not found")
        }
        res.send(foundSuite);

    }
    catch (err) {
        res.status(500).send({ "error to get this zimmer ": err })

    }
}
const deleteSuite = async (req, res) => {
    await Suite.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "zimmer deleted!": t })
            else
                res.status(404).send("zimmer not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this zimmer": err }))
}
const updateSuite = async (req, res) => {
    const updateData = req.body;

    // אם יש קובץ תמונה חדש
    if (req.file) {
        // עדכון ה-image בנתונים החדשים
        updateData.image = req.file.filename;
    }
    console.log(updateData);
    

    try {
        const updatedSuite = await Suite.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedSuite) {
            return res.status(404).json("zimmer not found!");
        }

        res.json({ "zimmer updated": updatedSuite });
    } catch (error) {
        res.status(500).json({ "error in server": error });
    }
};


const addSuite = async (req, res) => {
    const newSuite = new Suite({ ...req.body, image: req.file ? req.file.filename : null });
    await newSuite.save()
        .then(() => res.send({ "zimmer created!": newSuite }))//אם הצלחת
        .catch(err => res.status(400).send({ "Error": err }))// אם לא הצלחת
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // מיקום אחסון התמונות
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // שמירה עם שם ייחודי
    }
});
const uploads = multer({ storage: storage });


module.exports = {
    addSuite,
    getAllSuites,
    getSuiteById,
    deleteSuite,
    updateSuite,
    uploads
}