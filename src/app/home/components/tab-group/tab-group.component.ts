import { Component, OnInit } from '@angular/core';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { DataSeederService } from '@core/services/data-seeder.service';
@Component({
  selector: 'app-tab-group',
  template: `
    <mat-tab-group [disablePagination]="true" mat-align-tabs="center">
      <mat-tab label="Events"><app-events-grid-list [eventListingItems]="eventListingItems"></app-events-grid-list></mat-tab>
      <mat-tab label="Places"><app-places-grid-list [placeListingItems]="placeListingItems"></app-places-grid-list></mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `

    `
  ]
})
export class TabGroupComponent implements OnInit {

  public placeListingItems: PlaceViewModel[] = [];
  public eventListingItems: EventViewModel[] = [];


  constructor(private dataSeeder: DataSeederService) {
    this.placeListingItems = dataSeeder.PlaceListingItems;
    this.eventListingItems = dataSeeder.eventListingItems;
  }

  ngOnInit(): void {
  }

}
