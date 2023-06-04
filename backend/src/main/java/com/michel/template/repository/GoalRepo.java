package com.michel.template.repository;

import com.michel.template.entity.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface GoalRepo extends MongoRepository<Goal, UUID> {
}
