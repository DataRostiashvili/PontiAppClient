import { Injectable } from '@angular/core';
import { AccountDTO } from '@core/models/DTO/AccountDTO';
import { JwtPayloadDTO } from '@core/models/DTO/JwtPayloadDTO';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly storakgeKey = 'jwt';

  constructor(private jwtHelperService: JwtHelperService) {

  }

  public storeToken(jwtToken: string | undefined) {
    if(jwtToken)
      localStorage.setItem(this.storakgeKey, jwtToken);
  }

  public getToken() {
    return  localStorage.getItem(this.storakgeKey);
  }
  public deleteToken() {
    localStorage.removeItem(this.storakgeKey);
  }

  public decodeToken(): JwtPayloadDTO {
    let token = this.getToken();
    if(!token)
      return {};

    return this.jwtHelperService.decodeToken(token);
  }

  public get IsRecordExist() {
   // console.log(localStorage.getItem(this.storakgeKey));

    return localStorage.getItem(this.storakgeKey) ? true : false;
  }
}

