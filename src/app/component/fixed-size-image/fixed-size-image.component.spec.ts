import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSizeImageComponent } from './fixed-size-image.component';

describe('FixedSizeImageComponent', () => {
  let component: FixedSizeImageComponent;
  let fixture: ComponentFixture<FixedSizeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSizeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSizeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
