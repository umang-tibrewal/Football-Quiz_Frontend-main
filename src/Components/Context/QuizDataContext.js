import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const InitialQuizContext = {
    quiz:[{
        _id:"",
        q_id:"",
        topic:"",
        image:"",
        bg:"",
        questions: [{
            question:"",
            pts:0,
            negativePts:0,
            options:[{
                option:"",
                isRight: false
            }]
        }]
    }],
    setQuizes: () => null
}

export const DataContext = createContext(InitialQuizContext);

const QuizDataContext = ({children}) => {

    const [quiz, setQuizes] = useState(InitialQuizContext.quiz)
    useEffect(() =>{
        const getQuizData = async() => {
            const quizResponse = await axios.get("https://fotball-quiz.onrender.com/quiz")
            setQuizes(quizResponse.data.getQuizData)
        }
        getQuizData()
    },[])

  return (
    <DataContext.Provider value={{quiz,setQuizes}}>
        {children}
    </DataContext.Provider>
  )
}

export default QuizDataContext