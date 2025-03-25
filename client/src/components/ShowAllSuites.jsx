

import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import SpaIcon from '@mui/icons-material/Spa';  // אייקון ספא עבור ג'קוזי
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import axios from 'axios';  // ייבוא axios
import { UserContext } from "./Context";

export default function ShowAllSuites({ suites }) {

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    const handleCardClick = (id) => {
        console.log("Navigating to suite with id:", id);
        navigate(`/suite/${id}`);
    };

    const handleUpdateClick = (id) => {
        console.log("Navigating to update suite with id:", id);
        navigate(`/update-suite/${id}`);
    };

    // פונקציה למחיקת הצימר
    const handleDeleteClick = async (e, id) => {
        e.stopPropagation();  // מונע את פעולת הלחיצה על ה-Card עצמו

        try {
            console.log("Deleting suite with id:", id);

            // ביצוע בקשה למחיקה ב-API (שנה את הכתובת ל-API שלך)
            await axios.delete(`http://localhost:5000/suite/${id}`);

            // עדכון הממשק אחרי מחיקת הצימר
            // setSuites((prevSuites) => prevSuites.filter(suite => suite._id !== id));
        } catch (error) {
            console.error("Error deleting suite:", error);
        }
    };

    return (
        <>
            {/* רקע תמונה סטטי */}
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
                    opacity: 0.2, // שקיפות התמונה
                    zIndex: -1 // התמונה מאחורי שאר התוכן
                }}
            ></div>

            {/* הצגת הצימרים */}
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
                            width: '60%', // הכרטיס יהיה בגודל 60% מהמסך
                            margin: '20px 0',
                            display: 'flex',
                            flexDirection: 'row',  // תמונה בצד ימין
                            backgroundColor: 'white',
                            boxShadow: 3
                        }}>
                            <CardActionArea onClick={() => handleCardClick(suite._id)} sx={{ display: 'flex' }}>
                                {/* תוכן הצימר */}
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    width: '70%' // התאמת רוחב התוכן
                                }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {suite.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '20px' }}>
                                        {suite.description}
                                    </Typography>

                                    {/* אייקונים של הצימר */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '10px'
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2">{suite.numBeds}</Typography>  {/* מספר מיטות */}
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

                                    {/* כפתורים (עדכון ומחיקה) לצד אחד */}
                                    {currentUser?.type === "admin" && (
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginTop: '20px'
                                        }}>
                                            {/* כפתור עדכון צימר */}
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUpdateClick(suite._id);
                                                }}
                                                sx={{
                                                    width: 'auto',
                                                    marginRight: '10px',  // מרווח בין הכפתורים
                                                    padding: '8px 12px',
                                                    textTransform: 'none',
                                                    backgroundColor: '#4caf50', // צבע ירוק
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: '#388e3c',
                                                    },
                                                }}
                                            >
                                                <DriveFileRenameOutlineOutlinedIcon />
                                            </Button>

                                            {/* כפתור מחיקת צימר */}
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

                                {/* תמונה של הצימר */}
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: '30%',  // רוחב של 30% לתמונה
                                        height: 250,  // גובה קבוע לתמונה
                                        objectFit: 'cover'  // התמונה תתמלא באופן אחיד
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
        </>
    );
}
