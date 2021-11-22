import { HttpClient } from '@angular/common/http';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { PlaceOrEventViewModel, PlaceOrEventViewModelArr, TypeOfPonti } from '@core/models/enums/PontiType';
import { EventResponse } from '@core/models/ResponseModels/event-response';
import { PlaceResponse } from '@core/models/ResponseModels/place-response';
import { SearchFilter } from '@core/models/util/search-filter';
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { EventPlaceService } from '@core/services/event-place.service';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {


  @Input()
  public type: TypeOfPonti = TypeOfPonti.Event;

  @Input() public filter: SearchFilter = new SearchFilter();

  public Items: PlaceOrEventViewModelArr = [];


  constructor(private http: HttpClient,
    private eventPlaceService: EventPlaceService,
    private zone: NgZone) {

  }

  ngOnInit(): void {

    if (this.type === TypeOfPonti.Event) {
      if (this.isFilterForHomePage()) {
        this.eventPlaceService.getAllEvent().subscribe(briefEvents => {
          this.zone.run(() => {
            this.Items = this.mapApiResponseToViewModels(briefEvents);
          })
        })
      } else if (this.filter.hostId) {
        this.eventPlaceService.getEventsByHost(this.filter.hostId).subscribe(briefEvents => {
          this.zone.run(() => {
            this.Items = this.mapApiResponseToViewModels(briefEvents);
          })
        })
      }
    }
    else {
      if (this.isFilterForHomePage()) {
        this.eventPlaceService.getALlPlace().subscribe(briefPlaces => {
          this.zone.run(() => {
            this.Items = this.mapApiResponseToViewModels(briefPlaces)
          })
        })
      }
      else if (this.filter.hostId) {
        this.eventPlaceService.getPlacesByHost(this.filter.hostId).subscribe(briefPlaces => {
          this.zone.run(() => {
            this.Items = this.mapApiResponseToViewModels(briefPlaces)
          })
        })
      }
    }



  }

  isFilterForHomePage() {
    return !this.filter.hostId
      || !this.filter.categories
      || !this.filter.time
      || !this.filter.searchKeyword;
  }

  mapApiResponseToViewModels(response: EventResponse[] | PlaceResponse[], pontiType: TypeOfPonti = this.type): EventViewModel[] | PlaceViewModel[] {

    if (pontiType === TypeOfPonti.Event) {

      return (response as EventResponse[]).map(e => {
        return {
          name: e.name,
          address: e.address,
          startTime: e.startTime,
          host: {
            name: `${e.host?.name} ${e.host?.surname}`,
            profilePictureUri: e.host?.profilePictureUri
          }
        } as EventViewModel
      });
    }
    else {
      return (response as PlaceResponse[]).map(place => {
        return {
          name: place.name,
          address: place.address,
          host: {
            name: `${place.host?.name} ${place.host?.surname}`,
            profilePictureUri: place.host?.profilePictureUri
          },
          startTime: place.todayWeekSchedule?.start,
          endTime: place.todayWeekSchedule?.end
        } as PlaceViewModel
      })
    }

  }
}
