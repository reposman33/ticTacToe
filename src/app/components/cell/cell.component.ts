import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Move } from "src/app/models/move";
import { isObject } from "util";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"]
})
export class CellComponent implements OnChanges {
  @Input() gameModel: Move[];
  @Input() cellNumber: number;

  @Output() cellClickEvent = new EventEmitter<number>();
  sign: string;
  highlight: boolean;

  constructor() {
    this.sign = "";
  }

  onClick() {
    if (this.sign === "") {
      this.cellClickEvent.emit(this.cellNumber);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.gameModel.firstChange) {
      this.sign = changes.gameModel.currentValue[this.cellNumber].sign;
      this.highlight =
        changes.gameModel.currentValue[this.cellNumber].highlight;
    }
  }
}
