-- Création de la table document si elle n'existe pas
CREATE TABLE IF NOT EXISTS document (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(255) NOT NULL,
    file_net_id VARCHAR(255),
    data LONGBLOB,
    patient_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 