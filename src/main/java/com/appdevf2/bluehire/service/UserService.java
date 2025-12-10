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

    private static final String UPLOAD_DIR = "uploads/";

    // ----------------------------- BASIC USER METHODS -----------------------------

    public User postUserRecord(User user) {
        return userRepository.save(user);
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
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with ID " + userId));
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    public User authenticate(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    // ----------------------------- REGISTER WITH DOCUMENT -----------------------------

    public User registerUserWithDocument(User user, MultipartFile file, String docTypeStr) throws IOException {

        // 1. Save user first
        User savedUser = userRepository.save(user);

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
            doc.setDocumentFileURL(filePath.toString());
            doc.setUploadedAt(LocalDateTime.now());
            doc.setStatus(Status.PENDING);

            // Handle document type safely
            try {
                doc.setDocumentType(DocumentType.valueOf(docTypeStr.toUpperCase()));
            } catch (Exception e) {
                doc.setDocumentType(DocumentType.OTHER);
            }

            // Save document to DB
            documentRepository.save(doc);
        }

        return savedUser;
    }
}
