import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InscriptionService, Inscription } from '../services/inscription.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">
      <div class="header-section">
        <h1>🛡️ Gestion des Inscriptions</h1>
        <p class="subtitle">Approuvez ou refusez les demandes d'inscription en attente</p>
      </div>

      <div class="stats-bar">
        <div class="stat">
          <span class="stat-number">{{ getDemandesEnAttente('ETUDIANT').length }}</span>
          <span class="stat-label">Étudiants en attente</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ getDemandesEnAttente('ENSEIGNANT').length }}</span>
          <span class="stat-label">Enseignants en attente</span>
        </div>
      </div>

      <!-- Section Étudiants -->
      <div class="role-section" *ngIf="getDemandesEnAttente('ETUDIANT').length > 0">
        <h2 class="section-title">Demandes d'Étudiants</h2>
        <div class="inscriptions-grid">
          <div class="inscription-card" *ngFor="let inscription of getDemandesEnAttente('ETUDIANT')">
            <div class="card-header">
              <div class="user-info">
                <h3>{{ inscription.nom }} {{ inscription.prenom }}</h3>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">{{ inscription.email || 'Non spécifié' }}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Téléphone:</span>
                <span class="value">{{ inscription.telephone || 'Non spécifié' }}</span>
              </div>
              <div class="info-row">
                <span class="label">🆔 Carte Nationale:</span>
                <span class="value">{{ inscription.numeroCarteNationale || 'Non spécifié' }}</span>
              </div>
              <div class="info-row">
                <span class="label">🎓 Filière:</span>
                <span class="value">{{ inscription.filiere || 'Non spécifiée' }}</span>
              </div>
              <div class="info-row">
                <span class="label">📅 Année:</span>
                <span class="value">{{ inscription.annee || 'Non spécifiée' }}</span>
              </div>
            </div>

            <div class="card-actions">
              <button 
                class="action-btn accept-btn" 
                (click)="accepterInscription(inscription.id)"
                [disabled]="processingId === inscription.id">
                ✅ Accepter
              </button>
              <button 
                class="action-btn reject-btn" 
                (click)="refuserInscription(inscription.id)"
                [disabled]="processingId === inscription.id">
                ❌ Refuser
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Enseignants -->
      <div class="role-section" *ngIf="getDemandesEnAttente('ENSEIGNANT').length > 0">
        <h2 class="section-title">Demandes d'Enseignants</h2>
        <div class="inscriptions-grid">
          <div class="inscription-card" *ngFor="let inscription of getDemandesEnAttente('ENSEIGNANT')">
            <div class="card-header">
              <div class="user-info">
                <h3>{{ inscription.nom }} {{ inscription.prenom }}</h3>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">{{ inscription.email || 'Non spécifié' }}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Téléphone:</span>
                <span class="value">{{ inscription.telephone || 'Non spécifié' }}</span>
              </div>
              <div class="info-row">
                <span class="label">🆔 Carte Nationale:</span>
                <span class="value">{{ inscription.numeroCarteNationale || 'Non spécifié' }}</span>
              </div>
            </div>

            <div class="card-actions">
              <button 
                class="action-btn accept-btn" 
                (click)="accepterInscription(inscription.id)"
                [disabled]="processingId === inscription.id">
                ✅ Accepter
              </button>
              <button 
                class="action-btn reject-btn" 
                (click)="refuserInscription(inscription.id)"
                [disabled]="processingId === inscription.id">
                ❌ Refuser
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucune demande -->
      <div class="empty-state" *ngIf="inscriptionsEnAttente.length === 0">
        <div class="empty-icon">📝</div>
        <h3>Aucune demande en attente</h3>
        <p>Toutes les demandes ont été traitées</p>
      </div>

      <div class="back-button">
        <a routerLink="/dashboard" class="btn-back">← Retour au tableau de bord</a>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
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

    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .stat {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-width: 200px;
    }

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c6e49;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 1rem;
    }

    .role-section {
      margin-bottom: 3rem;
    }

    .section-title {
      color: #2c6e49;
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e9ecef;
    }

    .inscriptions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .inscription-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .card-header {
      margin-bottom: 1.5rem;
    }

    .user-info h3 {
      color: #2c6e49;
      font-size: 1.4rem;
      margin: 0;
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

    .card-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .action-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .accept-btn {
      background: #2c6e49;
      color: white;
    }

    .accept-btn:hover:not(:disabled) {
      background: #235c3a;
    }

    .reject-btn {
      background: #dc3545;
      color: white;
    }

    .reject-btn:hover:not(:disabled) {
      background: #c82333;
    }

    .action-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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
  `]
})
export class AdminRegistrationsComponent implements OnInit {
  inscriptionsEnAttente: Inscription[] = [];
  processingId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private inscriptionService: InscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadInscriptionsEnAttente();
  }

  loadInscriptionsEnAttente() {
    this.loading = true;
    this.errorMessage = '';
    
    this.inscriptionService.getInscriptionsEnAttente().subscribe({
      next: (inscriptions) => {
        this.inscriptionsEnAttente = inscriptions;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des inscriptions en attente:', error);
        this.errorMessage = 'Erreur lors du chargement des inscriptions en attente.';
        this.loading = false;
      }
    });
  }

  getDemandesEnAttente(role: 'ETUDIANT' | 'ENSEIGNANT'): Inscription[] {
    return this.inscriptionsEnAttente.filter(inscription => inscription.role === role);
  }

  accepterInscription(id: number) {
    this.processingId = id;
    this.inscriptionService.accepterInscription(id).subscribe({
      next: () => {
        this.loadInscriptionsEnAttente();
        this.processingId = null;
      },
      error: (error) => {
        console.error('Erreur lors de l\'acceptation:', error);
        this.processingId = null;
      }
    });
  }

  refuserInscription(id: number) {
    this.processingId = id;
    this.inscriptionService.refuserInscription(id).subscribe({
      next: () => {
        this.loadInscriptionsEnAttente();
        this.processingId = null;
      },
      error: (error) => {
        console.error('Erreur lors du refus:', error);
        this.processingId = null;
      }
    });
  }
}
