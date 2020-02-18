import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from 'react-redux';

//redux imports
import {createStore } from 'redux';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//REDUX FROM HERE DOWN

//reducer: A pure function that accepts 2 parameters: state and action.
const countReducer = function ( state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state -1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

//store: holds the state for the whole application
let store = createStore(countReducer);

//map state to props
const mapStateToProps = state => {
  return {
    count: state
  };
};

// Map actions (dispatches) to props
const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch({type: 'INCREMENT'}),
    handleDecrementClick: () => dispatch({type: 'DECREMENT'}),
    handleResetClick: () => dispatch({type: 'RESET'})
  }
}

//a react, presentational (aka dumb) component (presentational means isn't directly connected to store) 
const Component = ({count, handleIncrementClick, handleDecrementClick, handleResetClick}) => (
  <div>
    <h1>HelloWorld React and Redux {count}</h1>
    <button onClick={handleDecrementClick}>Decrement</button>
    <button onClick={handleIncrementClick}>Increment</button>
    <button onClick={handleResetClick}>Reset</button>
  </div>  
);

//smart components have the state connected to them with connect
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

//provider supplies the component tree with the global state
const App = () => (
  <Provider store={store}>
    <Container></Container>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));



