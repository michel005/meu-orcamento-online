package com.michel.template.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document("settings")
public class Settings extends AbstractEntity {

    private String colorSchema;

    private boolean showBalanceCards;
    private boolean showPendentMovements;
    private boolean showGoals;
    private boolean showBalanceByDayChart;

}
