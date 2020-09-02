import React from 'react';
import Chessboard from "chessboardjsx";

class App extends React.Component {
  state = {
    result: [],
    newArr: new Array(5).fill(0).map(() => new Array(5).fill(0)),
    diagonal: new Set(),
    diagonal2: new Set(),
    vertical: new Set(),
    positions: []
  }

  placeQueen = (board, i, diagonal, diagonal2, vertical) => {
      //If we reach the end of the board, create the board of '.' and 'Q'
      if (i == board.length) {
          this.addToList(board)
          return
      }
      
      for (let j = 0; j < board[0].length; j++) {
          if (!this.state.diagonal.has(i + j) && !this.state.diagonal2.has(j - i) && !this.state.vertical.has(j)) {
              board[i][j] = 1
              this.state.diagonal.add(i + j)
              this.state.diagonal2.add(j - i)
              this.state.vertical.add(j)
              
              this.placeQueen(board, i + 1, this.state.diagonal, this.state.diagonal2, this.state.vertical)
              
              board[i][j] = 0
              this.state.diagonal.delete(i + j)
              this.state.diagonal2.delete(j - i)
              this.state.vertical.delete(j)
          }
      }
  }

  addToList = (board) => {
      let solution = []
      
      for (let i = 0; i < board.length; i++) {

          //Make a separate string for each row
          let string = ''
          for (let j = 0; j < board[i].length; j++) {
              if (board[i][j] == 0) {
                  string += '.' + ' '
              } else {
                  string += this.getChar(j) + (8 - i) + ' '
              }
          }
          solution.push(string)
      }
      
      this.state.result.push(solution)
  }

  getChar(integer) {
    if (integer == 0) {
      return 'a'
    } else if (integer == 1) {
      return 'b'
    } else if (integer == 2) {
      return 'c'
    } else if (integer == 3) {
      return 'd'
    } else if (integer == 4) {
      return 'e'
    } else if (integer == 5) {
      return 'f'
    } else if (integer == 6) {
      return 'g'
    } else if (integer == 7) {
      return 'h'
    }
  }

  createBoards = () => {
    console.log('hey')
    let position = {}
    for (let string of this.state.result) {
      let arr = string.split(' ')
      for (let element of arr) {
        if (element != '.') {
          position[element] = 'wQ'
        }
      }
    }

    this.setState({
      positions: [...this.state.positions, position]
    })
  }

  render() {
    return (
      <div>
        {this.placeQueen(this.state.newArr, 0, this.state.diagonal, this.state.diagonal2, this.state.vertical)}
        {this.createBoards}
        {console.log(this.state.result)}
        <React.Fragment>
          <Chessboard id="positionObject" position={{ e5: "wK", e4: "wP", e7: "bK" }} />
          <Chessboard id="startPos" position="start" />
          <Chessboard id="ruyLopez" position="r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R" />
        </React.Fragment>
      </div>
    )
  }
}

export default App;
