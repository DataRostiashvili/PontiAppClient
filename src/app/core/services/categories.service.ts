import { Injectable } from '@angular/core';
import {Observable, from} from "rxjs";
import {CategoryDTO} from "@core/models/DTO/CategoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  public getAllCategory() : CategoryDTO[]{
    //  fetch()


    let res: CategoryDTO[] = [{
      displayName: 'გასართობი'
    },{
      displayName: 'უმუღამო'
    }, {
      displayName: 'საცეკვაო'
    }];

    return res;
  }
}
