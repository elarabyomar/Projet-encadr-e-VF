package com.monsite.Backend.repository;

import com.monsite.Backend.model.Administrateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministrateurRepository extends JpaRepository<Administrateur, Long> {
}