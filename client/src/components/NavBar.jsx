// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { UserContext } from './Context';
// import { useNavigate } from 'react-router-dom';

// const settings = ['עריכת פרופיל', 'התנתקות'];

// function NavBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const { logout } = React.useContext(UserContext);
//   const navigate = useNavigate();

//   // ✅ שליפת currentUser מה-localStorage בצורה בטוחה
//   let currentUser = null;
//   try {
//     const storedUser = localStorage.getItem("currentUser");
//     currentUser = storedUser ? JSON.parse(storedUser) : null;
//   } catch (err) {
//     console.error("שגיאה בפרסור של currentUser מה-localStorage", err);
//   }

//   // ניהול דפים לפי סוג המשתמש
//   let pages = ['התחברות', 'דף הבית'];
//   if (currentUser?.type === 'admin') pages.push('הוספת צימר');

//   // פונקציות פתיחה/סגירה של התפריטים
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = (setting) => {
//     if (setting === 'התנתקות') {
//       logout();
//       localStorage.removeItem("currentUser");
//       navigate('/');
//     } else if (setting === 'עריכת פרופיל') {
//       navigate('/edit-profile');
//     }
//     setAnchorElUser(null);
//   };

//   const handleHomeClick = () => navigate('/show-suites');
//   const handleAddNewSuiteClick = () => navigate('/add-new-suite');
//   const handleLoginClick = () => navigate('/');

//   return (
//     <>
//       <img
//         src={process.env.PUBLIC_URL + '/images/suitesLogo.png'}
//         style={{
//           zIndex: 999,
//           left: '18px',
//           top: '533px',
//           opacity: '0.5',
//           borderRadius: '50%',
//           height: '190px',
//           position: 'fixed',
//         }}
//         alt="Logo"
//       />

//       {currentUser && (
//         <AppBar
//           position="static"
//           sx={{
//             position: 'fixed',
//             zIndex: 999,
//             backgroundColor: 'white',
//             right: '0px',
//             boxShadow: 'none',
//           }}
//         >
//           <Container maxWidth="xl">
//             <Toolbar disableGutters>
//               {/* תפריט ניווט קטן (למובייל) */}
//               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                 <IconButton
//                   size="large"
//                   aria-label="menu"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleOpenNavMenu}
//                   color="inherit"
//                 >
//                   <MenuIcon sx={{ color: '#00B0FF' }} />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorElNav}
//                   anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                   keepMounted
//                   transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//                   open={Boolean(anchorElNav)}
//                   onClose={handleCloseNavMenu}
//                   sx={{ display: { xs: 'block', md: 'none' } }}
//                 >
//                   {pages.map((page) => (
//                     <MenuItem
//                       key={page}
//                       onClick={() => {
//                         handleCloseNavMenu();
//                         if (page === 'דף הבית') handleHomeClick();
//                         else if (page === 'הוספת צימר') handleAddNewSuiteClick();
//                         else if (page === 'התחברות') handleLoginClick();
//                       }}
//                     >
//                       <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>{page}</Typography>
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Box>

//               {/* תפריט ניווט רגיל (למסך גדול) */}
//               <Box
//                 sx={{
//                   flexGrow: 1,
//                   display: { xs: 'none', md: 'flex' },
//                   justifyContent: 'center',
//                 }}
//               >
//                 {pages.map((page, index) => (
//                   <React.Fragment key={page}>
//                     <Button
//                       onClick={() => {
//                         if (page === 'דף הבית') handleHomeClick();
//                         else if (page === 'הוספת צימר') handleAddNewSuiteClick();
//                         else if (page === 'התחברות') handleLoginClick();
//                       }}
//                       sx={{ my: 2, color: '#00B0FF', display: 'block' }}
//                     >
//                       <Typography sx={{ color: '#00B0FF' }}>{page}</Typography>
//                     </Button>
//                     {index < pages.length - 1 && (
//                       <Typography sx={{ color: '#00B0FF', mx: 1, pt: '22px' }}>|</Typography>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </Box>

//               {/* תפריט משתמש עם Avatar */}
//               <Box sx={{ flexGrow: 0 }}>
//                 <Tooltip title="Open settings">
//                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                     <Avatar alt={currentUser?.name || "User"} src="/static/images/avatar/2.jpg" />
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   sx={{ mt: '45px' }}
//                   id="menu-appbar"
//                   anchorEl={anchorElUser}
//                   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   keepMounted
//                   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   open={Boolean(anchorElUser)}
//                   onClose={() => setAnchorElUser(null)}
//                 >
//                   {settings.map((setting) => (
//                     <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
//                       <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>{setting}</Typography>
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Box>
//             </Toolbar>
//           </Container>
//         </AppBar>
//       )}
//     </>
//   );
// }

// export default NavBar;



// // השתמש רק ב־UserContext במקום לגשת ל־localStorage ישירות בקומפוננטות כמו NavBar.
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { UserContext } from './Context';
// import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';

// const settings = ['עריכת פרופיל', 'התנתקות'];

// function NavBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const { currentUser, logout } = React.useContext(UserContext); // 📌 שימוש בקונטקסט
//   const navigate = useNavigate();

//   const pages = ['התחברות', 'דף הבית', ...(currentUser?.type === 'admin' ? ['הוספת צימר'] : [])];

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = (setting) => {
//     if (setting === 'התנתקות') {
//       logout();
//       navigate('/');
//     } else if (setting === 'עריכת פרופיל') {
//       navigate('/edit-profile');
//     }
//     setAnchorElUser(null);
//   };

//   const handlePageClick = (page) => {
//     switch (page) {
//       case 'התחברות':
//         navigate('/');
//         break;
//       case 'דף הבית':
//         navigate('/show-suites');
//         break;
//       case 'הוספת צימר':
//         navigate('/add-new-suite');
//         break;
//       default:
//         break;
//     }
//     setAnchorElNav(null);
//   };

//   return (
//     <>
//       <img
//         src={process.env.PUBLIC_URL + '/images/suitesLogo.png'}
//         style={{
//           zIndex: 999,
//           left: '18px',
//           top: '533px',
//           opacity: '0.5',
//           borderRadius: '50%',
//           height: '190px',
//           position: 'fixed',
//         }}
//         alt="logo"
//       />

//       {currentUser && (
//         <AppBar
//           position="static"
//           sx={{
//             position: 'fixed',
//             zIndex: 999,
//             backgroundColor: 'white',
//             right: '0px',
//             boxShadow: 'none',
//           }}
//         >
//           <Container maxWidth="xl">
//             <Toolbar disableGutters>
//               {/* תפריט קטן למסך צר */}
//               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                 <IconButton
//                   size="large"
//                   onClick={handleOpenNavMenu}
//                   color="inherit"
//                 >
//                   <MenuIcon sx={{ color: '#00B0FF' }} />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorElNav}
//                   open={Boolean(anchorElNav)}
//                   onClose={handleCloseNavMenu}
//                 >
//                   {pages.map((page) => (
//                     <MenuItem key={page} onClick={() => handlePageClick(page)}>
//                       <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>
//                         {page}
//                       </Typography>
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Box>

//               {/* תפריט רחב למסכים גדולים */}
//               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
//                 {pages.map((page, index) => (
//                   <React.Fragment key={page}>
//                     <Button
//                       onClick={() => handlePageClick(page)}
//                       sx={{ my: 2, color: '#00B0FF', display: 'block' }}
//                     >
//                       {page}
//                     </Button>
//                     {index < pages.length - 1 && (
//                       <Typography sx={{ color: '#00B0FF', mx: 1, paddingTop: '22px' }}>|</Typography>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </Box>

//               {/* תפריט המשתמש */}
//               <Box sx={{ flexGrow: 0 }}>
//                 <Tooltip title="הגדרות">
//                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                     <Avatar alt={currentUser.name} src="/static/images/avatar/2.jpg" />
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   sx={{ mt: '45px' }}
//                   anchorEl={anchorElUser}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                 >
//                   {settings.map((setting) => (
//                     <MenuItem
//                       key={setting}
//                       onClick={() => handleCloseUserMenu(setting)}
//                     >
//                       <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>
//                         {setting}
//                       </Typography>
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Box>

//             </Toolbar>
//           </Container>
//         </AppBar>
//       )}
//     </>
//   );
// }

// export default NavBar;




import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

const settings = ['עריכת פרופיל', 'התנתקות'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const { currentUser, logout } = React.useContext(UserContext);
  const { logout } = React.useContext(UserContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log('current user local storage',currentUser);
  

  let pages = ['התחברות', 'דף הבית'];
  if (currentUser?.type === 'admin') pages = ['התחברות', 'דף הבית', 'הוספת צימר'];

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === 'התנתקות') {
      logout();
      navigate('/');
    } else if (setting === 'עריכת פרופיל') {
      navigate('/edit-profile'); // ניווט לעמוד עריכת פרופיל
    }
    setAnchorElUser(null);
  };

  const handleHomeClick = () => {
    navigate('/show-suites');
  };

  const handleAddNewSuiteClick = () => {
    navigate('/add-new-suite');
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <>
      <img
        src={process.env.PUBLIC_URL + '/images/suitesLogo.png'}
        style={{
          zIndex:999,
          left: '18px',
          top: '533px',
          opacity: '0.5',
          borderRadius: '50%',
          height: '190px',
          position: 'fixed',
        }}
      />

      {currentUser && (
        <AppBar
          position="static"
          sx={{
            position: 'fixed',
            zIndex: 999,
            backgroundColor: 'white',
            right: '0px',
            boxShadow: 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: '#00B0FF' }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={page === 'התחברות' ? handleLoginClick : handleCloseNavMenu}
                    >
                      <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>
                        {page === 'דף הבית' ? (
                          <span onClick={handleHomeClick}>{page}</span>
                        ) : page === 'הוספת צימר' ? (
                          <span onClick={handleAddNewSuiteClick}>{page}</span>
                        ) : (
                          page
                        )}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page, index) => (
                  <React.Fragment key={page}>
                    <Button
                      onClick={page === 'התחברות' ? handleLoginClick : handleCloseNavMenu}
                      sx={{ my: 2, color: '#00B0FF', display: 'block' }}
                    >
                      <Typography sx={{ color: '#00B0FF' }}>
                        {page === 'דף הבית' ? (
                          <span onClick={handleHomeClick}>{page}</span>
                        ) : page === 'הוספת צימר' ? (
                          <span onClick={handleAddNewSuiteClick}>{page}</span>
                        ) : (
                          page
                        )}
                      </Typography>
                    </Button>
                    {index < pages.length - 1 && (
                      <Typography sx={{ color: '#00B0FF', mx: 1, paddingTop: '22px' }}>|</Typography>
                    )}
                  </React.Fragment>
                ))}
              </Box>

              {currentUser && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={currentUser.name} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}

export default NavBar;