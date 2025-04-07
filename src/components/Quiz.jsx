import { useState, useCallback } from "react";
import QuizData from "../questions";
import QuizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTImer";

const TIMER = 10000; // 10 seconds

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const shuffledAnswers = [...QuizData[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => (Math.random() - 0.5));
    const completed = activeQuestionIndex === QuizData.length - 1;

    const handleSelectAnswer = useCallback(function handleSelectAnswer  (selectedAnswer)  {
        setUserAnswers(prev => {
            const newData = [...prev, selectedAnswer];
            return newData
        })
    })

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (completed) {
        return <div id="summary">
            <img src={QuizCompleteImg} alt="completeQuiz" />
            <h2>Quiz completed</h2>
        </div>
    }

    return <div id="quiz">
        <div id="question">
            <QuestionTimer
                timer={TIMER}
                onTimerOut={handleSkipAnswer}
            />
            <h2>{QuizData[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map(answer => {
                    return <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                })}
            </ul>
        </div>
    </div>
}