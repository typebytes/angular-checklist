import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'ac-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreChartComponent implements OnChanges {
  @Input() score: number;

  @HostBinding('class.done') done = false;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.score) {
      this.elementRef.nativeElement.style.setProperty('--percentage', this.score);
      this.done = this.score === 1;
    }
  }
}
