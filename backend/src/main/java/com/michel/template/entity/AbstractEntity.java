package com.michel.template.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
public abstract class AbstractEntity {

    @Id
    private UUID id;

}
