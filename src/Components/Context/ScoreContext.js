import React, { createContext, useReducer } from "react";

const contextInitialState = {
    quizResponse: {
      score: 0,
      correct: 0,
      incorrect: 0,
      quesNo: 1,
      totalQues: 5,
      userQuizData: {
        name: null,
        score: null,
        topic: null,
      },
    },
    dispatch: () => null,
  };
  
  const reducerInitialState = {
    score: 0,
    correct: 0,
    incorrect: 0,
    quesNo: 1,
    totalQues: 5,
    userQuizData: {
      name: null,
      score: null,
      topic: null,
    },
  };
  
  export const ScoreContext = createContext(contextInitialState);
  
  const scoreReducer = (state, action) => {
    switch (action.type) {
      case "correct":
        return {
          ...state,
          score: state.score + action.payload,
          correct: state.correct + 1,
        };
      case "incorrect":
        return {
          ...state,
          score: state.score - action.payload,
          incorrect: state.incorrect + 1,
        };
      case "reset":
        return { ...state, score: 0, correct: 0, incorrect: 0, quesNo: 0 };
      case "queIncrement":
        return { ...state, quesNo: state.quesNo + 1 };
      case "userInfo": {
        return {
          ...state,
          userQuizData: {
            ...state.userQuizData,
            name: action.payload.username,
            score: action.payload.score,
            topic: action.payload.topic,
          },
        };
      }
      default:
        return { ...state };
    }
  };
  
  const ScoreContextProvider = ({ children }) => {
    const [quizResponse, dispatch] = useReducer(
      scoreReducer,
      reducerInitialState
    );
    
  
    const IncreaseQNo = () => {
      dispatch({ type: "queIncrement" });
    };
    const IncreaseScore = (pts) => {
      dispatch({ type: "correct", payload: pts });
    };
    const DecreaseScore = (negativePts) => {
      dispatch({ type: "incorrect", payload: negativePts });
    };
    const ResetScore = () => {
      dispatch({ type: "reset" });
    };
    const SetUserInfo = (userData) =>{
      dispatch({ type: "userInfo", payload: userData })
    }
  
    const scoreContext = {
      score: quizResponse.score,
      correct: quizResponse.correct,
      incorrect: quizResponse.incorrect,
      quesNo: quizResponse.quesNo,
      totalQues: quizResponse.totalQues,
      userQuizData: quizResponse.userQuizData,
      IncreaseQNo: IncreaseQNo,
      IncreaseScore: IncreaseScore,
      DecreaseScore: DecreaseScore,
      ResetScore: ResetScore,
      SetUserInfo: SetUserInfo
  
    };
  
    return (
      <ScoreContext.Provider value={scoreContext}>
        {children}
      </ScoreContext.Provider>
    );
  };
  
  export default ScoreContextProvider;
  