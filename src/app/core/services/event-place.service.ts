import { Injectable } from '@angular/core';
import {PlaceViewModel} from "@core/models/ViewModels/place-listing-item-view-model.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventPlaceService {

  constructor(private http: HttpClient) {


  }

  public getALlPlace() : Observable<PlaceViewModel> {

  }
}
