import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../src/app/services/auth.service';
import { NotificationService } from '../../src/app/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';
  success: string = '';
  loading = false;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]{2,50}$/)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]{2,50}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/)]],
      motDePasse: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/)]],
      numeroCarteNationale: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{4,20}$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+212|0)[567][0-9]{8}$/)]],
      dateNaissance: ['', Validators.required],
      genre: ['', [Validators.required, Validators.pattern(/^(Homme|Femme)$/)]],
      role: ['ETUDIANT', Validators.required],
      filiere: [''],
      annee: ['']
    });
  }

  ngOnInit() {
    // Auto-select filiere and annee for students
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'ETUDIANT') {
        this.registerForm.get('filiere')?.setValidators([Validators.required, Validators.pattern(/^(DSE|DS|ESBD|AF|RO|SDE)$/)]);
        this.registerForm.get('annee')?.setValidators([Validators.required, Validators.pattern(/^(1ere|2eme|3eme)$/)]);
      } else {
        this.registerForm.get('filiere')?.clearValidators();
        this.registerForm.get('annee')?.clearValidators();
        this.registerForm.get('filiere')?.setValue('');
        this.registerForm.get('annee')?.setValue('');
      }
      this.registerForm.get('filiere')?.updateValueAndValidity();
      this.registerForm.get('annee')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    if (this.registerForm.invalid) {
      this.notificationService.showError('Veuillez remplir tous les champs obligatoires correctement');
      return;
    }
    
    this.loading = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: res => {
        this.loading = false;
        this.success = "Inscription envoyée ! Attendez la validation de l'administration.";
        this.notificationService.showSuccess('Inscription envoyée avec succès !');
        this.registerForm.reset();
        // Optionnel: rediriger vers login après quelques secondes
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.loading = false;
        const message = err.error?.message || 'Erreur lors de l\'inscription';
        this.error = message;
        this.notificationService.showError(message);
      }
    });
  }
}
