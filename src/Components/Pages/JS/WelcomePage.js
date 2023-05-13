import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import "../CSS/WelcomePage.css";

const WelcomePage = () => {
    return (
      <Card className="welC">
        <h1 className="heading">Welcome! to the Football Quiz</h1>
        <p className="para">
          Here you will get to choose your league of choice and answer the
          questions.
        </p>
        <Link to='league'>
          <Button className="play">Play</Button>
        </Link>
      </Card>
    );
  };
  
  export default WelcomePage;
  