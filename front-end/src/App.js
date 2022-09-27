import { BrowserRouter, Routes, Route } from "react-router-dom";

// screens
import Index from './components/screens/index.jsx';
import Login from './components/screens/login.jsx';
import Error from './components/screens/error.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
