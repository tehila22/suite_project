import React from 'react';
import {
  Box, Button, Grid, Paper, Typography,
  FormControl, Select, OutlinedInput, Chip, MenuItem,
  TextField, FormControlLabel, Checkbox, Slider, Drawer
} from '@mui/material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

export default function FilterSuites({open,toggleDrawer,filters,cities,handleChange,handleCheckboxChange,handleReset,applyFilters})
 {
  return (
    <>
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

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: 1200 }}
      >
        <Box sx={{ width: 280, padding: 3, backgroundColor: 'white', height: '100vh', overflowY: 'auto' }}>
          <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ float: 'right' }}>
            איפוס
          </Button>
          <Grid container direction="column" spacing={3} sx={{ marginTop: 3, textAlign: 'right' }}>

            {/* מיקומים */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">מיקומים מועדפים</Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    multiple
                    value={filters.areas}
                    onChange={(e) => handleChange('areas', e.target.value)}
                    input={<OutlinedInput id="select-multiple-chip" label="בחר ערים" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            {/* אורחים */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">מספר אורחים</Typography>
                <TextField
                  type="number"
                  inputProps={{ min: 1, max: 1000 }}
                  value={filters.numBeds}
                  onChange={(e) => handleChange('numBeds', Number(e.target.value))}
                  fullWidth
                />
              </Paper>
            </Grid>

            {/* קומות */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">מספר קומות</Typography>
                <TextField
                  type="number"
                  inputProps={{ min: 1, max: 8 }}
                  value={filters.floor || 1}
                  onChange={(e) => handleChange('floor', Number(e.target.value))}
                  fullWidth
                />
              </Paper>
            </Grid>

            {/* אופציות נוספות */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">אופציות נוספות</Typography>
                {['pool', 'jacuzzi'].map((feature) => (
                  <FormControlLabel
                    key={feature}
                    label={feature === 'pool' ? 'בריכה' : 'ג׳קוזי'}
                    control={
                      <Checkbox
                        checked={filters.features.includes(feature)}
                        onChange={() => handleCheckboxChange('features', feature)}
                      />
                    }
                  />
                ))}
              </Paper>
            </Grid>

            {/* מחיר */}
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="subtitle1">מחיר ללילה</Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(e, newVal) => handleChange('priceRange', newVal)}
                  valueLabelDisplay="auto"
                  min={60}
                  max={800}
                  step={50}
                />
              </Paper>
            </Grid>

            {/* כפתור החל סינון */}
            <Grid item>
              <Button fullWidth variant="contained" color="primary" onClick={applyFilters}>
                החל סינון
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
