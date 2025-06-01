import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Inscription {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  numeroCarteNationale: string;
  dateNaissance: string;
  genre: string;
  role: 'ETUDIANT' | 'ENSEIGNANT';
  filiere?: string;
  annee?: string;
  statut: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
  dateInscription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = environment.apiUrl || 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token being used:', token);
    
    if (!token) {
      console.error('No token found in localStorage');
    }
    
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getInscriptionsEnAttente(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/inscriptions/en-attente`, {
      headers: this.getHeaders()
    });
  }

  getAllInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/inscriptions`, {
      headers: this.getHeaders()
    }).pipe(
      map(inscriptions => {
        return inscriptions.map(inscription => ({
          ...inscription,
          nom: inscription.nom || 'Non spécifié',
          prenom: inscription.prenom || 'Non spécifié',
          email: inscription.email || 'Non spécifié',
          telephone: inscription.telephone || 'Non spécifié',
          numeroCarteNationale: inscription.numeroCarteNationale || 'Non spécifié',
          genre: inscription.genre || 'Non spécifié',
          filiere: inscription.filiere || 'Non spécifiée',
          annee: inscription.annee || 'Non spécifiée'
        }));
      })
    );
  }

  getInscription(id: number): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.apiUrl}/inscriptions/${id}`, {
      headers: this.getHeaders()
    });
  }

  getInscriptionsAcceptees(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/inscriptions/acceptees`, {
      headers: this.getHeaders()
    });
  }

  accepterInscription(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/inscriptions/${id}/accepter`, {}, {
      headers: this.getHeaders()
    });
  }

  refuserInscription(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/inscriptions/${id}/refuser`, {}, {
      headers: this.getHeaders()
    });
  }

  deleteInscription(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inscriptions/${id}`, {
      headers: this.getHeaders()
    });
  }
}
