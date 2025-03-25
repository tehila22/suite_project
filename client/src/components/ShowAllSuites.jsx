import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';

export default function ShowAllSuites({ suites }) {

    const navigate = useNavigate();

    const handleCardClick = (id) => {
        console.log("Navigating to suite with id:", id);
        navigate(`/suite/${id}`);
    };

    const handleUpdateClick = (id) => {
        console.log("Navigating to update suite with id:", id);
        navigate(`/update-suite/${id}`);
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
                            width: '50%', // הכרטיס יהיה בגודל 75% מהמסך
                            margin: '20px 0',
                            display: 'flex',
                            flexDirection: 'row-reverse',  // תמונה בצד ימין
                            backgroundColor: 'white',
                            boxShadow: 3
                        }}>
                            <CardActionArea onClick={() => handleCardClick(suite._id)} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                {/* תמונה של הצימר */}
                                <CardMedia
                                    component="img"
                                    sx={{ width: '40%', objectFit: 'cover' }}
                                    image={'http://localhost:5000/uploads/' + suite.image}
                                    alt={suite.name}
                                />

                                {/* תוכן הצימר */}
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingLeft: '20px',
                                    paddingRight: '20px'
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
                                            <BedIcon sx={{ marginRight: '5px' }} />
                                            <Typography variant="body2">{suite.beds} מיטות</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <PoolIcon sx={{ marginRight: '5px' }} />
                                            <Typography variant="body2">{suite.pool ? "בריכה" : "ללא בריכה"}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <WifiIcon sx={{ marginRight: '5px' }} />
                                            <Typography variant="body2">{suite.wifi ? "Wi-Fi" : "ללא Wi-Fi"}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ShowerIcon sx={{ marginRight: '5px' }} />
                                            <Typography variant="body2">{suite.shower ? "מקלחת" : "ללא מקלחת"}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
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
