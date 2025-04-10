import { useState, useCallback, useRef } from "react";
import QuizData from "../questions";
import QuizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTImer";
import Answers from "./Answers";
import Question from "./Question";


const TIMER = 10000; // 10 seconds

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    
    const completed = activeQuestionIndex === QuizData.length - 1;

    const handleSelectAnswer = useCallback(function handleSelectAnswer  (selectedAnswer)  {
        setAnswerState('answered')
        setUserAnswers(prev => {
            const newData = [...prev, selectedAnswer];
            return newData
        })

        setTimeout(() => {
            if (selectedAnswer === QuizData[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong')
            }


            setTimeout(() => {
                setAnswerState('')
            }, 2000);
        }, 1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (completed) {
        return <div id="summary">
            <img src={QuizCompleteImg} alt="completeQuiz" />
            <h2>Quiz completed</h2>
        </div>
    }
    

    return <div id="quiz">
        <div id="question">
            <Question 
                key={activeQuestionIndex}
                questionText={QuizData[activeQuestionIndex].text}
                answers={QuizData[activeQuestionIndex].answers}
                answerState={answerState}
                onSelectAnswer={handleSelectAnswer}
                handleSkipAnswer={handleSkipAnswer}
                timer={TIMER}
                userAnswers={userAnswers}
            />
        </div>
    </div>
}