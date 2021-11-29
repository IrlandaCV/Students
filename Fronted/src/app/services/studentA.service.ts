import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.models';
import { microstudents } from './global';

@Injectable()
export class StudentService {
  public url1: string;

  constructor(private _http: HttpClient) {
    this.url1 = microstudents.studentA;
  }

  //GUARDAR
  saveStudent(student: Student): Observable<any> {
    const params = JSON.stringify(student);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url1 + 'save-studentA', params, { headers });
  }

  //BUSCAR POR ID
  getStudent(studentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url1 + 'getById/' + studentId, {
      headers: headers,
    });
  }

  //LISTAR TODAS
  getStudents(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url1 + 'getAlls', { headers: headers });
  }

  //ACTUALIZAR POR ID
  updateStudent(student: Student): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(student);
    return this._http.put(
      this.url1 + 'updateStudent/' + student.studentId,
      body,
      { headers: headers }
    );
  }

  //BORRAR POR ID
  deleteStudent(studentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url1 + 'deleteStudent/' + studentId, {
      headers: headers,
    });
  }
}
