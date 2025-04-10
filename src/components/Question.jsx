import Answers from "./Answers";
import QuestionTimer from "./QuestionTImer";

export default function Question(
    {
        questionText,
        answers,
        onSelectAnswer,
        handleSkipAnswer,
        answerState,
        timer,
        userAnswers
    }
) {
    return <div id="question">
        <QuestionTimer
            timer={timer}
            onTimerOut={handleSkipAnswer}
        />
        <h2>{questionText}</h2>
        <Answers
            answers={answers}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answerState={answerState}
            onSelect={onSelectAnswer}
        />
    </div>
}