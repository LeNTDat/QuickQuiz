import { useState, useCallback, useRef } from "react";
import QuizData from "../questions";
import Question from "./Question";
import Summary from "./Summary";



export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex =  userAnswers.length;
    
    const completed = activeQuestionIndex === QuizData.length - 1;

    const handleSelectAnswer = useCallback(function handleSelectAnswer  (selectedAnswer)  {
        setUserAnswers(prev => {
            const newData = [...prev, selectedAnswer];
            return newData
        })
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (completed) {
        return <Summary userAnswers={userAnswers} />
    }
    

    return <div id="quiz">
        <div id="question">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                handleSkipAnswer={handleSkipAnswer}
            />
        </div>
    </div>
}