import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import MainComponent from './components/MainComponent'
import Loader from './components/Loader';
import ErrorComponent from './components/ErrorComponent';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer'

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

type State = {
  questions: QuestionType[],
  status: string,
  index: number,
  answer: number | null,
  points: number,
  secondsRemaining: number
}

export type Action =
  { type: "dataReceived", payload: QuestionType[], } |
  { type: "dataFailed" } |
  { type: "start" } |
  { type: "newAnswer", payload: number } |
  { type: "nextQuestion" } |
  { type: "finish" } |
  { type: "restart" } |
  { type: "tick" }

  
const initalState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 0
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: 'error' };
    case "start":
      return { ...state, status: 'active',secondsRemaining:state.questions.length * 30  };
    case "newAnswer":
      const question: QuestionType = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points += question.points
            : state.points
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: 'finished', index: 0, answer: null };
    case "restart":
      return { ...initalState, status: "ready" };
    case "tick":
      return {
        ...state, secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ?'finished':state.status
      }
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initalState)

  const { questions, status, index, answer, points, secondsRemaining } = state

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }))
  }, [])

  return (
    <div>
      <Header />
      <MainComponent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </footer>
          </>
        }
        {status === 'finished' && <FinishScreen maxPossiblePoints={maxPossiblePoints} points={points} dispatch={dispatch} />}
      </MainComponent>
    </div>
  )
}

export default App