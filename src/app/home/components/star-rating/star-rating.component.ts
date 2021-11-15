import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating',
  template:  `
    <button mat-icon-button [color]="color" *ngFor="let ratingId of ratingArr;index as i"
            [id]="'star_'+i" (click)="onClick(i+1)" [matTooltip]="ratingId+1" matTooltipPosition="above">
      <mat-icon>
        {{showIcon(i)}}
      </mat-icon>
    </button>
    <mat-error *ngIf="starCount === null || starCount === 0">
      Star count is <strong>required</strong> and cannot be zero
    </mat-error>
    <p class="body-2">
      Your rated <span class="body-2">{{rating}}</span> / <span class="body-2">{{starCount}}</span>
    </p>
  `,
  styles: [
    `
    `
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input() public rating: number = 0;
  @Input() public starCount: number = 5;
  @Input() public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr: any = [];

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
