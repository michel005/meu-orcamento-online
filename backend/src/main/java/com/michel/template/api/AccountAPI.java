package com.michel.template.api;

import com.michel.template.entity.Account;
import com.michel.template.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/account")
public class AccountAPI {

    @Autowired
    private AccountRepo accountRepo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Account account) {
        account.setId(UUID.randomUUID());
        return ResponseEntity.ok(accountRepo.save(account));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Account account) {
        return ResponseEntity.ok(accountRepo.save(account));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam UUID id) {
        accountRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
