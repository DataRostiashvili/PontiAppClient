
import { Component, Input, OnInit } from '@angular/core';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import {PlaceViewModel} from "@core/models/ViewModels/place-listing-item-view-model.model";

@Component({
  selector: 'app-place-grid-tile',
  templateUrl: './place-grid-tile.component.html',
  styleUrls: ['./place-grid-tile.component.scss']
})
export class PlaceGridTileComponent implements OnInit {

  @Input()
  public placeListingItems: PlaceViewModel = {};

  constructor() { }

  ngOnInit(): void {
  }

}


