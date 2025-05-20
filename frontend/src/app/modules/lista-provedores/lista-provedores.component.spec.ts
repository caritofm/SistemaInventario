import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProvedoresComponent } from './lista-provedores.component';

describe('ListaProvedoresComponent', () => {
  let component: ListaProvedoresComponent;
  let fixture: ComponentFixture<ListaProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProvedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
