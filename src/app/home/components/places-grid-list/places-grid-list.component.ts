import { Component, Input, OnInit } from '@angular/core';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import {SearchFilter} from "@core/models/util/search-filter";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {pipe} from "rxjs";
import {HostingPlaceResponse} from "@core/models/ResponseModels/hosting-place-response";


@Component({
  selector: 'app-places-grid-list',
  template: `
    <div class="tile_container">
      <div class="tile">

      </div>
    </div>
  `,
  styles: [
    `
      .mat_grid_list {
        width: auto;
      }

      .mat_grid_tile {
        // margin: 10px 0px;




      }
    `
  ]
})
export class PlacesGridListComponent implements OnInit {

  @Input() public filter: SearchFilter = new SearchFilter();
  private Items: PlaceViewModel[] = [];

  constructor(private http: HttpClient ) {
    if(this.filter.hostId){
      //
      let instance = this;
      http.get<HostingPlaceResponse[]>(`${environment.apiUrl}/Place/GetHostingPlaces?hostFbId=${this.filter.hostId}`)
        .subscribe(hostingPlaces => {
          console.log(hostingPlaces);
        });

    }
  }

  ngOnInit(): void {
  }

}
