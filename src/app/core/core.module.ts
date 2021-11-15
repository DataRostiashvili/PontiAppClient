import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from 'app/home/home.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule
  ],
  exports: [
    HomeModule
  ]
})
export class CoreModule { }
