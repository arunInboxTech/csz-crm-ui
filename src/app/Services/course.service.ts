import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseResponse } from '../Models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:5000/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  addCourse(course: Course): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<CourseResponse> {
    return this.http.delete<CourseResponse>(`${this.apiUrl}/${id}`);
  }
}
