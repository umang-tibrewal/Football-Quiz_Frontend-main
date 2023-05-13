import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../Context/QuizDataContext";
import { ScoreContext } from "../../Context/ScoreContext";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import "../CSS/QuizPage.css";

const QuizPage = () => {
  const { topic } = useParams();
  const { quiz } = useContext(DataContext)
  const { quesNo, score, IncreaseQNo, IncreaseScore, DecreaseScore } = useContext(ScoreContext);


  const Quiz = quiz.filter((data) => data.topic === topic);
  const QuizTopic = Quiz[0].topic
  const bg = Quiz[0].bg;
  const Ques = Quiz[0].questions;
  const defaultColors = [
    "rgba(22, 163, 206, 0.699)",
    "rgba(22, 163, 206, 0.699)",
    "rgba(22, 163, 206, 0.699)",
    "rgba(22, 163, 206, 0.699)",
  ];
  const totalQues = Ques.length;

  const [ color, setColor ] = useState(defaultColors);
  const [ nextDisabled, setnextDisabled ] = useState(false);
  const [ finishDisabled, setfinishDisabled ] = useState(true);
  const { question, options, pts, negativePts } = Ques[quesNo];

  const questionHandler = () => {
    setColor([...defaultColors]);
    if (quesNo < totalQues - 1){
      if (quesNo === totalQues - 2) {
        setnextDisabled(true);
        setfinishDisabled(false);
      }
      IncreaseQNo();
    }
  };

  const optionHandler = (option, i) => {
    if (option.isRight === "true") {
      setColor(() => {
        color[i] = "green";
        return [...color];
      });
      IncreaseScore(pts)
    }
     else {
      let correctIndex = null;
      const correct = options.map((opt, i) => {
        if (opt.isRight === "true") correctIndex = i;
        return opt;
      });
      color[i] = "red";
      color[correctIndex] = "green";
      setColor([...color]);
      DecreaseScore(negativePts);
    }
  };

  return (
    <div
      className="bg"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Card className="QuizC">
        <div className="que">{question}</div>
        <div className="opts">
          {options.map((option, i) => {
            return (
              <ul>
                <li>
                  <button
                    className="optBtn"
                    onClick={() =>
                      optionHandler(option, i, options, pts, negativePts)
                    }
                    style={{ backgroundColor: color[i] }}
                  >
                    {option.option}
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="btns">
          <Button onClick={questionHandler} disabled={nextDisabled}>
            Next
          </Button>
          <div className="score">Score: {score}</div>
          <Link to={`/end/${QuizTopic}`}>
            <Button disabled={finishDisabled}>Finish</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default QuizPage;
