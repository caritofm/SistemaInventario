import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarEmbalajeComponent } from './programar-embalaje.component';

describe('ProgramarEmbalajeComponent', () => {
  let component: ProgramarEmbalajeComponent;
  let fixture: ComponentFixture<ProgramarEmbalajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramarEmbalajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramarEmbalajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
