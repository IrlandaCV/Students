import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Student } from '../../models/student.models';

import { StudentService } from '../../services/studentA.service';

@Component({
  selector: 'student-a',
  templateUrl: './student-a.component.html',
  styleUrls: ['./student-a.component.scss'],
  providers: [StudentService],
})
export class StudentAComponent implements OnInit, OnChanges {
  @Output() transferStudent = new EventEmitter();
  @Input() newStudent!: Student;

  public Student: Student;
  public Students: Student[];
  public stringById: string;

  constructor(private _studentService: StudentService) {
    this.Student = new Student('', 0, '', '', '', 0);
    this.Students = [];
    this.stringById = '';

    this.showTable();
  }
  ngOnChanges(): void {
    if (this.newStudent != null && this.newStudent != undefined) {
      this.createTransfer(this.newStudent);
      this.showTable();
    }
  }
  /* 
    const response = {
      students: [
        {id: 1, name: "Edgar"},
        {id: 2, name: "Irlanda"}
      ],
      statusCode: 200,
      type: JSON;
    }

    const {students} = response;  => const students = response.students

    getStudents(response){                        =>      getStudents({students}) {
      console.log(response.students)              =>        console.log(students);
    }                                             =>      }

    this.getStudents(response)

  */

  showTable(): void {
    this._studentService
      .getStudents()
      .subscribe(({ students }: { students: Student[] }) => {
        this.Students = students;
      });
  }

  ngOnInit(): void {}

  //CREAR PARA TRANSFER
  createTransfer(student: Student) {
    this._studentService.saveStudent(student).subscribe(
      (response) => {
        if (response) {
          this.showTable();
        } else {
          alert('Error al guardar');
        }
      },
      (error) => {
        console.log(<any>error);
        alert('Campos invalidos');
      }
    );
  }

  //CREAR
  create(form: any) {
    this._studentService.saveStudent(this.Student).subscribe(
      (response) => {
        if (response) {
          this.showTable();
          form.reset();
        } else {
          alert('Error al guardar');
        }
      },
      (error) => {
        console.log(<any>error);
        alert('Campos invalidos');
      }
    );
  }

  //EDITAR
  get(student: Student) {
    this.Student = { ...student };
  }

  //ELIMINAR
  delete({ studentId }: Student, validate = true) {
    if (validate) {
      if (!confirm('¿Estas seguro de borrarlo?')) return;
    }
    this._studentService.deleteStudent(studentId).subscribe(
      (response) => {
        this.showTable();
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar el registro');
      }
    );

    this.showTable();
  }

  //ACTUALIZAR
  update() {
    this._studentService.updateStudent(this.Student).subscribe(
      (response) => {
        this.Student = new Student('', 0, '', '', '', 0);
        this.showTable();
      },
      (err) => {
        console.log(err);
        alert('Error al actualizar el registro');
      }
    );
  }

  //ENCONTRAR
  findById(form: any) {
    this._studentService.getStudent(parseInt(this.stringById)).subscribe(
      (response: Student) => {
        this.Students.splice(0, this.Students.length);
        this.Students.push(response);
        form.reset();
      },
      (err) => {
        console.log(err);
        alert('Error al encontrar');
      }
    );
  }

  //LISTAR
  findAll() {
    this.showTable();
  }

  //TRANSFERIR
  transfer(event: any, student: Student) {
    const studentTransfered: Student = { ...student };
    this.delete(student, false);
    this.transferStudent.emit(studentTransfered);
  }
}
