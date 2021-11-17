import {WeekScheduleResponse} from "@core/models/ResponseModels/week-schedule-response";

export class HostingPlaceResponse {
  constructor(public name: string,
              public address: string,
              public todayWeekSchedule: WeekScheduleResponse
              ) {
  }
}
