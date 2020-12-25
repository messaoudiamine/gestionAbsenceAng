import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiersComponent } from './matiers.component';

describe('MatiersComponent', () => {
  let component: MatiersComponent;
  let fixture: ComponentFixture<MatiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
