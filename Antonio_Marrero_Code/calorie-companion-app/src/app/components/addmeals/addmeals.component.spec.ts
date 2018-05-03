import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmealsComponent } from './addmeals.component';

describe('AddmealsComponent', () => {
  let component: AddmealsComponent;
  let fixture: ComponentFixture<AddmealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
