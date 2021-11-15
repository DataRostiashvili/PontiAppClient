import { Component, Input, OnInit } from '@angular/core';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';


@Component({
  selector: 'app-places-grid-list',
  templateUrl: './places-grid-list.component.html',
  styleUrls: ['./places-grid-list.component.scss']
})
export class PlacesGridListComponent implements OnInit {

  @Input('placeListingItems')
    public Items: PlaceViewModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
