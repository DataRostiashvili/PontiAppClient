import { Directive } from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';

import { HostListener } from '@angular/core';
@Directive({
  selector: '[appDisplayInfoIfHovered]'
})
export class DisplayInfoIfHoveredDirective {
  public IsHovered: boolean = false;
  
  constructor(
    private gridTile: MatGridTile
  ) { }

  @HostListener('mouseover') onMouseHover(){
    console.log('hovered');
  }

  @HostListener('mouseout') onMouseOut(){
    console.log('mouse  out');
  }


}
