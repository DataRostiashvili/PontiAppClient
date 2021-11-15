import { Component, OnInit,AfterContentInit, ViewChild, Input } from '@angular/core';

import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { HostViewModel } from '@core/models/ViewModels/host-view-model.model';
import { AddressViewModel } from '@core/models/ViewModels/address-view-model.model';

@Component({
  selector: 'app-events-grid-list',
  templateUrl: './events-grid-list.component.html',
  styleUrls: ['./events-grid-list.component.scss']
})
export class EventsGridListComponent  {
  @Input('eventListingItems')
    public Items: EventViewModel[] = [];



  constructor() {

  }


}
