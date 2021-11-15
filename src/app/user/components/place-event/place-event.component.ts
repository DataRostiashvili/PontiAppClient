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
  template: `
    <form>
      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>title</mat-icon>

        <mat-label>დასახელება</mat-label>
        <input type="text" matInput [formControl]="$any(formGroup).get('name')" [errorStateMatcher]="matcher"
               placeholder="მაგ. საცეკვაო საღამო">


        <mat-error *ngIf="$any(formGroup).get('name').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>description</mat-icon>


        <mat-label>აღწერა</mat-label>
        <textarea matInput placeholder="მაგ. როგორი ტიპის გართობა იქნება..."></textarea>
      </mat-form-field>

      <ng-container *ngIf="isEvent">

        <mat-form-field class="field" appearance="fill">
          <mat-label>დაწყების დრო</mat-label>

          <input matInput type="datetime-local" [formControl]="$any(formGroup).get('startDate')"
                 [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


          <mat-error *ngIf="$any(formGroup).get('startDate').hasError('required')">
            ეს ველი <strong>საჭიროა</strong>
          </mat-error>
        </mat-form-field>


        <mat-form-field class="field" appearance="fill">
          <mat-label>დასრულების დრო</mat-label>

          <input matInput type="datetime-local" [formControl]="$any(formGroup).get('endDate')"
                 [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


          <mat-error *ngIf="$any(formGroup).get('endDate').hasError('required')">
            ეს ველი <strong>საჭიროა</strong>
          </mat-error>
        </mat-form-field>

      </ng-container>


      <ng-container *ngIf="!isEvent">
        <div class="schedule_bar">
          <mat-icon matSuffix>schedule</mat-icon>
          <span>განრიგი</span>
        </div>

        <div class="field">
          <div class="week_schedule_container">
            <div class="week_schedule">
              <mat-label>ორშაბათი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>სამშაბათი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>ოთხშაბათი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>ხუთშაბათი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>პარასკევი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>შაბათი</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
            <div class="week_schedule">
              <mat-label>კვირა</mat-label>
              <mat-form-field appearance="fill">
                <mat-label>დაწყების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('start')"
                       [errorStateMatcher]="matcher" placeholder="დაწყების დრო">


                <mat-error
                  *ngIf="$any(formGroup).get('weekSchedule').get('monday').get('start').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>დასრულების დრო</mat-label>

                <input matInput type="datetime-local"
                       [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('end')"
                       [errorStateMatcher]="matcher" placeholder="დასრულების დრო">


                <mat-error *ngIf=" $any(formGroup).get('weekSchedule').get('monday').get('end').hasError('required')">
                  ეს ველი <strong>საჭიროა</strong>
                </mat-error>
              </mat-form-field>

              <mat-checkbox #mondayCheckbox
                            [formControl]="$any(formGroup).get('weekSchedule').get('monday').get('notWorking')">
                არ მუშაობს
              </mat-checkbox>
            </div>
          </div>
        </div>
      </ng-container>

      <mat-form-field class="field" appearance="fill" floatLabel="always">
        <mat-label>ფასი</mat-label>
        <input matInput type="number" placeholder="0">
        <span matPrefix>₾&nbsp;</span>
        <span matSuffix>.00</span>

        <mat-error *ngIf="$any(formGroup).get('endDate').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>place</mat-icon>

        <mat-label>მისამართი</mat-label>
        <input type="text" matInput [formControl]="$any(formGroup).get('address')" [errorStateMatcher]="matcher"
               placeholder="ბარნოვის 3.ა">

        <mat-error *ngIf="$any(formGroup).get('address').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>


      <ng-container *ngIf="isEvent">
        <div class="contact_bar">
          <mat-icon matSuffix>edit_location</mat-icon>
          <span>დაამატე ადგილები</span>
        </div>


        <mat-form-field class="field" appearance="fill">
          <mat-label>ადგილები</mat-label>
          <mat-select [disabled]="disableRelatedPlces" disableRipple>
            <mat-option *ngFor="let v of  $any(formGroup).get('relatedPlaces').value" value="v">
              {{v['name']}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </ng-container>

      <!--              categories-->
      <!--      <ng-container>-->
      <!--        <mat-form-field class="field" appearance="fill">-->
      <!--          <mat-label>აირჩიე კატეგორიები</mat-label>-->
      <!--          <mat-chip-list #chipList aria-label="Fruit selection">-->
      <!--            <mat-chip-->
      <!--                  *ngFor="let category of cat_filteredCategory"-->
      <!--              [selectable]="true"-->
      <!--              [removable]="true"-->
      <!--              (removed)="removeCategory(category)">-->
      <!--              {{category}}-->
      <!--              <button matChipRemove>-->
      <!--                <mat-icon>cancel</mat-icon>-->
      <!--              </button>-->
      <!--            </mat-chip>-->
      <!--            <input-->
      <!--              placeholder="სხვა კატეგორია..."-->
      <!--              #fruitInput-->
      <!--              [formControl]="$any(formGroup).get('category')"-->
      <!--              [matAutocomplete]="auto"-->
      <!--              [matChipInputFor]="chipList"-->
      <!--              [matChipInputSeparatorKeyCodes]="cat_separatorKeysCodes"-->
      <!--              (matChipInputTokenEnd)="addCategory($event)">-->
      <!--          </mat-chip-list>-->
      <!--          <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectedCategory($event)">-->
      <!--            <mat-option *ngFor="let fruit of cat_filteredCategory " [value]="fruit">-->
      <!--              {{fruit}}-->
      <!--            </mat-option>-->
      <!--          </mat-autocomplete>-->
      <!--        </mat-form-field>-->

      <!--      </ng-container>-->

      <ng-container>
        <mat-form-field class="example-chip-list" appearance="fill">
          <mat-label>Favorite Fruits</mat-label>
          <mat-chip-list #chipList aria-label="Fruit selection">
            <mat-chip
              *ngFor="let fruit of fruits"
              [selectable]="true"
              [removable]="true"
              (removed)="removeCategory(fruit)"
            >
              {{fruit}}
              <button matChipRemove>
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip>
            <input
              placeholder="New fruit..."
              #fruitInput
              [formControl]="$any(formGroup).get('category')"
              [matAutocomplete]="auto"
              [matChipInputFor]="chipList"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
              (matChipInputTokenEnd)="addCategory($event)"
            />
          </mat-chip-list>
          <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectedCategory($event)">
            <mat-option *ngFor="let fruit of filteredFruits" [value]="fruit">
              {{fruit}}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </ng-container>

      <!--      ////Contact Section-->
      <div class="contact_bar">
        <mat-icon matSuffix>contacts</mat-icon>
        <span>კონტაქტი</span>
      </div>


      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>phone</mat-icon>

        <mat-label>ტელეფონი</mat-label>
        <input type="text" matInput [formControl]="$any(formGroup).get('phone')" [errorStateMatcher]="matcher"
               placeholder="555-666-777">


        <mat-error *ngIf="$any(formGroup).get('phone').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>email</mat-icon>

        <mat-label>იმეილი</mat-label>
        <input type="email" matInput [formControl]="$any(formGroup).get('email')" [errorStateMatcher]="matcher"
               placeholder="Ex. pat@example.com">

        <mat-error *ngIf="$any(formGroup).get('email').hasError('email')
            && !$any(formGroup).get('email').hasError('email').hasError('required')">
          გთხოვთ შეიყვანეთ ვალიდური იმეილი
        </mat-error>
        <mat-error *ngIf="$any(formGroup).get('email').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="field" appearance="fill">
        <mat-icon matSuffix>website</mat-icon>

        <mat-label>ვებსაიტი</mat-label>
        <input type="text" matInput [formControl]="$any(formGroup).get('webSite')" [errorStateMatcher]="matcher"
               placeholder="https://xatchapuri.ge">


        <mat-error *ngIf="$any(formGroup).get('webSite').hasError('required')">
          ეს ველი <strong>საჭიროა</strong>
        </mat-error>
      </mat-form-field>

      <button (click)="submitForm($event)" type="submit" class="field" mat-raised-button color="primary">Submit
      </button>

    </form>

  `,
  styles: [
    `


      form {
        display: flex;
        flex-direction: column;
        width: 300px;
      }

      form .field {
        font-size: small;
      }

      .contact_bar {
        font-size: medium;
        vertical-align: center;
        display: flex;
        flex-direction: row;
        margin: 10px 0px;
      }

      .schedule_bar {
        font-size: medium;
        vertical-align: center;
        display: flex;
        flex-direction: row;
        margin: 10px 0px;
      }

      .week_schedule_container {
        display: flex;
        flex-direction: column;
        width: 650px;
      }

      .week_schedule {
        display: flex;
        flex-direction: row;
      }

      .week_schedule > * {
        margin: 5px;

        &:first-child {
          margin-left: 0px;
          margin-right: auto;
        }
      }
    `
  ]
})
export class PlaceEventComponent {


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
