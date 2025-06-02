import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryDeathOverlayComponent } from './victory-death-overlay.component';

describe('VictoryDeathOverlayComponent', () => {
  let component: VictoryDeathOverlayComponent;
  let fixture: ComponentFixture<VictoryDeathOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictoryDeathOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VictoryDeathOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
