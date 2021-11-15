import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      // if ([401, 403].includes(err.status)) {
      //     // auto logout if 401 or 403 response returned from api
      //     this.accountService.logout();
      // }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(error);
  }))
  }
}
