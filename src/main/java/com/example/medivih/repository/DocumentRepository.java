package com.example.medivih.repository;

import com.example.medivih.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByPatientId(Long patientId);
    List<Document> findByPatientIdAndDocumentType(Long patientId, String documentType);
} 