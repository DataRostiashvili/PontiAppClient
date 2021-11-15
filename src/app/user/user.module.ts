import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { ProfilePictureUploadComponent } from './components/profile-picture-upload/profile-picture-upload.component';
import { MaterialModule } from '@modules/material/material.module';
import { PlaceEventComponent } from './components/place-event/place-event.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserProfileEditComponent,
    ProfilePictureUploadComponent,
    PlaceEventComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
