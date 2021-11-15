import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ViewEncapsulation, HostListener } from '@angular/core';
import { CategoryViewModel } from '@core/models/ViewModels/category-view-model.model';
@Component({
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrls: ['./category-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryCatalogComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('chipList') chipList!: ElementRef;
  @ViewChild('searchBar') searchBar!: ElementRef;

  @ViewChild('leftPaddle') leftPaddle!: ElementRef;
  @ViewChild('rightPaddle') rightPaddle!: ElementRef;

 

  rightDisabled: boolean = false;
  leftDisabled: boolean = true;

  public categoryNames: CategoryViewModel[] = [
    {name: 'საცეკვაო', selected: true},
    {name: 'ღამის კლუბი', selected: false}
  ];



  public blownCategoryNames = [...this.categoryNames,...this.categoryNames,...this.categoryNames,...this.categoryNames,...this.categoryNames];

  constructor(){

  }

  public selectCategory($event: any){
    console.log($event);
  }
  changeSelected($event:any , category: CategoryViewModel): void {
    category.selected = $event.selected;
  }
  ngOnInit() {
   
  }
  ngAfterViewInit(){
    //console.log(this.chipList)
  }

  ngAfterViewChecked(){
   // console.log(this.chipList)

  }

  public scroll(deltaY: number) : void {
    console.log(this.searchBar);
    this.searchBar.nativeElement.scrollLeft += deltaY; // deltaY ;
  }
  
  
  public onScroll($event: any) : void {
    console.log('something')
   // this.scrollRight();
    
     console.log($event)
     setTimeout(() => this.scroll($event), 1 );

    $event.preventDefault();
  }

}




