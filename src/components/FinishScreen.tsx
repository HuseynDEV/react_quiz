import { Action } from "../App";

interface propsType {
    points: number,
    maxPossiblePoints: number,
    dispatch:React.Dispatch<Action>
}

const FinishScreen = ({ points, maxPossiblePoints, dispatch }: propsType) => {
    const percentage = (points / maxPossiblePoints) * 100;
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <p className="result">
            <span>{emoji}</span>   You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)

            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart quiz
            </button>
        </p>
    )
}

export default FinishScreen