package com.michel.template.repository;

import com.michel.template.entity.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TemplateRepo extends MongoRepository<Template, UUID> {
}
