import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencLotesComponent } from './venc-lotes.component';

describe('VencLotesComponent', () => {
  let component: VencLotesComponent;
  let fixture: ComponentFixture<VencLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VencLotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VencLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
