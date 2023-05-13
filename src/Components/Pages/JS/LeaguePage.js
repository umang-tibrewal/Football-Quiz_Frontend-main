import { Link } from "react-router-dom";
import { useContext } from "react";
import { ScoreContext } from "../../Context/ScoreContext";
import { DataContext } from "../../Context/QuizDataContext";
import "../CSS/LeaguePage.css";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

const LeaguePage = () => {

  const { ResetScore } = useContext(ScoreContext);
  const { quiz } = useContext(DataContext)
  return (
    quiz.map((data)=>{
      return (
      <Card className='LCard'>
      <div className="grid">
        <div className="logo">
            <img src={data.image} alt="Premier League" />
        </div>
        <div className="DOL">
          <h1 className="LeagueName">{data.topic}</h1>
          <p className="LeagueDetails">{data.description}</p>
        </div>
        
      </div>
      <div className="button-grid">
         <Link to={`/quiz/${data.topic}`}>
         <Button className="arrow" onClick={ResetScore}>{">"}</Button>
         </Link>
        </div>
    </Card>
      )
    })
  );
};

export default LeaguePage;
