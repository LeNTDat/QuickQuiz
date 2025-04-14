import QuizCompleteImg from "../assets/quiz-complete.png";
import QuizData from "../questions";

export default function Summary({userAnswers}) {
    const skippedAnswer = userAnswers.filter(item=> item === null)
    const correctAnswer = userAnswers.filter((item, index)=> item === QuizData[index].answers[0])

    const skippedPercent = Math.round(skippedAnswer.length / userAnswers.length * 100 )
    const correctPercent = Math.round(correctAnswer.length / userAnswers.length * 100 )
    const incorrectPercent = 100 - skippedPercent - correctPercent;

    return <div id="summary">
        <img src={QuizCompleteImg} alt="completeQuiz" />
        <h2>Quiz completed</h2>
        <div id="summary-stats">
            <p>
                <span className="number">{skippedPercent}%</span>
                <span className="text">skipped</span>
            </p>
            <p>
                <span className="number">{correctPercent}%</span>
                <span className="text">answered correct</span>
            </p>
            <p>
                <span className="number">{incorrectPercent}%</span>
                <span className="text">answered wrong</span>
            </p>
        </div>
        <ol>
            {userAnswers.map((item, index) => {
                return <li key={index}>
                    <h3>{index + 1}</h3>
                    <p className="question">{QuizData[index].text}</p>
                    <p className="user-answer">{item ?? "Skipped"}</p>
                </li>
            })}

        </ol>
    </div>
}