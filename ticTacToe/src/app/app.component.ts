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

  constructor() {
    this.title = "ticTacToe";
    this.clickCount = 0;
    this.boardModel = new Array(9);
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
    this.winner = this.determineWinner();
    this.gameOver = this.winner != "";
    this.clickCount++;
  }

  determineWinner() {
    let winner = "";

    for (let i = 0; i < 9; i += 3) {
      // determine rows
      if (
        this.boardModel[i] != null &&
        this.boardModel[i + 1] != null &&
        this.boardModel[i + 2] != null
      ) {
        if (
          this.boardModel[i] === this.boardModel[i + 1] &&
          this.boardModel[i + 1] === this.boardModel[i + 2]
        ) {
          winner = this.boardModel[i];
          this.highlightRow(i);
        }
      }
    }

    // determine columns
    for (let i = 0; i < 3; i++) {
      if (
        this.boardModel[i] != null &&
        this.boardModel[i + 3] != null &&
        this.boardModel[i + 6] != null
      ) {
        if (
          this.boardModel[i] === this.boardModel[i + 3] &&
          this.boardModel[i + 3] === this.boardModel[i + 6]
        ) {
          winner = this.boardModel[i];
          this.highlightColumn(i);
        }
      }
    }
    // determine diagonals: top left to bottom right
    if (
      this.boardModel[0] != null &&
      this.boardModel[4] != null &&
      this.boardModel[8] != null
    ) {
      if (
        this.boardModel[0] === this.boardModel[4] &&
        this.boardModel[4] === this.boardModel[8]
      ) {
        winner = this.boardModel[0];
        this.highlightDiagonalTopLeftToBottom(0);
      }
    }
    // determine diagonals: top right to bottom left
    if (
      this.boardModel[2] != null &&
      this.boardModel[4] != null &&
      this.boardModel[6] != null
    ) {
      if (
        this.boardModel[2] === this.boardModel[4] &&
        this.boardModel[4] === this.boardModel[6]
      ) {
        winner = this.boardModel[2];
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
}
