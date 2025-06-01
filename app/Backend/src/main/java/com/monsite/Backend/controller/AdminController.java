package com.monsite.Backend.controller;

import com.monsite.Backend.model.Inscription;
import com.monsite.Backend.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private InscriptionService inscriptionService;

    @GetMapping("/inscriptions")
    public ResponseEntity<List<Inscription>> getInscriptionsEnAttente() {
        return ResponseEntity.ok(inscriptionService.getInscriptionsEnAttente());
    }

    @PostMapping("/inscriptions/{id}/accepter")
    public ResponseEntity<?> accepterInscription(@PathVariable Long id) {
        try {
            inscriptionService.accepterInscription(id);
            return ResponseEntity.ok().body("Inscription acceptée avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/inscriptions/{id}/refuser")
    public ResponseEntity<?> refuserInscription(@PathVariable Long id) {
        try {
            inscriptionService.refuserInscription(id);
            return ResponseEntity.ok().body("Inscription refusée avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}