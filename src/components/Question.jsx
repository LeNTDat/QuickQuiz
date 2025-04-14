import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTImer";
import QuizData from "../questions";

export default function Question(
    {
        onSelectAnswer,
        handleSkipAnswer,
        index
    }
) {
    
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect : null
    });

    let TIMER = 3000; // 10 seconds

    if( answer.selectedAnswer) {
        TIMER = 1000;
    }

    if(answer.isCorrect !== null) {
        TIMER = 2000;
    }


    const handleSelectAnswer = (answer)=>{
        setAnswer({
            selectedAnswer: answer,
            isCorrect : null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer : answer,
                isCorrect: QuizData[index].answers[0] === answer
            })

            setTimeout(()=>{
                onSelectAnswer(answer)
            }, 2000)

        }, (1000));
    }

    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : "wrong";
    }else if(answer.selectedAnswer){
        answerState = 'answered'
    }
    

    return <div id="question">
        <QuestionTimer
            timer={TIMER}
            key={TIMER}
            onTimerOut={answer.selectedAnswer == ''? handleSkipAnswer : null}
            mode={answerState}
        />
        <h2>{QuizData[index].text}</h2>
        <Answers
            answers={QuizData[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
}