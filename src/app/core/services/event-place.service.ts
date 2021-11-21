import { Injectable } from '@angular/core';
import {PlaceViewModel} from "@core/models/ViewModels/place-listing-item-view-model.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventResponse} from "@core/models/ResponseModels/event-response";
import {environment} from "../../../environments/environment";
import {PlaceResponse} from "@core/models/ResponseModels/place-response";

@Injectable({
  providedIn: 'root'
})
export class EventPlaceService {

  constructor(private http: HttpClient) {


  }

  public getALlPlace() : Observable<PlaceResponse[]> {
    return this.http.get<PlaceResponse[]>(`${environment.apiUrl}/Place/GetAllPlace`);
  }

  public getAllEvent() : Observable<EventResponse[]> {
    return this.http.get<EventResponse[]>(`${environment.apiUrl}/Event/GetAllEvent`);
  }

  public getEventsByHost(hostFbId: string): Observable<EventResponse[]> {
    //https://localhost:5001/api/Event/GetHostingEvents?hostFbId=898103971102053
    return this.http.get<EventResponse[]>(`${environment.apiUrl}/Event/GetHostingEvents?hostFbId=${hostFbId}`);

  }
  public getPlacesByHost(hostFbId: string): Observable<PlaceResponse[]> {
    //https://localhost:5001/api/Event/GetHostingEvents?hostFbId=898103971102053
    return this.http.get<PlaceResponse[]>(`${environment.apiUrl}/Place/GetHostingPlaces?hostFbId=${hostFbId}`);

  }

}
