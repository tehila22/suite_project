import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from './Context';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [alertText, setAlertText] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "יש להזין שם משתמש";
    } else if (userData.name.trim().length < 2) {
      newErrors.name = "השם חייב להכיל לפחות 2 תווים";
    }

    if (!userData.email.trim()) {
      newErrors.email = "יש להזין מייל";
    } else if (!validateEmail(userData.email)) {
      newErrors.email = "כתובת המייל אינה תקינה";
    }

    if (!userData.password) {
      newErrors.password = "יש להזין סיסמה";
    } else if (userData.password.length < 4) {
      newErrors.password = "הסיסמא חייבת להכיל לפחות 4 תווים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setAlertText("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/', userData);
      login(response.data?.user);
      navigate('/show-suites');
    } catch (err) {
      console.error(err);
      setAlertText("שגיאה במהלך ההרשמה. נסה שוב.");
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'Highlight' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">הרשמה</Typography>
          <form style={{ width: '100%', marginTop: '24px' }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="שם משתמש"
                  autoFocus
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                  value={userData.name}
                  error={!!errors.name}
                  helperText={errors.name}
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
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  value={userData.email}
                  error={!!errors.email}
                  helperText={errors.email}
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
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  value={userData.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            {alertText && (
              <Alert severity="error" style={{ marginTop: '16px' }}>
                {alertText}
              </Alert>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: '24px' }}
            >
              הרשמה
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  יש לך חשבון קיים? לחץ כאן להתחברות
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
