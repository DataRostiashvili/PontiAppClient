import { AddressViewModel } from "./address-view-model.model";
import { HostViewModel } from "./host-view-model.model";


export class EventViewModel
{
    name?: string;
    startTime?: Date;
    host?: HostViewModel;
    address?: AddressViewModel;
    isFavourite?: boolean;
}
