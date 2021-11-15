import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceGridTileComponent } from './place-grid-tile.component';

describe('PlaceGridTileComponent', () => {
  let component: PlaceGridTileComponent;
  let fixture: ComponentFixture<PlaceGridTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceGridTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceGridTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
