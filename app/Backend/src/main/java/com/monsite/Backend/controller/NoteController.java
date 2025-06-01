package com.monsite.Backend.controller;

import com.monsite.Backend.dto.NoteDTO;
import com.monsite.Backend.model.Note;
import com.monsite.Backend.service.NoteService;
import com.monsite.Backend.service.EnseignantNoteHelperService;
import com.monsite.Backend.dto.IdNameDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@PreAuthorize("hasRole('ENSEIGNANT')")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @Autowired
    private EnseignantNoteHelperService enseignantNoteHelperService;

    @PostMapping
    public Note saveNote(@RequestBody NoteDTO noteDTO, Authentication authentication) {
        String username = authentication.getName();
        return noteService.saveNote(noteDTO, username);
    }

    @GetMapping
    public List<Note> getNotes(Authentication authentication) {
        String username = authentication.getName();
        return noteService.getNotesByEnseignant(username);
    }

    @GetMapping("/classes")
    public List<IdNameDTO> getClassesForEnseignant(Authentication authentication) {
        String username = authentication.getName();
        return enseignantNoteHelperService.getClassesForEnseignant(username);
    }

    @GetMapping("/classes/{classeId}/elements")
    public List<IdNameDTO> getElementsForClasseAndEnseignant(@PathVariable Long classeId, Authentication authentication) {
        String username = authentication.getName();
        return enseignantNoteHelperService.getElementsForClasseAndEnseignant(classeId, username);
    }

    @GetMapping("/classes/{classeId}/etudiants")
    public List<IdNameDTO> getEtudiantsForClasse(@PathVariable Long classeId) {
        return enseignantNoteHelperService.getEtudiantsForClasse(classeId);
    }
}
