import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}){
    const shuffledAnswers = useRef()

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => (Math.random() - 0.5));
    }
    return <ul id="answers">
    {shuffledAnswers.current.map(answer => {
        let isSelected = answer === selectedAnswer
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
            cssClass = 'selected'
        }
        if (isSelected && (answerState === 'wrong' || answerState === 'correct')) {
            cssClass = answerState
        }

        return <li key={answer} className="answer">
            <button className={cssClass} onClick={() => onSelect(answer)}>{answer}</button>
        </li>
    })}
</ul>
}