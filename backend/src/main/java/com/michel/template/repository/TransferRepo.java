package com.michel.template.repository;

import com.michel.template.entity.Transfer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TransferRepo extends MongoRepository<Transfer, UUID> {
}
