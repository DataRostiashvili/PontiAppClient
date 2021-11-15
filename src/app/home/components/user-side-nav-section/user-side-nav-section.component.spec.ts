import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideNavSectionComponent } from './user-side-nav-section.component';

describe('UserSideNavSectionComponent', () => {
  let component: UserSideNavSectionComponent;
  let fixture: ComponentFixture<UserSideNavSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSideNavSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSideNavSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
