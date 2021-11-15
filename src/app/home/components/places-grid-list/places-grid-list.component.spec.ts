import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesGridListComponent } from './places-grid-list.component';

describe('PlacesGridListComponent', () => {
  let component: PlacesGridListComponent;
  let fixture: ComponentFixture<PlacesGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesGridListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
