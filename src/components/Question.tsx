import { Action, QuestionType } from "../App"
import Options from "./Options"

interface Propstype {
    question: QuestionType,
    dispatch: React.Dispatch<Action>,
    answer:number | null
}

const Question = ({ question, dispatch, answer }: Propstype) => {
    return (
        <div>
            <h4>{question?.question}</h4>

            <div className="options">
                <Options question={question} dispatch={dispatch} answer={answer} />
            </div>
        </div>
    )
}

export default Question