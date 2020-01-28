import { Injectable } from "@angular/core";
import { Move } from "../models/move";
import { PlayedGame } from "../models/played-game";

@Injectable({
  providedIn: "root"
})
export class TicTacToeService {
  game: Move[] = []; // moves are ordered positionaly according to 3*3 board
  playedGame: Move[]; // moves are chronologically ordered
  playedGames: PlayedGame[] = [];

  constructor() {}

  initGame(): void {
    this.game = [
      { cellNumber: 0, sign: "", highlight: false },
      { cellNumber: 1, sign: "", highlight: false },
      { cellNumber: 2, sign: "", highlight: false },
      { cellNumber: 3, sign: "", highlight: false },
      { cellNumber: 4, sign: "", highlight: false },
      { cellNumber: 5, sign: "", highlight: false },
      { cellNumber: 6, sign: "", highlight: false },
      { cellNumber: 7, sign: "", highlight: false },
      { cellNumber: 8, sign: "", highlight: false }
    ];
    this.playedGame = [];
  }

  saveMoveByBoardPosition(data: Move): void {
    // store current move in array position corresponding to cell position in board
    this.game[data.cellNumber] = data;
  }

  saveMoveChronological(data: Move): void {
    this.playedGame.push(data);
  }

  getCurrentGame(): Move[] {
    // we have to return a new array each time or Angular's ngOnChanges will not detect changes
    const game = [...this.game];
    return game;
  }

  savePlayedGame(): void {
    // make a clone from game, no reference as that will be mutated
    this.playedGames.push({
      id: this.playedGames.length,
      game: [...this.playedGame]
    });
  }

  getPlayedGames(): PlayedGame[] {
    return this.playedGames;
  }

  getPlayedGame(index): Move[] {
    const playedGame = this.playedGames[index].game;
    // don't return a reference to playedGame but return a clone
    return [...playedGame];
  }
}
