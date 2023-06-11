package com.michel.template.api;

import com.michel.template.entity.Transfer;
import com.michel.template.repository.MovementRepo;
import com.michel.template.repository.TransferRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/transfer")
public class TransferAPI extends AbstractAPI<Transfer, TransferRepo> {

    @Autowired
    private MovementRepo movementRepo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Transfer e) {
        e.setId(UUID.randomUUID());

        e.getDestinyMovement().setId(UUID.randomUUID());
        e.setDestinyMovement(movementRepo.save(e.getDestinyMovement()));

        e.getOriginMovement().setId(UUID.randomUUID());
        e.setOriginMovement(movementRepo.save(e.getOriginMovement()));

        return ResponseEntity.ok(repo.save(e));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Transfer e) {
        e.setDestinyMovement(movementRepo.save(e.getDestinyMovement()));
        e.setOriginMovement(movementRepo.save(e.getOriginMovement()));
        return ResponseEntity.ok(repo.save(e));
    }

}
