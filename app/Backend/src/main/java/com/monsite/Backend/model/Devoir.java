package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Devoir {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    private LocalDate dateLimite;

    @ManyToOne
    private Enseignant enseignant;

    @ManyToOne
    private Classe classe;

    @ManyToOne
    private Element element;
    // getters et setters à ajouter
}
