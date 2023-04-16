import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/signup" index element={<SignUp />} />
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
