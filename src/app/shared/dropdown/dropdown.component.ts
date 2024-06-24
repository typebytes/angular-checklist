import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'ac-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [MatFormField, MatSelect, ReactiveFormsModule, MatOption]
})
export class DropdownComponent implements OnChanges {
  @Input() items: Array<any>;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() selected: string;

  @Output() selectionChange = new EventEmitter<any>();

  select = new FormControl<string>('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this.select.setValue(changes.selected.currentValue);
    }
  }
}
