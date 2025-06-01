import { Routes } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { TeacherNotesComponent } from '../../notes/teacher-notes/teacher-notes.component';
import { DashboardComponent } from './components/dashboard.component';
import { AdminRegistrationsComponent } from './components/admin-registrations.component';
import { StudentListComponent } from './components/student-list.component';
import { TeacherListComponent } from './components/teacher-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/registrations', component: AdminRegistrationsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'etudiants', component: StudentListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'enseignants', component: TeacherListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
