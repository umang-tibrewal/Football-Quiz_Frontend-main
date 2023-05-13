import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from "./Components/Pages/JS/Dashboard";
import EndPage from "./Components/Pages/JS/EndPage";
import LeaguePage from "./Components/Pages/JS/LeaguePage";
import LoginPage from "./Components/Pages/JS/LoginPage";
import Profile from "./Components/Pages/JS/Profile";
import QuizPage from "./Components/Pages/JS/QuizPage";
import SignUpPage from "./Components/Pages/JS/SignUpPage";
import WelcomePage from "./Components/Pages/JS/WelcomePage";
import PrivateRoute from "./Components/PrivateRoute";
import axios from "axios";
import { userSignInContext } from "./Components/Context/SignInContext";

function App() {
  const {setUserData} = useContext(userSignInContext);

  useEffect(()=>{
    const reload = async() =>{
      try{
         const response = await axios.post("https://quiz-app-backend-1m2i.onrender.com/user/userInfo",{ headers: { authorization:localStorage.getItem('token') }
       })
       if(response.status === 200){
          setUserData(response.data.userData)
        }
      
      }catch(err){
        console.log(err)
      }
    }
    if(localStorage.getItem('token'))
    reload()
 })
  return (
    <>
    <Navbar />
    <div className="main-image">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="league"
          element={
            <PrivateRoute>
              <LeaguePage />
            </PrivateRoute>
          }
        />
        <Route path="quiz/:topic" element={<QuizPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="end/:topic" element={<EndPage />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
