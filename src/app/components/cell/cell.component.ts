import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"]
})
export class CellComponent {
  @Input() cellNumber: number;
  @Input() clickCount: number;
  @Input() gameOver: boolean;
  @Input() highLight: boolean;
  @Input() reset: boolean;

  @Output()
  cellClickEvent = new EventEmitter<object>();
  sign: string = "";

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reset && changes.reset.currentValue) {
      this.sign = "";
    }
  }
  onClick() {
    if (this.sign === "" && !this.gameOver) {
      this.sign = this.clickCount % 2 ? "O" : "X";
      this.cellClickEvent.emit({
        cellNumber: this.cellNumber,
        sign: this.sign
      });
    }
  }
}
