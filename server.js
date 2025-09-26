// Serveur simple pour AFMI - Enregistrement des messages
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuration PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:BliobFePjYilkHPJwWwUNAoERJznYWPN@shortline.proxy.rlwy.net:22154/railway',
    ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Route pour enregistrer un message
app.post('/api/messages', async (req, res) => {
    try {
        const { nom, email, telephone, sujet, message } = req.body;
        
        // Validation simple
        if (!nom || !email || !sujet || !message) {
            return res.json({ success: false, message: 'Champs obligatoires manquants' });
        }
        
        // Insertion en base
        const result = await pool.query(`
            INSERT INTO messages (nom, email, telephone, sujet, message, ip_address, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `, [nom, email, telephone || null, sujet, message, req.ip, req.get('User-Agent')]);
        
        console.log('✅ Message enregistré:', { id: result.rows[0].id, email, sujet });
        
        res.json({ 
            success: true, 
            message: 'Message envoyé avec succès !',
            messageId: result.rows[0].id 
        });
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        res.json({ success: false, message: 'Erreur serveur' });
    }
});

// Route de test
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Serveur AFMI actif' });
});

// Démarrage
app.listen(PORT, () => {
    console.log(`🚀 Serveur AFMI démarré sur le port ${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/messages`);
});
