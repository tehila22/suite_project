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
import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate

const pages = ['דף הבית', 'הוספת צימר', 'התחברות'];
const settings = ['עריכת פרופיל', 'התנתקות'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser, logout } = React.useContext(UserContext); // מקבל את המשתמש הנוכחי מהקונטקסט
  const navigate = useNavigate();  // יצירת הניווט עם useNavigate

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
    if (setting == 'התנתקות'){
      logout();
      navigate('/')
    }
    setAnchorElUser(null);
  };

  // ניווטים
  const handleHomeClick = () => {
    navigate('/show-suites');  // ניווט לעמוד show-suites
  };

  const handleAddNewSuiteClick = () => {
    navigate('/add-new-suite');  // ניווט לעמוד add-new-suite
  };
  const Login = () => {
    navigate('/');  // 
  };
  // רק אם יש currentUser, מוצגים ה-NavBar והלוגו
  // if (!currentUser) {
  //   return null; // לא מציג את ה-NavBar אם המשתמש לא מחובר
  // }

  return (
    <>
      <img src={process.env.PUBLIC_URL + '/images/suitesLogo.png'} style={{ height: '180px', position: 'fixed' }} />

      <AppBar position="static" sx={{ position: 'fixed', top: '20px', zIndex: 999, width: '80%', right: '0px', backgroundColor: 'white', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#00B0FF', // תכלת
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    {page === 'דף הבית' ? (
                      <Typography sx={{ textAlign: 'center', color: '#00B0FF' }} onClick={handleHomeClick}>
                        {page}
                      </Typography>
                    ) : page === 'הוספת צימר' ? (
                      <Typography sx={{ textAlign: 'center', color: '#00B0FF' }} onClick={handleAddNewSuiteClick}>
                        {page}
                      </Typography>
                    ) :page==='התנתקות'? (
                      <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}onClick={Login}>
                    {page}
                      </Typography>
                    ):null}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#00B0FF',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#00B0FF', display: 'block' }}
                >
                  {page === 'דף הבית' ? (
                    <Typography sx={{ color: '#00B0FF' }} onClick={handleHomeClick}>
                      {page}
                    </Typography>
                  ) : page === 'הוספת צימר' ? (
                    <Typography sx={{ color: '#00B0FF' }} onClick={handleAddNewSuiteClick}>
                      {page}
                    </Typography>
                  ) : page=='התחברות'?(
                    <Typography sx={{ color: '#00B0FF' }} onClick={Login}>
                    {page}
                  </Typography>
                    ) : (
                      page
                    )}
                 
                </Button>
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
                    <MenuItem key={setting} onClick={() => { console.log('click me'); handleCloseUserMenu(setting) }}>
                      <Typography sx={{ textAlign: 'center', color: '#00B0FF' }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
