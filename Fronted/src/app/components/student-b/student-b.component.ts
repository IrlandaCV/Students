import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Student } from '../../models/student.models';
import { table2 } from '../../db/tabla2.db';
import * as uuid from 'uuid';

@Component({
  selector: 'student-b',
  templateUrl: './student-b.component.html',
  styleUrls: ['./student-b.component.scss'],
})
export class StudentBComponent implements OnInit, OnChanges {
  @Output() student2Transfered = new EventEmitter();
  @Input() newStudent!: Student;

  public Student: Student;
  public Students: Student[];
  public stringById: string;

  constructor() {
    this.Student = new Student('', 0, '', '', '', 0);
    this.Students = table2;
    this.stringById = '';
  }

  ngOnChanges(): void {
    if (this.newStudent != null && this.newStudent != undefined) {
      table2.push(this.newStudent);
      this.showTable2(table2);
    }
  }

  showTable2(arrayStudents: Student[]) {
    this.Students = arrayStudents;
  }

  ngOnInit(): void {}

  /* CREAR NUEVO REGISTRO */
  createB(form: any, formValidate = true) {
    let studentId = 1;

    table2.map((data) => {
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

    table2.push(this.Student);

    this.Student = new Student('', 0, '', '', '', 0);

    this.showTable2(table2);

    if (formValidate) {
      form.reset();
    }
  }

  /* EDITAR REGISTRO */
  get(student: Student) {
    this.Student = { ...student };
  }

  /* ACTUALIZAR REGISTRO */
  update() {
    table2.map((data, index) => {
      if (data._id == this.Student._id) {
        table2[index] = this.Student;
      }
    });
    this.showTable2(table2);

    this.Student = new Student('', 0, '', '', '', 0);
  }

  /* ENCONTRAR REGISTRO */
  findById(form: any) {
    const student = table2.find(
      (data) => data.studentId == parseInt(this.stringById)
    );

    if (student) {
      this.showTable2([student]);
    } else {
      alert('Registro no encontrado');
    }
  }

  /* LISTAR TODOS LOS REGISTROS */
  findAll() {
    this.showTable2(table2);
  }

  /* BORRAR REGISTRO */
  delete(_id: string, validate = true) {
    if (validate) {
      if (!confirm('¿Estas seguro de borrarlo?')) return;
    }
    table2.map((data, index) => {
      if (data._id == _id) {
        table2.splice(index, 1);
      }
    });
    this.showTable2(table2);
  }

  /* TRANFERIR DATOS */
  transfer(event: any, student2: Student) {
    const student2Transfered: Student = { ...student2 };
    this.delete(student2._id, false);
    this.student2Transfered.emit(student2Transfered);
  }

  /*CREAR EN TRANSFERENCIA */
  // createInTransfer(student2: Student) {
  //   this.Student.saveHouse2(student2).subscribe(
  //     (response) => {
  //       if (response) {
  //         this.showTable2();
  //       } else {
  //         alert('Error al guardar');
  //       }
  //     },
  //     (error) => {
  //       console.log(<any>error);
  //       alert('Campos invalidos');
  //     }
  //   );
  // }
}
