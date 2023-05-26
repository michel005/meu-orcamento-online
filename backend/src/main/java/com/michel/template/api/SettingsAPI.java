package com.michel.template.api;

import com.michel.template.entity.Settings;
import com.michel.template.repository.SettingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/settings")
public class SettingsAPI extends AbstractAPI<Settings, SettingsRepo> {

}
