import { BrowserRouter, Routes, Route } from "react-router-dom";

// screens
import Index from './components/screens/index.jsx';
import Login from './components/screens/login.jsx';
import Signup from './components/screens/signup.jsx';
import Error from './components/screens/error.jsx';

// components
import Navbar from './components/navbar'

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
