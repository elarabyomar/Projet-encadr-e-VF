package com.monsite.Backend.service;

import com.monsite.Backend.dto.InscriptionDTO;
import com.monsite.Backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ValidationService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<String> validateInscription(InscriptionDTO inscriptionDTO) {
        List<String> errors = new ArrayList<>();

        // Vérification si l'email existe déjà
        if (utilisateurRepository.findByEmail(inscriptionDTO.getEmail()).isPresent()) {
            errors.add("Cet email est déjà utilisé");
        }

        // Vérification de la complexité du mot de passe
        if (!isPasswordComplex(inscriptionDTO.getMotDePasse())) {
            errors.add("Le mot de passe ne respecte pas les critères de sécurité");
        }

        // Validation spécifique selon le rôle
        if ("ENSEIGNANT".equals(inscriptionDTO.getRole())) {
            // Pour les enseignants, annee et filiere doivent être vides
            if (inscriptionDTO.getFiliere() != null && !inscriptionDTO.getFiliere().isEmpty()) {
                errors.add("Le champ filière doit être vide pour un enseignant");
            }
            if (inscriptionDTO.getAnnee() != null && !inscriptionDTO.getAnnee().isEmpty()) {
                errors.add("Le champ année doit être vide pour un enseignant");
            }
        } else if ("ETUDIANT".equals(inscriptionDTO.getRole())) {
            // Pour les étudiants, annee et filiere sont obligatoires
            if (inscriptionDTO.getFiliere() == null || inscriptionDTO.getFiliere().isEmpty()) {
                errors.add("La filière est obligatoire pour un étudiant");
            }
            if (inscriptionDTO.getAnnee() == null || inscriptionDTO.getAnnee().isEmpty()) {
                errors.add("L'année est obligatoire pour un étudiant");
            }
        }

        // Vérification de la cohérence des données
        if (containsSuspiciousPatterns(inscriptionDTO)) {
            errors.add("Les données contiennent des motifs suspects");
        }

        return errors;
    }

    private boolean isPasswordComplex(String password) {
        // Vérification de la complexité du mot de passe
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        boolean hasLowerCase = password.matches(".*[a-z].*");
        boolean hasNumber = password.matches(".*\\d.*");
        boolean hasSpecialChar = password.matches(".*[@#$%^&+=].*");
        boolean hasMinLength = password.length() >= 8;
        boolean noWhitespace = !password.contains(" ");

        return hasUpperCase && hasLowerCase && hasNumber && 
               hasSpecialChar && hasMinLength && noWhitespace;
    }

    private boolean containsSuspiciousPatterns(InscriptionDTO dto) {
        // Vérification des motifs suspects dans les données
        String[] suspiciousPatterns = {
            "<script>", "javascript:", "data:", 
            "SELECT", "INSERT", "UPDATE", "DELETE", "DROP",
            "../", "..\\", "%00", "null", "undefined"
        };

        String allData = String.join(" ", 
            dto.getNom(),
            dto.getPrenom(),
            dto.getEmail(),
            dto.getFiliere(),
            dto.getNumeroCarteNationale()
        ).toLowerCase();

        for (String pattern : suspiciousPatterns) {
            if (allData.contains(pattern.toLowerCase())) {
                return true;
            }
        }

        return false;
    }
}