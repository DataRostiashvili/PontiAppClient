import {Time} from "@angular/common";


export class SearchFilter
{

  constructor(public searchKeyword: string = '',
              public time: TimeOption = TimeOption.upcoming,
              public categories: Category[] = [],
              public hostId: string = '') {
  }
}

export enum TimeOption {
  today,
  tommorow,
  week,
  upcoming
}

export class Category {
  constructor(public category: string) {
  }
}
