import { Component } from "@angular/core";
import { TicTacToeService } from "./services/ticTacToe.service";
import { Move } from "./models/move";
import { PlayedGame } from "./models/played-game";
import { timer, range, of, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string;
  winner: string;
  gameModel: Move[];
  clickCount: number;
  score: object;
  playedGames: PlayedGame[];
  playedGame: Move[];
  onPlayedGameClickSubscription: Subscription;

  constructor(private ticTacToeService: TicTacToeService) {
    this.title = "ticTacToe";
    this.score = { X: 0, O: 0 };
    this.initGame();
    this.playedGames = [];
  }

  initGame() {
    this.winner = "";
    this.clickCount = 0;
    this.ticTacToeService.initGame();
    this.gameModel = this.ticTacToeService.getCurrentGame();
  }

  cellClickEventHandler(cellNumber) {
    if (this.clickCount > 8 || this.winner !== "") {
      return;
    }
    const move = {
      cellNumber,
      sign: this.getCellSign(),
      highlight: false
    };
    this.ticTacToeService.saveMoveByBoardPosition(move);
    this.ticTacToeService.saveMoveChronological(move);
    // retrieve current game so that cells can update through data binding
    this.gameModel = this.ticTacToeService.getCurrentGame();
    this.checkForWinner(this.ticTacToeService.getCurrentGame());
  }

  checkForWinner(board: Move[]) {
    this.winner = this.evaluateBoard(board);
    if (this.clickCount > 8 || this.winner !== "") {
      this.gameWon(this.winner);
    }
    return this.winner;
  }

  // get the sign ('X' or 'O') to display in cell
  getCellSign() {
    return this.clickCount++ % 2 ? "X" : "O";
  }

  // @param winningSign: an 'X' or 'O'
  gameWon(winningSign: string) {
    // do not add to score when draw
    if (winningSign != "") {
      this.score[winningSign] += 1;
    }
    // save the chronological representation of the game
    this.ticTacToeService.savePlayedGame();
    this.playedGames = this.ticTacToeService.getPlayedGames();
  }

  areCellsDefined(
    board: Move[],
    startIndex: number,
    direction: string
  ): boolean {
    if (direction === "horizontal") {
      if (
        board[startIndex]["sign"] != "" &&
        board[startIndex + 1]["sign"] != "" &&
        board[startIndex + 2]["sign"] != ""
      ) {
        return true;
      }
    } else if (direction === "vertical") {
      if (
        board[startIndex]["sign"] != "" &&
        board[startIndex + 3]["sign"] != "" &&
        board[startIndex + 6]["sign"] != ""
      ) {
        return true;
      }
    } else if (direction === "topLeftToBottomRight") {
      if (
        board[0]["sign"] != "" &&
        board[4]["sign"] != "" &&
        board[8]["sign"] != ""
      ) {
        return true;
      }
    } else if (direction === "topRightToBottomLeft") {
      if (
        board[2]["sign"] != "" &&
        board[4]["sign"] != "" &&
        board[6]["sign"] != ""
      ) {
        return true;
      }
    }

    return false;
  }

  areCellContentsEqual(board: Move[], startIndex: number, direction: string) {
    if (direction === "horizontal") {
      if (
        board[startIndex]["sign"] === board[startIndex + 1]["sign"] &&
        board[startIndex + 1]["sign"] === board[startIndex + 2]["sign"]
      ) {
        return true;
      }
    } else if (direction === "vertical") {
      if (
        board[startIndex]["sign"] === board[startIndex + 3]["sign"] &&
        board[startIndex + 3]["sign"] === board[startIndex + 6]["sign"]
      ) {
        return true;
      }
    } else if (direction === "topLeftToBottomRight") {
      if (
        board[0]["sign"] === board[4]["sign"] &&
        board[4]["sign"] === board[8]["sign"]
      ) {
        return true;
      }
    } else if (direction === "topRightToBottomLeft") {
      if (
        board[2]["sign"] === board[4]["sign"] &&
        board[4]["sign"] === board[6]["sign"]
      ) {
        return true;
      }
    }
    return false;
  }

  evaluateBoard(board) {
    let winner = "";
    // determine row equality: scan 3 rows
    [0, 3, 6].map(startCellNumber => {
      const direction = "horizontal";
      if (
        this.areCellsDefined(board, startCellNumber, direction) &&
        this.areCellContentsEqual(board, startCellNumber, direction)
      ) {
        winner = board[startCellNumber]["sign"];
        this.highlightRow(startCellNumber);
        this.gameModel = this.ticTacToeService.getCurrentGame();
      }
    });
    // determine column equality: scan 3 columns
    if (winner === "") {
      [0, 1, 2].map(startCellNumber => {
        const direction = "vertical";
        if (
          this.areCellsDefined(board, startCellNumber, direction) &&
          this.areCellContentsEqual(board, startCellNumber, direction)
        ) {
          winner = board[startCellNumber]["sign"];
          this.highlightColumn(startCellNumber);
          this.gameModel = this.ticTacToeService.getCurrentGame();
        }
      });
    }
    // determine diagonal equality: top left to bottom right
    if (winner === "") {
      if (
        this.areCellsDefined(board, 0, "topLeftToBottomRight") &&
        this.areCellContentsEqual(board, 0, "topLeftToBottomRight")
      ) {
        winner = board[0]["sign"];
        this.highlightDiagonalTopLeftToBottomRight();
        this.gameModel = this.ticTacToeService.getCurrentGame();
      } else {
        if (
          this.areCellsDefined(board, 2, "topRightToBottomLeft") &&
          this.areCellContentsEqual(board, 2, "topRightToBottomLeft")
        ) {
          winner = board[2]["sign"];
          this.highlightDiagonalTopRightToBottomLeft();
          this.gameModel = this.ticTacToeService.getCurrentGame();
        }
      }
    }
    return winner;
  }

  highlightRow(startIndex): void {
    const currentGame = this.ticTacToeService.getCurrentGame();
    // set the hilite flag of cell to true
    currentGame[startIndex].highlight = true;
    currentGame[startIndex + 1].highlight = true;
    currentGame[startIndex + 2].highlight = true;
    // save the cells
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex + 1]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex + 2]);
  }

  highlightColumn(startIndex): void {
    const currentGame = this.ticTacToeService.getCurrentGame();
    // set the hilite flag of cell to true
    currentGame[startIndex].highlight = true;
    currentGame[startIndex + 3].highlight = true;
    currentGame[startIndex + 6].highlight = true;
    // save the cells
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex + 3]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[startIndex + 6]);
  }

  highlightDiagonalTopLeftToBottomRight(): void {
    const currentGame = this.ticTacToeService.getCurrentGame();
    // set the hilite flag of cell to true
    currentGame[0].highlight = true;
    currentGame[4].highlight = true;
    currentGame[8].highlight = true;
    // save the cells
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[0]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[4]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[8]);
  }

  highlightDiagonalTopRightToBottomLeft(): void {
    const currentGame = this.ticTacToeService.getCurrentGame();
    // set the hilite flag of cell to true
    currentGame[2].highlight = true;
    currentGame[4].highlight = true;
    currentGame[6].highlight = true;
    // save the cells
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[2]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[4]);
    this.ticTacToeService.saveMoveByBoardPosition(currentGame[6]);
  }

  onGameOver() {
    this.initGame();
  }

  onPlayedGameClick(id) {
    this.playedGame = this.ticTacToeService.getPlayedGame(id);
    this.ticTacToeService.initGame();
    this.gameModel = this.ticTacToeService.getCurrentGame();

    this.onPlayedGameClickSubscription &&
      !this.onPlayedGameClickSubscription.closed &&
      this.onPlayedGameClickSubscription.unsubscribe();
    this.onPlayedGameClickSubscription = timer(500, 750)
      .pipe(take(9))
      .subscribe({
        next: counter => {
          const move = this.playedGame[counter % 9];
          this.ticTacToeService.saveMoveByBoardPosition({
            ...move,
            highlight: false
          });
          this.gameModel = this.ticTacToeService.getCurrentGame();
        },
        error: e => console.log("ERROR: ", e.detail, "\n", e.message),
        complete: () => this.evaluateBoard(this.gameModel)
      });
  }
}
