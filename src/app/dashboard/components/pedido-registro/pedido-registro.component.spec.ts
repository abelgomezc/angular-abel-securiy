import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegistroComponent } from './pedido-registro.component';

describe('PedidoRegistroComponent', () => {
  let component: PedidoRegistroComponent;
  let fixture: ComponentFixture<PedidoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
