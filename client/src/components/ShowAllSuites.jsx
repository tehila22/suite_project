import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import SpaIcon from '@mui/icons-material/Spa';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import axios from 'axios';
import { UserContext } from "./Context";

export default function ShowAllSuites({ suites ,setSuites}) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  
  const [openDialog, setOpenDialog] = useState(false);  // מצב פתיחת הדיאלוג
  const [suiteToDelete, setSuiteToDelete] = useState(null); // שמירת הצימר שנבחר למחיקה

  const handleCardClick = (id) => {
    console.log("Navigating to suite with id:", id);
    navigate(`/suite/${id}`);
  };

  const handleUpdateClick = (id) => {
    console.log("Navigating to update suite with id:", id);
    navigate(`/update-suite/${id}`);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();  // מונע את פעולת הלחיצה על ה-Card עצמו
    setSuiteToDelete(id);  // עדכון ה-ID של הצימר שנבחר למחיקה
    setOpenDialog(true);  // פתיחת הדיאלוג
  };

  const confirmDelete = async () => {
    try {
      console.log("Deleting suite with id:", suiteToDelete);
      await axios.delete(`http://localhost:5000/suite/${suiteToDelete}`);
      setOpenDialog(false);  // סגירת הדיאלוג לאחר אישור
      // לעדכן את רשימת הצימרים על ידי סינון הצימר שנמחק
      let arr = [...suites];
      arr = arr.filter(s=>s._id!=suiteToDelete);
      setSuites(arr);
      
    } catch (error) {
      console.error("Error deleting suite:", error);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);  // סגירת הדיאלוג אם נבחר לבטל
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

      {suites.length > 0 ? (
        <Box sx={{
          position: 'relative',
          top: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {suites.map((suite) => (
            <Card key={suite._id} sx={{
              width: '60%', 
              margin: '20px 0',
              display: 'flex',
              flexDirection: 'row', 
              backgroundColor: 'white',
              boxShadow: 3
            }}>
              <CardActionArea onClick={() => handleCardClick(suite._id)} sx={{ display: 'flex' }}>
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  width: '70%' 
                }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {suite.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '20px' }}>
                    {suite.description}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{suite.numBeds}</Typography>
                      <BedIcon sx={{ marginRight: '5px' }} />
                      <Typography variant="body2">מיטות</Typography>
                    </Box>
                    {suite.pool && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PoolIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body2">בריכה</Typography>
                      </Box>
                    )}
                    {suite.jacuzzi && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SpaIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body2">ג'קוזי</Typography>
                      </Box>
                    )}
                    {suite.wifi && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WifiIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body2">Wi-Fi</Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ShowerIcon sx={{ marginRight: '5px' }} />
                      <Typography variant="body2">{suite.shower ? "מקלחת" : "ללא מקלחת"}</Typography>
                    </Box>
                  </Box>

                  {currentUser?.type === "admin" && (
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: '20px'
                    }}>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateClick(suite._id);
                        }}
                        sx={{
                          width: 'auto',
                          marginRight: '10px',
                          padding: '8px 12px',
                          textTransform: 'none',
                          backgroundColor: '#4caf50', 
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#388e3c',
                          },
                        }}
                      >
                        <DriveFileRenameOutlineOutlinedIcon />
                      </Button>

                      <Button
                        onClick={(e) => handleDeleteClick(e, suite._id)}
                        sx={{
                          width: 'auto',
                          padding: '8px 12px',
                          textTransform: 'none',
                          backgroundColor: 'pink',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'darkred',
                          },
                        }}
                      >
                        <DeleteForeverRoundedIcon sx={{ fontSize: 18 }} />
                      </Button>
                    </Box>
                  )}
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{
                    width: '30%', 
                    height: 250,
                    objectFit: 'cover'
                  }}
                  image={'http://localhost:5000/uploads/' + suite.image}
                  alt={suite.name}
                />
              </CardActionArea>
            </Card>
          ))}
        </Box>
      ) : (
        <p>אין צימרים זמינים כרגע.</p>
      )}

      {/* דיאלוג לאישור מחיקה */}
      <Dialog sx={{textAlign:'right'}} open={openDialog} onClose={cancelDelete}>
        {/* <DialogTitle>? האם אתה בטוח</DialogTitle> */}
        <DialogContent>
          <Typography variant="body1">? אתה בטוח שברצונך למחוק צימר זה</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">ביטול</Button>
          <Button onClick={confirmDelete} color="secondary">אישור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
