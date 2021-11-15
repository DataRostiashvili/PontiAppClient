import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { UserAuthenticationService } from '@core/services/user-authentication.service';
import { JwtService } from '@core/services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userAuthentication: UserAuthenticationService,
    private jwtService: JwtService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isLoggedIn = this.userAuthentication.IsUserAuthenticated;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtService.getToken()}` }
      });
    }

    return next.handle(request);
  }
}
