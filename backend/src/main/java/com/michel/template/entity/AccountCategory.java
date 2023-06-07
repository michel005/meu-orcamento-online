package com.michel.template.entity;

public enum AccountCategory {

    DEBIT("Débito"), CREDIT("Crédito"), SAVINGS("Poupança"), INVESTMENT("Investimento"), SALARY("Salário");

    private final String description;

    AccountCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
