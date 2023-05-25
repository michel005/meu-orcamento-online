package com.michel.template.entity;

public enum AccountType {

    DEBIT("Débito"), CREDIT("Crédito"), SAVINGS("Poupança"), INVESTMENT("Investimento"), SALARY("Salário");

    private final String description;

    AccountType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
