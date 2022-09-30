import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Container2Component } from './container2.component';

describe('Container2Component', () => {
  let component: Container2Component;
  let fixture: ComponentFixture<Container2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Container2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Container2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
