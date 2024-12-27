import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalHealthComponent } from './digital-health.component';

describe('DigitalHealthComponent', () => {
  let component: DigitalHealthComponent;
  let fixture: ComponentFixture<DigitalHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
