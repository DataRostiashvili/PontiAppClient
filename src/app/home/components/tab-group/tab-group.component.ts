import { Component, Input, OnInit } from '@angular/core';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { DataSeederService } from '@core/services/data-seeder.service';
import { SearchFilter } from "@core/models/util/search-filter";
import { TypeOfPonti } from '@core/models/enums/PontiType';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();

  public eventType = TypeOfPonti.Event;
  public placeType = TypeOfPonti.Place;




  constructor() {

  }

  ngOnInit(): void {

  }

}
