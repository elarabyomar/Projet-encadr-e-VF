package com.monsite.Backend.repository;

import com.monsite.Backend.model.Classe;
import com.monsite.Backend.model.Element;
import com.monsite.Backend.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElementRepository extends JpaRepository<Element, Long> {
    @Query("SELECT DISTINCT e FROM Element e JOIN Devoir d ON d.element = e WHERE d.classe = :classe AND d.enseignant = :enseignant")
    List<Element> findByClasseAndEnseignant(@Param("classe") Classe classe, @Param("enseignant") Enseignant enseignant);
}
