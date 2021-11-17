import { Component, OnInit,AfterContentInit, ViewChild, Input } from '@angular/core';

import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { HostViewModel } from '@core/models/ViewModels/host-view-model.model';
import { AddressViewModel } from '@core/models/ViewModels/address-view-model.model';
import {SearchFilter} from "@core/models/util/search-filter";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-events-grid-list',
  template: `

    <mat-grid-list #grid appResponsiveCols cols=2 class="mat_grid_list">
      <mat-grid-tile  *ngFor="let item of Items; index as i">
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
        // margin: 100px;
        display: flex;
        width: 100%;
        height: 100%;



      }
    `
  ]
})
export class EventsGridListComponent implements  OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();

  public Items: EventViewModel[] = [];


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    let categories = this.filter.categories;

    this.http.post(`${environment.apiUrl}/Event/SearchEvent`, {
      categories
    });


  }


}
