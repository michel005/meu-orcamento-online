package com.michel.template.api;

import com.michel.template.entity.Account;
import com.michel.template.entity.Movement;
import com.michel.template.repository.AccountRepo;
import com.michel.template.repository.MovementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/movement")
public class MovementAPI {

    @Autowired
    private MovementRepo movementRepo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Movement movement) {
        movement.setId(UUID.randomUUID());
        return ResponseEntity.ok(movementRepo.save(movement));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Movement movement) {
        System.out.println(movement);
        return ResponseEntity.ok(movementRepo.save(movement));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam UUID id) {
        movementRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
