import React, { useEffect, useState } from 'react';
import {
  TextField, Button, AppBar, Toolbar, IconButton, Box, Typography, Drawer, Grid, Paper, Slider,
  FormControlLabel, Checkbox, Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ShowAllSuites from './ShowAllSuites';
import axios from 'axios';

export default function HomePage() {
  const [suites, setSuites] = useState([]);
  const [filteredSuites, setFilteredSuites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    accommodationType: '',
    areas: [],
    classification: 0,
    features: [],
    reviews: 0,
    units: 0,
    numOfPeople: 0,
    priceRange: [65, 8000],
  });

  useEffect(() => {
    const getAllSuites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/suite');
        setSuites(response.data);
        setFilteredSuites(response.data); // Initializing with all suites
      } catch (err) {
        console.error(err);
      }
    };
    getAllSuites();
  }, []);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    const filtered = suites.filter(suite =>
      suite.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredSuites(filtered);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleChange = (event, newValue) => {
    const { name } = event.target;
    if (name === 'priceRange') {
      setFilters((prev) => ({ ...prev, priceRange: newValue }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleReset = () => {
    setFilters({
      accommodationType: '',
      areas: [],
      classification: 0,
      features: [],
      reviews: 0,
      units: 0,
      numOfPeople: 0,
      priceRange: [65, 8000],
    });
    setFilteredSuites(suites); // Reset filtered suites to all
  };

  const applyFilters = () => {
    const result = suites.filter(suite => {
      const inArea = filters.areas.length === 0 || filters.areas.includes(suite.city);
      const matchType = !filters.accommodationType || suite.type === filters.accommodationType;
      const matchClassification = filters.classification === 0 || suite.classification >= filters.classification;
      const inPrice = suite.nightPrice >= filters.priceRange[0] && suite.nightPrice <= filters.priceRange[1];
      const matchPeople = !filters.numOfPeople || suite.numBeds >= filters.numOfPeople;
      const matchFeatures = filters.features.every(feat => suite[feat]);

      return inArea && matchType && matchClassification && inPrice && matchPeople && matchFeatures;
    });

    setFilteredSuites(result);
    setOpen(false);
  };

  return (
    <>
      {/* Navbar with Search and Filter button */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          zIndex: 1201, // Ensure the navbar stays above the Drawer
        }}
      >
        {/* <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'blue',position:'relative',top:'20px' }}> */}
          {/* חיפוש חופשי */}
          <Box sx={{ flexGrow: 1, maxWidth: '300px',position:'absolute',top:'6px',left:'120px' }}>
            <TextField
              label="חפש צימר"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              fullWidth
            />
          </Box>

          {/* כפתור סינון */}
          <Box
  onClick={toggleDrawer(true)}
  sx={{
    position: 'absolute',
    top: '12px',
    left: '17px',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    cursor: 'pointer',
    border: '2px solid black',
    backgroundColor: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'lightgreen',
    },
  }}
>
  <FilterListOutlinedIcon />
  <Typography variant="subtitle1">סינון</Typography>
</Box>
        {/* </Toolbar> */}
      </AppBar>

      {/* Drawer for Filters */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1200, // Make sure Drawer appears below the navbar
        }}
      >
        <Box sx={{ width: 280, padding: 3, backgroundColor: 'white', height: '100vh', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom align="right">
            סינון לפי
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ float: 'right' }}>
            איפוס
          </Button>

          <Grid container direction="column" spacing={3} sx={{ marginTop: 3, textAlign: 'right' }}>
            {/* סוג מקום האירוח */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">סוג מקום האירוח</Typography>
                {['צימר', 'וילה', 'דירה', 'בית פרטי'].map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={filters.accommodationType === type}
                        onChange={() => setFilters((prev) => ({ ...prev, accommodationType: type }))}
                      />
                    }
                    label={type}
                  />
                ))}
              </Paper>
            </Grid>

            {/* אזורים */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">אזור</Typography>
                {['צפון', 'דרום', 'מרכז', 'ירושלים'].map((area) => (
                  <FormControlLabel
                    key={area}
                    control={
                      <Checkbox
                        checked={filters.areas.includes(area)}
                        onChange={() => handleCheckboxChange('areas', area)}
                      />
                    }
                    label={area}
                  />
                ))}
              </Paper>
            </Grid>

            {/* סיווג */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">סיווג (כוכבים ומעלה)</Typography>
                <Rating
                  name="classification"
                  value={filters.classification}
                  onChange={(event, newValue) => setFilters((prev) => ({ ...prev, classification: newValue }))}
                  precision={0.5}
                  size="large"
                />
              </Paper>
            </Grid>

            {/* טווח מחירים */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">מחיר ללילה</Typography>
                <Slider
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={(e, newVal) => handleChange({ target: { name: 'priceRange' } }, newVal)}
                  valueLabelDisplay="auto"
                  min={65}
                  max={8000}
                  step={50}
                />
              </Paper>
            </Grid>

            {/* כפתור סינון */}
            <Grid item>
              <Button fullWidth variant="contained" color="primary" onClick={applyFilters}>
                החל סינון
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>

      {/* הצגת הצימרים המסוננים */}
      <ShowAllSuites suites={filteredSuites} setSuites={setFilteredSuites} />
    </>
  );
}





// import React, { useEffect, useState } from 'react';
// import { TextField, Checkbox, FormControlLabel, Grid, Typography, Box, Paper, Slider, Button, Rating } from '@mui/material';
// import ShowAllSuites from './ShowAllSuites';
// import axios from 'axios';


// export default function FilterSuites() {
//      const [suites, setSuites] = useState([]);
//     const [filters, setFilters] = useState({
//         accommodationType: '',
//         areas: [],
//         suitableFor: [],
//         classification: 0, // כאן אנחנו משתמשים במספר כדי לייצג את הציון
//         features: [],
//         reviews: 0,
//         units: 0,
//         numOfPeople: 0,
//         priceRange: [65, 8000],
//     });
//     //
//     useEffect(() => {
//         const getAllSuites = async () => {
//           try {
//             const response =await axios.get('http://localhost:5000/suite')
//             setSuites(response.data)
//             console.log(response.data);
            
//           } catch (err) {
//             console.error(err);
//           }
//         }
//         getAllSuites();
//       }, [])
//       //
//     //   const ShowAllSuites = ({ suites }) => (
//     //     <div>
//     //       {suites.length === 0 ? (
//     //         <p>אין צימרים זמינים</p>
//     //       ) : (
//     //         suites.map((suite, index) => (
//     //           <div key={index}>
//     //             <h3>{suite.name}</h3>
//     //             <p>{suite.description}</p>
//     //             {/* הוספת נתונים נוספים כמו מחיר, סוג מקום ועוד */}
//     //           </div>
//     //         ))
//     //       )}
//     //     </div>
//     //   );
//       //
      

//     const handleCheckboxChange = (category, value) => {
//         setFilters((prev) => {
//             const updatedCategory = filters[category].includes(value)
//                 ? filters[category].filter(item => item !== value)
//                 : [...filters[category], value];
//             return { ...prev, [category]: updatedCategory };
//         });
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFilters((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleReset = () => {
//         setFilters({
//             accommodationType: '',
//             areas: [],
//             suitableFor: [],
//             classification: 0,
//             features: [],
//             reviews: 0,
//             units: 0,
//             numOfPeople: 0,
//             priceRange: [65, 8000],
//         });
//     };

//     return (
//         <>
//             <Box sx={{
//                 width: 250,
//                 backgroundColor: '#FFEDD5',
//                 padding: 3,
//                 borderRadius: 2,
//                 position: 'absolute',
//                 right: 0,
//                 top: '75px',

//                 height: '100vh',
//                 overflowY: 'auto',
//             }}>
//                 <Typography variant="h6" gutterBottom align="right">סינון לפי</Typography>
//                 <Button variant="contained" color="secondary" onClick={handleReset} sx={{ float: 'right' }}>הסר סינונים</Button>

//                 <Grid container direction="column" spacing={3} sx={{ marginTop: 3, textAlign: 'right' }}>
//                     {/* סוג מקום האירוח */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">סוג מקום האירוח</Typography>
//                             {['צימר', 'וילה', 'דירה', 'בית פרטי'].map((type) => (
//                                 <FormControlLabel
//                                     key={type}
//                                     control={
//                                         <Checkbox
//                                             checked={filters.accommodationType === type}
//                                             onChange={() => setFilters((prev) => ({ ...prev, accommodationType: type }))}
//                                         />
//                                     }
//                                     label={type}
//                                 />
//                             ))}
//                         </Paper>
//                     </Grid>

//                     {/* צימרים לפי אזורים */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">צימרים לפי אזורים</Typography>
//                             {['צפון', 'דרום', 'מרכז', 'ירושלים'].map((area) => (
//                                 <FormControlLabel
//                                     key={area}
//                                     control={
//                                         <Checkbox
//                                             checked={filters.areas.includes(area)}
//                                             onChange={() => handleCheckboxChange('areas', area)}
//                                         />
//                                     }
//                                     label={area}
//                                 />
//                             ))}
//                         </Paper>
//                     </Grid>

//                     {/* סיווג - כוכבים */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">סיווג</Typography>
//                             <Rating
//                                 name="classification"
//                                 value={filters.classification}
//                                 onChange={(event, newValue) => setFilters((prev) => ({ ...prev, classification: newValue }))}
//                                 precision={0.5}
//                                 size="large"
//                             />
//                         </Paper>
//                     </Grid>

//                     {/* מאפיינים */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">מאפיינים</Typography>
//                             {/* {['בריכה', 'ג'קוזי', 'מגרש ספורט'].map((feature) => (
//               <FormControlLabel
//                 key={feature}
//                 control={
//                   <Checkbox
//                     checked={filters.features.includes(feature)}
//                     onChange={() => handleCheckboxChange('features', feature)}
//                   />
//                 }
//                 label={feature}
//               />
//             ))} */}
//                         </Paper>
//                     </Grid>

//                     {/* חוות דעת */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">חוות דעת</Typography>
//                             <Slider
//                                 value={filters.reviews}
//                                 onChange={handleChange}
//                                 valueLabelDisplay="auto"
//                                 valueLabelFormat={(value) => `${value} כוכבים`}
//                                 name="reviews"
//                                 min={0}
//                                 max={5}
//                                 step={0.5}
//                             />
//                         </Paper>
//                     </Grid>

//                     {/* מספר יחידות אירוח */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">מס' יחידות אירוח</Typography>
//                             <Slider
//                                 value={filters.units}
//                                 onChange={handleChange}
//                                 valueLabelDisplay="auto"
//                                 valueLabelFormat={(value) => `${value} יחידות`}
//                                 name="units"
//                                 min={1}
//                                 max={10}
//                             />
//                         </Paper>
//                     </Grid>

//                     {/* מספר אנשים */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">מס' אנשים</Typography>
//                             <TextField
//                                 type="number"
//                                 label="מס' אנשים"
//                                 name="numOfPeople"
//                                 fullWidth
//                                 value={filters.numOfPeople}
//                                 onChange={handleChange}
//                             />
//                         </Paper>
//                     </Grid>

//                     {/* מחיר */}
//                     <Grid item>
//                         <Paper sx={{ padding: 2, borderRadius: 1 }}>
//                             <Typography variant="subtitle1" gutterBottom align="right">מחיר</Typography>
//                             <Slider
//                                 value={filters.priceRange}
//                                 onChange={handleChange}
//                                 valueLabelDisplay="auto"
//                                 valueLabelFormat={(value) => `${value} ש"ח`}
//                                 name="priceRange"
//                                 min={65}
//                                 max={8000}
//                                 step={50}
//                             />
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Box>
//             <ShowAllSuites suites = {suites}/>
//         </>
//     )
// }
