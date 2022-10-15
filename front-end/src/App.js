import { BrowserRouter, Routes, Route } from "react-router-dom";



// screens

import Index from './components/screens/index.jsx';

import SearchedCity from './components/screens/searchedcity.jsx';

import Login from './components/screens/login.jsx';

import Signup from './components/screens/signup.jsx';

import Error from './components/screens/error.jsx';



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/">

          <Route index element={<Index />} />

          <Route path="city" element={<SearchedCity />} />

          <Route path="login" element={<Login />} />

          <Route path="signup" element={<Signup />} />

          <Route path="*" element={<Error />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}



export default App;
