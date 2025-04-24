// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, TextField, Button, Typography } from "@mui/material";

// export default function UpdateSuite() {
//   const { id } = useParams();  // שולף את ה-ID של הצימר
//   const navigate = useNavigate();  // עבור ניווט לעמודים אחרים

//   // הגדרת state עבור השדות של הצימר
//   const [suite, setSuite] = useState({
//     name: '',
//     city: '',
//     address: '',
//     description: '',
//     numRooms: 1,
//     numBeds: 1,
//     nightPrice: 0,
//     image: ''
//   });

//   // פעולה לטעינת פרטי הצימר
//   useEffect(() => {
//     const getSuiteDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/suite/${id}`);
//         setSuite(res.data);  // מעדכנים את ה-state עם פרטי הצימר
//       } catch (err) {
//         console.error("Error fetching suite details:", err);
//       }
//     };
//     getSuiteDetails();
//   }, [id]);

//   // טיפול בשינוי הערכים בשדות
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSuite((prevSuite) => ({
//       ...prevSuite,
//       [name]: value
//     }));
//   };

//   // טיפול בהגשה של הטופס (עדכון הצימר)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.put(`http://localhost:5000/suite/${id}`, suite);
//       if (res.status === 200) {
//         console.log("Suite updated successfully");
//         navigate(`/suite/${id}`);  // נווטים לעמוד הצימר המעודכן
//       }
//     } catch (err) {
//       console.error("Error updating suite:", err);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100vh',
//           backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 0.2,
//           zIndex: -1
//         }}
//       ></div>
//       <Box sx={{ position:'relative',top:'120px' ,maxWidth: 600, margin: '0 auto', padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           עדכון פרטי הצימר
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="שם הצימר"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="name"
//             value={suite.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="עיר"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="city"
//             value={suite.city}
//             onChange={handleChange}
//           />
//           <TextField
//             label="כתובת"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="address"
//             value={suite.address}
//             onChange={handleChange}
//           />
//           <TextField
//             label="תיאור"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="description"
//             value={suite.description}
//             onChange={handleChange}
//           />
//           <TextField
//             label="מספר חדרים"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="numRooms"
//             type="number"
//             value={suite.numRooms}
//             onChange={handleChange}
//           />
//           <TextField
//             label="מספר מיטות"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="numBeds"
//             type="number"
//             value={suite.numBeds}
//             onChange={handleChange}
//           />
//           <TextField
//             label="מחיר ללילה"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="nightPrice"
//             type="number"
//             value={suite.nightPrice}
//             onChange={handleChange}
//           />
//           <TextField
//             label="תמונה (URL)"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="image"

//             value={suite.image}
//             onChange={handleChange}
//           />

//           <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
//             עדכן צימר
//           </Button>
//         </form>
//       </Box>
//     </>

//   );
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Grid, Typography, Checkbox, Alert } from "@mui/material";
import axios from "axios";
import { Avatar } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import { FormControl } from "@mui/material";

export default function UpdateSuite() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [suiteData, setSuiteData] = useState({
        name: '',
        description: '',
        city: '',
        address: '',
        numRooms: '',
        numBeds: '',
        nightPrice: '',
        pool: false,
        jacuzzi: false,
        image: null,
    });
    
    const [alertText, setAlertText] = useState(""); // state עבור הודעות הצלחה או שגיאה
    
    // טעינת פרטי הצימר עם ה-id שנשלח ב-url
    useEffect(() => {
        const fetchSuiteData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/suite/${id}`);
                setSuiteData(res.data);  // ממלא את הנתונים המתקבלים
            } catch (error) {
                console.error("Error fetching suite:", error);
            }
        };

        fetchSuiteData();
    }, [id]);

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append('name', suiteData.name);
        formData.append('description', suiteData.description);
        formData.append('city', suiteData.city);
        formData.append('address', suiteData.address);
        formData.append('numRooms', suiteData.numRooms);
        formData.append('numBeds', suiteData.numBeds);
        formData.append('nightPrice', suiteData.nightPrice);
        formData.append('pool', suiteData.pool);
        formData.append('jacuzzi', suiteData.jacuzzi);

        // אם נבחרה תמונה חדשה, נוסיף אותה ל-FormData
        if (suiteData.image) {
            formData.append('image', suiteData.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/suite/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // הצגת הודעת הצלחה
            setAlertText("הצימר עודכן בהצלחה!");
            setTimeout(() => {
                setAlertText("");
                navigate(`/suite/${id}`); // נווטים לעמוד הצימר לאחר העדכון
            }, 3000);
        } catch (err) {
            console.error("Error updating suite:", err);
            setAlertText("שגיאה בעדכון הצימר, נסה שוב.");
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs" style={{ textAlign: 'center', backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Avatar sx={{ margin: 1, backgroundColor: 'Highlight' }}>
                    <HouseIcon />
                </Avatar>
                <Typography sx={{ color: '#0078d7' }} component="h1" variant="h5">עדכון צימר</Typography>
                <form style={{ width: '100%', marginTop: '24px' }} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="שם"
                                name="name"
                                value={suiteData.name}
                                onChange={(e) => setSuiteData({ ...suiteData, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="תאור"
                                name="description"
                                value={suiteData.description}
                                onChange={(e) => setSuiteData({ ...suiteData, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="עיר"
                                name="city"
                                value={suiteData.city}
                                onChange={(e) => setSuiteData({ ...suiteData, city: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="כתובת"
                                name="address"
                                value={suiteData.address}
                                onChange={(e) => setSuiteData({ ...suiteData, address: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מ'ס חדרים"
                                name="numRooms"
                                value={suiteData.numRooms}
                                onChange={(e) => setSuiteData({ ...suiteData, numRooms: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מ'ס מיטות"
                                name="numBeds"
                                value={suiteData.numBeds}
                                onChange={(e) => setSuiteData({ ...suiteData, numBeds: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מחיר"
                                name="nightPrice"
                                value={suiteData.nightPrice}
                                onChange={(e) => setSuiteData({ ...suiteData, nightPrice: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                checked={suiteData.pool}
                                onChange={(e) => setSuiteData({ ...suiteData, pool: e.target.checked })}
                            />
                            בריכה
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                checked={suiteData.jacuzzi}
                                onChange={(e) => setSuiteData({ ...suiteData, jacuzzi: e.target.checked })}
                            />
                            ג'קוזי
                        </Grid>
                        <Grid item xs={12}>
                            {suiteData.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${suiteData.image}`}
                                    alt="Current Suite"
                                    style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                                />
                            )}
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="image"
                                type="file"
                                onChange={(e) => setSuiteData({ ...suiteData, image: e.target.files[0] })}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ marginTop: '24px' }}
                    >
                        אישור
                    </Button>
                    {alertText && <Alert variant="outlined" severity={alertText.includes("בהצלחה") ? "success" : "error"}>{alertText}</Alert>}
                </form>
            </Container>
        </>
    );
}
