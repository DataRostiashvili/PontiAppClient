import { Component, Input, OnInit } from '@angular/core';
import { UserAuthenticationService } from '@core/services/user-authentication.service';

@Component({
  selector: 'app-side-nav-profile',
  templateUrl: './side-nav-profile.component.html',
  styleUrls: ['./side-nav-profile.component.scss']
})
export class SideNavProfileComponent implements OnInit {

    public avatarSource: string = '';
    public fullName: string = '';
    
  constructor(private userAuthentication: UserAuthenticationService) { 
    
  }

  ngOnInit(): void {
    
    this.avatarSource = 'assets/Images/defaultAvatar.jpg';
    this.fullName = "დავით როსტიაშვილი";
  }

  async login(): Promise<void> {
    await this.userAuthentication.signInWithFB();
  }
}
