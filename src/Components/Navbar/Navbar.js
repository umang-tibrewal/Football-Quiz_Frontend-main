import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userSignInContext } from "../Context/SignInContext";
import Button from "../UI/Button";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { token, setToken, userData } = useContext(userSignInContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
      toast.success("LoggedOut Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="header">
        <NavLink className="head" to={"/"}>
          <h1>Football Quiz</h1>
        </NavLink>
        {token ? (
          <div>
            <Button className="btn logout" onClick={logoutHandler}>
              Logout
            </Button>
            <NavLink className="name" to={`/profile/${userData._id}`}>
              {userData.username}
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to={"/login"}>
              <Button className="btn login">Login</Button>
            </NavLink>
          </div>
        )}
      </header>
      <ToastContainer theme="dark" position="top-center" autoClose={1000} />
    </>
  );
};

export default Navbar;
