import React, { createContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContextInitialState = {
    token: "",
    userData: {},
    setToken: () => null,
    logIn: () => 0
}

export const userSignInContext = createContext(ContextInitialState);

const SignInContext = ({ children }) => {

    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const location = useLocation();

    const Login = async(e,email,password ) => {
        try{
            e.preventDefault();
            const response = await axios.post("https://fotball-quiz.onrender.com/user/login",{
                email,
                password
            });
            if(response.status === 200){
                setToken(response.data.token)
                setUserData(response.data.userExist)
                localStorage.setItem("token", response.data.token)
                toast.success(`Welcome ${response.data.userExist.username} to the Football Quiz`)
                if(location?.state?.from)
                navigate(location.state.from)
                else
                navigate("/")
            }
            else{
                toast.error("Invalid Login")
            }
            // setUserInfo({ email:"", password:"" })
        }catch(error){
            console.log(error.message)
        }
        return 0
    }

  return (
    <userSignInContext.Provider value={{ Login,token:localStorage.getItem("token"), userData,setUserData, setToken }} >
        {children}
    </userSignInContext.Provider>
  )
}

export default SignInContext