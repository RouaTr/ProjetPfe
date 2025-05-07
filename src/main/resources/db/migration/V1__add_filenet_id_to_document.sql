-- Migration pour ajouter la colonne file_net_id à la table document
ALTER TABLE document ADD COLUMN file_net_id VARCHAR(255);

-- Mettre à jour les documents existants avec un ID FileNet par défaut
UPDATE document SET file_net_id = CONCAT('LEGACY-', id) WHERE file_net_id IS NULL; 