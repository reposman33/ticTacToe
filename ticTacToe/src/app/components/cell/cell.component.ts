import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"]
})
export class CellComponent {
  @Input() cellNumber: number;
  @Input() clickCount: number;
  @Output()
  cellClickEvent = new EventEmitter<object>();
  filled: boolean;
  sign: string = "";

  constructor() {
    this.filled = false;
  }

  onClick() {
    if (!this.filled) {
      this.sign = this.clickCount % 2 ? "O" : "X";
      this.cellClickEvent.emit({
        cellNumber: this.cellNumber,
        sign: this.sign
      });
      this.filled = true;
    }
  }
}
