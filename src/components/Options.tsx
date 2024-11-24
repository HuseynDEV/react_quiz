import { Action, QuestionType } from "../App"


interface Propstype {
    question: QuestionType,
    dispatch: React.Dispatch<Action>,
    answer: number | null
}
const Options = ({ question, dispatch, answer }: Propstype) => {

    const hasAnswer:boolean = answer !== null
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${index == answer ? 'answer' : ""}
                         ${ hasAnswer ? (index == question.correctOption ? 'correct' : "wrong") :''} `}
                    key={index}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Options