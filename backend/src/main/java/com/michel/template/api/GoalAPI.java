package com.michel.template.api;

import com.michel.template.entity.Goal;
import com.michel.template.repository.GoalRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/goal")
public class GoalAPI extends AbstractAPI<Goal, GoalRepo> {
}
