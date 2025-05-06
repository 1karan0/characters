import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import AllCharacters from "./components/AllCharacters";
import CreateCharacter from "./components/CreateCharacter";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContext } from './components/AuthContext';
import UpdateCharacter from "./components/UpdateCharacter";
import CharacterById from "./components/CharacterById";
import CreateUnivers from "./components/CreateUnivers";


const App = () => {
  
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={!token ? <Login /> : <Navigate to="/Dashboard" />}
        />
        <Route
          path="/Signup"
          element={!token ? <Signup /> : <Navigate to="/Dashboard" />}
        />

        {/* Protected routes */}
        {token ? (
          <Route path="/" element={<SideBar />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Allcharacters" element={<AllCharacters />} />
            <Route path="Createcharacter" element={<CreateCharacter />} />
            <Route path="updateCharacter/:id" element={<UpdateCharacter/>}/>
            <Route path="character/:id" element={<CharacterById/>}/>
            <Route path="createunivers" element={<CreateUnivers/>}/>
            <Route path="*" element={<Navigate to="/Dashboard" />} />
          </Route>
        ) : (
          // Redirect to login if trying to access protected routes without token
          <Route path="*" element={<Navigate to="/Login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
