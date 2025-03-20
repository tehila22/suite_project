import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Checkbox, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from './Context';
import Avatar from '@mui/material/Avatar';

export default function UpdateSuite() {
    const { suiteId } = useParams(); // מקבלים את ה-ID של הצימר מה-URL
    const [suiteData, setSuiteData] = useState({
        name: '',
        description: '',
        city: '',
        address: '',
        numRooms: '',
        numBeds: '',
        nightPrice: '',
        pool: false,
        jacuzzi: false,
        image: null
    });
    const navigate = useNavigate();
    
    // שימוש ב-Effect כדי למשוך את הנתונים של הצימר
    useEffect(() => {
        const fetchSuiteData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/suite/${suiteId}`); // קורא את הנתונים של הצימר
                setSuiteData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSuiteData();
    }, [suiteId]);

    const handleSubmit = async () => {
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
            formData.append('image', suiteData.image); // הוספת התמונה אם יש
        }

        try {
            const response = await axios.put(`http://localhost:5000/suite/${suiteId}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            // אחרי העדכון, ננווט חזרה לעמוד הצימרים
            console.log(response.data);
            navigate('/show-suites');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                עדכון צימר
            </Typography>
            <form
                style={{
                    width: '100%',
                    marginTop: '24px',
                }}
                noValidate
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
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
                            fullWidth
                            label="תמונה"
                            name="image"
                            type="file"
                            onChange={(e) => { setSuiteData({ ...suiteData, image: e.target.files[0] }); }}
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
                    עדכון
                </Button>
            </form>
        </Container>
    );
}
