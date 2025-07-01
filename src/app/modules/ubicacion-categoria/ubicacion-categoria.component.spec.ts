import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionCategoriaComponent } from './ubicacion-categoria.component';

describe('UbicacionCategoriaComponent', () => {
  let component: UbicacionCategoriaComponent;
  let fixture: ComponentFixture<UbicacionCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
