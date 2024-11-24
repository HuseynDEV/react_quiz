import { Action } from "../App"

interface PropsType {
    dispatch: React.Dispatch<Action>
    answer: number | null,
    index: number,
    numQuestions: number
}

const NextButton = ({ dispatch, answer, index, numQuestions }: PropsType) => {
    if (answer === null) return null
    if (index < numQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    )

    if (index === numQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>Finish</button>
    )
}

export default NextButton