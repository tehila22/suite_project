import React, { useEffect, useState } from 'react';
import {
  AppBar, TextField, Box, Typography
} from '@mui/material';
import axios from 'axios';

import ShowAllSuites from './ShowAllSuites';
import FilterSuites from './FilterSuites'; // ייבוא קומפוננטת הסינון

export default function HomePage() {
  const [suites, setSuites] = useState([]);
  const [filteredSuites, setFilteredSuites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    areas: [],
    classification: 0,
    features: [],
    floor: 1,
    numBeds: 1,
    priceRange: [60, 800],
  });

  useEffect(() => {
    const getAllSuites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/suite');
        setSuites(response.data);
        setFilteredSuites(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllSuites();
  }, []);

  useEffect(() => {
    const uniqueCities = [...new Set(suites.map(s => s.city))];
    setCities(uniqueCities);
  }, [suites]);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filtered = suites.filter(suite =>
      suite.name.toLowerCase().includes(value.toLowerCase())
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

  const handleChange = (name, newValue) => {
    setFilters((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleReset = () => {
    setFilters({
      areas: [],
      classification: 0,
      features: [],
      floor: 1,
      numBeds: 1,
      priceRange: [60, 800],
    });
    setFilteredSuites(suites);
  };

  const applyFilters = () => {
    const result = suites.filter(suite => {
      const inArea = filters.areas.length === 0 || filters.areas.includes(suite.city);
      const matchClassification = filters.classification === 0 || suite.classification >= filters.classification;
      const inPrice = suite.nightPrice >= filters.priceRange[0] && suite.nightPrice <= filters.priceRange[1];
      const matchPeople = !filters.numBeds || suite.numBeds >= filters.numBeds;
      const matchFeatures = filters.features.length === 0 || filters.features.every(feat => suite[feat] === true);
      return inArea && matchClassification && inPrice && matchPeople && matchFeatures;
    });

    setFilteredSuites(result);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          zIndex: 1201,
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: '300px', position: 'absolute', top: '6px', left: '120px' }}>
          <TextField
            label="חפש צימר"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>

        {/* קומפוננטת הסינון */}
        <FilterSuites
          open={open}
          toggleDrawer={toggleDrawer}
          filters={filters}
          cities={cities}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleReset={handleReset}
          applyFilters={applyFilters}
        />
      </AppBar>

      {/* הצגת תוצאות */}
      <ShowAllSuites suites={filteredSuites} setSuites={setFilteredSuites} />
    </>
  );
}