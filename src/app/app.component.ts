import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {UserAuthenticationService} from "@core/services/user-authentication.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public isUserLoggedIn = false;

  constructor(private observer: BreakpointObserver,
              private userAuthentication: UserAuthenticationService) {
    userAuthentication.IsUserAuthenticated.subscribe(value => {
      this.isUserLoggedIn = value;
    });

  }

  async login(): Promise<void> {
    await this.userAuthentication.signInWithFB();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}

