import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Student } from '../../models/student.models';


import { StudentService } from '../../services/studentB.service';

@Component({
  selector: 'student-b',
  templateUrl: './student-b.component.html',
  styleUrls: ['./student-b.component.scss'],
  providers: [StudentService],
})
export class StudentBComponent implements OnInit, OnChanges {
  @Output() student2Transfered = new EventEmitter();
  @Input() newStudent!: Student;

  public Student: Student;
  public Students: Student[];
  public stringById: string;

  constructor(private _studentService: StudentService) {
    this.Student = new Student('', 0, '', '', '', 0);
    this.Students = [];
    this.stringById = '';

    this.showTable2();
  }

  ngOnChanges(): void {
    if (this.newStudent != null && this.newStudent != undefined) {
      this.createTransfer(this.newStudent);
      this.showTable2();
    }
  }

  showTable2(): void {
    this._studentService
      .getStudents2()
      .subscribe(({ students }: { students: Student[] }) => {
        this.Students = students;
      });
  }

  ngOnInit(): void {}

  /* CREAR NUEVO REGISTRO */
  createB(form: any) {
    this._studentService.saveStudent2(this.Student).subscribe(
      (response) => {
        if (response) {
          this.showTable2();
          form.reset();
        } else {
          alert('Error al guardar registro');
        }
      },
      (error) => {
        console.log(<any>error);
        alert('Campos invalidos');
      }
    );
  }

  /* EDITAR REGISTRO */
  get(student: Student) {
    this.Student = { ...student };
  }

  /* ACTUALIZAR REGISTRO */
  update() {
    this._studentService.updateStudent2(this.Student).subscribe(
      (response) => {
        this.Student = new Student('', 0, '', '', '', 0);
        this.showTable2();
      },
      (err) => {
        console.log(err);
        alert('Error al actualizar el registro');
      }
    );
  }

  /* ENCONTRAR REGISTRO */
  findById(form: any) {
    this._studentService.getStudent2(parseInt(this.stringById)).subscribe(
      (response: Student) => {
        this.Students.splice(0, this.Students.length);
        this.Students.push(response);
        form.reset();
      },
      (err) => {
        console.log(err);
        alert('Error al encontrar registro');
      }
    );
  }

  /* LISTAR TODOS LOS REGISTROS */
  findAll() {
    this.showTable2();
  }

  /* BORRAR REGISTRO */
  delete({ studentId }: Student, validate = true) {
    if (validate) {
      if (!confirm('¿Estas seguro de borrarlo?')) return;
    }

    this._studentService.deleteStudent2(studentId).subscribe(
      (response) => {
        this.showTable2();
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar el registro');
      }
    );

    this.showTable2();
  }

  /* TRANFERIR DATOS */
  transfer(event: any, student2: Student) {
    const student2Transfered: Student = { ...student2 };
    this.delete(student2, false);
    this.student2Transfered.emit(student2Transfered);
  }

  /*CREAR EN TRANSFERENCIA */
  createTransfer(student: Student) {
    this._studentService.saveStudent2(student).subscribe(
      (response) => {
        if (response) {
          this.showTable2();
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
}
