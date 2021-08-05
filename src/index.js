import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/*

function use_Game_status() {
  const actual_game_state = new my_game_status.get_my_instance();
  const [state, setState] = React.useState(actual_game_state.get_state());

  function newGame() {
    actual_game_state.new_game();
    setState(actual_game_state.get_state());
  }

  function undo() {
    actual_game_state.undo();
    setState(actual_game_state.get_state());
  }

  function move(index) {
    return function () {
      actual_game_state.moving_tile(index);
      setState(actual_game_state.get_state());
    }
  }

  function useEffect(() => {

    document.addEventListener('keyup', function listeners(event) {

      if (event.keycode === 37) actual_game_state.move_in_direction('left');
      else if (event.keycode === 38) actual_game_state.move_in_direction('up');
      else if (event.keycode === 39) actual_game_state.move_in_direction('right');
      else if (event.keycode === 40) actual_game_state.move_in_direction('down');


      setState(actual_game_state.get_state());

    });
      return (() => window.removeEventListener(listeners));

  }, [actual_game_state]);

  return [state.board, state.num_moves, state.solved_board, newGame, undo, move];
}*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
