import { Injectable } from "@angular/core";
import { Move } from "../models/move";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  games = [];
  gameIndex: number = 0;

  constructor() {}

  initGame() {
    const game = {
      id: this.games.length + 1,
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null
    };

    this.games.push(game);
    this.gameIndex = this.games.length - 1;
  }

  saveGame() {}

  saveMove(data: Move) {
    this.games[this.gameIndex][data.cellNumber] = data.sign;
  }

  getGameById(id) {
    return this.games.filter(game => game.id === id);
  }

  getLastGame() {
    return this.games[this.gameIndex];
  }

  getGames() {
    return this.games;
  }
}
