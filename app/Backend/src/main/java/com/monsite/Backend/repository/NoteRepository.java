package com.monsite.Backend.repository;

import com.monsite.Backend.model.Note;
import com.monsite.Backend.model.Enseignant;
import com.monsite.Backend.model.Element;
import com.monsite.Backend.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByEnseignant(Enseignant enseignant);
    List<Note> findByElement(Element element);
    List<Note> findByEtudiant(Etudiant etudiant);
    List<Note> findByElementAndType(Element element, String type);
}
