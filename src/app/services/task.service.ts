import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Task } from '../model/Task';
import { TaskDTO } from '../model/TaskDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = 'http://localhost:8085/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(page: number, size: number): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get<Task[]>(`${this.baseURL}/tasks`, { params: { page: page.toString(), size: size.toString() }, headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  searchTasks(json: any): Observable<any> {
    const url = `${this.baseURL}/search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    const params = new HttpParams({ fromObject: json });
    return this.http.get<any>(url, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  createTask(taskJson: any): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<Task>(`${this.baseURL}/inserir-task`, taskJson, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTask(id: number, task: TaskDTO): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.put<Task>(`${this.baseURL}/atualizar-task/${id}`, task, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTaskById(id: number): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get<Task>(`${this.baseURL}/find/task/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  concluirTask(id: number): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.put<Task>(`${this.baseURL}/${id}/concluir`, null, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(() => new Error(error.responseText));
  }
}
