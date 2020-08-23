import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifySubdomainComponent } from './varify-subdomain.component';

describe('VarifySubdomainComponent', () => {
  let component: VarifySubdomainComponent;
  let fixture: ComponentFixture<VarifySubdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarifySubdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifySubdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
