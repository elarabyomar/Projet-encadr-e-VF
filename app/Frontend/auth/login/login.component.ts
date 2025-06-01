import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../src/app/services/auth.service';
import { NotificationService } from '../../src/app/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = '';
    if (this.loginForm.invalid) {
      this.notificationService.showError('Veuillez remplir tous les champs correctement');
      return;
    }
    
    this.loading = true;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.motDePasse).subscribe({
      next: res => {
        this.loading = false;        if (res.token) {
          this.notificationService.showSuccess('Connexion réussie !');
          this.router.navigate(['/dashboard']);
        } else {
          this.notificationService.showWarning("Votre compte n'est pas encore activé.");
        }
      },
      error: err => {
        this.loading = false;
        const message = err.error?.message || 'Erreur de connexion';
        this.error = message;
        this.notificationService.showError(message);
      }
    });
  }
}
