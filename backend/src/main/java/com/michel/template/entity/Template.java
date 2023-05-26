package com.michel.template.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Document("template")
public class Template extends AbstractEntity{

    private Integer day;
    private String description;
    @DBRef
    private Account account;
    private Long value;

}
