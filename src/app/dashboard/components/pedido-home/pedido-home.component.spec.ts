import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoHomeComponent } from './pedido-home.component';

describe('PedidoHomeComponent', () => {
  let component: PedidoHomeComponent;
  let fixture: ComponentFixture<PedidoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
