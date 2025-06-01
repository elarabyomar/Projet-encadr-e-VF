package com.monsite.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Enseignant extends Utilisateur {
    private String specialite;

    @OneToMany(mappedBy = "enseignant")
    private List<Devoir> devoirs;

    @OneToMany(mappedBy = "enseignant")
    private List<Ressource> ressources;

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public List<Devoir> getDevoirs() {
        return devoirs;
    }

    public void setDevoirs(List<Devoir> devoirs) {
        this.devoirs = devoirs;
    }

    public List<Ressource> getRessources() {
        return ressources;
    }

    public void setRessources(List<Ressource> ressources) {
        this.ressources = ressources;
    }
}
