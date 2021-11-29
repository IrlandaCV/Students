import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.models';
import { microstudents } from './global';

@Injectable()
export class StudentService {
  public url2: string;

  constructor(private _http: HttpClient) {
    this.url2 = microstudents.studentB;
  }

  //GUARDAR REGISTRO
  saveStudent2(student: Student): Observable<any> {
    const params = JSON.stringify(student);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url2 + 'save-studentB', params, { headers });
  }

  //BUSCAR REGISTRO POR ID
  getStudent2(studentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url2 + 'getById/' + studentId, {
      headers: headers,
    });
  }

  //LISTAR REGISTROS
  getStudents2(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url2 + 'getAlls', { headers: headers });
  }

  //ACTUALIZAR REGISTRO
  updateStudent2(student: Student): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(student);

    return this._http.put(this.url2 + 'update/' + student.studentId, body, {
      headers: headers,
    });
  }

  //ELIMINAR REGISTRO
  deleteStudent2(studentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url2 + 'deleteStudent/' + studentId, {
      headers: headers,
    });
  }
}
