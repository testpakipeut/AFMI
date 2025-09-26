// Script de test pour l'API AFMI
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('🧪 Test de l\'API AFMI...\n');
    
    try {
        // Test 1: Health check
        console.log('1️⃣ Test de santé de l\'API...');
        const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
        const healthData = await healthResponse.json();
        
        if (healthData.status === 'ok') {
            console.log('✅ API en ligne:', healthData.database);
        } else {
            console.log('❌ API hors ligne');
            return;
        }
        
        // Test 2: Envoi d'un message de test
        console.log('\n2️⃣ Test d\'envoi de message...');
        const testMessage = {
            nom: 'Test AFMI',
            email: 'test@afmi-gabon.org',
            telephone: '+241 01 23 45 67',
            sujet: 'Test d\'API',
            message: 'Ceci est un message de test pour vérifier le fonctionnement de l\'API.'
        };
        
        const messageResponse = await fetch(`${API_BASE_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testMessage)
        });
        
        const messageData = await messageResponse.json();
        
        if (messageData.success) {
            console.log('✅ Message envoyé avec succès - ID:', messageData.messageId);
        } else {
            console.log('❌ Erreur lors de l\'envoi:', messageData.message);
        }
        
        // Test 3: Récupération des statistiques
        console.log('\n3️⃣ Test des statistiques...');
        const statsResponse = await fetch(`${API_BASE_URL}/api/stats`);
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
            console.log('✅ Statistiques récupérées:', statsData.stats);
        } else {
            console.log('❌ Erreur lors de la récupération des stats');
        }
        
        // Test 4: Récupération des messages
        console.log('\n4️⃣ Test de récupération des messages...');
        const messagesResponse = await fetch(`${API_BASE_URL}/api/messages?limit=5`);
        const messagesData = await messagesResponse.json();
        
        if (messagesData.success) {
            console.log('✅ Messages récupérés:', messagesData.messages.length, 'messages');
            console.log('📊 Pagination:', messagesData.pagination);
        } else {
            console.log('❌ Erreur lors de la récupération des messages');
        }
        
        console.log('\n🎉 Tous les tests sont terminés !');
        
    } catch (error) {
        console.error('❌ Erreur lors des tests:', error.message);
        console.log('\n💡 Vérifiez que le serveur est démarré avec: npm start');
    }
}

// Exécution si le script est appelé directement
if (require.main === module) {
    testAPI();
}

module.exports = { testAPI };
