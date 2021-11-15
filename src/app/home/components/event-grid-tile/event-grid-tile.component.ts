import { Component, Input, OnInit } from '@angular/core';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';

@Component({
  selector: 'app-event-grid-tile',
  templateUrl: './event-grid-tile.component.html',
  styleUrls: ['./event-grid-tile.component.scss']
})
export class EventGridTileComponent implements OnInit {

  @Input()
    public eventListingItem: EventViewModel = {};

  constructor() { }

  ngOnInit(): void {
  }

}
