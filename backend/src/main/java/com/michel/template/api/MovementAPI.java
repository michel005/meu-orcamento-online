package com.michel.template.api;

import com.michel.template.entity.Account;
import com.michel.template.entity.Movement;
import com.michel.template.repository.AccountRepo;
import com.michel.template.repository.MovementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/movement")
public class MovementAPI extends AbstractAPI<Movement, MovementRepo> {

}
