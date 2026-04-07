import { Routes, Route, Navigate  } from "react-router";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import ToLoginPage from "./pages/ToLoginPage";

function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"))
  return (
    <>
      <Routes>
        <Route path="/" element={ isLoggedIn ? <Navigate to={"/dashboard"} /> : <ToLoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard /> } />
      </Routes>
    </>
  );
}

export default App;
