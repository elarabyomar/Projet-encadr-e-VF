package com.monsite.Backend.model;

import jakarta.persistence.*;

@Entity
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String url;
    private String type;

    @ManyToOne
    private Enseignant enseignant;

    @ManyToOne
    private Element element;
    // getters et setters à ajouter
}
