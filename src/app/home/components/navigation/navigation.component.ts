import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { UserAuthenticationService } from '@core/services/user-authentication.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  {
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
