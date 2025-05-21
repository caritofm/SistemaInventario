import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEnergiaComponent } from './control-energia.component';

describe('ControlEnergiaComponent', () => {
  let component: ControlEnergiaComponent;
  let fixture: ComponentFixture<ControlEnergiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlEnergiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
