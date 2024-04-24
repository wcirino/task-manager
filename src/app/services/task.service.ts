import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams  } from '@angular/common/http';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = 'http://localhost:8085/tasks';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllTasks(page: number, size: number): Observable<Task[]> {
    const headers = this.getHeaders();
    return this.http.get<Task[]>(`${this.baseURL}/tasks`, { params: { page: page.toString(), size: size.toString() }, headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  searchTasks(json: any): Observable<any> {
    const url = `${this.baseURL}/search`;
    const headers = this.getHeaders();
    const params = new HttpParams({ fromObject: json });
    return this.http.get<any>(url, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.post<Task>(`${this.baseURL}/inserir-task`, task, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.put<Task>(`${this.baseURL}/atualizar-task/${id}`, task, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
