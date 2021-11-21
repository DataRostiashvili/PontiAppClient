import { Component, Input, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';

@Component({
  selector: 'app-event-grid-tile',
  template: `
    <div class="tile_container">

      <div class="background_image">
        <div class="tile_item title">
          {{eventListingItem?.name}}
        </div>
        <div class="additional_info">


          <div class="tile_item date">
            <mat-icon>date_range</mat-icon>
            {{eventListingItem?.startTime  | date: 'MMM dd hh:mm' }}
          </div>
          <div class="tile_item host">
            <picture>
              <img src="{{eventListingItem?.host?.profilePictureUri}}" alt="" />
            </picture>
            {{eventListingItem?.host?.name | trimText:13}}
          </div>
          <div class="tile_item address">
            <mat-icon>location_on</mat-icon>
            <span>{{eventListingItem?.address | trimText:20}}</span>
          </div>

        </div>

      </div>
      <div class="tile_item favourite">
        <img *ngIf="eventListingItem?.isFavourite" src='assets/icons/red-heart-icon.png' />
        <img *ngIf="!eventListingItem?.isFavourite" src='assets/icons/white-heart-icon.png' />
      </div>

    </div>

  `,
  styles: [`
    .mat-icon{
      vertical-align: middle;
    }
    div.tile_container{
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      &:hover .tile_item {
        @keyframes fadeIn {

          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }

        }

        animation: 1s fadeIn;
        animation-fill-mode: forwards;
      }


      .background_image {

        width: 100%;
        height: 100%;

        .tile_item {
          display: none;

        }

        &:hover .tile_item {

          display: flex;
          z-index: 9999999;
          width: 100%;
          height: 100%;
        }




        &:before{
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;

          top: 0;
          left: 0;
          background-image: url('http://maximumwallhd.com/wp-content/uploads/2015/06/fonds-ecran-plage-palmier-12-660x330.jpg');
          -webkit-filter: grayscale(0) blur(0);
          filter: grayscale(0) blur(0);
          transition: .4s ease-in-out;
        }

        &:hover:before {
          -webkit-filter: grayscale(100%) blur(2px);
          filter: grayscale(100%) blur(2px);
          transition: .4s ease-in-out;
        }
      }




      .additional_info {
        position: absolute;
        bottom: 0;
      }

      .tile_item {
        margin:10px;

      }

      .title{
        display: flex;
        margin: 0px 5px;
        text-align: center;
        justify-content: center;
        font-weight: bolder;
        font-size: 62%;
        color: #fff42b;

        position: absolute;
        top: 0px;
        width: 100%;
      }
      .date {
        display: flex;
        justify-content: space-between;
        font-size: 47%;
        color: white;
        text-align: left;
        justify-content: left;

        mat-icon {
          margin-right: 5px;
        }

      }

      .host {
        font-size: 47%;
        color: #1f802f;
        display: flex;
        justify-content: space-between;
        text-align: left;
        justify-content: left;

        picture {
          img {
            margin-right: 5px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        }


      }

      .address {
        font-size: 47%;

        color: white;
        font-style: italic;

      }

      .favourite{

        opacity: 0;
        //animation-delay: ;
        //animation-fill-mode: forwards;

        //visibility: hidden;

        display: flex;
        justify-content: space-between;
        text-align: right;
        justify-content: right;
        position: absolute;
        bottom: 0px;
        right: 0px;

        img {
          width: 25px;
          height: 20px;

        }
      }





    }

  `]
})
export class EventGridTileComponent implements OnInit {

  @Input()
    public eventListingItem: EventViewModel = {};

  constructor() { }

  ngOnInit(): void {
    
  }

}
