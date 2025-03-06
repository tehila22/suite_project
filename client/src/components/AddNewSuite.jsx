
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Checkbox, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from './Context';
import Avatar from '@mui/material/Avatar';


export default function AddNewSuite() {

    const [suiteData, setSuiteData] = useState({
        jacuzzi: false,
        pool: false
    })


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
    
            // אתה יכול להוסיף כאן טיפול בתגובה
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    
      
        

        // try {
        // const response = await axios.post('http://localhost:5000/suite', formData , {     
        //     headers: { 'content-type': 'multipart/form-data' }
        // } );
        // } catch (err) {
        //     console.error(err);
        //     setAlertText("משתמש זה לא קיים במערכת");
        // }
    }

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                style={{
                    backgroundColor: 'white', // הרקע של הטופס יהיה לבן
                    padding: '32px', // ריווח פנימי לטופס
                    borderRadius: '8px', // רדיוס פינות לפינות רכות
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // צלליות לטופס
                    position: 'relative',
                    top: '144px'
                }}
            >
                {/* <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                > */}
                <Avatar
                    sx={{
                        margin: 1,
                        backgroundColor: 'Highlight',

                        // backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
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
                                id="userName"
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
                                id="userName"
                                label="עיר"
                                city="city"
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
                                id="userName"
                                label="כתובת"
                                address="address"
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
                                numRooms="numRooms"
                                autoComplete="numRooms"
                                type="number"  // הוספת מאפיין type
                                onChange={(e) => {
                                    setSuiteData({ ...suiteData, numRooms: e.target.value });

                                }}
                                value={suiteData.numRooms}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="מ'ס מיטות"
                                type="number"
                                //   id="password"
                                autoComplete="current-password"
                                onChange={(e) => { setSuiteData({ ...suiteData, numBeds: e.target.value }); }}
                                value={suiteData.numBeds}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="מחיר"
                                type="Number"
                                id="password"
                                autoComplete="current-password"
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
                                                <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="תמונה"
                            name="image"
                            autoComplete="image"
                            type="file"
                            onChange={(e) => {
                                setSuiteData({ ...suiteData, image: e.target.files[0] }); // כאן אנחנו שומרים את הקובץ שנבחר
                            }}
                            />

                                                

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

                </form>

                {/* הצגת אזהרת שגיאה אם יש */}
                {/* {alertText !== "" && <Alert variant='outlined' severity='error'>{alertText}</Alert>} */}
                {/* </div> */}
            </Container>
        </>

    );
}
