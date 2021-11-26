import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public student!: Student;
  public student2!: Student;

  constructor() {}

  ngOnInit(): void {}

  getObject(event: Student) {
    this.student = event;
  }

  getObject2(event: Student) {
    this.student2 = event;
  }
}
