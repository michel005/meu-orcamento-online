package com.michel.template.api;

import com.michel.template.entity.Account;
import com.michel.template.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/account")
public class AccountAPI extends AbstractAPI<Account, AccountRepo> {

}
