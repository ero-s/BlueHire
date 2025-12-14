package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.model.Document;
import com.appdevf2.bluehire.model.Document.DocumentType;
import com.appdevf2.bluehire.model.Document.Status;

import com.appdevf2.bluehire.repository.UserRepository;
import com.appdevf2.bluehire.repository.DocumentRepository;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private SystemLogService systemLogService; // ✅ Injected for logging

    private static final String UPLOAD_DIR = "uploads/";

    // ----------------------------- BASIC USER METHODS -----------------------------

    public User postUserRecord(User user) {
        User savedUser = userRepository.save(user);
        // ✅ LOG: User Creation
        systemLogService.logEvent("User Created Manually: " + savedUser.getUsername());
        return savedUser;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(Integer userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setPassword(updatedUser.getPassword());
                    user.setEmail(updatedUser.getEmail());
                    user.setAddress(updatedUser.getAddress());
                    user.setContactNumber(updatedUser.getContactNumber());
                    user.setName(updatedUser.getName());
                    user.setRole(updatedUser.getRole());
                    
                    User saved = userRepository.save(user);
                    
                    // ✅ LOG: User Update
                    systemLogService.logEvent("User Updated: ID " + userId + " (" + saved.getUsername() + ")");
                    
                    return saved;
                })
                .orElseThrow(() -> new RuntimeException("User not found with ID " + userId));
    }

    public void deleteUser(Integer userId) {
        if(userRepository.existsById(userId)){
            userRepository.deleteById(userId);
            // ✅ LOG: User Deletion
            systemLogService.logEvent("User Deleted: ID " + userId);
        }
    }

    public User authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
        
        if (userOpt.isPresent()) {
            // ✅ LOG: Successful Login
            systemLogService.logEvent("User Logged In: " + username);
            return userOpt.get();
        } else {
            // Optional: Log failed attempts (careful with spam)
            systemLogService.logEvent("Failed Login Attempt: " + username);
            return null;
        }
    }

    // ----------------------------- REGISTER WITH DOCUMENT -----------------------------

    public User registerUserWithDocument(User user, MultipartFile file, String docTypeStr) throws IOException {

        // 1. Save user first
        User savedUser = userRepository.save(user);

        // ✅ LOG: Registration
        systemLogService.logEvent("New Registration: " + savedUser.getUsername() + " [" + savedUser.getRole() + "]");

        // 2. Process file upload if exists
        if (file != null && !file.isEmpty()) {

            // Ensure uploads directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Ensure unique filename
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Save file to disk
            Files.copy(file.getInputStream(), filePath);

            // 3. Create document entry
            Document doc = new Document();
            doc.setUser(savedUser);
            doc.setDocumentFileURL(filePath.toString()); // Stores path like "uploads/uuid_file.jpg"
            doc.setUploadedAt(LocalDateTime.now());
            doc.setStatus(Status.PENDING);

            // Handle document type safely (Avoid NullPointerException)
            try {
                if (docTypeStr != null && !docTypeStr.isEmpty()) {
                    doc.setDocumentType(DocumentType.valueOf(docTypeStr.toUpperCase()));
                } else {
                    doc.setDocumentType(DocumentType.OTHER);
                }
            } catch (IllegalArgumentException e) {
                // If the string doesn't match the Enum
                doc.setDocumentType(DocumentType.OTHER);
            }

            // Save document to DB
            documentRepository.save(doc);

            // ✅ LOG: Document Upload
            // Using savedUser.getUserID() assuming your model uses that name based on previous errors
            systemLogService.logEvent("Document Uploaded: " + doc.getDocumentType() + " | UserID: " + savedUser.getUserId());
        }

        return savedUser;
    }
}