import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ticTacToe";
  clickCount: number = 0;

  cellClickEventHandler(data: { cellNumber: number; sign: string }) {
    console.log(data.cellNumber, data.sign);
    this.clickCount++;
  }
}
