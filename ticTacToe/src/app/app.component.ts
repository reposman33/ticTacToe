import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string;
  clickCount: number;
  boardModel: Array<string | null>;
  winner: string;
  gameOver: boolean;
  hilite_0: boolean;
  hilite_1: boolean;
  hilite_2: boolean;
  hilite_3: boolean;
  hilite_4: boolean;
  hilite_5: boolean;
  hilite_6: boolean;
  hilite_7: boolean;
  hilite_8: boolean;
  score: object;

  constructor() {
    this.title = "ticTacToe";
    this.clickCount = 0;
    this.score = { X: 0, O: 0 };
    this.initGame();
  }

  initGame() {
    this.boardModel = [null, null, null, null, null, null, null, null, null];
    this.winner = "";
    this.gameOver = false;
    this.hilite_0 = false;
    this.hilite_1 = false;
    this.hilite_2 = false;
    this.hilite_3 = false;
    this.hilite_4 = false;
    this.hilite_5 = false;
    this.hilite_6 = false;
    this.hilite_7 = false;
    this.hilite_8 = false;
  }

  cellClickEventHandler(data: { cellNumber: number; sign: string }) {
    this.boardModel[data.cellNumber] = data.sign;
    this.winner = this.determineWinner(this.boardModel);
    if (this.winner != "") {
      this.gameOver = true;
      this.score[this.winner] += 1;
    }
    this.clickCount++;
  }

  determineWinner(board) {
    let winner = "";

    for (let i = 0; i < 9; i += 3) {
      // determine rows
      if (board[i] != null && board[i + 1] != null && board[i + 2] != null) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
          winner = board[i];
          this.highlightRow(i);
        }
      }
    }

    // determine columns
    for (let i = 0; i < 3; i++) {
      if (board[i] != null && board[i + 3] != null && board[i + 6] != null) {
        if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
          winner = board[i];
          this.highlightColumn(i);
        }
      }
    }
    // determine diagonals: top left to bottom right
    if (board[0] != null && board[4] != null && board[8] != null) {
      if (board[0] === board[4] && board[4] === board[8]) {
        winner = board[0];
        this.highlightDiagonalTopLeftToBottom(0);
      }
    }
    // determine diagonals: top right to bottom left
    if (board[2] != null && board[4] != null && board[6] != null) {
      if (board[2] === board[4] && board[4] === board[6]) {
        winner = board[2];
        this.highlightDiagonalTopRightToBottom(2);
      }
    }
    return winner;
  }

  highlightRow(startIndex) {
    for (let i = 0; i < 3; i++) {
      this[`hilite_${startIndex++}`] = true;
    }
  }

  highlightColumn(startIndex) {
    for (let i = 0; i < 3; i++) {
      this[`hilite_${startIndex}`] = true;
      startIndex += 3;
    }
  }

  highlightDiagonalTopLeftToBottom(startIndex) {
    for (let i = 0; i < 3; i++) {
      this[`hilite_${startIndex}`] = true;
      startIndex += 4;
    }
  }

  highlightDiagonalTopRightToBottom(startIndex) {
    for (let i = 0; i < 3; i++) {
      this[`hilite_${startIndex}`] = true;
      startIndex += 2;
    }
  }

  onGameOver() {
    this.initGame();
  }
}
