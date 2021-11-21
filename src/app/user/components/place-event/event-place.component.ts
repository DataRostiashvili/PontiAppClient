import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {UserAccountService} from "@core/services/user-account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {CategoryDTO} from "@core/models/DTO/CategoryDTO";
import {CategoriesService} from "@core/services/categories.service";

/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-create-event',
   templateUrl: './event-place.component.html',
   styleUrls: ['./event-place.component.scss']
})
export class EventPlaceComponent {


  formGroup = new FormGroup({

    name: new FormControl('', [
      Validators.required
    ]),
    startDate: new FormControl('', [
      Validators.required
    ]),
    endDate: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl(''),
    description: new FormControl(''),

    address: new FormControl(),


    webSite: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),

  })

  matcher = new MyErrorStateMatcher();

  isEvent: boolean;

  isEdit: boolean;

  idToEdit: string;

  disableRelatedPlces = true;


  cat_categoryControl = new FormControl();
  cat_selectedCategories: string[] = ['დასალევი'];

  cat_allCategory: string[] = [];
  cat_filteredCategory: string[] = []; //= new Observable<string[]>();
  cat_separatorKeysCodes: number[] = [ENTER, COMMA];


  separatorKeysCodes: number[] = [ENTER, COMMA];
  //fruitCtrl = new FormControl();
  filteredFruits: string[] = [];
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;


  constructor(private userService: UserAccountService,
              private categoryService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    if (!this.route.snapshot.paramMap.get('placeEvent')
      || (this.route.snapshot.paramMap.get('placeEvent') !== 'event'
        && this.route.snapshot.paramMap.get('placeEvent') !== 'place')) {
      //default to event
      this.isEvent = true;
    }


    this.isEvent = this.route.snapshot.paramMap.get('placeEvent') === 'event';


    if (!this.route.snapshot.paramMap.get('createEdit')
      || (this.route.snapshot.paramMap.get('createEdit') !== 'create'
        && this.route.snapshot.paramMap.get('createEdit') !== 'edit')) {
      //default to event
      this.isEdit = true;
    }

    this.isEdit = this.route.snapshot.paramMap.get('createEdit') === 'edit';

    this.idToEdit = this.route.snapshot.paramMap.get('idToEdit') ?? '';

    console.log('isevent' + this.isEvent);
    console.log('isedit' + this.isEdit);
    console.log('id' + this.idToEdit)


    if (!(/^\d+$/.test(this.idToEdit)) && this.isEdit) {
      router.navigate(['/']);
    }

    this.cat_allCategory = categoryService.getAllCategory().map(cat => cat['displayName']? cat['displayName'] : '' );


    if (this.isEvent) {
      this.formGroup.addControl('relatedPlaces', new FormControl());

      let ownedPlaces = userService.getUsersOwnedPlaces()
      this.disableRelatedPlces = ownedPlaces.length < 1;
      this.formGroup.get('relatedPlaces')?.setValue(ownedPlaces);
    } else {
      this.formGroup.addControl('weekSchedule', new FormGroup({
        monday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
        tuesday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
        wednesday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
        thursday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
        friday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
        saturday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')

        }),
        sunday: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          notWorking: new FormControl('')
        }),
      }));
    }

    if (this.isEdit) {
    }

    this.formGroup.get('category')?.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()))
      .subscribe(res => {
        this.filteredFruits = res;
      })


  }

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.formGroup.get('category')?.setValue(null);
  }

  removeCategory(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    if(this.fruitInput)
      this.fruitInput.nativeElement.value = '';
    this.formGroup.get('category')?.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  submitForm(event: Event) {


    setTimeout(() => {
      Object.keys(this.formGroup.controls).forEach(field => { // {1}
        const control = this.formGroup.get(field);            // {2}
        control?.markAsTouched({onlySelf: true});       // {3}
      });
    }, 1);


    event.preventDefault();

    if (!this.formGroup.valid) {
      return;
    }

  }




}
