import { EventViewModel } from "../ViewModels/event-listing-item-view-model.model";
import { PlaceViewModel } from "../ViewModels/place-listing-item-view-model.model";

export enum TypeOfPonti {
  Event,
  Place
}
export type PlaceOrEventViewModel = EventViewModel | PlaceViewModel;
export type PlaceOrEventViewModelArr = EventViewModel[] | PlaceViewModel[];
