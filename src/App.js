import { BrowserRouter, Routes, Route } from "react-router-dom";

// screens
import Index from './components/screens/index.js';
import Login from './components/screens/login.js';
import Error from './components/screens/error.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} /> {/* adding a singular comment */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
