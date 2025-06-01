package com.monsite.Backend.dto;

import java.time.LocalDate;

public class NoteDTO {
    private Long etudiantId;
    private Long elementId;
    private Double valeur;
    private String type; // "examen", "controle"
    private LocalDate date;

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }
    public Long getElementId() { return elementId; }
    public void setElementId(Long elementId) { this.elementId = elementId; }
    public Double getValeur() { return valeur; }
    public void setValeur(Double valeur) { this.valeur = valeur; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
