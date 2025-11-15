package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Document;
import com.appdevf2.bluehire.service.DocumentService;

import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "*") // Allow requests from any frontend
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document createdDocument = documentService.createDocument(document);
        return ResponseEntity.ok(createdDocument);
    }

    // ✅ READ ALL
    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // ✅ READ BY ID
    @GetMapping("/{documentID}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long documentID) {
        return documentService.getDocumentById(documentID)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ UPDATE
    @PutMapping("/{documentID}")
    public ResponseEntity<Document> updateDocument(
            @PathVariable Long documentID,
            @RequestBody Document updatedDocument
    ) {
        try {
            Document document = documentService.updateDocument(documentID, updatedDocument);
            return ResponseEntity.ok(document);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ DELETE
    @DeleteMapping("/{documentID}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentID) {
        try {
            documentService.deleteDocument(documentID);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
