import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsearchComponent } from './foodsearch.component';

describe('FoodsearchComponent', () => {
  let component: FoodsearchComponent;
  let fixture: ComponentFixture<FoodsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
