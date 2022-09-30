import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueComponent } from './overdue.component';

describe('OverdueComponent', () => {
  let component: OverdueComponent;
  let fixture: ComponentFixture<OverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
