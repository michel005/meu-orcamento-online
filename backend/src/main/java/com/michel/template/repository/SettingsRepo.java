package com.michel.template.repository;

import com.michel.template.entity.Settings;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface SettingsRepo extends MongoRepository<Settings, UUID> {
}
