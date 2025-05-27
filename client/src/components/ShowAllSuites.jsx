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
        opacity: 0.15,
        zIndex: -1,
      }}
    ></div>

    {suites.length > 0 ? (
      <Box sx={{
        position: 'relative',
        top: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 3,
        direction: 'rtl'
      }}>
        {suites.map((suite) => (
          <Card key={suite._id} sx={{
            width: '55%',
            display: 'flex',
            flexDirection: 'row-reverse',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }
          }}>
            <CardActionArea onClick={() => handleCardClick(suite._id)} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 3,
                width: '70%',
                backgroundColor: '#fff',
                textAlign: 'right'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {suite.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  {suite.description}
                </Typography>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 3,
                  borderTop: '1px solid #eee',
                  pt: 2,
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BedIcon color="primary" />
                    <Typography variant="body2">{suite.numBeds} מיטות</Typography>
                  </Box>
                  {suite.pool && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PoolIcon color="primary" />
                      <Typography variant="body2">בריכה</Typography>
                    </Box>
                  )}
                  {suite.jacuzzi && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SpaIcon color="primary" />
                      <Typography variant="body2">ג'קוזי</Typography>
                    </Box>
                  )}
                  {suite.wifi && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WifiIcon color="primary" />
                      <Typography variant="body2">Wi-Fi</Typography>
                    </Box>
                  )}
                </Box>
{currentUser?.type === "admin" && (
  <Box sx={{
    display: 'flex',
    justifyContent: 'flex-end', // בצד שמאל ב-RTL
    alignItems: 'center',
    marginTop: '20px',
    gap: 1
  }}>
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleUpdateClick(suite._id);
      }}
      sx={{
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
                image={`http://localhost:5000/uploads/${suite.image}`}
                alt={suite.name}
              />
            </CardActionArea>
          </Card>
        ))}
      </Box>
    ) : (
      <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
        אין צימרים זמינים כרגע.
      </Typography>
    )}

    {/* דיאלוג לאישור מחיקה */}
    <Dialog sx={{ direction: 'rtl', textAlign: 'right' }} open={openDialog} onClose={cancelDelete}>
      <DialogContent>
        <Typography variant="body1">? אתה בטוח שברצונך למחוק צימר זה</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete} color="primary">ביטול</Button>
        <Button onClick={confirmDelete} color="error">אישור</Button>
      </DialogActions>
    </Dialog>
  </>
);
}
