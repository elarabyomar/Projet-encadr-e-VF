package com.monsite.Backend.service;

import com.monsite.Backend.config.AdminConfig;
import com.monsite.Backend.model.Administrateur;
import com.monsite.Backend.repository.AdministrateurRepository;
import com.monsite.Backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminInitializationService {

    @Autowired
    private AdminConfig adminConfig;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AdministrateurRepository administrateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeAdmin() {
        // Vérifier si l'admin existe déjà
        if (utilisateurRepository.findByEmail(adminConfig.getEmail()).isEmpty()) {
            // Créer l'administrateur
            Administrateur admin = new Administrateur();
            admin.setEmail(adminConfig.getEmail());
            admin.setMotDePasse(passwordEncoder.encode(adminConfig.getPassword()));
            admin.setNom(adminConfig.getNom());
            admin.setPrenom(adminConfig.getPrenom());
            admin.setRole("ADMIN");

            administrateurRepository.save(admin);
        }
    }
}