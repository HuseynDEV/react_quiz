import { useEffect } from "react"
import { Action } from "../App"

const Timer = ({ dispatch, secondsRemaining }: { dispatch: React.Dispatch<Action>, secondsRemaining: number }) => {

    const mins=Math.ceil(secondsRemaining/60)
    const seconds=secondsRemaining%60
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch])
    return (
        <div className="timer">{mins}:{seconds}</div>
    )
}

export default Timer