package com.monsite.Backend.repository;

import com.monsite.Backend.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    Optional<Inscription> findByEmail(String email);
    Optional<Inscription> findByNumeroCarteNationale(String numeroCarteNationale);
    List<Inscription> findByStatut(String statut);
}
