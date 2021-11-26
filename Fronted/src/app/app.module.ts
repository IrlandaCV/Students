import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentAComponent } from './components/student-a/student-a.component';
import { StudentBComponent } from './components/student-b/student-b.component';
import { StudentsComponent } from './pages/students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAComponent,
    StudentBComponent,
    StudentsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
