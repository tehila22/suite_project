import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './Context'; // ייבוא הקונטקסט
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { currentUser, updateUser } = useContext(UserContext); // מקבלים את המשתמש מהקונטקסט
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (currentUser) {
      // טוען את פרטי המשתמש הנוכחי לקלטים
      setUserData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        password: '' // לא נרצה להציג סיסמא קיימת
      });
    } else {
      navigate('/'); // אם אין משתמש מחובר, מחזירים לדף הבית
    }
  }, [currentUser, navigate]);

  const handleSubmit = () => {
    updateUser(userData); // עדכון פרטי המשתמש בקונטקסט
    navigate('/show-suites'); // ניווט לדף הצימרים אחרי עדכון
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <CssBaseline />

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ margin: 1, backgroundColor: 'Highlight' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            עריכת פרופיל
          </Typography>
          <form
            style={{
              width: '100%',
              marginTop: '24px'
            }}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="שם משתמש"
                  autoFocus
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  value={userData.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="מייל"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  value={userData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  value={userData.password}
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
                marginTop: '24px'
              }}
            >
              שמור שינויים
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
