import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegexHelpers} from '@core/heloers/regex-helpers';
import {HostDTO} from '@core/models/DTO/HostDTO';
import {HostService} from '@core/services/host.service';
import {SearchFilter, TimeOption} from "@core/models/util/search-filter";

@Component({
  selector: 'app-host-view',
  template: `
    <div class="container">
      <img class=" image mat-elevation-z8" [src]="host?.pictureUri"/>
      <div class="info_container">
        <div class="basic_info">
          <div>
            <mat-icon>badge</mat-icon>
            {{host?.name}} {{host?.surname}}
          </div>

          <div class="field label">
            <mat-icon>title</mat-icon>

            <app-star-rating [rating]="rating"
                             [starCount]="5" (ratingUpdated)="onRatingChanged($event)"></app-star-rating>

            {{host?.averageRanking}}</div>
          <div class="field label">
            <mat-icon>title</mat-icon>
            {{host?.totalReviewerCount}}
          </div>

        </div>

        <div class="additional_info">
          <div class="field label">
            <mat-icon>title</mat-icon>
            {{host?.mail}}
          </div>

          <div class="field label">
            <mat-icon>title</mat-icon>
            {{host?.phoneNumber}}
          </div>


          <div class="field label">
            <mat-icon>title</mat-icon>
            {{host?.address}}
          </div>


          <div cl.ass="field label">
            <mat-icon>title</mat-icon>
            {{host?.isVerfiedUser}}
          </div>
        </div>
      </div>
      <div class="event_place_container">
        <app-tab-group [filter]="searchFilter"></app-tab-group>
      </div>
    </div>


  `,
  styles: [
    `
      .mat-icon {
        vertical-align: center;
      }

      .info_container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

      }

      .basic_info {
        display: flex;
        flex-direction: column;
      }

      .additional_info {

      }

      .label {
      }

      .field {
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin: auto;
        width: auto;

        font-size: medium;

        .image {
          margin: auto;
          margin-top: 16px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin-bottom: 5px;

        }
      }
    `,
  ],
})
export class HostViewComponent {
  public host: HostDTO | undefined;
  private hostId: string = '';
  private searchFilter = new SearchFilter();

  public rating: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hostService: HostService
  ) {
    let hostId = this.route.snapshot.paramMap.get('hostId');
    if (!hostId || !RegexHelpers.IsOnlyDigits(hostId)) router.navigate(['/']);
    else this.hostId = hostId;

    hostService.getHost(hostId ?? '').subscribe((host) => {
      this.host = host;
    });

    this.searchFilter = new SearchFilter('',TimeOption.upcoming, [], hostId ?? '')

    this.calculateRating();

  }


  onRatingChanged(rating: any) {
    console.log(rating);
    this.hostService.giveReview(this.hostId, rating as number);

    this.rating = rating;
  }

  calculateRating() {
    this.hostService.getHost(this.hostId).subscribe(host => this.rating = Math.floor(host.averageRanking));
  }
}
