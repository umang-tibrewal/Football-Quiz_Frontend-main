import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login&SignUpPage.css";
import axios from 'axios';
import { useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const SignUpPage = () => {
    const [userInfo, setUserInfo] = useState({
      username: "",
      email: "",
      password: "",
    });
    const navigate = useNavigate();
  
    const signUpHandler = async(e) => {
      try{
        e.preventDefault()
        const {username, email, password } = userInfo
        const response = await axios.post("football-quiz-backend-main.vercel.app/user/registration",{
          username,email,password
      });
        if(response.status === 422){
        // toast.error("Something went wrong")
        console.log("Something went wrong")
        }
        else{
          navigate('/login')
          setUserInfo({ username:"", email:"",password:"" })
        }
      }catch(error){
        console.log(error.message)
      }
    };
  
    return (
      <Card className="SUC">
        <label className="label">Email</label>
        <input
          className="input"
          type="text"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <label className="label">Username</label>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        />
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="********"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <Button className="SUB" onClick={signUpHandler}>
          Sign Up
        </Button>
        <div className="control">
          <p>Already a member?</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </Card>
    );
  };
  
  export default SignUpPage;
  