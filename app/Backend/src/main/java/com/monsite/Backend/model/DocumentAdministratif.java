package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class DocumentAdministratif {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String statut;
    private LocalDate dateDemande;

    @ManyToOne
    private Utilisateur utilisateur;
    // getters et setters à ajouter
}
