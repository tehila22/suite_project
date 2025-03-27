import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function UpdateSuite() {
  const { id } = useParams();  // שולף את ה-ID של הצימר
  const navigate = useNavigate();  // עבור ניווט לעמודים אחרים

  // הגדרת state עבור השדות של הצימר
  const [suite, setSuite] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    numRooms: 1,
    numBeds: 1,
    nightPrice: 0,
    image: ''
  });

  // פעולה לטעינת פרטי הצימר
  useEffect(() => {
    const getSuiteDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/suite/${id}`);
        setSuite(res.data);  // מעדכנים את ה-state עם פרטי הצימר
      } catch (err) {
        console.error("Error fetching suite details:", err);
      }
    };
    getSuiteDetails();
  }, [id]);

  // טיפול בשינוי הערכים בשדות
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuite((prevSuite) => ({
      ...prevSuite,
      [name]: value
    }));
  };

  // טיפול בהגשה של הטופס (עדכון הצימר)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:5000/suite/${id}`, suite);
      if (res.status === 200) {
        console.log("Suite updated successfully");
        navigate(`/suite/${id}`);  // נווטים לעמוד הצימר המעודכן
      }
    } catch (err) {
      console.error("Error updating suite:", err);
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1
        }}
      ></div>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          עדכון פרטי הצימר
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם הצימר"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={suite.name}
            onChange={handleChange}
          />
          <TextField
            label="עיר"
            variant="outlined"
            fullWidth
            margin="normal"
            name="city"
            value={suite.city}
            onChange={handleChange}
          />
          <TextField
            label="כתובת"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={suite.address}
            onChange={handleChange}
          />
          <TextField
            label="תיאור"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={suite.description}
            onChange={handleChange}
          />
          <TextField
            label="מספר חדרים"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numRooms"
            type="number"
            value={suite.numRooms}
            onChange={handleChange}
          />
          <TextField
            label="מספר מיטות"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numBeds"
            type="number"
            value={suite.numBeds}
            onChange={handleChange}
          />
          <TextField
            label="מחיר ללילה"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nightPrice"
            type="number"
            value={suite.nightPrice}
            onChange={handleChange}
          />
          <TextField
            label="תמונה (URL)"
            variant="outlined"
            fullWidth
            margin="normal"
            name="image"

            value={suite.image}
            onChange={handleChange}
          />

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            עדכן צימר
          </Button>
        </form>
      </Box>
    </>

  );
}
