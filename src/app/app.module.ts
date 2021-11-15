import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule  } from '@core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { JwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, 
    JwtHelperService
    // {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService]},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
