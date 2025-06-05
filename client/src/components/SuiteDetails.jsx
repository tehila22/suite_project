
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Room, Star, Pool, HotTub } from '@mui/icons-material';
import BedRoundedIcon from '@mui/icons-material/BedRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
export default function SuiteDetails() {
  const { id } = useParams();
  const [suite, setSuite] = useState();
  const [responses, setResponses] = useState();

  useEffect(() => {
    const getSuiteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/suite/${id}`);
        setSuite(response.data);
        console.log('get-suite-details', response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getResponseSuiteId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/response/${id}`);
        setResponses(response.data);
        console.log('get response', response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getResponseSuiteId();
    getSuiteDetails();
  }, [id]);

  return (
    <Box sx={{ padding: 3 }}>
      {suite ? (
        <>
          {/* תמונה של הצימר */}
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={`http://localhost:5000/uploads/${suite.image}`}
              alt={suite.name}
              style={{ width: '100%', height: '550px', borderRadius: '8px', marginTop:"70px", }}
            />
        

          {/* שם הצימר */}
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 3, textAlign: 'center' }}>
            {suite.name}
          </Typography>

          {/* כתובת הצימר */}
          <Typography variant="h6" component="div" sx={{ textAlign: 'center', color: 'text.secondary', mt: 1 }}>
            {suite.address}, {suite.city}
          </Typography>

          {/* תאור הצימר */}
          <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary' ,border:" 30px ",borderColor:"blueviolet"}}>
              {suite.description}
            </Typography>
          </Box>

          {/* פרטי הצימר עם אייקונים */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  {/* <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    מחיר ללילה
                  </Typography> */}
                  <Typography variant="h6"> ₪ {suite.nightPrice}  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  {/* <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    מספר מיטות
                  </Typography> */}
                  <Typography variant="h6"> {suite.numBeds}
                    <BedRoundedIcon/>
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', boxSizing:"2px" }}>
                    {/* מספר חדרים */}
                    <Typography variant="h6">{suite.numRooms}< MeetingRoomIcon/> </Typography>
                   
                  </Typography>
                  
                </Paper>
              </Grid>

              {suite.hasPool && (
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <IconButton color="primary" sx={{ fontSize: 40 }}>
                      <Pool />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      בריכה
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {suite.hasJacuzzi && (
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <IconButton color="primary" sx={{ fontSize: 40 }}>
                      <HotTub />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      ג'קוזי
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
          </Box>
          {/* הצגת התגובות */}
          {responses && responses.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              {responses.map((response) => (
                <Paper key={response._id} sx={{ padding: 2, marginBottom: 2, borderLeft: '5px solid #1976d2', backgroundColor: '#f7f7f7' }}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{response.responseContent}"
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
                    - {response.author}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              אין תגובות לצימר הזה.
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          טוען פרטי הצימר...
        </Typography>
      )}
    </Box>
    
  );
}
