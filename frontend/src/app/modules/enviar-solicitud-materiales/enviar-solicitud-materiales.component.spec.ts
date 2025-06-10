import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarSolicitudMaterialesComponent } from './enviar-solicitud-materiales.component';

describe('EnviarSolicitudMaterialesComponent', () => {
  let component: EnviarSolicitudMaterialesComponent;
  let fixture: ComponentFixture<EnviarSolicitudMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarSolicitudMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarSolicitudMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
