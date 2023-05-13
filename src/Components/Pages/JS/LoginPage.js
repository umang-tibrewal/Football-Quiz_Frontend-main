import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userSignInContext } from "../../Context/SignInContext";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import "../CSS/Login&SignUpPage.css";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { Login } = useContext(userSignInContext);
  const { userData } = useContext(userSignInContext)

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
      <label className="label">Password</label>
      <input
        className="input"
        type="password"
        placeholder="********"
        value={userInfo.password}
        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
      />
      <Button
        className="SUB"
        onClick={(e) =>
          Login(e, userInfo.email, userInfo.password, setUserInfo)
        }
      >
        Login
      </Button>
      <div className="control">
        <p>Not Registered?</p>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </Card>
  );
};

export default LoginPage;
