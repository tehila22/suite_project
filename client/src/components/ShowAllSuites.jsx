import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from 'react-router-dom';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'; // אייקון פח

export default function ShowAllSuites({ suites, setSuites }) {
    const navigate = useNavigate();

    // הפונקציה שמבצעת את הניווט
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
            setSuites((prevSuites) => prevSuites.filter(suite => suite._id !== id));
        } catch (error) {
            console.error("Error deleting suite:", error);
        }
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
                                    e.stopPropagation();
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

                            {/* כפתור מחיקת צימר */}
                            <Button
                                onClick={(e) => handleDeleteClick(e, suite._id)}
                                sx={{
                                    width: '100%',
                                    borderTop: '1px solid #ddd',
                                    padding: '10px 0',
                                    textTransform: 'none',
                                    backgroundColor: 'pink',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'darkred',
                                    },
                                }}
                            >
                                <DeleteForeverRoundedIcon/>
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
