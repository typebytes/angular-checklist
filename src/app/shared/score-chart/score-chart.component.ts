import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  PLATFORM_ID,
  inject
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'ac-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreChartComponent implements OnChanges {
  private elementRef = inject(ElementRef);
  @Input() score: number;

  @HostBinding('class.done') done = false;

  isBrowser = true;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.score && this.isBrowser) {
      this.elementRef.nativeElement.style.setProperty('--percentage', this.score);
      this.done = this.score === 1;
    }
  }
}
