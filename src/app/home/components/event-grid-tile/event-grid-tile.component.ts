import { Component, Input, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';

@Component({
  selector: 'app-event-grid-tile',
  template: './event-grid-tile.component.html',
  styleUrls: ['./event-grid-tile.component.scss']
})
export class EventGridTileComponent implements OnInit {

  @Input()
    public eventListingItem: EventViewModel = {};

  constructor() { }

  ngOnInit(): void {

  }

}
