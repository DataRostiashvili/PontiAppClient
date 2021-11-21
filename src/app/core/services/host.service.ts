import { HttpClient } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { HostDTO } from '@core/models/DTO/HostDTO';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {


  constructor(private http: HttpClient) {
    console.log('host view service');


  }

  public getHost(hostId: string): Observable<any> {
    let image = 'https://image.freepik.com/free-photo/closeup-shot-lion-s-face-isolated-dark_181624-35975.jpg';

    // let res  = new HostDTO('data ', 'rostiashvili', image, 'd4v1t.r0st@gmail.com', '555966179', 'აღმაშენებლის 168', 4, 200, true, '1c8d9db4-d982-4cbb-a05e-59f89e09a6be' );

    //return of(res);
    //https://localhost:5001/api/User/GetUser?FbId=123
    let url = `${environment.apiUrl}/User/GetUser?FbId=${hostId}`;
    let  res = this.http.get<HostDTO>(`${environment.apiUrl}/User/GetUser?FbId=${hostId}`);

    return res;

  }

  public giveReview(hostId: string, review: number){
    return;
    //this.http.post(`${environment.apiUrl}/`)
  }

}
