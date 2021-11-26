import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { table1 } from '../../db/tabla1.db';
import { Student } from '../../models/student.models';
import * as uuid from 'uuid';

@Component({
  selector: 'student-a',
  templateUrl: './student-a.component.html',
  styleUrls: ['./student-a.component.scss'],
})
export class StudentAComponent implements OnInit, OnChanges {
  @Output() transferStudent = new EventEmitter();
  @Input() newStudent!: Student;

  public Student: Student;
  public Students: Student[];
  public stringById: string;

  constructor() {
    this.Student = new Student('', 0, '', '', '', 0);
    this.Students = table1;
    this.stringById = '';
  }
  ngOnChanges(): void {
    if (this.newStudent != null && this.newStudent != undefined) {
      table1.push(this.newStudent);
      this.showTable(table1);
    }
  }

  showTable(arrayStudents: Student[]) {
    this.Students = arrayStudents;
  }

  ngOnInit(): void {}

  //CREAR
  create(form: any, formValidate = true) {
    let studentId = 1;

    table1.map((data) => {
      studentId = data.studentId + 1;
    });

    this.Student._id = uuid.v4();
    this.Student.studentId = studentId;

    if (
      !this.Student._id ||
      !this.Student.studentId ||
      !this.Student.first_name ||
      !this.Student.last_name ||
      !this.Student.email ||
      !this.Student.cellphone
    ) {
      alert('Campos invalidos');
      return;
    }

    table1.push(this.Student);

    this.Student = new Student('', 0, '', '', '', 0);

    this.showTable(table1);

    if (formValidate) {
      form.reset();
    }
  }

  //EDITAR
  get(student: Student) {
    this.Student = { ...student };
  }

  //ELIMINAR
  delete(_id: string, validate = true) {
    if (validate) {
      if (!confirm('¿Estas seguro de borrarlo?')) return;
    }
    table1.map((data, index) => {
      if (data._id == _id) {
        table1.splice(index, 1);
      }
    });
    this.showTable(table1);
  }

  //ACTUALIZAR
  update() {
    table1.map((data, index) => {
      if (data._id == this.Student._id) {
        table1[index] = this.Student;
      }
    });
    this.showTable(table1);

    this.Student = new Student('', 0, '', '', '', 0);
  }

  //ENCONTRAR
  findById(form: any) {
    const student = table1.find(
      (data) => data.studentId == parseInt(this.stringById)
    );

    if (student) {
      this.showTable([student]);
    } else {
      alert('Registro no encontrado');
    }
  }

  //LISTAR
  findAll() {
    this.Students = table1;
  }

  //TRANSFERIR
  transfer(event: any, student: Student) {
    const studentTransfered: Student = { ...student };
    this.delete(student._id, false);
    this.transferStudent.emit(studentTransfered);
  }
}
