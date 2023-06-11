package com.michel.template.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("transfer")
public class Transfer extends AbstractEntity {

    @DBRef
    private Movement originMovement;

    @DBRef
    private Movement destinyMovement;

}
