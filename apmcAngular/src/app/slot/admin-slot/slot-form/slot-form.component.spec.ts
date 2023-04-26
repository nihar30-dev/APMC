import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotFormComponent } from './slot-form.component';

describe('SlotFormComponent', () => {
  let component: SlotFormComponent;
  let fixture: ComponentFixture<SlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
