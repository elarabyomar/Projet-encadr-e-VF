package com.monsite.Backend.service;

import com.monsite.Backend.dto.IdNameDTO;
import com.monsite.Backend.model.Classe;
import com.monsite.Backend.model.Element;
import com.monsite.Backend.model.Enseignant;
import com.monsite.Backend.model.Etudiant;
import com.monsite.Backend.model.Inscription;
import com.monsite.Backend.repository.ClasseRepository;
import com.monsite.Backend.repository.ElementRepository;
import com.monsite.Backend.repository.EnseignantRepository;
import com.monsite.Backend.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnseignantNoteHelperService {
    @Autowired private ClasseRepository classeRepository;
    @Autowired private ElementRepository elementRepository;
    @Autowired private EnseignantRepository enseignantRepository;
    @Autowired private EtudiantRepository etudiantRepository;

    public List<IdNameDTO> getClassesForEnseignant(String username) {
        Enseignant enseignant = enseignantRepository.findByUsername(username).orElseThrow();
        return classeRepository.findByEnseignant(enseignant)
            .stream().map(c -> new IdNameDTO(c.getId(), c.getNom())).collect(Collectors.toList());
    }

    public List<IdNameDTO> getElementsForClasseAndEnseignant(Long classeId, String username) {
        Enseignant enseignant = enseignantRepository.findByUsername(username).orElseThrow();
        Classe classe = classeRepository.findById(classeId).orElseThrow();
        return elementRepository.findByClasseAndEnseignant(classe, enseignant)
            .stream().map(e -> new IdNameDTO(e.getId(), e.getNom())).collect(Collectors.toList());
    }

    public List<IdNameDTO> getEtudiantsForClasse(Long classeId) {
        Classe classe = classeRepository.findById(classeId).orElseThrow();
        return classe.getInscriptions().stream()
            .map(Inscription::getEtudiant)
            .filter(e -> e != null)
            .map(e -> new IdNameDTO(e.getId(), e.getNom() + " " + e.getPrenom()))
            .collect(Collectors.toList());
    }
}
