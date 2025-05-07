package com.example.medivih.controller;

import com.example.medivih.service.FileNetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/filenet")
@CrossOrigin(origins = "http://localhost:4200")
public class FileNetController {

    private static final Logger logger = LoggerFactory.getLogger(FileNetController.class);

    @Autowired
    private FileNetService fileNetService;

    @PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("documentType") String documentType,
            @RequestParam("patientId") Long patientId) {
        try {
            logger.info("Début de l'upload du document - Titre: {}, Type: {}, PatientId: {}", 
                title, documentType, patientId);
            
            if (file == null || file.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Le fichier est vide");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            Document savedDocument = fileNetService.uploadDocument(file, title, documentType, patientId);
            
            logger.info("Document sauvegardé avec succès - ID: {}, FileNetId: {}", 
                savedDocument.getId(), savedDocument.getFileNetId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", String.format("Document uploaded with ID: {%s}", savedDocument.getFileNetId()));
            response.put("documentId", savedDocument.getFileNetId());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erreur lors de l'upload du document", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de l'enregistrement du document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(value = "/documents/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDocumentsByPatient(@PathVariable Long patientId) {
        try {
            List<Document> documents = fileNetService.getDocumentsByPatient(patientId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("documents", documents);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des documents", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la récupération des documents: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(value = "/documents/{patientId}/{documentType}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDocumentsByPatientAndType(
            @PathVariable Long patientId,
            @PathVariable String documentType) {
        try {
            List<Document> documents = fileNetService.getDocumentsByPatientAndType(patientId, documentType);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("documents", documents);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des documents", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la récupération des documents: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(value = "/{documentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDocument(@PathVariable Long documentId) {
        try {
            Document document = fileNetService.getDocument(documentId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("document", document);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération du document", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la récupération du document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
} 