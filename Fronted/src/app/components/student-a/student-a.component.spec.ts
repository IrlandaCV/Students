import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAComponent } from './student-a.component';

describe('StudentAComponent', () => {
  let component: StudentAComponent;
  let fixture: ComponentFixture<StudentAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
