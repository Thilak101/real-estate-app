import React from "react";
import { Home, Profie, Signin, Signup, About, CreateListing } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Private } from "./components";
import UpdateListing from "./pages/updateListing/UpdateListing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Private />}>
          <Route path="/profile" element={<Profie />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
