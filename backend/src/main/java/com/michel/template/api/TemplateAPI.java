package com.michel.template.api;

import com.michel.template.entity.Movement;
import com.michel.template.entity.Template;
import com.michel.template.repository.MovementRepo;
import com.michel.template.repository.TemplateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/template")
public class TemplateAPI extends AbstractAPI<Template, TemplateRepo> {

}
