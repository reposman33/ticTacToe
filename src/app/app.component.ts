import { Component } from "@angular/core";
import { TicTacToeService } from "./services/ticTacToe.service";
import { Move } from "./models/move";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string;
  gameModel: Move[];
  clickCount: number;
  score: object;

  constructor(private ticTacToeService: TicTacToeService) {
    this.title = "ticTacToe";
    this.score = { X: 0, O: 0 };
    this.initGame();
  }

  initGame() {
    this.clickCount = 0;
    this.ticTacToeService.initGame();
    this.gameModel = this.ticTacToeService.getCurrentGame();
  }

  cellClickEventHandler(cellNumber) {
    // determine sign to display in cell
    const sign = this.clickCount++ % 2 ? "X" : "O";
    this.ticTacToeService.saveMove({
      cellNumber,
      sign: sign,
      highlight: false
    });
    // retrieve current game so that cells can update through data binding
    this.gameModel = this.ticTacToeService.getCurrentGame();
    let winner = this.determineWinner(this.gameModel);
    if (winner != "") {
      // do not add to score when draw
      this.score[winner] += 1;
      winner = "";
    }
  }

  determineWinner(board) {
    let winner = "";
    // determine row equality: scan 3 rows
    for (let i = 0; i < 7; i += 3) {
      if (
        board[i]["sign"] != "" &&
        board[i + 1]["sign"] != "" &&
        board[i + 2]["sign"] != ""
      ) {
        if (
          board[i]["sign"] === board[i + 1]["sign"] &&
          board[i + 1]["sign"] === board[i + 2]["sign"]
        ) {
          winner = board[i]["sign"];
          this.gameModel = this.highlightRow(i);
          break;
        }
      }
    }
    // determine column equality: scan 3 columns
    if (winner === "") {
      for (let i = 0; i < 3; i++) {
        if (
          board[i]["sign"] != "" &&
          board[i + 3]["sign"] != "" &&
          board[i + 6]["sign"] != ""
        ) {
          if (
            board[i]["sign"] === board[i + 3]["sign"] &&
            board[i + 3]["sign"] === board[i + 6]["sign"]
          ) {
            winner = board[i]["sign"];
            this.gameModel = this.highlightColumn(i);
            break;
          }
        }
      }
    }
    // determine diagonal equality: top left to bottom right
    if (winner === "") {
      if (
        board[0]["sign"] != "" &&
        board[4]["sign"] != "" &&
        board[8]["sign"] != ""
      ) {
        if (
          board[0]["sign"] === board[4]["sign"] &&
          board[4]["sign"] === board[8]["sign"]
        ) {
          winner = board[0]["sign"];
          this.gameModel = this.highlightDiagonalTopLeftToBottom();
        }
      }

      if (
        board[2]["sign"] != "" &&
        board[4]["sign"] != "" &&
        board[6]["sign"] != ""
      ) {
        // determine diagonals equality: top right to bottom left
        if (
          board[2]["sign"] === board[4]["sign"] &&
          board[4]["sign"] === board[6]["sign"]
        ) {
          winner = board[2]["sign"];
          this.gameModel = this.highlightDiagonalTopRightToBottom();
        }
      }
    }
    console.log(this.gameModel);
    return winner;
  }

  highlightRow(startIndex): Move[] {
    return this.ticTacToeService.getCurrentGame().map((cell, index) => {
      // there are 3 possible rows to highlight, starting in cellNumber 0,3 or 6
      cell.highlight = index >= startIndex && index <= startIndex + 2;
      return cell;
    });
  }

  highlightColumn(startIndex): Move[] {
    return this.ticTacToeService.getCurrentGame().map((cell, index) => {
      // there are 3 posible columns to highlight, starting in cellNumber 0,1 or 2
      cell.highlight =
        index === startIndex ||
        index === startIndex + 3 ||
        index === startIndex + 6;
      return cell;
    });
  }

  highlightDiagonalTopLeftToBottom(): Move[] {
    return this.ticTacToeService.getCurrentGame().map((cell, index) => {
      // there is only 1 diagonal to highight
      cell.highlight = index === 0 || index === 4 || index === 8;
      return cell;
    });
  }

  highlightDiagonalTopRightToBottom(): Move[] {
    return this.ticTacToeService.getCurrentGame().map((cell, index) => {
      // there is only 1 diagonal to highight
      cell.highlight = index === 2 || index === 4 || index === 6;
      return cell;
    });
  }

  onGameOver() {
    this.initGame();
  }
}
