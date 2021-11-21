import {Component, Input, NgZone, OnInit} from '@angular/core';
import {PlaceViewModel} from '@core/models/ViewModels/place-listing-item-view-model.model';
import {SearchFilter} from "@core/models/util/search-filter";
import {HttpClient} from "@angular/common/http";
import {EventPlaceService} from "@core/services/event-place.service";
import {PlaceResponse} from "@core/models/ResponseModels/place-response";


@Component({
  selector: 'app-places-grid-list',
  template: `
    <mat-grid-list #grid appResponsiveCols cols=2 class="mat_grid_list">
      <mat-grid-tile *ngFor="let item of Items; index as i">
        <app-place-grid-tile class="grid_tile" [placeListingItems]="item"></app-place-grid-tile>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: [
    `
      .mat_grid_list {
        //width: auto;
      }

      .grid_tile {
        // margin: 100px;
        display: flex;
        width: 100%;
        height: 100%;


      }
    `
  ]
})
export class PlacesGridListComponent implements OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();
  public Items: PlaceViewModel[] = [];

  constructor(private http: HttpClient,
              private eventPlaceService: EventPlaceService,
              private zone: NgZone) {

  }

  ngOnInit(): void {
    if(this.isFilterForHomePage()){
      this.eventPlaceService.getPlacesByHost(this.filter.hostId).subscribe(briefPlaces => {
        this.zone.run(() => {
          this.Items = this.mapApiResponseToViewModels(briefPlaces)
        })
      })
    }
    if (this.filter.hostId) {
      this.eventPlaceService.getPlacesByHost(this.filter.hostId).subscribe(briefPlaces => {
        this.zone.run(() => {
          this.Items = this.mapApiResponseToViewModels(briefPlaces)
        })
      })
    }
  }

  mapApiResponseToViewModels(response: PlaceResponse[]): PlaceViewModel[] {
    return response.map(place => {
      return {
        name: place.name,
        address: place.address,
        host: {
          name: `${place.host?.name} ${place.host?.surname}`,
          profilePictureUri: place.host?.profilePictureUri
        },
        startTime: place.todayWeekSchedule?.start,
        endTime: place.todayWeekSchedule?.end
      } as PlaceViewModel
    })
  }

  isFilterForHomePage() {
    return !this.filter.hostId
      || !this.filter.categories
      || !this.filter.time
      || !this.filter.searchKeyword;
  }
}
