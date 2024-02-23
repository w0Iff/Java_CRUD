package com.example.crud.service;

import com.example.crud.entity.Entity;
import com.example.crud.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntityService {
    private final EntityRepository entityRepository;

    @Autowired
    public EntityService(EntityRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    public List<Entity> getAllEntities() {
        return entityRepository.findAll();
    }

    public Optional<Entity> getEntityById(Long id) {
        return entityRepository.findById(id);
    }

    public Entity createEntity(Entity entity) {
        if (!isValidName(entity.getName())) {
            throw new IllegalArgumentException("Polskie znaki są niedopuszczalne");
        }
        return entityRepository.save(entity);
    }

    public Entity updateEntity(Long id, Entity updatedEntity) {
        Entity entity = entityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wpis nie został znaleziony"));
        entity.setName(updatedEntity.getName());
        return entityRepository.save(entity);
    }

    public void deleteEntity(Long id) {
        entityRepository.deleteById(id);
    }

    private boolean isValidName(String name) {
        return name != null && name.matches("^[a-zA-Z][a-zA-Z\\s]*$");
    }
}