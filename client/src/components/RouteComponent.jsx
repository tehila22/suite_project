import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import AddNewSuite from "./AddNewSuite";
import SuiteDetail from "./SuiteDetail"; // הרכיב שמציג את הצימר הנבחר
import UpdateSuite from "./UpdateSuite"; // עדכון הנתיב
import EditProfile from "./EditProfile";
import BookingForm from "./BookingForm";
import MyOrders from "./MyOrders";

export default function RouteComponent() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                {/* <Route path='/home-page' element={<HomePage />} /> */}
                <Route path='/show-suites' element={<HomePage />} />
                <Route path='/add-new-suite' element={<AddNewSuite />} />
                <Route path='/suite/:id' element={<SuiteDetail />} />
                {/* עדכון הנתיב ל-update-suite/:id */}
                <Route path='/update-suite/:id' element={<UpdateSuite />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/booking/:id" element={<BookingForm />} />
                <Route path="/myorders" element={<MyOrders />} />

            </Routes>
        </BrowserRouter>
    );
}
