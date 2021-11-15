import { AddressViewModel } from "./address-view-model.model";
import { HostViewModel } from "./host-view-model.model";


export class PlaceViewModel
{
    name?: string;
    startTime?: Date;
    endTime?: Date;
    host?: HostViewModel;
    address?: AddressViewModel;
    isFavourite?: boolean;
}
