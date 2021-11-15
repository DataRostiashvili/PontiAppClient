import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGridListComponent } from './events-grid-list.component';

describe('GridListComponent', () => {
  let component: EventsGridListComponent;
  let fixture: ComponentFixture<EventsGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsGridListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
