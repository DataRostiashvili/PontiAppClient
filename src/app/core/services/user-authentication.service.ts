import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountDTO } from '@core/models/DTO/AccountDTO';
import { AccountResponseModel } from '@core/models/ResponseModels/account-response-model.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService implements OnInit {


  public IsUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);




  constructor(
    private jwtService: JwtService,
    private httpClient: HttpClient,
    private ngZone: NgZone) {
      console.log('singleton service constructor');


  }

  ngOnInit() {

    this.initializeFbAuthentication();
  }
  initializeFbAuthentication() {

    let serviceInstance = this;

    if (this.jwtService.IsRecordExist) {
      console.log('record');

      let expDate = new Date(this.jwtService.decodeToken().exp ?? 0 * 1000);

      if (expDate.getTime() > new Date(Date.now()).getTime()) {
        this.IsUserAuthenticated.next(true);

        return;

      } else {

        FB.getLoginStatus(function (response) {
          if (response.status === 'connected') {

            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;

            serviceInstance
              .authenticate(response.authResponse.userID, response.authResponse.accessToken);


          }
        });
      }
    }




  }

  storeUserAndMarkAsSignedIn(account: AccountResponseModel) {

    this.ngZone.run(() => this.IsUserAuthenticated.next(true));

    this.jwtService.storeToken(account.jwtToken);
  }

  signInWithFB() {

    let serviceInstance = this;



    FB.login(function (response) {
      if (response.status === 'connected') {
        console.log('sign in with fb');

        serviceInstance.authenticate(response.authResponse.userID, response.authResponse.accessToken);
      } else {
        console.error(`couldn't login`);

      }
    });





  }

  logout() {
    let serviceInstance = this;

    FB.logout(function (response) {
      serviceInstance.jwtService.decodeToken();

      serviceInstance.ngZone
        .run(() => serviceInstance.IsUserAuthenticated.next(false));

    });
  }

  authenticate(userId: string, fbAccessToken: string): boolean {
    let api = 'https://localhost:5001/login';
    this.httpClient.post<AccountResponseModel>(api, {
      userId: userId,
      facebookAccessToken: fbAccessToken
    }).subscribe(res => {
      this.storeUserAndMarkAsSignedIn(res);
      console.log('server response everything good');

    });

    return true;
  }

}
