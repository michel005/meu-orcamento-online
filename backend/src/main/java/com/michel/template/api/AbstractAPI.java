package com.michel.template.api;

import com.michel.template.entity.AbstractEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

public abstract class AbstractAPI <E extends AbstractEntity, R extends MongoRepository<E, UUID>> {

    @Autowired
    private R repo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody E e) {
        e.setId(UUID.randomUUID());
        return ResponseEntity.ok(repo.save(e));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody E e) {
        return ResponseEntity.ok(repo.save(e));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam UUID id) {
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
