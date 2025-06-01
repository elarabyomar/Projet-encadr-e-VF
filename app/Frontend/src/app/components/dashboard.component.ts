import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StatisticsService, Statistics } from '../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>🎓 Bienvenue sur InseApp</h1>
        <p class="welcome-text">Votre plateforme de gestion scolaire moderne</p>
      </div>      
      
      <div class="dashboard-grid">
        <!-- Admin Registration Management Card -->
        <div class="dashboard-card" *ngIf="isAdmin()">
          <div class="card-icon">🛡️</div>
          <h3>Gestion des Inscriptions</h3>
          <p>Approuvez ou refusez les demandes d'inscription en attente</p>
          <a routerLink="/admin/registrations" class="card-button">Gérer</a>
        </div>

        <!-- Teacher Notes Management Card -->
        <div class="dashboard-card" *ngIf="isTeacher()">
          <div class="card-icon">📝</div>
          <h3>Gestion des Notes</h3>
          <p>Saisissez et gérez les notes de vos étudiants</p>
          <a routerLink="/teacher-notes" class="card-button">Accéder</a>
        </div>

        <!-- Students Card -->
        <div class="dashboard-card" *ngIf="isAdmin()">
          <div class="card-icon">👥</div>
          <h3>Étudiants</h3>
          <p>Consultez la liste des étudiants et leurs informations</p>
          <a routerLink="/etudiants" class="card-button">Accéder</a>
        </div>

        <!-- Teachers Card -->
        <div class="dashboard-card" *ngIf="isAdmin()">
          <div class="card-icon">👨‍🏫</div>
          <h3>Enseignants</h3>
          <p>Consultez la liste des enseignants et leurs informations</p>
          <a routerLink="/enseignants" class="card-button">Accéder</a>
        </div>

        <!-- Statistics Card -->
        <div class="dashboard-card">
          <div class="card-icon">📊</div>
          <h3>Statistiques</h3>
          <p>Visualisez les statistiques et analyses de performance</p>
          <button class="card-button" disabled>Bientôt disponible</button>
        </div>

        <!-- Calendar Card -->
        <div class="dashboard-card">
          <div class="card-icon">📅</div>
          <h3>Calendrier</h3>
          <p>Gérez les emplois du temps et les événements</p>
          <button class="card-button" disabled>Bientôt disponible</button>
        </div>
      </div>

      <div class="quick-stats" *ngIf="isAdmin()">
        <h2>Aperçu Rapide</h2>
        <div class="stats-grid">
          <div class="stat-item" *ngIf="statistics">
            <div class="stat-number">{{ statistics.totalEtudiants }}</div>
            <div class="stat-label">Étudiants Actifs</div>
          </div>
          <div class="stat-item" *ngIf="statistics">
            <div class="stat-number">18</div>
            <div class="stat-label">Classes (6 filières × 3 années)</div>
          </div>
          <div class="stat-item" *ngIf="statistics">
            <div class="stat-number">{{ statistics.totalEnseignants }}</div>
            <div class="stat-label">Enseignants</div>
          </div>
          <div class="stat-item" *ngIf="statistics">
            <div class="stat-number">{{ statistics.totalFilieres }}</div>
            <div class="stat-label">Filières</div>
          </div>
        </div>

        <div class="filiere-stats" *ngIf="statistics">
          <h3>Répartition par Filière</h3>
          <div class="filiere-grid">
            <div class="filiere-item" *ngFor="let filiere of getFilieresStats()">
              <div class="filiere-name">{{ filiere.nom }}</div>
              <div class="filiere-count">{{ filiere.count }} étudiants</div>
              <div class="filiere-classes">3 classes (1ère, 2ème, 3ème année)</div>
            </div>
          </div>
        </div>

        <div class="loading-stats" *ngIf="!statistics">
          <p>Chargement des statistiques...</p>
        </div>

        <div class="error-stats" *ngIf="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, #2c6e49, #4a9068);
      border-radius: 15px;
      color: white;
    }

    .welcome-section h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .welcome-text {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .dashboard-card h3 {
      color: #2c6e49;
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }

    .dashboard-card p {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .card-button {
      background: linear-gradient(135deg, #2c6e49, #4a9068);
      color: white;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      transition: background 0.3s ease;
      font-weight: 500;
    }

    .card-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #1e4a33, #2c6e49);
    }

    .card-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .quick-stats {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .quick-stats h2 {
      text-align: center;
      color: #2c6e49;
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      border-radius: 8px;
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      animation: fadeIn 0.5s ease-in;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c6e49;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-weight: 500;
    }

    .loading-stats {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .error-stats {
      text-align: center;
      padding: 2rem;
      color: #dc3545;
    }

    .filiere-stats {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e9ecef;
    }

    .filiere-stats h3 {
      text-align: center;
      color: #2c6e49;
      margin-bottom: 1.5rem;
      font-size: 1.4rem;
    }

    .filiere-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .filiere-item {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      transition: transform 0.2s ease;
    }

    .filiere-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .filiere-name {
      font-weight: bold;
      color: #2c6e49;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .filiere-count {
      color: #666;
      margin-bottom: 0.3rem;
    }

    .filiere-classes {
      color: #888;
      font-size: 0.9rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .welcome-section h1 {
        font-size: 2rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .filiere-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  statistics: Statistics | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    if (this.isAdmin()) {
      this.loadStatistics();
    }
  }

  loadStatistics() {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
        this.errorMessage = 'Erreur lors du chargement des statistiques.';
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  isStudent(): boolean {
    return this.authService.isStudent();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  getFilieresStats() {
    if (!this.statistics) return [];
    
    return Object.entries(this.statistics.classesParFiliere).map(([nom, count]) => ({
      nom,
      count
    }));
  }
}
