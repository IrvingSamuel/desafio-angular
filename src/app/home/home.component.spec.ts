import 'zone.js';
import 'zone.js/dist/zone-testing';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ HomeComponent ]
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
  }));

  it('should exist', () => {
      expect(component).toBeDefined();
  });
});