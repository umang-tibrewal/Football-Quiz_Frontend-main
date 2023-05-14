import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import "../CSS/EndPage.css";

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const dashboardData = async () => {
      try {
        const response = await axios.get(
          "football-quiz-backend-main-h9v8y3si6-umang-tibrewal.vercel.app/quiz/quizDashboard"
        );
        if (response) setAllUsers(response.data.getUserData);
      } catch (error) {
        console.log(error.message);
      }
    };
    dashboardData();
  }, []);

  return (
    <Card className="ECard">
      <h1>Dashboard</h1>
      {allUsers?.map((user) => {
        return (
          <li className="list">
            <div className="display-list-data">
              <p>{user?.username}</p>
              <p>{user?.score}</p>
            </div>
          </li>
        );
      })}
    </Card>
  );
};

export default Dashboard;
