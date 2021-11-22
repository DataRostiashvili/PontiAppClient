import { Component, Input, OnInit } from '@angular/core';
import { PlaceOrEventViewModel, TypeOfPonti } from '@core/models/enums/PontiType';


@Component({
  selector: 'app-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {

  @Input()
  public type: TypeOfPonti = TypeOfPonti.Event;

  @Input()
  public item: PlaceOrEventViewModel = {};

  public eventType = TypeOfPonti.Event;

  constructor() { }

  ngOnInit(): void {
    console.log(this.type === TypeOfPonti.Place);

  }

}
