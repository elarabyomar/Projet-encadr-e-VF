package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Absence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String motif;
    private boolean justifie;

    @ManyToOne
    private Etudiant etudiant;

    @ManyToOne
    private Classe classe;
    // getters et setters à ajouter
}
