import './App.css';
import React, { useState } from 'react';
import Tile from './Tile';
import  { useEffect } from 'react';



const NUM_ROWS = 4;
const NUM_COLS = 4;
const NUM_TILES = NUM_ROWS * NUM_COLS;
const EMPTY_TILES_INDEX = NUM_TILES - 1;
const SHUFFLE_RANGE_OF_MOVES = [10, 20];
const DIRECTIONS = ['up', 'down', 'right', 'left'];

function generate_rand_num(minimum, maximum) {
  return minimum + Math.floor(Math.random() * (maximum - minimum + 1));
}

//singleton
class my_game_status {

  static instance = null;

  static get_my_instance() {
    if (my_game_status.instance == null) {
      my_game_status.instance = new my_game_status();
      return my_game_status.instance;
    }
    else {
      return my_game_status.instance;
    }
  }

  static before_start_game_board() {
    return Array(NUM_TILES).fill(0).map((x, index) => [Math.floor(index / NUM_ROWS), index % NUM_COLS]);
  }

  static solved_board = my_game_status.before_start_game_board();

  constructor() {
    this.new_game();
  }

  new_game() {
    this.num_moves = 0;
    this.stack = [];
    this.board = my_game_status.before_start_game_board();
    this.shuffle();
  }

  shuffle() {
    this.shuffling_flag = true;
    let num_shuffle_moves = generate_rand_num(1000,2000);
    while (num_shuffle_moves-- > 0) {
      this.move_in_direction(DIRECTIONS[generate_rand_num(0,3)])
    }
    this.shuffling_flag = false;
  }

  move_tile_yes_or_no(index) {
    if (index < 0 || index >= NUM_TILES) return false;
    const tile_position = this.board[index];
    const empty_tile_position = this.board[EMPTY_TILES_INDEX];

    if (tile_position[0] === empty_tile_position[0]) {
      if (Math.abs(tile_position[1] - empty_tile_position[1]) === 1) return true;
      else return false;
    }

    else if (tile_position[1] === empty_tile_position[1]) {
      if (Math.abs(tile_position[0] - empty_tile_position[0]) === 1) return true;
      else return false;
    }

    else {
      return false;
    }

  }

  moving_tile(index) {
    if (!this.shuffling_flag && this.isSolved()) return false;
    if (!this.move_tile_yes_or_no(index)) return false;

    const emptyPOSITION = [...this.board[EMPTY_TILES_INDEX]];
    const tilePOSITION = [...this.board[index]];

    let board_after_move = [...this.board];
    board_after_move[EMPTY_TILES_INDEX] = tilePOSITION;
    board_after_move[index] = emptyPOSITION;

    if (!this.shuffling_flag) this.stack.push(this.board);
    this.board = board_after_move;
    if (!this.shuffling_flag) this.num_moves++;

    return true;
  }

  isSolved() {
    for (let i = 0; i < NUM_TILES; i++) {
      if (this.board[i][0] !== my_game_status.solved_board[i][0] || this.board[0][i] !== my_game_status.solved_board[0][i])
        return false;
    }
    return true;
  }

  move_in_direction(direction) {
    // console.log("Board: ", this.board);

    const emp_pos = this.board[EMPTY_TILES_INDEX];

    const position_to_move = direction === 'up' ? [emp_pos[0] + 1, emp_pos[1]]
      : direction === 'down' ? [emp_pos[0] - 1, emp_pos[1]]
        : direction === 'left' ? [emp_pos[0], emp_pos[1] + 1]
          : direction === 'right' ? [emp_pos[0], emp_pos[1] - 1]
            : emp_pos;

    let tile_to_move = EMPTY_TILES_INDEX;
    for (let i = 0; i < NUM_TILES; i++) {
      if (this.board[i][0] === position_to_move[0] && this.board[i][1] === position_to_move[1]) {
        tile_to_move = i;
        break;
      }
    }

    this.moving_tile(tile_to_move);
  }

  undo() {
    if (this.stack.length === 0) return false;
    this.board = this.stack.pop();
    this.num_moves--;
  }

  get_state() {
    return {
      board: this.board,
      moves: this.moves,
      solved: this.isSolved,
    };
  }

}




  

  function App() {
  
    const actual_game_state =  my_game_status.get_my_instance();
    const [state, setState] = React.useState(actual_game_state.get_state());

    
    function newGame() {
      actual_game_state.new_game();
  
      console.log("After new game", actual_game_state.get_state());
      setState(actual_game_state.get_state());
    }
  
    function undo() {
      actual_game_state.undo();
      setState(actual_game_state.get_state());
    }
  
    function move(index) {
        actual_game_state.moving_tile(index);
        setState(actual_game_state.get_state());
    }
    
    useEffect(() => {
      newGame()

      document.addEventListener('keyup', function listeners(event) {
  
        if (event.keycode === 37) actual_game_state.move_in_direction('left');
        else if (event.keycode === 38) actual_game_state.move_in_direction('up');
        else if (event.keycode === 39) actual_game_state.move_in_direction('right');
        else if (event.keycode === 40) actual_game_state.move_in_direction('down');
  
        return (() => window.removeEventListener(listeners));
      });
  
    }, []); 

    console.log(Object.values(state.board))
  return (
    <div className="game-container">
      <div className="game-header">
        <div className = 'moves'>
          {state.num_moves}
        </div>
        <button className='big-button' onClick= {state.undo}>UNDO</button>
      </div>
      <div className='board'>
      {
        Object.values(state.board).map((pos, index) => (
          <Tile index={index} pos={pos} onClick={() => state.move(index)}/>
        ))
      }
      { state.solved() &&
          <div className='overlay'>
            <button className='big-button' onClick={state.newGame}>
              PLAY AGAIN 
            </button>
          </div>
      }
      </div>
    </div>
  );
}

export default App;
