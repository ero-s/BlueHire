package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Document;
import com.appdevf2.bluehire.repository.DocumentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    // ✅ CREATE
    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    // ✅ READ ALL
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // ✅ READ BY ID
    public Optional<Document> getDocumentById(Long documentID) {
        return documentRepository.findById(documentID);
    }

    // ✅ UPDATE
    public Document updateDocument(Long documentID, Document updatedDocument) {
        return documentRepository.findById(documentID).map(document -> {
            document.setVerifiedBy(updatedDocument.getVerifiedBy());
            document.setDocumentFileURL(updatedDocument.getDocumentFileURL());
            document.setStatus(updatedDocument.getStatus());
            document.setUploadedAt(updatedDocument.getUploadedAt());
            document.setDocumentType(updatedDocument.getDocumentType());
            document.setReviewedAt(updatedDocument.getReviewedAt());
            return documentRepository.save(document);
        }).orElseThrow(() -> new RuntimeException("Document not found with ID: " + documentID));
    }

    // ✅ DELETE
    public void deleteDocument(Long documentID) {
        if (!documentRepository.existsById(documentID)) {
            throw new RuntimeException("Document not found with ID: " + documentID);
        }
        documentRepository.deleteById(documentID);
    }

}
