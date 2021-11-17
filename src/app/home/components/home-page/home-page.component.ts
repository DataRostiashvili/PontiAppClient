import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-home-page',
  template: `
    <app-search-bar></app-search-bar>
    <app-tab-group></app-tab-group>
  `,
  styles: [
    `

    `
  ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
