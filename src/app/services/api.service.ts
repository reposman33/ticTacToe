import { Injectable } from "@angular/core";
import { Move } from "../models/move";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  game: Move[] = [];
  playedGames: string[][] = [];

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
  }

  saveMove(data: Move): void {
    this.game[data.cellNumber] = data;
  }

  getCurrentGame(): Move[] {
    // we have to return a new array each time or Angular's ngOnChanges will not detect changes
    const game = [...this.game];
    return game;
  }

  getPlayedGames(): string[][] {
    return this.playedGames;
  }

  getPlayedGame(index): string[] {
    return this.playedGames[index];
  }

  addPlayedGame(game: []) {
    // make a clone from game, no reference as that will be mutated
    const playedGame = [...game];
    this.playedGames.push(playedGame);
  }
}
