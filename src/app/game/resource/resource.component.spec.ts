import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceComponent } from './resource.component';

describe('RessourceComponent', () => {
  let component: RessourceComponent;
  let fixture: ComponentFixture<RessourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RessourceComponent]
    });
    fixture = TestBed.createComponent(RessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
