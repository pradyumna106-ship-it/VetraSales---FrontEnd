import React,{ useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Customer from './pages/Customer';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';
import SignInPage from './pages/components/SignInPage';
import SignUpPage from './pages/components/SignUpPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element = {<Welcome />} />
            <Route path='/sign_up_page' element = {<SignUpPage />} />
            <Route path='/sign_in_page' element = {<SignInPage />} />
            <Route path='/admin_page' element = {<Admin />} />
            <Route path='/customer_page' element = {<Customer />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
