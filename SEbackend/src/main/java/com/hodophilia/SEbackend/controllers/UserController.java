package com.hodophilia.SEbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.exception.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.User;
import com.hodophilia.SEbackend.repository.UserRepository;
import com.hodophilia.SEbackend.security.CurrentUser;
import com.hodophilia.SEbackend.security.services.UserPrincipal;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
