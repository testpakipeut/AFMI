// Backend Node.js pour l'application AFMI
// Gestion des messages avec PostgreSQL

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { getConfig } = require('./database/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la base de données
const dbConfig = getConfig(process.env.NODE_ENV || 'development');
const pool = new Pool(dbConfig);

// Middleware de sécurité
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true
}));

// Rate limiting pour éviter le spam
const messageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Maximum 5 messages par IP toutes les 15 minutes
    message: {
        error: 'Trop de messages envoyés. Veuillez attendre 15 minutes.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fonction pour tester la connexion à la base de données
async function testConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time');
        console.log('✅ Connexion à PostgreSQL réussie:', result.rows[0].current_time);
        client.release();
        return true;
    } catch (error) {
        console.error('❌ Erreur de connexion à PostgreSQL:', error.message);
        return false;
    }
}

// Fonction pour créer les tables si elles n'existent pas
async function initializeDatabase() {
    try {
        const fs = require('fs');
        const path = require('path');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        const client = await pool.connect();
        await client.query(schema);
        client.release();
        
        console.log('✅ Base de données initialisée avec succès');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de la base de données:', error.message);
        return false;
    }
}

// Route pour tester la connexion
app.get('/api/health', async (req, res) => {
    try {
        const isConnected = await testConnection();
        res.json({
            status: 'ok',
            database: isConnected ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Route pour envoyer un message
app.post('/api/messages', messageLimiter, async (req, res) => {
    try {
        const { nom, email, telephone, sujet, message } = req.body;
        
        // Validation des données
        if (!nom || !email || !sujet || !message) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs obligatoires doivent être remplis'
            });
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Format d\'email invalide'
            });
        }
        
        // Préparation des métadonnées
        const metadata = {
            userAgent: req.get('User-Agent'),
            referer: req.get('Referer'),
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        };
        
        // Insertion du message dans la base de données
        const query = `
            INSERT INTO messages (nom, email, telephone, sujet, message, metadata, ip_address, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, created_at
        `;
        
        const values = [
            nom.trim(),
            email.trim().toLowerCase(),
            telephone ? telephone.trim() : null,
            sujet.trim(),
            message.trim(),
            JSON.stringify(metadata),
            req.ip || req.connection.remoteAddress,
            req.get('User-Agent')
        ];
        
        const result = await pool.query(query, values);
        const messageId = result.rows[0].id;
        
        console.log(`📧 Nouveau message reçu - ID: ${messageId}, Email: ${email}`);
        
        res.json({
            success: true,
            message: 'Message envoyé avec succès',
            messageId: messageId,
            timestamp: result.rows[0].created_at
        });
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi du message:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
        });
    }
});

// Route pour récupérer les messages (admin seulement)
app.get('/api/messages', async (req, res) => {
    try {
        const { page = 1, limit = 20, statut, priorite } = req.query;
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT id, nom, email, telephone, sujet, message, statut, priorite, 
                   created_at, lu_at, repondu_at, metadata
            FROM messages
        `;
        
        const conditions = [];
        const values = [];
        let paramCount = 0;
        
        if (statut) {
            paramCount++;
            conditions.push(`statut = $${paramCount}`);
            values.push(statut);
        }
        
        if (priorite) {
            paramCount++;
            conditions.push(`priorite = $${paramCount}`);
            values.push(priorite);
        }
        
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
        values.push(limit, offset);
        
        const result = await pool.query(query, values);
        
        // Compter le total
        let countQuery = 'SELECT COUNT(*) FROM messages';
        if (conditions.length > 0) {
            countQuery += ' WHERE ' + conditions.join(' AND ');
        }
        const countResult = await pool.query(countQuery, values.slice(0, -2));
        
        res.json({
            success: true,
            messages: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(countResult.rows[0].count),
                pages: Math.ceil(countResult.rows[0].count / limit)
            }
        });
        
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des messages:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des messages'
        });
    }
});

// Route pour marquer un message comme lu
app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = `
            UPDATE messages 
            SET statut = 'lu', lu_at = NOW(), updated_at = NOW()
            WHERE id = $1
            RETURNING id, statut, lu_at
        `;
        
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Message non trouvé'
            });
        }
        
        res.json({
            success: true,
            message: 'Message marqué comme lu',
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du message:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour du message'
        });
    }
});

// Route pour obtenir les statistiques
app.get('/api/stats', async (req, res) => {
    try {
        const query = `
            SELECT 
                COUNT(*) as total_messages,
                COUNT(CASE WHEN statut = 'nouveau' THEN 1 END) as nouveaux_messages,
                COUNT(CASE WHEN statut = 'lu' THEN 1 END) as messages_lus,
                COUNT(CASE WHEN statut = 'repondu' THEN 1 END) as messages_repondus,
                COUNT(CASE WHEN priorite = 'urgent' THEN 1 END) as messages_urgents,
                COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as messages_aujourd_hui
            FROM messages
        `;
        
        const result = await pool.query(query);
        
        res.json({
            success: true,
            stats: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des statistiques:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des statistiques'
        });
    }
});

// Gestion des erreurs
app.use((error, req, res, next) => {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
    });
});

// Route 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Démarrage du serveur
async function startServer() {
    try {
        // Test de connexion à la base de données
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('❌ Impossible de se connecter à la base de données');
            process.exit(1);
        }
        
        // Initialisation de la base de données
        await initializeDatabase();
        
        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`🚀 Serveur AFMI démarré sur le port ${PORT}`);
            console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
            console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
        });
        
    } catch (error) {
        console.error('❌ Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
}

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
    console.log('\n🛑 Arrêt du serveur...');
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Arrêt du serveur...');
    await pool.end();
    process.exit(0);
});

// Démarrage
startServer();
