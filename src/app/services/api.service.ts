import { Injectable } from "@angular/core";
import { Move } from "../models/move";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  games = [];
  gameIndex: number = 0;

  constructor() {}

  initGame(): void {
    this.games.push([null, null, null, null, null, null, null, null, null]);
    this.gameIndex = this.games.length - 1;
  }

  saveMove(data: Move): void {
    this.games[this.gameIndex][data.cellNumber] = data.sign;
  }

  getLastGame(): [] {
    return this.games[this.gameIndex];
  }

  getGames(): [][] {
    return this.games;
  }
}
