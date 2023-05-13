import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import "../CSS/EndPage.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setuserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`https://fotball-quiz.onrender.com/user/${userId}`);
      setuserData(response.data.findUser);
      console.log(response.data.findUser);
    };
    getUserData();
  }, []);
  console.log(userData);

  return (
    <Card className="ECard">
      <h1>Hi! {userData.username}</h1>
      <div className="display-data">
        <div>Last Played: {userData.topic} </div>
        <div>Point Scored: {userData.score} </div>
      </div>
      <NavLink to={"/dashboard"}>
        <Button className="dashboard-button">Dashboard</Button>
      </NavLink>
    </Card>
  );
};

export default Profile;
