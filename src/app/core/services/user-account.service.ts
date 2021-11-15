import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {PlaceDTO} from "@core/models/DTO/PlaceDTO";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient) {
  }



  public getUsersOwnedPlaces(): PlaceDTO[] {
    return [{
      name: 'დინამო არენა'
    },
      {
        name: 'სახაჭაპურე N1'
      }]
  }

  public uploadProfilePicture(formData: FormData) {
    this.http.post('https://localhost:5001/api/Img?guid=asd', formData)
      .subscribe(res => {
        console.log('res')
        console.log(res);
      })
  }


}
