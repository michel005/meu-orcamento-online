package com.michel.template.api;

import com.michel.template.entity.Settings;
import com.michel.template.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/api")
public class AllAPI {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private MovementRepo movementRepo;

    @Autowired
    private TemplateRepo templateRepo;

    @Autowired
    private SettingsRepo settingsRepo;

    @Autowired
    private GoalRepo goalRepo;

    @GetMapping("/all")
    private ResponseEntity<?> all() {
        Map<String, Object> all = new TreeMap<>();
        all.put("accounts", accountRepo.findAll());
        all.put("movements", movementRepo.findAll());
        all.put("templates", templateRepo.findAll());
        all.put("goals", goalRepo.findAll());
        all.put("settings", settingsRepo.findAll().stream().findFirst().orElse(new Settings()));
        return ResponseEntity.ok(all);
    }

}
