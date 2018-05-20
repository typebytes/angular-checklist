import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-checklist-score-chart',
  templateUrl: './checklist-score-chart.component.html',
  styleUrls: ['./checklist-score-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistScoreChartComponent implements OnChanges {
  @Input() score: number;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.score) {
      this.elementRef.nativeElement.style.setProperty('--percentage', this.score);
    }
  }
}
