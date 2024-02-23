package com.example.crud.controller;


import com.example.crud.entity.Entity;
import com.example.crud.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/encje")
@CrossOrigin
public class EntityController {
    @Autowired
    private EntityService entityService;
    @Autowired
    public EntityController(EntityService entityService) {
        this.entityService = entityService;
    }

    @GetMapping
    public List<Entity> getAllEntities() {
        return entityService.getAllEntities();
    }

    @GetMapping("/{id}")
    public Entity getEntityById(@PathVariable Long id) {
        return entityService.getEntityById(id)
                .orElseThrow(() -> new RuntimeException("Wpis nie został znaleziony"));
    }

    @PostMapping
    public Entity createEntity(@RequestBody Entity entity) {
        return entityService.createEntity(entity);
    }

    @PutMapping("/{id}")
    public Entity updateEntity(@PathVariable Long id, @RequestBody Entity updatedEntity) {
        return entityService.updateEntity(id, updatedEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteEntity(@PathVariable Long id) {
        entityService.deleteEntity(id);
    }
}


