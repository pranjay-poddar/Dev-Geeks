import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDashboardComponent } from './angular-dashboard.component';

describe('AngularDashboardComponent', () => {
  let component: AngularDashboardComponent;
  let fixture: ComponentFixture<AngularDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
