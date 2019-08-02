import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmbitoComponent } from './edit-ambito.component';

describe('EditAmbitoComponent', () => {
  let component: EditAmbitoComponent;
  let fixture: ComponentFixture<EditAmbitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAmbitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmbitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
