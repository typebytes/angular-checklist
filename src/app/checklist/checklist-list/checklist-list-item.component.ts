import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ChecklistItem } from "../models/checklist.model";

@Component({
  selector: "ac-checklist-list-item",
  templateUrl: "./checklist-list-item.component.html",
  styleUrls: ["./checklist-list-item.component.scss"]
})
export class ChecklistListItemComponent {
  @Input() item: ChecklistItem;
  @Output() toggleItem = new EventEmitter<ChecklistItem>();
  @Output() toggleFavorite = new EventEmitter<ChecklistItem>();
}
