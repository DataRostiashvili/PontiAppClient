import {HostBriefResponse} from "@core/models/ResponseModels/host-brief-response";

export class EventResponse
{
  name?: string;
  address?: string;
  startTime?: Date;
  host?: HostBriefResponse;
}
