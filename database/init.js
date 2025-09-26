// Script d'initialisation de la base de données AFMI
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const { getConfig } = require('./config');

async function initializeDatabase() {
    console.log('🚀 Initialisation de la base de données AFMI...');
    
    const dbConfig = getConfig(process.env.NODE_ENV || 'development');
    const pool = new Pool(dbConfig);
    
    try {
        // Test de connexion
        console.log('📡 Test de connexion à PostgreSQL...');
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time');
        console.log('✅ Connexion réussie:', result.rows[0].current_time);
        client.release();
        
        // Lecture et exécution du schéma
        console.log('📋 Lecture du schéma SQL...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('🔧 Création des tables et fonctions...');
        await pool.query(schema);
        
        console.log('✅ Base de données initialisée avec succès !');
        console.log('📊 Tables créées : users, messages, message_replies, stats');
        console.log('🔍 Index et triggers configurés');
        console.log('📈 Vue des statistiques créée');
        
        // Test d'insertion d'un message de test
        console.log('🧪 Test d\'insertion d\'un message...');
        const testMessage = {
            nom: 'Test AFMI',
            email: 'test@afmi-gabon.org',
            telephone: '+241 01 23 45 67',
            sujet: 'Test d\'initialisation',
            message: 'Ceci est un message de test pour vérifier que la base de données fonctionne correctement.'
        };
        
        const insertQuery = `
            INSERT INTO messages (nom, email, telephone, sujet, message, metadata)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        
        const metadata = {
            test: true,
            timestamp: new Date().toISOString(),
            source: 'initialization_script'
        };
        
        const insertResult = await pool.query(insertQuery, [
            testMessage.nom,
            testMessage.email,
            testMessage.telephone,
            testMessage.sujet,
            testMessage.message,
            JSON.stringify(metadata)
        ]);
        
        console.log(`✅ Message de test inséré avec l'ID: ${insertResult.rows[0].id}`);
        
        // Vérification des statistiques
        console.log('📊 Vérification des statistiques...');
        const statsQuery = `
            SELECT 
                COUNT(*) as total_messages,
                COUNT(CASE WHEN statut = 'nouveau' THEN 1 END) as nouveaux_messages
            FROM messages
        `;
        
        const statsResult = await pool.query(statsQuery);
        console.log('📈 Statistiques:', statsResult.rows[0]);
        
        console.log('\n🎉 Initialisation terminée avec succès !');
        console.log('🔗 Vous pouvez maintenant démarrer le serveur avec: npm start');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Exécution si le script est appelé directement
if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('✅ Script d\'initialisation terminé');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Erreur fatale:', error);
            process.exit(1);
        });
}

module.exports = { initializeDatabase };
