import { Injectable } from '@angular/core';
import { InscriptionService } from './inscription.service';
import { map, Observable } from 'rxjs';

export interface Statistics {
  totalEtudiants: number;
  totalClasses: number;
  totalEnseignants: number;
  totalFilieres: number;
  classesParFiliere: { [filiere: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private filieres = ['DSE', 'DS', 'ESBD', 'AF', 'RO', 'SDE'];
  private annees = ['1ere', '2eme', '3eme'];

  constructor(private inscriptionService: InscriptionService) {}

  getStatistics(): Observable<Statistics> {
    return this.inscriptionService.getInscriptionsAcceptees().pipe(
      map(inscriptions => {
        const etudiants = inscriptions.filter(i => i.role === 'ETUDIANT');
        const enseignants = inscriptions.filter(i => i.role === 'ENSEIGNANT');
        
        // Calculer le nombre d'étudiants par filière
        const classesParFiliere: { [filiere: string]: number } = {};
        this.filieres.forEach(filiere => {
          const etudiantsFiliere = etudiants.filter(e => e.filiere === filiere);
          classesParFiliere[filiere] = etudiantsFiliere.length;
        });

        // Le nombre total de classes est fixe : 6 filières × 3 années
        const totalClasses = this.filieres.length * this.annees.length;

        return {
          totalEtudiants: etudiants.length,
          totalClasses: totalClasses, // 18 classes au total
          totalEnseignants: enseignants.length,
          totalFilieres: this.filieres.length,
          classesParFiliere: classesParFiliere
        };
      })
    );
  }
} 