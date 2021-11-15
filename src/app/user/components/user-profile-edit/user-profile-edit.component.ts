import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProfileEditViewModel} from '@core/models/ViewModels/profile-edit-view-model';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  public profileEditViewModel: ProfileEditViewModel;

  constructor() {
    this.profileEditViewModel = {
      profilePictureUri: 'assets/Images/defaultAvatar.jpg',
      fullName: 'დავით როსტიაშვილი',
      address: 'აღმაშენებლის 168',
      email: 'd4v1t.r0st@gmail.com',
      phone: '555966179'
    }
  }

  ngOnInit(): void {
  }

  save() : void {
  }
}
