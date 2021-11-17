import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from 'app/home/components/home-page/home-page.component';
// import {UserProfileEditComponent} from '@user/components/user-profile-edit/user-profile-edit.component';
import {UserProfileEditComponent} from "./user/components/user-profile-edit/user-profile-edit.component";
// import {PlaceEventComponent} from "@user/components/place-event/place-event.component";
import {HostViewComponent} from "./home/components/host-view/host-view.component";
import {PlaceEventComponent} from "./user/components/place-event/place-event.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},

  {path: "home", redirectTo: ''},
  {
    path: 'host/:hostId',
    component: HostViewComponent
  },
  {path: 'account/editProfile', component: UserProfileEditComponent},
  {
    path: 'account/PlaceEvent/:createEdit/:placeEvent/:idToEdit',
    component: PlaceEventComponent
  },
  {
    path: 'account/PlaceEvent/:createEdit/:placeEvent',
    component: PlaceEventComponent
  },
  {
    path: 'account/PlaceEvent/:createEdit',
    component: PlaceEventComponent
  },
  {
    path: 'account/PlaceEvent',
    component: PlaceEventComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{

}
