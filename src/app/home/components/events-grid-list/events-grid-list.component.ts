import {Component, OnInit, AfterContentInit, ViewChild, Input, NgZone} from '@angular/core';

import {EventViewModel} from '@core/models/ViewModels/event-listing-item-view-model.model';
import {PlaceViewModel} from '@core/models/ViewModels/place-listing-item-view-model.model';
import {HostViewModel} from '@core/models/ViewModels/host-view-model.model';
import {AddressViewModel} from '@core/models/ViewModels/address-view-model.model';
import {SearchFilter} from "@core/models/util/search-filter";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {EventPlaceService} from "@core/services/event-place.service";
import {EventResponse} from "@core/models/ResponseModels/event-response";
import {Observable} from "rxjs";

@Component({
  selector: 'app-events-grid-list',
  template: `

    <mat-grid-list #grid appResponsiveCols cols=2 class="mat_grid_list">
      <mat-grid-tile *ngFor="let item of Items; index as i">
        <app-event-grid-tile class="grid_tile" [eventListingItem]="item"></app-event-grid-tile>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: [
    `
      .mat_grid_list {
        //width: auto;
      }

      .grid_tile {
        display: flex;
        width: 100%;
        height: 100%;


      }
    `
  ]
})
export class EventsGridListComponent implements OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();

  public Items: EventViewModel[] = [];


  constructor(private http: HttpClient,
              private eventPlaceService: EventPlaceService,
              private zone: NgZone) {

  }

  ngOnInit(): void {

    if (this.isFilterForHomePage()) {
      this.eventPlaceService.getAllEvent().subscribe(briefEvents => {
        this.zone.run(() => {
          this.Items = this.mapApiResponseToFviewModels(briefEvents);
        })
      })
    } else if (this.filter.hostId) {
      this.eventPlaceService.getEventsByHost(this.filter.hostId).subscribe(briefEvents => {
        this.zone.run(() => {
          this.Items = this.mapApiResponseToFviewModels(briefEvents);
        })
      })
    }


  }

  isFilterForHomePage() {
    return !this.filter.hostId
      || !this.filter.categories
      || !this.filter.time
      || !this.filter.searchKeyword;
  }

  mapApiResponseToFviewModels(response: EventResponse[]): EventViewModel[] {
    return response.map(e => {
      return {
        name: e.name,
        address: e.address,
        startTime: e.startTime,
        host: {
          name: `${e.host?.name} ${e.host?.surname}`,
          profilePictureUri: e.host?.profilePictureUri
        }
      } as EventViewModel
    });
  }

}
