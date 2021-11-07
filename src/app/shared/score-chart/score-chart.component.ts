import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  Inject,
  PLATFORM_ID
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

  isBrowser = true;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.score && this.isBrowser) {
      this.elementRef.nativeElement.style.setProperty('--percentage', this.score);
      this.done = this.score === 1;
    }
  }
}
