import { Routes, Route, Navigate  } from "react-router";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { useEffect } from "react";


function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"))
  useEffect(() => {
    // console.log('refresh')

  },[isLoggedIn])
  return (
    <>
      <Routes>
        <Route path="/" element={ isLoggedIn ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={ <Signup /> } />
        {console.log(isLoggedIn,"" )}
        <Route path="/dashboard" element={ isLoggedIn ? <Dashboard /> : <Navigate to={"/login"} />} />
      </Routes>
    </>
  );
}

export default App;
