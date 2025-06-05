// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { useContext, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Alert } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { UserContext } from './Context';

// export default function Login() {
//   const {login}=useContext(UserContext)

//   const [alertText, setAlertText] = useState("");
//   const [userData, setUserData] = useState({
//     name: "",
//     password: ""
//   })

//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     console.log(userData);
//     setUserData({
//       name: "",
//       password: ""
//     })

//     try {
//       const response = await axios.post('http://localhost:5000/user/login', userData);
//       login(response.data)
//       navigate('/show-suites');
//     } catch (err) {
//       console.error(err);
//       setAlertText("משתמש זה לא קיים במערכת");
//     }
//   }

//   return (
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
//       <Container
//         component="main"
//         maxWidth="xs"
//         style={{
//           backgroundColor: 'white', // הרקע של הטופס יהיה לבן
//           padding: '32px', // ריווח פנימי לטופס
//           borderRadius: '8px', // רדיוס פינות לפינות רכות
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // צלליות לטופס
//           position: 'relative',
//           top: '144px'
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar
//             sx={{
//               margin: 1,
//               backgroundColor: 'Highlight',

//               // backgroundColor: (theme) => theme.palette.secondary.main,
//             }}
//           >
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             התחברות
//           </Typography>
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
//                   variant="outlined"
//                   required
//                   fullWidth
//                   id="userName"
//                   label="שם משתמש"
//                   name="name"
//                   autoComplete="name"
//                   onChange={(e) => { setUserData({ ...userData, name: e.target.value }); setAlertText("") }}
//                   value={userData.name}
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
//                   onChange={(e) => { setUserData({ ...userData, password: e.target.value }); setAlertText("") }}
//                   value={userData.password}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="button"
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               sx={{
//                 marginTop: '24px',
//               }}
//             >
//               כניסה
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/sign-up" variant="body2">
//                   עדיין אין לך חשבון? לחץ כאן
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>

//           {/* הצגת אזהרת שגיאה אם יש */}
//           {alertText !== "" && <Alert variant='outlined' severity='error'>{alertText}</Alert>}
//         </div>
//       </Container>
//     </div>
//   );
// }


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from './Context';

export default function Login() {
  const { login, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [alertText, setAlertText] = useState("");
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    password: ""
  });


  const validateForm = () => {
    let newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "יש להזין שם משתמש";
    } else if (userData.name.trim().length < 2) {
      newErrors.name = "שם המשתמש חייב להכיל לפחות 2 תווים";
    }

    if (!userData.password) {
      newErrors.password = "יש להזין סיסמה";
    } else if (userData.password.length < 4) {
      newErrors.password = "הסיסמה חייבת להכיל לפחות 4 תווים";
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
      const response = await axios.post('http://localhost:5000/user/login', userData);
      login(response.data);
      navigate('/show-suites');
    } catch (err) {
      console.error(err);
      setAlertText("משתמש זה לא קיים במערכת או פרטים שגויים");
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
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <form style={{ width: '100%', marginTop: '24px' }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="שם משתמש"
                  name="name"
                  autoComplete="name"
                  value={userData.name}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: '24px' }}
            >
              כניסה
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  עדיין אין לך חשבון? לחץ כאן
                </Link>
              </Grid>
            </Grid>
          </form>

          {alertText !== "" && (
            <Alert variant='outlined' severity='error' sx={{ mt: 2 }}>
              {alertText}
            </Alert>
          )}
        </div>
      </Container>
    </div>
  );
}
