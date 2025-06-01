// Source code is decompiled from a .class file using FernFlower decompiler.
package com.monsite.Backend.controller;

import com.monsite.Backend.dto.InscriptionDTO;
import com.monsite.Backend.model.Inscription;
import com.monsite.Backend.service.InscriptionService;
import com.monsite.Backend.controller.AuthController.AuthResponse;
import com.monsite.Backend.controller.AuthController.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:4200")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;    @PostMapping("/creer")
    public ResponseEntity<?> creerInscription(@RequestBody InscriptionDTO dto) {
        try {
            Inscription inscription = new Inscription();
            inscription.setNom(dto.getNom());
            inscription.setPrenom(dto.getPrenom());
            inscription.setEmail(dto.getEmail());
            inscription.setMotDePasse(dto.getMotDePasse());
            inscription.setNumeroCarteNationale(dto.getNumeroCarteNationale());
            inscription.setFiliere(dto.getFiliere());
            inscription.setAnnee(dto.getAnnee());
            inscription.setRole(dto.getRole());
            inscription.setTelephone(dto.getTelephone());
            inscription.setDateNaissance(dto.getDateNaissance());
            inscription.setGenre(dto.getGenre());
            
            Inscription savedInscription = inscriptionService.creerInscription(inscription);
            
            // Créer une réponse utilisateur pour l'inscription en attente
            UserResponse userResponse = new UserResponse();
            userResponse.setId(savedInscription.getId().toString());
            userResponse.setNom(savedInscription.getNom());
            userResponse.setPrenom(savedInscription.getPrenom());
            userResponse.setEmail(savedInscription.getEmail());
            userResponse.setTelephone(savedInscription.getTelephone());
            userResponse.setNumeroCarteNationale(savedInscription.getNumeroCarteNationale());
            userResponse.setFiliere(savedInscription.getFiliere());
            userResponse.setAnnee(savedInscription.getAnnee());
            userResponse.setDateNaissance(savedInscription.getDateNaissance() != null ? savedInscription.getDateNaissance().toString() : null);
            userResponse.setGenre(savedInscription.getGenre());
            userResponse.setRole(savedInscription.getRole());
            userResponse.setStatut(savedInscription.getStatut());
            
            // Retourner une AuthResponse avec un token vide (car en attente d'approbation)
            AuthResponse authResponse = new AuthResponse("", userResponse);
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/en-attente")
    public ResponseEntity<List<Inscription>> getInscriptionsEnAttente() {
        try {
            List<Inscription> inscriptions = inscriptionService.getInscriptionsEnAttente();
            System.out.println("Nombre d'inscriptions en attente trouvées: " + inscriptions.size());
            return ResponseEntity.ok(inscriptions);
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des inscriptions: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }    @PutMapping("/{id}/accepter")
    public ResponseEntity<?> accepterInscription(@PathVariable Long id) {
        try {
            inscriptionService.accepterInscription(id);
            return ResponseEntity.ok().body(new MessageResponse("Inscription acceptée avec succès"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/refuser")
    public ResponseEntity<?> refuserInscription(@PathVariable Long id) {
        try {
            inscriptionService.refuserInscription(id);
            return ResponseEntity.ok().body(new MessageResponse("Inscription refusée avec succès"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Inscription>> getAllInscriptions() {
        try {
            return ResponseEntity.ok(inscriptionService.getAllInscriptions());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscription(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(inscriptionService.getInscriptionById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInscription(@PathVariable Long id) {
        try {
            inscriptionService.deleteInscription(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint fonctionne !");
    }

    @GetMapping("/acceptees")
    public ResponseEntity<List<Inscription>> getInscriptionsAcceptees() {
        try {
            List<Inscription> inscriptions = inscriptionService.getInscriptionsAcceptees();
            return ResponseEntity.ok(inscriptions);
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des inscriptions acceptées: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Response classes for JSON responses
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() { return error; }
        public void setError(String error) { this.error = error; }
    }
}
