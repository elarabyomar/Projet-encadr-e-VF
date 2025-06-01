package com.monsite.Backend.service;

import com.monsite.Backend.dto.NoteDTO;
import com.monsite.Backend.model.Note;
import com.monsite.Backend.model.Etudiant;
import com.monsite.Backend.model.Element;
import com.monsite.Backend.model.Enseignant;
import com.monsite.Backend.repository.NoteRepository;
import com.monsite.Backend.repository.EtudiantRepository;
import com.monsite.Backend.repository.ElementRepository;
import com.monsite.Backend.repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired(required = false)
    private ElementRepository elementRepository;
    @Autowired
    private EnseignantRepository enseignantRepository;

    public Note saveNote(NoteDTO noteDTO, String username) {
        Etudiant etudiant = etudiantRepository.findById(noteDTO.getEtudiantId()).orElseThrow();
        // Defensive: check if elementRepository is null (in case of bean scan issues)
        Element element = null;
        if (elementRepository != null) {
            element = elementRepository.findById(noteDTO.getElementId()).orElse(null);
        }
        if (element == null) throw new RuntimeException("Element not found");
        Enseignant enseignant = enseignantRepository.findByUsername(username).orElseThrow();
        Note note = new Note();
        note.setEtudiant(etudiant);
        note.setElement(element);
        note.setEnseignant(enseignant);
        note.setValeur(noteDTO.getValeur());
        note.setType(noteDTO.getType());
        note.setDate(noteDTO.getDate());
        return noteRepository.save(note);
    }

    public List<Note> getNotesByEnseignant(String username) {
        Enseignant enseignant = enseignantRepository.findByUsername(username).orElseThrow();
        return noteRepository.findByEnseignant(enseignant);
    }

    // Other retrieval methods as needed
}
