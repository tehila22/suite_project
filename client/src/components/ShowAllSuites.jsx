
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import SpaIcon from '@mui/icons-material/Spa';
import axios from 'axios';
import { UserContext } from "./Context";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
export default function ShowAllSuites({ suites, setSuites }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [suiteToDelete, setSuiteToDelete] = useState(null);

  const handleCardClick = (id) => navigate(`/suite/${id}`);

  const handleUpdateClick = (id) => navigate(`/update-suite/${id}`);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setSuiteToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/suite/${suiteToDelete}`);
      setOpenDialog(false);
      setSuites(suites.filter(s => s._id !== suiteToDelete));
    } catch (error) {
      console.error("Error deleting suite:", error);
    }
  };

  const cancelDelete = () => setOpenDialog(false);

  return (
    <>
      {/* רקע */}
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
      />

      {/* כרטיסים */}
      {suites.length > 0 ? (
        <Box sx={{ position: 'relative', top: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 3, direction: 'rtl' }}>
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
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 3, width: '70%', backgroundColor: '#fff', textAlign: 'right' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{suite.name}</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>{suite.description}</Typography>

                  {/* אייקונים */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: 3, borderTop: '1px solid #eee', pt: 2 }}>
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

                  {/* כפתורים למנהל */}
                  {currentUser?.type === "admin" && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px', gap: 1 }}>
                      {/* כפתור עדכון */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateClick(suite._id);
                        }}
                        sx={{
                          borderRadius: '12px',
                          padding: '6px 14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#1b5e20',
                          border: '2px solid #1b5e20',
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: '#a5d6a7',
                            color: '#fff',
                          },
                        }}
                      >
                        <DriveFileRenameOutlineOutlinedIcon sx={{ mr: 1 }} />
                        עדכון
                      </Button>

                      {/* כפתור מחיקה */}
                      <Button
                        onClick={(e) => handleDeleteClick(e, suite._id)}
                        sx={{
                          borderRadius: '12px',
                          padding: '6px 14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#b71c1c',
                          border: '2px solid #b71c1c',
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: '#ef9a9a',
                            color: '#fff',
                          },
                        }}
                      >
                        <DeleteForeverOutlinedIcon sx={{ mr: 1 }} />
                        מחיקה
                      </Button>

                      {/* כפתור ההזמנות שלי */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/suite-orders/${suite._id}`);
                        }}
                        sx={{
                          borderRadius: '12px',
                          padding: '6px 14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#0d47a1',
                          border: '2px solid #0d47a1',
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: '#90caf9',
                            color: '#fff',
                          },
                        }}
                      >
                        ההזמנות שלי
                      </Button>
                    </Box>
                  )}
                </CardContent>

                <CardMedia
                  component="img"
                  sx={{ width: '30%', height: 250, objectFit: 'cover' }}
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

      {/* דיאלוג למחיקה */}
      <Dialog sx={{ direction: 'rtl', textAlign: 'right' }} open={openDialog} onClose={cancelDelete}>
        <DialogContent>
          <Typography variant="body1">אתה בטוח שברצונך למחוק את הצימר?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">ביטול</Button>
          <Button onClick={confirmDelete} color="error">אישור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
