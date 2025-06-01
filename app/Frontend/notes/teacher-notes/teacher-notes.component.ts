import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../../src/app/services/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-notes',
  templateUrl: './teacher-notes.component.html',
  styleUrl: './teacher-notes.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class TeacherNotesComponent implements OnInit {
  noteForm: FormGroup;
  classes: any[] = [];
  elements: any[] = [];
  etudiants: any[] = [];
  success = '';
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private notes: NotesService) {
    this.noteForm = this.fb.group({
      classe: ['', Validators.required],
      element: ['', Validators.required],
      etudiant: ['', Validators.required],
      valeur: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      type: ['examen', Validators.required],
      date: [new Date().toISOString().substring(0,10), Validators.required]
    });
  }

  ngOnInit() {
    this.notes.getClasses().subscribe(data => this.classes = data);
  }

  onClasseChange() {
    const classeId = this.noteForm.value.classe;
    this.notes.getElements(classeId).subscribe(data => this.elements = data);
    this.notes.getEtudiants(classeId).subscribe(data => this.etudiants = data);
    this.noteForm.patchValue({ element: '', etudiant: '' });
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    if (this.noteForm.invalid) return;
    this.loading = true;
    const note = {
      elementId: this.noteForm.value.element,
      etudiantId: this.noteForm.value.etudiant,
      valeur: this.noteForm.value.valeur,
      type: this.noteForm.value.type,
      date: this.noteForm.value.date
    };
    this.notes.addNote(note).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Note enregistrée !';
        this.noteForm.reset({ type: 'examen', date: new Date().toISOString().substring(0,10) });
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors de la saisie de la note';
      }
    });
  }
}
