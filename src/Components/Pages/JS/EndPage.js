import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ScoreContext } from "../../Context/ScoreContext";
import { userSignInContext } from "../../Context/SignInContext";
import Card from "../../UI/Card";
import "../CSS/EndPage.css";

const EndPage = () => {
    const { topic } = useParams()
  const { correct, incorrect, score, totalQues } = useContext(ScoreContext);
  const { userData } = useContext(userSignInContext)

  useEffect(() => {
    const scoreUpdate = async() =>{
        try{
            const response = await axios.post(`https://fotball-quiz.onrender.com/user/${userData._id}/topic/${topic}/score/${score}`)
            if(response.status === 200)
                toast(" Score Updated ")
        }catch(error){
            console.log(error.message)
        }
    }
    scoreUpdate()
  }, [])
  
console.log()
  return (
    <Card className="ECard">
      <h1>Hi! {userData.username}</h1>
      <div className="display-data">
      <div>Quiz Played: {topic}</div>
        <div>Total Questions: {totalQues}</div>
        <div>Correct Answer: {correct}</div>
        <div>Incorrect Answer: {incorrect}</div>
        <div>Point Scored: {score}</div>
      </div>
    </Card>
  );
};

export default EndPage;
