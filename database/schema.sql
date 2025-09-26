-- Script de création de la base de données AFMI
-- Base de données PostgreSQL pour l'application AFMI

-- Création de la table des utilisateurs (si elle n'existe pas)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    organisation VARCHAR(255),
    role VARCHAR(50) DEFAULT 'utilisateur',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table des messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    sujet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    statut VARCHAR(20) DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'lu', 'repondu', 'archive')),
    priorite VARCHAR(10) DEFAULT 'normal' CHECK (priorite IN ('faible', 'normal', 'elevee', 'urgent')),
    metadata JSONB, -- Pour stocker des informations supplémentaires
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    lu_at TIMESTAMP WITH TIME ZONE,
    repondu_at TIMESTAMP WITH TIME ZONE
);

-- Création de la table des réponses aux messages
CREATE TABLE IF NOT EXISTS message_replies (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
    reponse TEXT NOT NULL,
    repondu_par VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table des statistiques
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    messages_recus INTEGER DEFAULT 0,
    messages_lus INTEGER DEFAULT 0,
    messages_repondus INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);
CREATE INDEX IF NOT EXISTS idx_messages_statut ON messages(statut);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_priorite ON messages(priorite);
CREATE INDEX IF NOT EXISTS idx_message_replies_message_id ON message_replies(message_id);
CREATE INDEX IF NOT EXISTS idx_stats_date ON stats(date);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement les statistiques quotidiennes
CREATE OR REPLACE FUNCTION create_daily_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO stats (date, messages_recus)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (date) 
    DO UPDATE SET 
        messages_recus = stats.messages_recus + 1,
        updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour créer automatiquement les statistiques
DROP TRIGGER IF EXISTS create_stats_on_message_insert ON messages;
CREATE TRIGGER create_stats_on_message_insert
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION create_daily_stats();

-- Insertion de données de test (optionnel)
INSERT INTO users (nom, email, telephone, organisation, role) 
VALUES 
    ('Admin AFMI', 'admin@afmi-gabon.org', '+241 01 23 45 67', 'AFMI', 'admin'),
    ('Modérateur', 'moderateur@afmi-gabon.org', '+241 01 23 45 68', 'AFMI', 'moderateur')
ON CONFLICT (email) DO NOTHING;

-- Vue pour les statistiques des messages
CREATE OR REPLACE VIEW message_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_messages,
    COUNT(CASE WHEN statut = 'nouveau' THEN 1 END) as nouveaux_messages,
    COUNT(CASE WHEN statut = 'lu' THEN 1 END) as messages_lus,
    COUNT(CASE WHEN statut = 'repondu' THEN 1 END) as messages_repondus,
    COUNT(CASE WHEN priorite = 'urgent' THEN 1 END) as messages_urgents
FROM messages 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Commentaires sur les tables
COMMENT ON TABLE messages IS 'Table principale pour stocker les messages reçus via le formulaire de contact';
COMMENT ON TABLE message_replies IS 'Table pour stocker les réponses aux messages';
COMMENT ON TABLE users IS 'Table des utilisateurs et administrateurs';
COMMENT ON TABLE stats IS 'Table des statistiques quotidiennes';

COMMENT ON COLUMN messages.metadata IS 'Données JSON supplémentaires (géolocalisation, référent, etc.)';
COMMENT ON COLUMN messages.ip_address IS 'Adresse IP de l''expéditeur pour la sécurité';
COMMENT ON COLUMN messages.user_agent IS 'Navigateur utilisé par l''expéditeur';

-- Affichage des informations de création
SELECT 'Base de données AFMI créée avec succès!' as message;
SELECT 'Tables créées: users, messages, message_replies, stats' as tables;
SELECT 'Index et triggers configurés' as configuration;
