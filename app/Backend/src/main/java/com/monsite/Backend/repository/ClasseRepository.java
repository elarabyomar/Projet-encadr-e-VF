package com.monsite.Backend.repository;

import com.monsite.Backend.model.Classe;
import com.monsite.Backend.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ClasseRepository extends JpaRepository<Classe, Long> {
    @Query("SELECT DISTINCT c FROM Classe c JOIN c.devoirs d WHERE d.enseignant = :enseignant")
    List<Classe> findByEnseignant(@Param("enseignant") Enseignant enseignant);
}
