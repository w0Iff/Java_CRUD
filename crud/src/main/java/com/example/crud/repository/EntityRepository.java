package com.example.crud.repository;

import com.example.crud.entity.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface EntityRepository extends JpaRepository<Entity, Long> {
    }

