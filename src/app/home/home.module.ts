import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from 'app/home/components/navigation/navigation.component';
import { SideNavProfileComponent } from 'app/home/components/side-nav-profile/side-nav-profile.component';
import { TabGroupComponent } from 'app/home/components/tab-group/tab-group.component';

import { DisplayInfoIfHoveredDirective } from 'app/home/directives/display-info-if-hovered.directive';
import { ResponsiveColsDirective } from 'app/home/directives/responsive-cols.directive';
import { HomePageComponent } from './components/home-page/home-page.component';

import { MaterialModule } from '@modules/material/material.module';

import { TrimTextPipe } from '../core/pipes/trim-text.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CategoryCatalogComponent } from './components/category-catalog/category-catalog.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { TimeDropdownComponent } from './components/time-dropdown/time-dropdown.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from 'environments/environment';
import { UserSideNavSectionComponent } from './components/user-side-nav-section/user-side-nav-section.component';
import { UserModule } from 'app/user/user.module';
import {RouterModule} from "@angular/router";
import { HostViewComponent } from './components/host-view/host-view.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { GridTileComponent } from './components/grid-tile/grid-tile.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { EventPlaceViewComponent } from './components/event-place-view/event-place-view.component';



@NgModule({
  declarations: [
    NavigationComponent,
    SideNavProfileComponent,
    TabGroupComponent,
    DisplayInfoIfHoveredDirective,
    ResponsiveColsDirective,
    HomePageComponent,
    TrimTextPipe,
    SearchBarComponent,
    CategoryCatalogComponent,
    SearchFieldComponent,
    TimeDropdownComponent,
    UserSideNavSectionComponent,
    HostViewComponent,
    StarRatingComponent,
    GridTileComponent,
    GridListComponent,
    EventPlaceViewComponent,
  ],
    imports: [
        CommonModule,
        UserModule,
        MaterialModule,
        RouterModule
    ],
  exports: [
    NavigationComponent,
    SideNavProfileComponent,
    TabGroupComponent,
    DisplayInfoIfHoveredDirective,
    ResponsiveColsDirective,
    MaterialModule,
    HttpClientModule,
    SearchBarComponent,
    UserSideNavSectionComponent
  ],
  providers: [
  ]
})
export class HomeModule { }
