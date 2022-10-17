import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { LoginContextProvider } from "./contexts/loginContext.js";

// screens
import Index from './components/screens/index.jsx';
import Login from './components/screens/login.jsx';
import VerifyLogin from './components/screens/verifylogin.jsx';
import Signup from './components/screens/signup.jsx';
import QRCode from './components/screens/qrcode.jsx';
import ResetPassword from './components/screens/reset-password.jsx';
import AccountRecovery from './components/screens/account-recovery';
import Search from './components/screens/search.jsx';
import SearchedCity from './components/screens/searchedcity.jsx';
import Error from './components/screens/error.jsx';

// components
import Navbar from './components/navbar'

function App() {
  return (
    <LoginContextProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="verifylogin" element={<VerifyLogin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="qrcode" element={<QRCode />} />
              <Route path="auth/reset_password" element={<ResetPassword />} />
              <Route path="account-recovery" element={<AccountRecovery />} />
              <Route path="search" element={<Search />} />
              <Route path="city" element={<SearchedCity />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;
