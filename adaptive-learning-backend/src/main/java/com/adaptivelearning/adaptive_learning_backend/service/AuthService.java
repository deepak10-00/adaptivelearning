package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.Hod;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.entity.Role;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import com.adaptivelearning.adaptive_learning_backend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final HodService hodService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       HodService hodService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.hodService = hodService;
    }

    @Transactional
    public User registerUser(User user, Hod hodDetails) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(Role.STUDENT);
        }

        User savedUser = userRepository.save(user);

        if (user.getRole() == Role.HOD && hodDetails != null) {
            // Link the saved user to the Hod entity
            hodDetails.setUser(savedUser);
            hodService.saveHod(hodDetails);
        }

        return savedUser;
    }

    public String login(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        User user = userOptional.get();
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return jwtUtil.generateToken(user.getEmail());
    }
}
