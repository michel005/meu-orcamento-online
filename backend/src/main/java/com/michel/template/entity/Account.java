package com.michel.template.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("account")
public class Account extends AbstractEntity {

    private String name;
    private AccountCategory category;

}
