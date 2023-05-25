package com.michel.template.repository;

import com.michel.template.entity.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface AccountRepo extends MongoRepository<Account, UUID> {
}
