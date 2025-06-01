import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InscriptionService, Inscription } from '../services/inscription.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="teacher-container">
      <div class="header-section">
        <h1>👨‍🏫 Liste des Enseignants</h1>
        <p class="subtitle">Consultez la liste des enseignants de l'établissement</p>
      </div>

      <div class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (ngModelChange)="filterEnseignants()"
            placeholder="Rechercher par nom ou prénom..."
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
      </div>

      <div *ngIf="loading" class="loading-state">
        <p>Chargement des enseignants...</p>
      </div>

      <div *ngIf="errorMessage" class="error-state">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="teachers-section" *ngIf="!loading && !errorMessage">
        <div class="section-header">
          <h2>
            {{ getHeaderTitle() }}
          </h2>
          <div class="teacher-count">
            {{ filteredEnseignants.length }} enseignant(s) trouvé(s)
          </div>
        </div>

        <div class="teachers-grid">
          <div class="teacher-card" *ngFor="let enseignant of filteredEnseignants">
            <div class="card-header">
              <h3>{{ enseignant.nom }} {{ enseignant.prenom }}</h3>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">{{ enseignant.email }}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Téléphone:</span>
                <span class="value">{{ enseignant.telephone }}</span>
              </div>
              <div class="info-row">
                <span class="label">🆔 Carte Nationale:</span>
                <span class="value">{{ enseignant.numeroCarteNationale }}</span>
              </div>
              <div class="info-row">
                <span class="label">📚 Matières:</span>
                <span class="value">{{ enseignant.matieres?.join(', ') || 'Non spécifié' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredEnseignants.length === 0">
          <div class="empty-icon">👨‍🏫</div>
          <h3>Aucun enseignant trouvé</h3>
          <p>Aucun enseignant ne correspond aux critères de recherche</p>
        </div>
      </div>

      <div class="back-button">
        <a routerLink="/dashboard" class="btn-back">← Retour au tableau de bord</a>
      </div>
    </div>
  `,
  styles: [`
    .teacher-container {
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

    .teachers-section {
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

    .teacher-count {
      color: #666;
      font-size: 1.1rem;
    }

    .teachers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .teacher-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      border: 1px solid #e9ecef;
    }

    .teacher-card:hover {
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
      .search-box {
        max-width: 100%;
      }

      .teachers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TeacherListComponent implements OnInit {
  enseignants: Inscription[] = [];
  filteredEnseignants: Inscription[] = [];
  searchTerm: string = '';
  loading = false;
  errorMessage = '';

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit() {
    this.loadEnseignants();
  }

  loadEnseignants() {
    this.loading = true;
    this.inscriptionService.getInscriptionsAcceptees().subscribe({
      next: (inscriptions) => {
        this.enseignants = inscriptions.filter(
          inscription => inscription.role === 'ENSEIGNANT'
        );
        this.filterEnseignants();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des enseignants:', error);
        this.errorMessage = 'Erreur lors du chargement des enseignants.';
        this.loading = false;
      }
    });
  }

  filterEnseignants() {
    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredEnseignants = this.enseignants.filter(enseignant => {
      return !searchTermLower || 
        enseignant.nom.toLowerCase().includes(searchTermLower) ||
        enseignant.prenom.toLowerCase().includes(searchTermLower);
    });
  }

  getHeaderTitle(): string {
    return this.searchTerm ? 
      `Recherche: "${this.searchTerm}"` : 
      'Tous les enseignants';
  }
} 