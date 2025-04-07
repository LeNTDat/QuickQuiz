import { useEffect, useState } from "react";


export default function QuestionTimer({ timer, onTimerOut }) {
    const [remainingTime, setRemainingTime] = useState(timer)
    
    const FRAMEPERSECOND = timer / 166.67;
    useEffect(()=>{
        console.log(timer);
        
        const timerCount = setTimeout(onTimerOut, timer);
        return ()=>{
            clearTimeout(timerCount)
        }
    }, [timer, onTimerOut])


    useEffect(() => {
        const intervalTimer = setInterval(() => {
            setRemainingTime(prev => (prev - FRAMEPERSECOND))
        }, FRAMEPERSECOND)

        return ()=>{
            clearInterval(intervalTimer)
        }
    }, [])



    return <progress  max={timer} value={remainingTime} id="question-time" />
} 