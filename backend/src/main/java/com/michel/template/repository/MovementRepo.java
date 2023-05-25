package com.michel.template.repository;

import com.michel.template.entity.Movement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface MovementRepo extends MongoRepository<Movement, UUID> {
}
