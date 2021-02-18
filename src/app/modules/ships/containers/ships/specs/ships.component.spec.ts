import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ShipsService } from 'src/app/services/ships.service';
import { ShipsComponent } from '../ships.component';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;
  const serviceMock = {
    getShips: () => {
      return new BehaviorSubject([]);
    },
  };

  @Component({
    selector: 'ships-details',
    template: '<p>Mock Ship Details</p>',
  })
  class MockShipDetails {
    @Input() dataList: any;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShipsComponent, MockShipDetails],
        providers: [{ provide: ShipsService, useValue: serviceMock }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
