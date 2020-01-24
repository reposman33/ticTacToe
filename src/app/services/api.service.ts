import { Injectable } from "@angular/core";
import { Move } from "../models/move";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  game = {};
  games = [];
  gameIndex: number = 0;

  constructor() {}

  initGame() {
    this.games.push({ id: "next" });
    this.gameIndex = this.games.length - 1;
  }

  saveGame() {
    this.games[this.gameIndex]["id"] = new Date().toUTCString();
  }

  saveMove(data: Move) {
    this.games[this.gameIndex][data.cellNumber] = data.sign;
  }

  getGame(key) {
    return this.games.filter(game => game.id === key);
  }

  getGames() {
    return this.games;
  }
}
