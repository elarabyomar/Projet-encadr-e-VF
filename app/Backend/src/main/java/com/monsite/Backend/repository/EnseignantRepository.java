package com.monsite.Backend.repository;

import com.monsite.Backend.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
    default Optional<Enseignant> findByUsername(String username) {
        // You may need to implement this with a @Query or by adding a username field to Enseignant
        return Optional.empty();
    }
}