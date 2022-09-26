import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute" 
import Explore from "./pages/Explore"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"

import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"

import CreateListing from "./pages/CreateListing"
import EditListing from "./pages/EditListing"
import Listing from "./pages/Listing"
import Contact from "./pages/Contact"
import Main from './pages/Main';
import PaymentListing from './pages/PaymentListing';




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/offers' element={<Offers/>}/>
        
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile/:credit' element={<Profile/>} />
          </Route>
          
            
              
          <Route path='/sign-in' element={<SignIn/>} />
          
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/payment-listing' element={<PaymentListing/>}/>
          <Route path='/edit-listing/:listingId' element={<EditListing/>}/>
          <Route path='/category/:categoryName/:listingId' element={<Listing/>} />
          <Route path='/contact/:landlordId' element={<Contact/>}/>
        </Routes>
        <Navbar/>
      </Router>
      

      <ToastContainer/>
    </>
  );
}

export default App;
