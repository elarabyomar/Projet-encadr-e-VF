package com.monsite.Backend.service;

import com.monsite.Backend.config.StudentConfig;
import com.monsite.Backend.config.ProfessorConfig;
import com.monsite.Backend.model.Etudiant;
import com.monsite.Backend.model.Enseignant;
import com.monsite.Backend.repository.EtudiantRepository;
import com.monsite.Backend.repository.EnseignantRepository;
import com.monsite.Backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;

@Service
public class DefaultUsersInitializationService {

    @Autowired
    private StudentConfig studentConfig;

    @Autowired
    private ProfessorConfig professorConfig;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeDefaultUsers() {
        initializeStudent();
        initializeProfessor();
    }

    private void initializeStudent() {
        if (utilisateurRepository.findByEmail(studentConfig.getEmail()).isEmpty()) {
            Etudiant student = new Etudiant();
            student.setEmail(studentConfig.getEmail());
            student.setMotDePasse(passwordEncoder.encode(studentConfig.getPassword()));
            student.setNom(studentConfig.getNom());
            student.setPrenom(studentConfig.getPrenom());
            student.setNumeroCarteNationale(studentConfig.getNumeroCarteNationale());
            student.setTelephone(studentConfig.getTelephone());
            student.setDateNaissance(LocalDate.parse(studentConfig.getDateNaissance()));
            student.setGenre(studentConfig.getGenre());
            student.setRole("ETUDIANT");
            student.setFiliere(studentConfig.getFiliere());
            student.setAnnee(studentConfig.getAnnee());

            etudiantRepository.save(student);
        }
    }

    private void initializeProfessor() {
        if (utilisateurRepository.findByEmail(professorConfig.getEmail()).isEmpty()) {
            Enseignant professor = new Enseignant();
            professor.setEmail(professorConfig.getEmail());
            professor.setMotDePasse(passwordEncoder.encode(professorConfig.getPassword()));
            professor.setNom(professorConfig.getNom());
            professor.setPrenom(professorConfig.getPrenom());
            professor.setNumeroCarteNationale(professorConfig.getNumeroCarteNationale());
            professor.setTelephone(professorConfig.getTelephone());
            professor.setDateNaissance(LocalDate.parse(professorConfig.getDateNaissance()));
            professor.setGenre(professorConfig.getGenre());
            professor.setRole("ENSEIGNANT");
            professor.setSpecialite(professorConfig.getSpecialite());

            enseignantRepository.save(professor);
        }
    }
} 