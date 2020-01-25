import { Component } from "@angular/core";
import { ApiService } from "./services/api.service";
import { Move } from "./models/move";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string;
  clickCount: number;
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
  reset: boolean;

  constructor(private api: ApiService) {
    this.title = "ticTacToe";
    this.score = { X: 0, O: 0 };
    this.initGame();
    this.reset = false;
  }

  initGame() {
    this.clickCount = 0;
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
    this.reset = true; // reset the game
    this.api.initGame();
  }

  cellClickEventHandler(data: Move) {
    this.clickCount++;
    this.api.saveMove(data);
    this.winner = this.determineWinner(this.api.getLastGame());
    if (this.winner != "" || this.clickCount > 8) {
      this.gameOver = true;
      // do not add to score when draw
      this.winner != "" && (this.score[this.winner] += 1);
    }
    if (this.reset) this.reset = false;
  }

  determineWinner(board) {
    let winner = "";

    // determine row equality
    for (let i = 0; i < 7; i += 3) {
      if (board[i] != null && board[i + 1] != null && board[i + 2] != null) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
          winner = board[i];
          this.highlightRow(i);
          break;
        }
      }
    }
    // determine column equality
    if (winner === "") {
      for (let i = 0; i < 3; i++) {
        if (board[i] != null && board[i + 3] != null && board[i + 6] != null) {
          if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
            winner = board[i];
            this.highlightColumn(i);
            break;
          }
        }
      }
    }
    // determine diagonal equality: top left to bottom right
    if (winner === "") {
      if (board[0] != null && board[4] != null && board[8] != null) {
        if (board[0] === board[4] && board[4] === board[8]) {
          winner = board[0];
          this.highlightDiagonalTopLeftToBottom(0);
        }
      }

      if (board[2] != null && board[4] != null && board[6] != null) {
        // determine diagonals equality: top right to bottom left
        if (board[2] === board[4] && board[4] === board[6]) {
          winner = board[2];
          this.highlightDiagonalTopRightToBottom(2);
        }
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
