package com.monsite.Backend.service;

import com.monsite.Backend.dto.LoginDTO;
import com.monsite.Backend.model.Utilisateur;
import com.monsite.Backend.repository.UtilisateurRepository;
import com.monsite.Backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String authenticate(LoginDTO loginDTO) {
        // Rechercher l'utilisateur par email
        Utilisateur utilisateur = utilisateurRepository.findByEmail(loginDTO.getEmail())
            .orElseThrow(() -> new BadCredentialsException("Email ou mot de passe incorrect"));

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(loginDTO.getMotDePasse(), utilisateur.getMotDePasse())) {
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }

        // Vérifier si l'utilisateur est autorisé à se connecter
        if (!isUserAllowedToLogin(utilisateur)) {
            throw new BadCredentialsException("Votre compte n'est pas encore activé ou a été refusé");
        }

        // Générer le token JWT
        return jwtService.generateToken(utilisateur);
    }

    private boolean isUserAllowedToLogin(Utilisateur utilisateur) {
        // Si c'est un administrateur, toujours autorisé
        if ("ADMIN".equals(utilisateur.getRole())) {
            return true;
        }

        // Pour les étudiants et enseignants, ils sont toujours autorisés car ils sont déjà acceptés
        if ("ETUDIANT".equals(utilisateur.getRole()) || "ENSEIGNANT".equals(utilisateur.getRole())) {
            return true;
        }

        return false;
    }
}