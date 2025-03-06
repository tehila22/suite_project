import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/system';

export default function SignUp() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    console.log(userData);
    setUserData({
      name: "",
      email: "",
      password: ""
    });

    try {
      const response = await axios.post('http://localhost:5000/user/', userData);
      navigate('/show-suites');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    //     // כאן אנחנו מגדירים את התמונה כרקע של כל העמוד
    //     <div 
    //       style={{
    //         height: '100vh', // תופס את כל גובה המסך
    //         backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`, // מיקום התמונה
    //         backgroundSize: 'cover', // התמונה ממלאת את כל הרקע
    //         backgroundPosition: 'center', // מיקום התמונה במרכז
    //       }}
    //     >
    //       <CssBaseline />

    //       {/* ה-Container עכשיו יהיה עם רקע לבן */}
    //       <div
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //           position:'relative',
    //           top:'144px'
    //         }}
    //       >
    //         <Avatar
    //           sx={{
    //             margin: 1,
    //             backgroundColor: (theme) => theme.palette.secondary.main,
    //           }}
    //         >
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           הרשמה
    //         </Typography>

    //         {/* כאן אנחנו מציבים את הטופס עם רקע לבן */}
    //         {/* <div
    //           style={{
    //             backgroundColor: 'white', // הרקע של הטופס יהיה לבן
    //             padding: '32px', // ריווח פנימי לטופס
    //             borderRadius: '8px', // רדיוס פינות לפינות רכות
    //             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // צלליות לטופס
    //             width: '100%',
    //             maxWidth: '400px', // הגבלת רוחב הטופס
    //           }}
    //         > */}
    //           <form
    //             style={{
    //               width: '100%',
    //               marginTop: '24px', // ריווח
    //             }}
    //             noValidate
    //           >
    //             <Grid container spacing={2}>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   autoComplete="fname"
    //                   name="firstName"
    //                   variant="outlined"
    //                   required
    //                   fullWidth
    //                   id="userName"
    //                   label="שם משתמש"
    //                   autoFocus
    //                   onChange={(e) => setUserData({ ...userData, name: e.target.value })}
    //                   value={userData.name}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   variant="outlined"
    //                   required
    //                   fullWidth
    //                   id="email"
    //                   label="מייל"
    //                   name="email"
    //                   autoComplete="email"
    //                   onChange={(e) => setUserData({ ...userData, email: e.target.value })}
    //                   value={userData.email}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   variant="outlined"
    //                   required
    //                   fullWidth
    //                   name="password"
    //                   label="סיסמא"
    //                   type="password"
    //                   id="password"
    //                   autoComplete="current-password"
    //                   onChange={(e) => setUserData({ ...userData, password: e.target.value })}
    //                   value={userData.password}
    //                 />
    //               </Grid>
    //             </Grid>
    //             <Button
    //               type="button"
    //               fullWidth
    //               variant="contained"
    //               color="primary"
    //               sx={{
    //                 marginTop: '24px', // ריווח
    //               }}
    //               onClick={handleSubmit}
    //             >
    //               אישור
    //             </Button>
    //             <Grid container justifyContent="flex-end">
    //               <Grid item>
    //                 <Link href="/" variant="body2">
    //                   יש לך חשבון קיים? לחץ כאן להתחברות
    //                 </Link>
    //               </Grid>
    //             </Grid>
    //           </form>
    //         {/* </div> */}
    //       </div>
    //     </div>
    //   );
    // }

    // כאן אנחנו מגדירים את התמונה כרקע של כל העמוד
    <div
      style={{
        height: '100vh', // תופס את כל גובה המסך
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof.jpg)`, // מיקום התמונה
        backgroundSize: 'cover', // התמונה ממלאת את כל הרקע
        backgroundPosition: 'center', // מיקום התמונה במרכז
      }}
    >
      <CssBaseline />

      {/* ה-Container עכשיו יהיה עם רקע לבן */}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            הרשמה
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
                marginTop: '24px',
              }}
            >
              כניסה
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  יש לך חשבון קיים? לחץ כאן להתחברות
                </Link>
              </Grid>
            </Grid>
          </form>

          {/* הצגת אזהרת שגיאה אם יש */}
          {/* {alertText !== "" && <Alert variant='outlined' severity='error'>{alertText}</Alert>} */}
        </div>
      </Container>
    </div>
  );
}
