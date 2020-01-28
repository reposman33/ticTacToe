import { TestBed } from "@angular/core/testing";

import { TicTacToeService } from "./ticTacToe.service";

describe("TicTacToeService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    expect(service).toBeTruthy();
  });
});
