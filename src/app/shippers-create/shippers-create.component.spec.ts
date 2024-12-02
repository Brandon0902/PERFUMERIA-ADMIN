import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippersCreateComponent } from './shippers-create.component';

describe('ShippersCreateComponent', () => {
  let component: ShippersCreateComponent;
  let fixture: ComponentFixture<ShippersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippersCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
