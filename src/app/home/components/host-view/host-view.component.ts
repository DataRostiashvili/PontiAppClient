import {Component,NgZone} from '@angular/core';
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
            <mat-icon>location_on</mat-icon>
            {{host?.address}}
          </div>

        </div>

        <div class="additional_info">
          <div class="field label">
            <mat-icon>mail</mat-icon>
            {{host?.mail}}
          </div>

          <div class="field label">
            <mat-icon>phone</mat-icon>
            {{host?.phoneNumber}}
          </div>

          <div cl.ass="field label">
            <mat-icon>verified</mat-icon>
            {{host?.isVerfiedUser}}
          </div>
        </div>
      </div>
      <div class="review_container">
        <div>

          <app-star-rating [rating]="rating"
                           [starCount]="5" (ratingUpdated)="onRatingChanged($event)"></app-star-rating>

        </div>
        <div class="review_count">
          {{host?.totalReviewerCount}}
        </div>
      </div>
      <div class="event_place_container">
        <app-tab-group [filter]="searchFilter"></app-tab-group>
      </div>
    </div>


  `,
  styles: [
    `
      .review_container{
        margin: auto;
        display: flex;
        flex-direction: row;
        vertical-align: center;
        align-items: center;
        justify-content: center;

        .review_count{
          margin-left: 15px;
        }
      }
      .mat-icon {
        vertical-align: center;
      }

      .info_container {
        display: flex;
        flex-direction: row;
        margin: auto;

        .basic_info{
          margin-right: 25px;
        }
        .additional_info {
          margin-left: 25px;
        }

      }

      .basic_info {
        display: flex;
        flex-direction: column;
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
  public searchFilter = new SearchFilter();

  public rating: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hostService: HostService,
    private zone: NgZone
  ) {

    let hostId = this.route.snapshot.paramMap.get('hostId');
    if (!hostId || !RegexHelpers.IsOnlyDigits(hostId)) router.navigate(['/']);
    else this.hostId = hostId;

    hostService.getHost(hostId ?? '').subscribe((host) => {
      zone.run(()=> {

        this.host = host;
      })
      console.log('host is ' + this.host);
    });

    this.searchFilter = new SearchFilter( '',TimeOption.upcoming, [], hostId ?? '')

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
