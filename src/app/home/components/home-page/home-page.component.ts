import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from '../navigation/navigation.component';
import {SearchFilter} from "@core/models/util/search-filter";

@Component({
  selector: 'app-home-page',
  template: `
    <app-search-bar></app-search-bar>
    <app-tab-group [filter]="homePageFilter"></app-tab-group>
  `,
  styles: [
    `

    `
  ]
})
export class HomePageComponent implements OnInit {
  public homePageFilter: SearchFilter = new SearchFilter();
  constructor() { }

  ngOnInit(): void {
  }

}
