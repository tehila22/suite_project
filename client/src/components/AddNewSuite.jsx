import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Checkbox, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import HouseIcon from '@mui/icons-material/House';

export default function AddNewSuite() {
    const [suiteData, setSuiteData] = useState({
        jacuzzi: false,
        pool: false
    });

    const [alertText, setAlertText] = useState(""); // הוספת state עבור אזהרת השגיאה או הצלחה
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(suiteData);
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

        if (suiteData.image) {
            formData.append('image', suiteData.image); // הוספת התמונה
        }

        try {
            const response = await axios.post('http://localhost:5000/suite', formData, {
                headers: {
                    'content-type': 'multipart/form-data', // חשוב להוסיף את כותרת התוכן הזו
                },
            });

            // אם הצימר נוסף בהצלחה
            setAlertText("הצימר נוסף בהצלחה!");
            setTimeout(() => {
                setAlertText("");  // ניקוי ההודעה אחרי 3 שניות
                navigate('/show-suites'); // לדף הצימרים
            }, 3000);
        } catch (err) {
            console.error(err);
            setAlertText("שגיאה בהוספת הצימר, נסה שוב.");
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
            <Container
                component="main"
                maxWidth="xs"
                style={{
                    textAlign:'center',
                    backgroundColor: 'white', // הרקע של הטופס יהיה לבן
                    padding: '32px', // ריווח פנימי לטופס
                    borderRadius: '8px', // רדיוס פינות לפינות רכות
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // צלליות לטופס
                    position: 'relative',
                    top: '144px'
                }}
            >
                <Avatar
                    sx={{
                        margin: 1,
                        backgroundColor: 'Highlight',
                    }}
                >
                    <HouseIcon />
                </Avatar>
                <Typography sx={{color:'#0078d7'}} component="h1" variant="h5">
                    הוספת צימר
                </Typography>
                <form
                    style={{
                        width: '100%',
                        marginTop: '24px', // ריווח
                    }}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="שם"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => { setSuiteData({ ...suiteData, name: e.target.value }); }}
                                value={suiteData.name}
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
                                autoComplete="description"
                                onChange={(e) => { setSuiteData({ ...suiteData, description: e.target.value }); }}
                                value={suiteData.description}
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
                                autoComplete="city"
                                onChange={(e) => { setSuiteData({ ...suiteData, city: e.target.value }); }}
                                value={suiteData.city}
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
                                autoComplete="address"
                                onChange={(e) => { setSuiteData({ ...suiteData, address: e.target.value }); }}
                                value={suiteData.address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מ'ס חדרים"
                                name="numRooms"
                                type="number"
                                onChange={(e) => { setSuiteData({ ...suiteData, numRooms: e.target.value }); }}
                                value={suiteData.numRooms}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מ'ס מיטות"
                                name="numBeds"
                                type="number"
                                onChange={(e) => { setSuiteData({ ...suiteData, numBeds: e.target.value }); }}
                                value={suiteData.numBeds}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="מחיר"
                                name="nightPrice"
                                type="number"
                                onChange={(e) => { setSuiteData({ ...suiteData, nightPrice: e.target.value }); }}
                                value={suiteData.nightPrice}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            בריכה
                            <Checkbox checked={suiteData.pool} onChange={(e) => { setSuiteData({ ...suiteData, pool: e.target.checked }); }} />
                        </Grid>
                        <Grid item xs={12}>
                            ג'קוזי
                            <Checkbox checked={suiteData.jacuzzi} onChange={(e) => { setSuiteData({ ...suiteData, jacuzzi: e.target.checked }); }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="תמונה"
                                name="image"
                                autoComplete="image"
                                type="file"
                                onChange={(e) => {
                                    setSuiteData({ ...suiteData, image: e.target.files[0] });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: '24px',
                        }}
                    >
                        אישור
                    </Button>

                    {/* הצגת אזהרת שגיאה או הצלחה אם יש */}
                    {alertText && <Alert variant="outlined" severity={alertText.includes("בהצלחה") ? "success" : "error"}>{alertText}</Alert>}
                </form>
            </Container>
        </>
    );
}
