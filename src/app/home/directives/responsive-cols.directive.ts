import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';


export interface IResponsiveColumnsMap
{
  //[key: string]: number;
  xs: number;
  sm: number;
  md: number;
  lg:number;
  xl: number;
}
@Directive({
  selector: '[appResponsiveCols]'
})
export class ResponsiveColsDirective implements OnInit, OnDestroy{

  private static readonly DEFAULT_COLUMNS_MAP: IResponsiveColumnsMap = {xs: 2, sm: 3, md: 3, lg: 4, xl: 6};
  @Input() private responsiveColumns: IResponsiveColumnsMap;

  private readonly watchers: Subscription[] = [];

  private IsScreenSizeBelowThreshold: boolean = true;
  private screenSizeThreshold: number = 430;


  public constructor(
    private grid: MatGridList,
    private mediaObserver: MediaObserver,
    private breakPointObserver: BreakpointObserver
  ) {
    this.responsiveColumns ??= ResponsiveColsDirective.DEFAULT_COLUMNS_MAP;
   }

   public ngOnInit(): void {
    this.calculateColsCount();

    const mediaWatcher = this.mediaObserver.asObservable()
      .pipe(
        map((changes: MediaChange[]) => {
          const matchingAliases = changes.map(change => this.mapAlias(change.mqAlias))
            .sort((a,b) => this.responsiveColumns[b as keyof IResponsiveColumnsMap] - this.responsiveColumns[a as keyof IResponsiveColumnsMap])
            .filter(alias => Object.keys(this.responsiveColumns).includes(alias))
            .filter(alias => this.mediaObserver.isActive(alias));


          const matchedAlias = matchingAliases.length > 0
            ? matchingAliases[0]
            : 'xs';

          return this.responsiveColumns[matchedAlias as keyof IResponsiveColumnsMap];
        })
      ).subscribe(cols => this.setGridColsCount(cols));


      //detect screen entering below threshold level
     const breakPointWatcher = this.breakPointObserver.observe([`(max-width: ${this.screenSizeThreshold}px)`])
        .pipe(delay(1))
        .subscribe(res=> {
          if(res.matches)
          {
            this.IsScreenSizeBelowThreshold = true;
            this.refreshGridColumns();
            console.log('threshold');
          }
          else
          {
            this.IsScreenSizeBelowThreshold = false;
            this.refreshGridColumns();
            this.calculateColsCount();
            console.log('not threshold')
          }
        });


    this.watchers.push(mediaWatcher);
    this.watchers.push(breakPointWatcher);
   }


   ngOnDestroy(): void {
     this.watchers
      .forEach(watcher => watcher.unsubscribe());
   }

   private calculateColsCount(): void {
     const matchingAliases = Object.keys(this.responsiveColumns)
                                    .sort((a,b)=> this.responsiveColumns[b as keyof IResponsiveColumnsMap] - this.responsiveColumns[a as keyof IResponsiveColumnsMap] )
                                    .filter(alias => this.mediaObserver.isActive(alias));

    if(matchingAliases.length > 0)
    {
      const firstMatchingAlias = matchingAliases[0];
      this.setGridColsCount(this.responsiveColumns[firstMatchingAlias as keyof IResponsiveColumnsMap]);
    }
    else {
      this.setGridColsCount(this.responsiveColumns.xs);
    }

   }

   private mapAlias(mqAlias: string): string {

    if(!mqAlias.includes('-'))
      return mqAlias;


    const parts = mqAlias.split('-');
    const ltOrGt = parts[0];
    const alias = parts[1];

    const keys = Object.keys(this.responsiveColumns);
    const index = keys.indexOf(alias);

    return ltOrGt === 'lt'
      ? keys[index - 1]
      : keys[index + 1];
  }

   private setGridColsCount(numberOfCols: number): void{
     if(this.IsScreenSizeBelowThreshold){
       this.grid.cols = 1;
       return;
     }

    this.grid.cols = numberOfCols;
   }

   private refreshGridColumns() : void {
     this.setGridColsCount(this.grid.cols);
   }
}
