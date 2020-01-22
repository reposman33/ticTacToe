import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CellComponent } from "./components/cell/cell.component";

describe("AppComponent", () => {
  const appComponent = new AppComponent();
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
    boardModel = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(appComponent.determineWinner(boardModel)).toBe("X");

    boardModel = ["O", "X", "X", "O", "O", "O", null, null, null];
    expect(appComponent.determineWinner(boardModel)).toBe("O");

    boardModel = ["O", "O", null, null, null, null, "X", "X", "X"];
    expect(appComponent.determineWinner(boardModel)).toBe("X");
  });
  it("should fail to declare a winner when there are no 3 identical adjacent cells", () => {
    boardModel = ["O", "X", "O", "X", "O", "O", "X", "O", "X"];
    expect(appComponent.determineWinner(boardModel)).toBe("");

    boardModel = ["O", "X", "X", "X", "O", "O", "O", "O", "X"];
    expect(appComponent.determineWinner(boardModel)).toBe("");

    boardModel = ["X", "O", "X", "O", "O", "X", "X", "X", "O"];
    expect(appComponent.determineWinner(boardModel)).toBe("");
  });
  it("should correctly determine the winner when 3 identical cells are vertical", () => {
    boardModel = ["X", null, null, "X", null, null, "X", null, null];
    expect(appComponent.determineWinner(boardModel)).toBe("X");

    boardModel = ["X", "X", "X", null, null, null, null, null, null];
    expect(appComponent.determineWinner(boardModel)).toBe("X");

    boardModel = ["X", "X", "X", null, null, null, null, null, null];
    expect(appComponent.determineWinner(boardModel)).toBe("X");
  });

  it("should correctly determine the winner when 3 identical cells are diagonal", () => {
    boardModel = ["X", null, null, null, "X", null, null, null, "X"];
    expect(appComponent.determineWinner(boardModel)).toBe("X");

    boardModel = [null, null, "O", null, "O", null, "O", null];
    expect(appComponent.determineWinner(boardModel)).toBe("O");
  });
});
