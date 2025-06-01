package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Etudiant extends Utilisateur {
    private String filiere;
    private String annee;
    @OneToMany(mappedBy = "etudiant")
    private List<Inscription> inscriptions;

    @OneToMany(mappedBy = "etudiant")
    private List<Absence> absences;

    public String getFiliere() {
        return filiere;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public List<Inscription> getInscriptions() {
        return inscriptions;
    }

    public void setInscriptions(List<Inscription> inscriptions) {
        this.inscriptions = inscriptions;
    }

    public List<Absence> getAbsences() {
        return absences;
    }

    public void setAbsences(List<Absence> absences) {
        this.absences = absences;
    }
}
