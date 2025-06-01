package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @OneToMany(mappedBy = "module")
    private List<Element> elements;
    // getters et setters à ajouter
}
