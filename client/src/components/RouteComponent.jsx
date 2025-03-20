import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import FilterSuites from "./FilterSuites";
import AddNewSuite from "./AddNewSuite";
import SuiteDetail from "./SuiteDetail" // הרכיב שיציג את הצימר הנבחר
import SuiteDetails from "./SuiteDetails";
import UpdateSuite from "./UpdateSuite";

export default function RouteComponent() {



    return (<>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/home-page' element={<HomePage />} />
                <Route path='/show-suites' element={<FilterSuites />} />
                <Route path='/nav-bar' element={<NavBar />} />
                <Route path='/add-new-suite' element={< AddNewSuite/>} />
                <Route path='/suite/:id' element={< SuiteDetail/>} />
                <Route path='/update-suite' element={< UpdateSuite/>} />
                
                
            </Routes>
        </BrowserRouter>


    </>)
}