import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '@core/services/user-authentication.service';

@Component({
  selector: 'app-user-side-nav-section',
  templateUrl: './user-side-nav-section.component.html',
  styleUrls: ['./user-side-nav-section.component.scss']
})
export class UserSideNavSectionComponent implements OnInit {

  public isUserSignedIn: boolean = false;
  constructor(
    private userAuthentication: UserAuthenticationService
  ) {
    userAuthentication.IsUserAuthenticated
      .subscribe(isSignedIn => this.isUserSignedIn = isSignedIn);


  }

  async login(): Promise<void> {
    await this.userAuthentication.signInWithFB();
    
  }

  logout(){
    this.userAuthentication.logout();
  }

  ngOnInit(): void {
  }

}
