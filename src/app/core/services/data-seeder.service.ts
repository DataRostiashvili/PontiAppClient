import { Injectable } from '@angular/core';

import { EventViewModel } from '@core/models/ViewModels/event-listing-item-view-model.model';
import { PlaceViewModel } from '@core/models/ViewModels/place-listing-item-view-model.model';
import { AddressViewModel } from '@core/models/ViewModels/address-view-model.model';
import { HostViewModel } from '@core/models/ViewModels/host-view-model.model';


@Injectable({
  providedIn: 'root'
})
export class DataSeederService {
  private hosts: HostViewModel[] = [
    {name: "ბასიანი", profilePicture: {uri: 'https://icons.iconarchive.com/icons/google/noto-emoji-activities/1024/52707-party-popper-icon.png'}},
    {name: "ბურგერ კინგი", profilePicture: {uri: 'https://cdn-icons-png.flaticon.com/512/198/198416.png'}},
    {name: "Holiday Inn", profilePicture: {uri: 'https://img.favpng.com/25/23/8/holiday-inn-moscow-png-favpng-LybQ9mA6tUc9LC4c4Qttp73pS.jpg'}},
    {name: "თუმანიშვილის თეატრი", profilePicture: {uri: 'https://lh3.googleusercontent.com/proxy/Lf0ZA6693XF9Dm5_6HBmc0ZjBEcWZtyWrvKsR7hfEEPA2ahCOnbHQ1h-rCDEBWtdKgD2OPdQirLx2Kgv5PYE31iSnHZSB5Oyu15ZjLw9XQwQscPHZvXjsHLYLiWEC_gL1AbrQNnWkwJHqynr-xgnuF8'}},
    {name: "კოჭლი ზურა", profilePicture: {uri: 'https://i.ytimg.com/vi/7Fz1Wpb3RYs/hqdefault.jpg'}},

  ];

  public eventListingItems: EventViewModel[] = [
    { name: "ბასიანის გულავი", startTime: new Date(Date.now()), isFavourite: false, host: this.hosts[0], address: { address: 'სადმე შორს'}  },
    { name: "გადაირტყი 20იანი ბურგერი", startTime: new Date(Date.now()), isFavourite: false, host: this.hosts[1], address: { address: 'სადმე შორს'}  },
    { name: "წაუსნიკერსე", startTime: new Date(Date.now()), isFavourite: false, host: this.hosts[2], address: { address: 'სადმე შორს'}  },
    { name: "წითელი ალუბლები", startTime: new Date(Date.now()), isFavourite: false, host: this.hosts[3], address: { address: 'სადმე შორს'}  },
    { name: "მოსაწევს ვჩითავ", startTime: new Date(Date.now()), isFavourite: false, host: this.hosts[4], address: { address: 'სადმე შორს'}  },
  ];

  private placeListingItems: PlaceViewModel[] = [
    { name: "ბასიანის გულავი", startTime: new Date(Date.now()), endTime: new Date(Date.now()), isFavourite: false, host: this.hosts[0], address: { address: 'სადმე შორს'}  },
    { name: "გადაირტყი 20იანი ბურგერი", startTime: new Date(Date.now()), endTime: new Date(Date.now()), isFavourite: false, host: this.hosts[1], address: { address: 'სადმე შორს'}  },
    { name: "წაუსნიკერსე", startTime: new Date(Date.now()), endTime: new Date(Date.now()), isFavourite: false, host: this.hosts[2], address: { address: 'სადმე შორს'}  },
    { name: "წითელი ალუბლები", startTime: new Date(Date.now()), endTime: new Date(Date.now()), isFavourite: false, host: this.hosts[3], address: { address: 'სადმე შორს'}  },
    { name: "მოსაწევს ვჩითავ", startTime: new Date(Date.now()), endTime: new Date(Date.now()), isFavourite: false, host: this.hosts[4], address: { address: 'სადმე შორს'}  },
  ];

  public get EventListingItems (): EventViewModel[] {
    return this.eventListingItems;
  }

  public get PlaceListingItems() : PlaceViewModel[] {
    return this.placeListingItems;
  }

  constructor() { }


}
