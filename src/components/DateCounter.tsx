import { useReducer } from "react";


type Action =
  { type: "inc", payload: number } |
  { type: "dec", payload: number } |
  { type: "setCount", payload: number } |
  { type: "resetCount", payload: number } |
  { type: "resetStep", payload?: number } |
  { type: "incStep", payload: number }


type State = {
  count: number,
  step: number
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + action.payload };
    case "dec":
      return { ...state, count: state.count - action.payload };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'resetCount':
      return { ...state, count: 0 };
    case 'resetStep':
      return { ...state, step: 1 };
    case 'incStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}


function DateCounter() {
  const inititalState = { 
    count: 0,
    step: 1
  }

  const [state, dispatch] = useReducer(reducer, inititalState)
  // state deyerlerdir
  // dispatch deyerleri update etmek ucundur
  // reducer update eden functionlardir
  // initialState baslangic deyerlerdir
  const { count, step } = state

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step })
  };
  const inc = function () {
    dispatch({ type: "inc", payload: step })
  };
  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) })
  };
  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'incStep', payload: Number(e.target.value) })
  };
  const reset = function () {
    dispatch({ type: "resetStep" })
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;