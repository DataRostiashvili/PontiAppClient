import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGridTileComponent } from './event-grid-tile.component';

describe('EventGridTileComponent', () => {
  let component: EventGridTileComponent;
  let fixture: ComponentFixture<EventGridTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGridTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGridTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
