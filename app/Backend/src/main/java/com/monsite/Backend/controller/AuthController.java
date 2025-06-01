package com.monsite.Backend.controller;

import com.monsite.Backend.dto.LoginDTO;
import com.monsite.Backend.service.AuthenticationService;
import com.monsite.Backend.model.Utilisateur;
import com.monsite.Backend.model.Etudiant;
import com.monsite.Backend.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Angular port
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            String token = authenticationService.authenticate(loginDTO);
            
            // Récupérer l'utilisateur pour la réponse
            Utilisateur utilisateur = utilisateurRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            
            UserResponse userResponse = new UserResponse(utilisateur);
            AuthResponse authResponse = new AuthResponse(token, userResponse);
            
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // Classe pour la réponse d'authentification complète
    public static class AuthResponse {
        private String token;
        private UserResponse user;

        public AuthResponse(String token, UserResponse user) {
            this.token = token;
            this.user = user;
        }

        // Getters et setters
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public UserResponse getUser() { return user; }
        public void setUser(UserResponse user) { this.user = user; }
    }

    // Classe pour la réponse utilisateur (sans mot de passe)
    public static class UserResponse {
        private String id;
        private String nom;
        private String prenom;
        private String email;
        private String telephone;
        private String numeroCarteNationale;
        private String filiere;
        private String annee;
        private String dateNaissance;
        private String genre;
        private String role;
        private String statut;

        // Constructeur par défaut
        public UserResponse() {}

        // Constructeur à partir d'un Utilisateur
        public UserResponse(Utilisateur utilisateur) {
            this.id = utilisateur.getId().toString();
            this.nom = utilisateur.getNom();
            this.prenom = utilisateur.getPrenom();
            this.email = utilisateur.getEmail();
            this.telephone = utilisateur.getTelephone();
            this.numeroCarteNationale = utilisateur.getNumeroCarteNationale();
            this.dateNaissance = utilisateur.getDateNaissance() != null ? utilisateur.getDateNaissance().toString() : null;
            this.genre = utilisateur.getGenre();
            this.role = utilisateur.getRole();
            
            // Si c'est un étudiant, récupérer filiere et annee
            if (utilisateur instanceof Etudiant) {
                Etudiant etudiant = (Etudiant) utilisateur;
                this.filiere = etudiant.getFiliere();
                this.annee = etudiant.getAnnee();
            }
        }

        // Getters et setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }
        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getTelephone() { return telephone; }
        public void setTelephone(String telephone) { this.telephone = telephone; }
        public String getNumeroCarteNationale() { return numeroCarteNationale; }
        public void setNumeroCarteNationale(String numeroCarteNationale) { this.numeroCarteNationale = numeroCarteNationale; }
        public String getFiliere() { return filiere; }
        public void setFiliere(String filiere) { this.filiere = filiere; }
        public String getAnnee() { return annee; }
        public void setAnnee(String annee) { this.annee = annee; }
        public String getDateNaissance() { return dateNaissance; }
        public void setDateNaissance(String dateNaissance) { this.dateNaissance = dateNaissance; }
        public String getGenre() { return genre; }
        public void setGenre(String genre) { this.genre = genre; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getStatut() { return statut; }
        public void setStatut(String statut) { this.statut = statut; }
    }

    // Classe pour les erreurs
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}