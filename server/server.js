// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const suiteRouter = require('./Routers/suiteRouter');
// const userRouter = require('./Routers/userRouter');
// const responseRouter = require('./Routers/responseRouter');
// const bookingRouter = require('./Routers/bookingRouter');



// const app = express();

// // חיבור למסד הנתונים (לפי הכתובת שלך)
// // mongoose.connect('mongodb://localhost:27017/suiteDB')
// // .then(() => {
// //     console.log('Connected to MongoDB');
// // })
// // .catch((err) => {
// //     console.error('Failed to connect to MongoDB', err);
// // });


// // mongoose.connect('mongodb+srv://tehila9221:vpahvoRhiqMTlUoY@cluster0.dx2fexm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// // .then(() => {
// //     console.log('Connected to MongoDB');
// // })
// // .catch((err) => {
// //     console.error('Failed to connect to MongoDB', err);
// // });
// mongoose.connect('mongodb+srv://tehila9221:vpahvoRhiqMTlUoY@cluster0.dx2fexm.mongodb.net/suiteDB?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => {
//     console.log('✅ Connected to MongoDB Atlas');
//   })
//   .catch((err) => {
//     console.error('❌ Failed to connect to MongoDB Atlas:', err);
//   });
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// app.use('/suite', suiteRouter)
// app.use('/user', userRouter)
// app.use('/response', responseRouter)
// app.use('/booking', bookingRouter);





// // הגדרת נתיב להעלאת תמונה
// // app.post('/uploads', uploads.single('image'), (req, res) => {
// //     if (!req.file) {
// //         return res.status(400).send('לא נבחרה תמונה להעלאה');
// //     }
// //     res.send(`התמונה הועלתה בהצלחה: ${req.file.filename}`);
// // });

// // הגדרת נתיב להוספת מוצר
// // app.post('/add-product', uploads.single('image'), (req, res) => {
// //     if (!req.file) {
// //         return res.status(400).send('לא נבחרה תמונה להעלאה');
// //     }

//     // בדיקת המחיר
//     // const price = parseFloat(req.body.price);
//     // if (isNaN(price)) {
//     //     return res.status(400).send('המחיר לא חוקי');
//     // }

//     // יצירת מוצר חדש
//     // const newProduct = new Product({
//     //     name: req.body.name, // שם המוצר
//     //     image: req.file.filename, // שם הקובץ של התמונה
//     //     // price: price, // המחיר
//     // });

//     // שמירת המוצר במסד הנתונים
//     // newProduct.save()
//     //     .then(() => {
//     //         res.send(`המוצר ${req.body.name} הוסף בהצלחה `);
//     //     })
//     //     .catch((error) => {
//     //         res.status(500).send('שגיאה בהוספת המוצר');
//     //     });
// // });

// // שרת את התמונות מתוך תיקיית uploadss
// // app.use('/uploadss', express.static('uploadss'));


// app.listen(5000, () => {
//     console.log('Server running on port 5000');
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const suiteRouter = require('./Routers/suiteRouter');
const userRouter = require('./Routers/userRouter');
const responseRouter = require('./Routers/responseRouter');
const bookingRouter = require('./Routers/bookingRouter');



const app = express();

// חיבור למסד הנתונים (לפי הכתובת שלך)
mongoose.connect('mongodb://localhost:27017/suiteDB')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/suite', suiteRouter)
app.use('/user', userRouter)
app.use('/response', responseRouter)
app.use('/booking', bookingRouter);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});