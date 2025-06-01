package com.monsite.Backend.dto;

import java.time.LocalDate;

public class InscriptionDTO {
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String numeroCarteNationale;
    private String filiere;
    private String annee;
    private String role;
    private String telephone;
    private LocalDate dateNaissance;
    private String genre;

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
    public String getNumeroCarteNationale() { return numeroCarteNationale; }
    public void setNumeroCarteNationale(String numeroCarteNationale) { this.numeroCarteNationale = numeroCarteNationale; }
    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }
    public String getAnnee() { return annee; }
    public void setAnnee(String annee) { this.annee = annee; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public LocalDate getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(LocalDate dateNaissance) { this.dateNaissance = dateNaissance; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
}
