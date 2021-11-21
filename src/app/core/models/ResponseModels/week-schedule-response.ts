import {WeekDay} from "@angular/common";

export class WeekScheduleResponse {
  constructor(public start: Date,
              public end: Date,
              public day: WeekDay,
              public isWorking: boolean,
              public placeEntityId: number) {

  }

}
