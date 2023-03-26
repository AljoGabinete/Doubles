import { useReducer } from 'react';
import './App.css';

const ACTION = {
  ADD_DIGIT: 'addDigit',
  DEL_DIGIT: 'deleteDigit',
  CLEAR: 'clear',
  OPERATION: 'operation',
  EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION.ADD_DIGIT:
      return {
        ...state,
        currOperand: `${state.currOperand || ''}${payload}`,
      };
    case ACTION.CLEAR:
      return { ...state, currOperand: '', prevOperand: '', operation: '' };
    case ACTION.DEL_DIGIT:
      return {
        ...state,
        currOperand: `${state.currOperand.slice(0, -1)}`,
      };
    case ACTION.OPERATION:
      state.operation = payload;
      if (!state.prevOperand) {
        return {
          ...state,
          prevOperand: `${state.currOperand}${payload}`,
          currOperand: '',
        };
      } else if (state.prevOperand && !state.currOperand) {
        return {
          ...state,
          prevOperand: `${state.prevOperand.slice(0, -1)} ${payload}`,
        };
      } else {
        const result = calculate(
          state.prevOperand,
          state.currOperand,
          state.operation
        );
        return {
          ...state,
          prevOperand: result,
          currOperand: '',
          operation: payload,
        };
      }

    case ACTION.EVALUATE:
      console.log('aljo');
      console.log(state.operation);
      const result = calculate(
        state.prevOperand,
        state.currOperand,
        state.operation
      );
      return {
        ...state,
        prevOperand: '',
        currOperand: result,
      };

    default:
      break;
  }
};

const calculate = (prevOperand, currOperand, operation) => {
  const num1 = parseFloat(prevOperand);
  const num2 = parseFloat(currOperand);

  switch (operation) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case 'x':
      return (num1 * num2).toString();
    case '÷':
      if (num2 === 0) {
        return 'Error';
      } else {
        return (num1 / num2).toString();
      }
    default:
      return '';
  }
};

function App() {
  const [{ prevOperand, currOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  const handleButton = (digit) => {
    if (digit === '.' && currOperand.includes('.')) {
      return;
    } else {
      dispatch({ type: ACTION.ADD_DIGIT, payload: digit });
    }
  };
  return (
    <div className='calculatorContainer'>
      <div className='calculatorDisplay'>
        <div className='previousOperand'>{`${prevOperand || '0'}`}</div>
        <div className='currentOperand'>{`${currOperand || '0'} `}</div>
      </div>
      <button
        className='buttonSpan2'
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTION.DEL_DIGIT })}>DEL</button>
      <button
        onClick={(e) =>
          dispatch({
            type: ACTION.OPERATION,
            payload: e.target.textContent,
          })
        }
      >
        ÷
      </button>
      <button onClick={(e) => handleButton(e.target.textContent)}>7</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>8</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>9</button>
      <button
        onClick={(e) =>
          dispatch({ type: ACTION.OPERATION, payload: e.target.textContent })
        }
      >
        x
      </button>
      <button onClick={(e) => handleButton(e.target.textContent)}>4</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>5</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>6</button>
      <button
        onClick={(e) =>
          dispatch({ type: ACTION.OPERATION, payload: e.target.textContent })
        }
      >
        -
      </button>
      <button onClick={(e) => handleButton(e.target.textContent)}>1</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>2</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>3</button>
      <button
        onClick={(e) =>
          dispatch({ type: ACTION.OPERATION, payload: e.target.textContent })
        }
      >
        +
      </button>
      <button onClick={(e) => handleButton(e.target.textContent)}>0</button>
      <button onClick={(e) => handleButton(e.target.textContent)}>.</button>
      <button
        className='buttonSpan2'
        onClick={() => dispatch({ type: ACTION.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
