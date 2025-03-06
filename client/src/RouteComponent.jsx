import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import FilterSuites from "./components/FilterSuites";
import AddNewSuite from "./components/AddNewSuite";
import SuiteDetail from "./components/SuiteDetail" // הרכיב שיציג את הצימר הנבחר

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
                
                
            </Routes>
        </BrowserRouter>


    </>)
}