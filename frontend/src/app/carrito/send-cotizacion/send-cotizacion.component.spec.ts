import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCotizacionComponent } from './send-cotizacion.component';

describe('SendCotizacionComponent', () => {
  let component: SendCotizacionComponent;
  let fixture: ComponentFixture<SendCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
