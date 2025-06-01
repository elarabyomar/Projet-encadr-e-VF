import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InscriptionService, Inscription } from '../services/inscription.service';

interface GroupedStudents {
  [filiere: string]: {
    [annee: string]: Inscription[];
  };
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="student-container">
      <div class="header-section">
        <h1>👥 Liste des Étudiants</h1>
        <p class="subtitle">Consultez la liste des étudiants inscrits</p>
      </div>

      <div class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (ngModelChange)="filterEtudiants()"
            placeholder="Rechercher par nom ou prénom..."
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
      </div>

      <div class="filters-section">
        <div class="filter-group">
          <label for="filiere">Filière:</label>
          <select id="filiere" [(ngModel)]="selectedFiliere" (change)="filterEtudiants()">
            <option value="">Toutes les filières</option>
            <option value="DSE">DSE</option>
            <option value="DS">DS</option>
            <option value="ESBD">ESBD</option>
            <option value="AF">AF</option>
            <option value="RO">RO</option>
            <option value="SDE">SDE</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="annee">Année:</label>
          <select id="annee" [(ngModel)]="selectedAnnee" (change)="filterEtudiants()">
            <option value="">Toutes les années</option>
            <option value="1ere">1ère année</option>
            <option value="2eme">2ème année</option>
            <option value="3eme">3ème année</option>
          </select>
        </div>
      </div>

      <div *ngIf="loading" class="loading-state">
        <p>Chargement des étudiants...</p>
      </div>

      <div *ngIf="errorMessage" class="error-state">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="students-section" *ngIf="!loading && !errorMessage">
        <div class="section-header">
          <h2>
            {{ getHeaderTitle() }}
          </h2>
          <div class="student-count">
            {{ filteredEtudiants.length }} étudiant(s) trouvé(s)
          </div>
        </div>

        <div class="students-grid">
          <div class="student-card" *ngFor="let etudiant of filteredEtudiants">
            <div class="card-header">
              <h3>{{ etudiant.nom }} {{ etudiant.prenom }}</h3>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">{{ etudiant.email }}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Téléphone:</span>
                <span class="value">{{ etudiant.telephone }}</span>
              </div>
              <div class="info-row">
                <span class="label">🆔 Carte Nationale:</span>
                <span class="value">{{ etudiant.numeroCarteNationale }}</span>
              </div>
              <div class="info-row">
                <span class="label">🎓 Filière:</span>
                <span class="value">{{ etudiant.filiere }}</span>
              </div>
              <div class="info-row">
                <span class="label">📅 Année:</span>
                <span class="value">{{ etudiant.annee }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredEtudiants.length === 0">
          <div class="empty-icon">👥</div>
          <h3>Aucun étudiant trouvé</h3>
          <p>Aucun étudiant ne correspond aux critères sélectionnés</p>
        </div>
      </div>

      <div class="back-button">
        <a routerLink="/dashboard" class="btn-back">← Retour au tableau de bord</a>
      </div>
    </div>
  `,
  styles: [`
    .student-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header-section {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header-section h1 {
      color: #2c6e49;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
    }

    .search-section {
      margin-bottom: 1.5rem;
    }

    .search-box {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #2c6e49;
      box-shadow: 0 0 0 2px rgba(44, 110, 73, 0.2);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      color: #666;
    }

    .filters-section {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .filter-group {
      flex: 1;
    }

    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c6e49;
      font-weight: 500;
    }

    .filter-group select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      color: #333;
      background-color: white;
    }

    .filter-group select:focus {
      outline: none;
      border-color: #2c6e49;
      box-shadow: 0 0 0 2px rgba(44, 110, 73, 0.2);
    }

    .students-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e9ecef;
    }

    .section-header h2 {
      color: #2c6e49;
      font-size: 1.8rem;
      margin: 0;
    }

    .student-count {
      color: #666;
      font-size: 1.1rem;
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .student-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      border: 1px solid #e9ecef;
    }

    .student-card:hover {
      transform: translateY(-5px);
    }

    .card-header h3 {
      color: #2c6e49;
      font-size: 1.4rem;
      margin: 0 0 1.5rem 0;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      border-bottom: 1px solid #e9ecef;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
      font-weight: 500;
    }

    .value {
      color: #333;
      font-weight: 500;
    }

    .loading-state, .error-state {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .error-state {
      color: #dc3545;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .back-button {
      text-align: center;
      margin-top: 2rem;
    }

    .btn-back {
      display: inline-block;
      padding: 0.8rem 2rem;
      background: #2c6e49;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
    }

    .btn-back:hover {
      background: #235c3a;
    }

    @media (max-width: 768px) {
      .filters-section {
        flex-direction: column;
        gap: 1rem;
      }

      .search-box {
        max-width: 100%;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  etudiants: Inscription[] = [];
  filteredEtudiants: Inscription[] = [];
  selectedFiliere: string = '';
  selectedAnnee: string = '';
  searchTerm: string = '';
  loading = false;
  errorMessage = '';

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit() {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.loading = true;
    this.inscriptionService.getInscriptionsAcceptees().subscribe({
      next: (inscriptions) => {
        this.etudiants = inscriptions.filter(
          inscription => inscription.role === 'ETUDIANT'
        );
        this.filterEtudiants();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des étudiants:', error);
        this.errorMessage = 'Erreur lors du chargement des étudiants.';
        this.loading = false;
      }
    });
  }

  filterEtudiants() {
    this.filteredEtudiants = this.etudiants.filter(etudiant => {
      const matchFiliere = !this.selectedFiliere || etudiant.filiere === this.selectedFiliere;
      const matchAnnee = !this.selectedAnnee || etudiant.annee === this.selectedAnnee;
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      const matchSearch = !searchTermLower || 
        etudiant.nom.toLowerCase().includes(searchTermLower) ||
        etudiant.prenom.toLowerCase().includes(searchTermLower);
      
      return matchFiliere && matchAnnee && matchSearch;
    });
  }

  getHeaderTitle(): string {
    const parts = [];
    if (this.searchTerm) {
      parts.push(`Recherche: "${this.searchTerm}"`);
    }
    if (this.selectedFiliere) {
      parts.push(`Filière ${this.selectedFiliere}`);
    }
    if (this.selectedAnnee) {
      parts.push(this.selectedAnnee);
    }
    return parts.length > 0 ? parts.join(' - ') : 'Tous les étudiants';
  }
} 