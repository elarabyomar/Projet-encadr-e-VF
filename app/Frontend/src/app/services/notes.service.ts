import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`);
  }

  getElements(classeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes/${classeId}/elements`);
  }

  getEtudiants(classeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes/${classeId}/etudiants`);
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addNote(note: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, note);
  }
}
