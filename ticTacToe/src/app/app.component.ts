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

  constructor() {
    this.title = "ticTacToe";
    this.clickCount = 0;
    this.boardModel = new Array(9);
    this.winner = "";
  }

  cellClickEventHandler(data: { cellNumber: number; sign: string }) {
    this.boardModel[data.cellNumber] = data.sign;
    this.winner = this.determineWinner();
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
      }
    }
    return winner;
  }
}
