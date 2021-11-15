import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavProfileComponent } from './side-nav-profile.component';

describe('SideNavProfileComponent', () => {
  let component: SideNavProfileComponent;
  let fixture: ComponentFixture<SideNavProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
