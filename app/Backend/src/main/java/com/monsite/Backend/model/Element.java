package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @ManyToOne
    private Module module;

    @OneToMany(mappedBy = "element")
    private List<Devoir> devoirs;

    @OneToMany(mappedBy = "element")
    private List<Ressource> ressources;
    // getters et setters à ajouter

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
}
