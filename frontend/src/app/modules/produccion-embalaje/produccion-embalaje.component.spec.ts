import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEmbalajeComponent } from './produccion-embalaje.component';

describe('ProduccionEmbalajeComponent', () => {
  let component: ProduccionEmbalajeComponent;
  let fixture: ComponentFixture<ProduccionEmbalajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduccionEmbalajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionEmbalajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
