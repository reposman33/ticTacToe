import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CellComponent } from "./components/cell/cell.component";
import { TicTacToeService } from "./services/ticTacToe.service";

describe("AppComponent", () => {
  const appComponent = new AppComponent(new TicTacToeService());
  let boardModel = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CellComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ticTacToe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ticTacToe");
  });

  it("should correctly determine the winner when 3 identical cells are horizontal", () => {
    boardModel = [
      { cellNumber: 0, sign: "O", highlight: true },
      { cellNumber: 1, sign: "O", highlight: true },
      { cellNumber: 2, sign: "O", highlight: true },
      { cellNumber: 3, sign: "X", highlight: false },
      { cellNumber: 4, sign: "X", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "O", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("O");

    boardModel = [
      { cellNumber: 0, sign: "", highlight: false },
      { cellNumber: 1, sign: "", highlight: false },
      { cellNumber: 2, sign: "", highlight: false },
      { cellNumber: 3, sign: "O", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "", highlight: false },
      { cellNumber: 7, sign: "", highlight: false },
      { cellNumber: 8, sign: "", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("O");

    boardModel = [
      { cellNumber: 0, sign: "", highlight: false },
      { cellNumber: 1, sign: "", highlight: false },
      { cellNumber: 2, sign: "", highlight: false },
      { cellNumber: 3, sign: "", highlight: false },
      { cellNumber: 4, sign: "", highlight: false },
      { cellNumber: 5, sign: "", highlight: false },
      { cellNumber: 6, sign: "X", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("X");
  });
  it("should fail to declare a winner when there are no 3 identical adjacent cells", () => {
    boardModel = [
      { cellNumber: 0, sign: "O", highlight: false },
      { cellNumber: 1, sign: "X", highlight: false },
      { cellNumber: 2, sign: "O", highlight: false },
      { cellNumber: 3, sign: "X", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "X", highlight: false },
      { cellNumber: 7, sign: "O", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("");

    boardModel = [
      { cellNumber: 0, sign: "O", highlight: false },
      { cellNumber: 1, sign: "X", highlight: false },
      { cellNumber: 2, sign: "X", highlight: false },
      { cellNumber: 3, sign: "X", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "O", highlight: false },
      { cellNumber: 7, sign: "O", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("");

    boardModel = [
      { cellNumber: 0, sign: "X", highlight: false },
      { cellNumber: 1, sign: "O", highlight: false },
      { cellNumber: 2, sign: "X", highlight: false },
      { cellNumber: 3, sign: "O", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "X", highlight: false },
      { cellNumber: 6, sign: "X", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "O", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("");
  });
  it("should correctly determine the winner when 3 identical cells are vertical", () => {
    boardModel = [
      { cellNumber: 0, sign: "X", highlight: false },
      { cellNumber: 1, sign: "O", highlight: false },
      { cellNumber: 2, sign: "O", highlight: false },
      { cellNumber: 3, sign: "X", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "", highlight: false },
      { cellNumber: 6, sign: "X", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "O", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("X");

    boardModel = [
      { cellNumber: 0, sign: "O", highlight: false },
      { cellNumber: 1, sign: "X", highlight: false },
      { cellNumber: 2, sign: "", highlight: false },
      { cellNumber: 3, sign: "", highlight: false },
      { cellNumber: 4, sign: "X", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("X");

    boardModel = [
      { cellNumber: 0, sign: "O", highlight: false },
      { cellNumber: 1, sign: "O", highlight: false },
      { cellNumber: 2, sign: "X", highlight: false },
      { cellNumber: 3, sign: "", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "X", highlight: false },
      { cellNumber: 6, sign: "", highlight: false },
      { cellNumber: 7, sign: "", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("X");
  });

  it("should correctly determine the winner when 3 identical cells are diagonal", () => {
    boardModel = [
      { cellNumber: 0, sign: "X", highlight: false },
      { cellNumber: 1, sign: "O", highlight: false },
      { cellNumber: 2, sign: "O", highlight: false },
      { cellNumber: 3, sign: "O", highlight: false },
      { cellNumber: 4, sign: "X", highlight: false },
      { cellNumber: 5, sign: "O", highlight: false },
      { cellNumber: 6, sign: "O", highlight: false },
      { cellNumber: 7, sign: "O", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("X");

    boardModel = [
      { cellNumber: 0, sign: "X", highlight: false },
      { cellNumber: 1, sign: "X", highlight: false },
      { cellNumber: 2, sign: "O", highlight: false },
      { cellNumber: 3, sign: "X", highlight: false },
      { cellNumber: 4, sign: "O", highlight: false },
      { cellNumber: 5, sign: "X", highlight: false },
      { cellNumber: 6, sign: "O", highlight: false },
      { cellNumber: 7, sign: "X", highlight: false },
      { cellNumber: 8, sign: "X", highlight: false }
    ];
    expect(appComponent.checkForWinner(boardModel)).toBe("O");
  });
});
