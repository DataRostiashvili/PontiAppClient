import {WeekScheduleResponse} from "@core/models/ResponseModels/week-schedule-response";
import {HostBriefResponse} from "@core/models/ResponseModels/host-brief-response";

export class PlaceResponse {
  // constructor(public name: string,
  //             public address: string,
  //             public todayWeekSchedule: WeekScheduleResponse,
  //             public host: HostBriefResponse
  //             ) {
  // }

  name?: string;
  address?: string;
  todayWeekSchedule?: WeekScheduleResponse;
  host?: HostBriefResponse;
}
