import {Component, Input, OnInit} from '@angular/core';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { DataSeederService } from '@core/services/data-seeder.service';
import {SearchFilter} from "@core/models/util/search-filter";
@Component({
  selector: 'app-tab-group',

  template: `
    <mat-tab-group [disablePagination]="true" mat-align-tabs="center">
      <mat-tab label="Events"><app-events-grid-list [filter]="filter"></app-events-grid-list></mat-tab>
      <mat-tab label="Places"><app-places-grid-list [filter]="filter"></app-places-grid-list></mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `

    `
  ]
})
export class TabGroupComponent implements OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();



  constructor() {

  }

  ngOnInit(): void
  {

  }

}
