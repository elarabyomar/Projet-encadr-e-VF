package com.monsite.Backend.service;

import com.monsite.Backend.model.Inscription;
import com.monsite.Backend.model.Utilisateur;
import com.monsite.Backend.model.Etudiant;
import com.monsite.Backend.model.Enseignant;
import com.monsite.Backend.repository.InscriptionRepository;
import com.monsite.Backend.repository.UtilisateurRepository;
import com.monsite.Backend.repository.EtudiantRepository;
import com.monsite.Backend.repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public Inscription creerInscription(Inscription inscription) {
        // Vérifier si l'email existe déjà
        if (inscriptionRepository.findByEmail(inscription.getEmail()).isPresent() ||
            utilisateurRepository.findByEmail(inscription.getEmail()).isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        // Vérifier si le numéro de carte nationale existe déjà
        if (inscriptionRepository.findByNumeroCarteNationale(inscription.getNumeroCarteNationale()).isPresent()) {
            throw new RuntimeException("Ce numéro de carte nationale est déjà utilisé");
        }

        // Gestion des champs selon le rôle
        if ("ENSEIGNANT".equals(inscription.getRole())) {
            inscription.setFiliere(null);
            inscription.setAnnee(null);
        }

        // Encoder le mot de passe
        inscription.setMotDePasse(passwordEncoder.encode(inscription.getMotDePasse()));
        
        return inscriptionRepository.save(inscription);
    }

    public List<Inscription> getInscriptionsEnAttente() {
        return inscriptionRepository.findByStatut("EN_ATTENTE");
    }

    @Transactional
    public void accepterInscription(Long id) {
        Inscription inscription = inscriptionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        if (!"EN_ATTENTE".equals(inscription.getStatut())) {
            throw new RuntimeException("Cette inscription a déjà été traitée");
        }

        // Créer l'utilisateur correspondant
        if ("ETUDIANT".equals(inscription.getRole())) {
            Etudiant etudiant = new Etudiant();
            copyInscriptionToUtilisateur(inscription, etudiant);
            utilisateurRepository.save(etudiant);
            etudiantRepository.save(etudiant);
        } else if ("ENSEIGNANT".equals(inscription.getRole())) {
            Enseignant enseignant = new Enseignant();
            copyInscriptionToUtilisateur(inscription, enseignant);
            utilisateurRepository.save(enseignant);
            enseignantRepository.save(enseignant);
        } else {
            throw new RuntimeException("Rôle non valide");
        }

        // Envoyer l'email de confirmation
        try {
            emailService.envoyerEmailAcceptation(
                inscription.getEmail(),
                inscription.getNom(),
                inscription.getPrenom()
            );
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'email d'acceptation: " + e.getMessage());
        }        // Mettre à jour le statut de l'inscription
        inscription.setStatut("ACCEPTEE");
        inscriptionRepository.save(inscription);
    }

    @Transactional
    public void refuserInscription(Long id) {
        Inscription inscription = inscriptionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        if (!"EN_ATTENTE".equals(inscription.getStatut())) {
            throw new RuntimeException("Cette inscription a déjà été traitée");
        }

        // Envoyer l'email de refus avant de supprimer l'inscription
        try {
            emailService.envoyerEmailRefus(
                inscription.getEmail(),
                inscription.getNom(),
                inscription.getPrenom()
            );
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'email de refus: " + e.getMessage());
        }

        // Supprimer l'inscription
        inscriptionRepository.delete(inscription);
    }

    private void copyInscriptionToUtilisateur(Inscription inscription, Utilisateur utilisateur) {
        utilisateur.setNom(inscription.getNom());
        utilisateur.setPrenom(inscription.getPrenom());
        utilisateur.setEmail(inscription.getEmail());
        utilisateur.setMotDePasse(inscription.getMotDePasse());
        utilisateur.setRole(inscription.getRole());
        utilisateur.setNumeroCarteNationale(inscription.getNumeroCarteNationale());
        utilisateur.setTelephone(inscription.getTelephone());
        utilisateur.setDateNaissance(inscription.getDateNaissance());
        utilisateur.setGenre(inscription.getGenre());
        if (utilisateur instanceof Etudiant) {
            ((Etudiant) utilisateur).setFiliere(inscription.getFiliere());
            ((Etudiant) utilisateur).setAnnee(inscription.getAnnee());
        }
    }

    // Ajout des méthodes manquantes
    public List<Inscription> getAllInscriptions() {
        return inscriptionRepository.findAll();
    }

    public Inscription getInscriptionById(Long id) {
        return inscriptionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
    }

    public void deleteInscription(Long id) {
        Inscription inscription = inscriptionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
        inscriptionRepository.delete(inscription);
    }

    public List<Inscription> getInscriptionsAcceptees() {
        return inscriptionRepository.findByStatut("ACCEPTEE");
    }
}