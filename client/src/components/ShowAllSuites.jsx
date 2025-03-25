import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from 'react-router-dom';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function ShowAllSuites({ suites }) {
    const navigate = useNavigate();

    // הפונקציה שמבצעת את הניווט
    const handleCardClick = (id) => {
        console.log("Navigating to suite with id:", id);  // לבדוק אם הפונקציה נקראת
        navigate(`/suite/${id}`);
    };

    const handleUpdateClick = (id) => {
        console.log("Navigating to update suite with id:", id);  // לבדוק אם הפונקציה נקראת
        navigate(`/update-suite/${id}`);  // שינוי כאן
    };

    return (
        <>
            {suites.length > 0 ? (
                <Box sx={{
                    position: 'relative',
                    top: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {suites.map((suite) => (
                        <Card key={suite._id} sx={{ maxWidth: 550, margin: '30px', textAlign: 'center' }}>
                            <CardActionArea onClick={() => handleCardClick(suite._id)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={'http://localhost:5000/uploads/' + suite.image}
                                    alt={suite.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {suite.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {suite.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* כפתור עדכון צימר */}
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation(); // מונע את פעולת הלחיצה על ה-Card עצמו כשאנחנו לוחצים על הכפתור
                                    handleUpdateClick(suite._id);
                                }}
                                sx={{
                                    width: '100%',
                                    borderTop: '1px solid #ddd',
                                    padding: '10px 0',
                                    textTransform: 'none',
                                }}
                            >
                                עדכון הצימר
                            </Button>
                        </Card>
                    ))}
                </Box>
            ) : (
                <p>אין צימרים זמינים כרגע.</p>
            )}
        </>
    );
}
