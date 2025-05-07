package com.example.medivih.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.medivih.repository.DocumentRepository;
import com.example.medivih.entity.Document;
import com.example.medivih.entity.Patient;
import com.example.medivih.repository.PatientRepository;
import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileNetService {

    private static final Logger logger = LoggerFactory.getLogger(FileNetService.class);

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional(rollbackFor = Exception.class)
    public Document uploadDocument(MultipartFile file, String title, String documentType, Long patientId) throws IOException {
        logger.info("Début de l'upload - Titre: {}, Type: {}, PatientId: {}", title, documentType, patientId);
        
        try {
            // Vérifier si le patient existe
            Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> {
                    logger.error("Patient non trouvé avec l'ID: {}", patientId);
                    return new RuntimeException("Patient non trouvé");
                });

            logger.info("Patient trouvé: {}", patient.getId());

            // Vérifier si le fichier est valide
            if (file == null || file.isEmpty()) {
                logger.error("Le fichier est vide ou null");
                throw new RuntimeException("Le fichier est vide");
            }

            logger.info("Création du document pour la base de données");
            // Créer un nouveau document pour la base de données
            Document document = new Document();
            document.setTitle(title);
            document.setDocumentType(documentType);
            document.setPatient(patient);
            document.setFileName(file.getOriginalFilename());
            document.setFileType(file.getContentType());
            document.setData(file.getBytes());
            document.setUploadDate(new java.util.Date());

            logger.info("Tentative de sauvegarde du document dans la base de données");
            try {
                // Sauvegarder dans la base de données d'abord
                Document savedDocument = documentRepository.save(document);
                logger.info("Document sauvegardé dans la base de données avec l'ID: {}", savedDocument.getId());

                try {
                    logger.info("Début de l'upload vers FileNet");
                    // Sauvegarder dans FileNet
                    String fileNetId = saveToFileNet(file, title, documentType, patientId);
                    logger.info("Document sauvegardé dans FileNet avec l'ID: {}", fileNetId);

                    // Mettre à jour le document avec l'ID FileNet
                    savedDocument.setFileNetId(fileNetId);
                    Document updatedDocument = documentRepository.save(savedDocument);
                    logger.info("Document mis à jour avec l'ID FileNet: {}", fileNetId);

                    // Vérifier que le document est bien enregistré
                    Document finalDocument = documentRepository.findById(updatedDocument.getId())
                        .orElseThrow(() -> {
                            logger.error("Document non trouvé après la mise à jour");
                            return new RuntimeException("Document non trouvé après la mise à jour");
                        });
                    logger.info("Vérification finale - Document trouvé dans la base de données: {}", finalDocument.getId());

                    // Vérifier que le document est bien enregistré dans la base de données
                    List<Document> documents = documentRepository.findByPatientId(patientId);
                    logger.info("Nombre de documents trouvés pour le patient {}: {}", patientId, documents.size());
                    for (Document doc : documents) {
                        logger.info("Document trouvé - ID: {}, FileNetId: {}, Title: {}", 
                            doc.getId(), doc.getFileNetId(), doc.getTitle());
                    }

                    return finalDocument;
                } catch (Exception e) {
                    logger.error("Erreur lors de l'upload vers FileNet", e);
                    // Si l'upload vers FileNet échoue, supprimer le document de la base de données
                    documentRepository.delete(savedDocument);
                    throw new RuntimeException("Erreur lors de l'upload vers FileNet: " + e.getMessage());
                }
            } catch (Exception e) {
                logger.error("Erreur lors de la sauvegarde dans la base de données", e);
                throw new RuntimeException("Erreur lors de la sauvegarde dans la base de données: " + e.getMessage());
            }
        } catch (Exception e) {
            logger.error("Erreur lors de la sauvegarde du document", e);
            throw new RuntimeException("Erreur lors de la sauvegarde du document: " + e.getMessage());
        }
    }

    private String saveToFileNet(MultipartFile file, String title, String documentType, Long patientId) throws IOException {
        // Votre logique existante pour sauvegarder dans FileNet
        // Retourner uniquement l'ID sans le message
        return java.util.UUID.randomUUID().toString().toUpperCase();
    }

    public List<Document> getDocumentsByPatient(Long patientId) {
        return documentRepository.findByPatientId(patientId);
    }

    public Document getDocument(Long documentId) {
        return documentRepository.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document non trouvé"));
    }

    public List<Document> getDocumentsByPatientAndType(Long patientId, String documentType) {
        return documentRepository.findByPatientIdAndDocumentType(patientId, documentType);
    }
} 