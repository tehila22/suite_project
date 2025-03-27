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

import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Grid, Typography, Box, Paper, Slider, Button, Rating, Drawer } from '@mui/material';
import ShowAllSuites from './ShowAllSuites';
import axios from 'axios';

export default function FilterSuites() {
    const [suites, setSuites] = useState([]);
    const [filters, setFilters] = useState({
        accommodationType: '',
        areas: [],
        suitableFor: [],
        classification: 0,
        features: [],
        reviews: 0,
        units: 0,
        numOfPeople: 0,
        priceRange: [65, 8000],
    });

    const [open, setOpen] = useState(false); // מצב פתיחה של ה-Drawer

    useEffect(() => {
        const getAllSuites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/suite');
                setSuites(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getAllSuites();
    }, []);

    const handleCheckboxChange = (category, value) => {
        setFilters((prev) => {
            const updatedCategory = filters[category].includes(value)
                ? filters[category].filter(item => item !== value)
                : [...filters[category], value];
            return { ...prev, [category]: updatedCategory };
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFilters({
            accommodationType: '',
            areas: [],
            suitableFor: [],
            classification: 0,
            features: [],
            reviews: 0,
            units: 0,
            numOfPeople: 0,
            priceRange: [65, 8000],
        });
    };

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    return (
        <>
            {/* הכפתור לפתיחת הסינון */}
            {/* <Button variant="contained" color="primary" onClick={toggleDrawer(true)} sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
                סינון
            </Button> */}

            {/* ה-Drawer שמכיל את הפילטרים */}
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Box sx={{
                    width: 250,
                    backgroundColor: '#ffffff', // שינוי צבע הרקע ללבן
                    padding: 3,
                    height: '100vh',
                    overflowY: 'auto',
                }}>
                    <Typography variant="h6" gutterBottom align="right">סינון לפי</Typography>
                    <Button variant="contained" color="secondary" onClick={handleReset} sx={{ float: 'right' }}>הסר סינונים</Button>

                    <Grid container direction="column" spacing={3} sx={{ marginTop: 3, textAlign: 'right' }}>
                        {/* סוג מקום האירוח */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">סוג מקום האירוח</Typography>
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

                        {/* צימרים לפי אזורים */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">צימרים לפי אזורים</Typography>
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

                        {/* סיווג - כוכבים */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">סיווג</Typography>
                                <Rating
                                    name="classification"
                                    value={filters.classification}
                                    onChange={(event, newValue) => setFilters((prev) => ({ ...prev, classification: newValue }))}
                                    precision={0.5}
                                    size="large"
                                />
                            </Paper>
                        </Grid>

                        {/* מאפיינים */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">מאפיינים</Typography>
                                {/* {['בריכה', 'ג'קוזי', 'מגרש ספורט'].map((feature) => (
                    <FormControlLabel
                      key={feature}
                      control={
                        <Checkbox
                          checked={filters.features.includes(feature)}
                          onChange={() => handleCheckboxChange('features', feature)}
                        />
                      }
                      label={feature}
                    />
                  ))} */}
                            </Paper>
                        </Grid>

                        {/* חוות דעת */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">חוות דעת</Typography>
                                <Slider
                                    value={filters.reviews}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value} כוכבים`}
                                    name="reviews"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                />
                            </Paper>
                        </Grid>

                        {/* מספר יחידות אירוח */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">מס' יחידות אירוח</Typography>
                                <Slider
                                    value={filters.units}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value} יחידות`}
                                    name="units"
                                    min={1}
                                    max={10}
                                />
                            </Paper>
                        </Grid>

                        {/* מספר אנשים */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">מס' אנשים</Typography>
                                <TextField
                                    type="number"
                                    label="מס' אנשים"
                                    name="numOfPeople"
                                    fullWidth
                                    value={filters.numOfPeople}
                                    onChange={handleChange}
                                />
                            </Paper>
                        </Grid>

                        {/* מחיר */}
                        <Grid item>
                            <Paper sx={{ padding: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom align="right">מחיר</Typography>
                                <Slider
                                    value={filters.priceRange}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value} ש"ח`}
                                    name="priceRange"
                                    min={65}
                                    max={8000}
                                    step={50}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>

            <ShowAllSuites suites={suites} setSuites={setSuites} />
        </>
    );
}
