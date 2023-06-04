package com.michel.template.api;

import com.michel.template.entity.Account;
import com.michel.template.entity.Goal;
import com.michel.template.entity.GoalStatus;
import com.michel.template.entity.Movement;
import com.michel.template.repository.AccountRepo;
import com.michel.template.repository.GoalRepo;
import com.michel.template.repository.MovementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/movement")
public class MovementAPI extends AbstractAPI<Movement, MovementRepo> {

    @Autowired
    private GoalRepo goalRepo;

    @Override
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Movement movement) {
        if (movement.getGoal() != null && movement.getGoal().getStatus().equals(GoalStatus.OPEN)) {
            movement.getGoal().setStatus(GoalStatus.IN_PROGRESS);
            movement.setGoal(goalRepo.save(movement.getGoal()));
        }
        return super.create(movement);
    }

    @Override
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Movement movement) {
        if (movement.getGoal() != null && movement.getGoal().getStatus().equals(GoalStatus.OPEN)) {
            movement.getGoal().setStatus(GoalStatus.IN_PROGRESS);
            movement.setGoal(goalRepo.save(movement.getGoal()));
        }
        return super.update(movement);
    }

}
