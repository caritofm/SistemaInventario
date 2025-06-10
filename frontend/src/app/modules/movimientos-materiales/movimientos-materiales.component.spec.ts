import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosMaterialesComponent } from './movimientos-materiales.component';

describe('MovimientosMaterialesComponent', () => {
  let component: MovimientosMaterialesComponent;
  let fixture: ComponentFixture<MovimientosMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
