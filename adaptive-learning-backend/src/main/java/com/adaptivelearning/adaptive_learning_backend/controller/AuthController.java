package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.dto.RegisterRequest;
import com.adaptivelearning.adaptive_learning_backend.dto.AuthRequest;
import com.adaptivelearning.adaptive_learning_backend.entity.*;
import com.adaptivelearning.adaptive_learning_backend.service.*;
import com.adaptivelearning.adaptive_learning_backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final StudentService studentService;
    private final ProfessorService professorService;
    private final HodService hodService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService,
                          StudentService studentService,
                          ProfessorService professorService,
                          HodService hodService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.studentService = studentService;
        this.professorService = professorService;
        this.hodService = hodService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            System.out.println("[DEBUG] Registration request: " + registerRequest);

            String emailNormalized = registerRequest.getEmail().trim().toLowerCase();
            System.out.println("[DEBUG] Normalized email: " + emailNormalized);

            if (userService.findByEmail(emailNormalized).isPresent()) {
                System.out.println("[DEBUG] Email already exists: " + emailNormalized);
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
            }

            Role userRole;
            try {
                userRole = Role.valueOf(registerRequest.getRole().toUpperCase());
                System.out.println("[DEBUG] Role resolved: " + userRole);
            } catch (IllegalArgumentException e) {
                System.out.println("[DEBUG] Invalid role: " + registerRequest.getRole());
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid role specified"));
            }

            User user = new User();
            user.setName(registerRequest.getName());
            user.setMobile(registerRequest.getMobile());
            user.setEmail(emailNormalized);
            user.setRole(userRole);
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            User savedUser = userService.saveUser(user);
            System.out.println("[DEBUG] User saved: " + savedUser.getId());

            switch (savedUser.getRole()) {
                case STUDENT:
                    try {
                        if (studentService.findByUserId(savedUser.getId()).isEmpty()) {
                            Student student = new Student();
                            student.setName(savedUser.getName());
                            student.setMobile(savedUser.getMobile());
                            student.setPassword(savedUser.getPassword());
                            student.setEmail(savedUser.getEmail());
                            student.setUser(savedUser);
                            studentService.saveStudent(student);
                            System.out.println("[DEBUG] Student saved for userId: " + savedUser.getId());
                        }
                        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
                    } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "Student registration failed: " + e.getMessage()));
                    }
                case PROFESSOR:
                    try {
                        if (professorService.findByUserId(savedUser.getId()).isEmpty()) {
                            Professor professor = new Professor();
                            professor.setName(savedUser.getName());
                            professor.setMobile(savedUser.getMobile());
                            professor.setPassword(savedUser.getPassword());
                            professor.setEmail(savedUser.getEmail());
                            professor.setUser(savedUser);
                            professor.setJoiningDate(LocalDate.now());
                            professorService.saveProfessor(professor);
                            System.out.println("[DEBUG] Professor saved for userId: " + savedUser.getId());
                        }
                        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
                    } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "Professor registration failed: " + e.getMessage()));
                    }
                case HOD:
                    try {
                        if (hodService.findByUserId(savedUser.getId()).isEmpty()) {
                            Hod hod = new Hod();
                            hod.setUser(savedUser);
                            hod.setUserId(savedUser.getId());
                            hod.setEmail(savedUser.getEmail());
                            hodService.saveHod(hod);
                            System.out.println("[DEBUG] HOD saved for userId: " + savedUser.getId());
                        }
                        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
                    } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "HOD registration failed: " + e.getMessage()));
                    }
                default:
                    System.out.println("[DEBUG] Invalid role after switch: " + savedUser.getRole());
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("[DEBUG] Login attempt: email = " + request.getEmail() + ", role = " + request.getRole());

        String emailNormalized = request.getEmail().trim().toLowerCase();
        System.out.println("[DEBUG] Normalized email: " + emailNormalized);

        User user;
        try {
            user = userService.findByEmail(emailNormalized)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
            System.out.println("[DEBUG] User found: email = " + user.getEmail() + ", role = " + user.getRole());
        } catch (ResponseStatusException e) {
            System.out.println("[DEBUG] User not found for email: " + emailNormalized);
            throw e;
        }

        if (!user.getRole().toString().equalsIgnoreCase(request.getRole())) {
            System.out.println("[DEBUG] Role mismatch: user role = " + user.getRole() + ", request role = " + request.getRole());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Role mismatch");
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("[DEBUG] Password match: " + passwordMatches);
        if (!passwordMatches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        Object profileData = null;
        switch (user.getRole()) {
            case STUDENT:
                profileData = studentService.findByUserId(user.getId()).orElse(null);
                break;
            case PROFESSOR:
                profileData = professorService.findByUserId(user.getId()).orElse(null);
                break;
            case HOD:
                profileData = hodService.findByUserId(user.getId()).orElse(null);
                break;
        }

        String accessToken = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> responseBody = Map.of(
                "accessToken", accessToken,
                "role", user.getRole().toString(),
                "profileData", profileData
        );

        System.out.println("[DEBUG] Login successful for email: " + emailNormalized);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/user/details")
    public ResponseEntity<?> getUserDetails(@RequestParam String email) {
        var userOpt = userService.findByEmail(email.trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(userOpt.get());
    }
}
