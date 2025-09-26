// Configuration de la base de données PostgreSQL pour AFMI
const dbConfig = {
    // Chaîne de connexion PostgreSQL
    connectionString: 'postgresql://postgres:BliobFePjYilkHPJwWwUNAoERJznYWPN@shortline.proxy.rlwy.net:22154/railway',
    
    // Configuration alternative pour les environnements
    host: 'shortline.proxy.rlwy.net',
    port: 22154,
    database: 'railway',
    username: 'postgres',
    password: 'BliobFePjYilkHPJwWwUNAoERJznYWPN',
    
    // Options de connexion
    ssl: {
        rejectUnauthorized: false // Nécessaire pour Railway
    },
    
    // Pool de connexions
    pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200
    },
    
    // Configuration des requêtes
    query_timeout: 30000,
    statement_timeout: 30000,
    connection_timeout: 30000
};

// Configuration pour différents environnements
const config = {
    development: {
        ...dbConfig,
        logging: true
    },
    
    production: {
        ...dbConfig,
        logging: false,
        pool: {
            ...dbConfig.pool,
            min: 5,
            max: 20
        }
    },
    
    test: {
        ...dbConfig,
        database: 'afmi_test',
        logging: false
    }
};

// Fonction pour obtenir la configuration selon l'environnement
function getConfig(env = 'development') {
    return config[env] || config.development;
}

// Export pour Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dbConfig,
        config,
        getConfig
    };
}

// Export pour le navigateur
if (typeof window !== 'undefined') {
    window.AFMIDBConfig = {
        dbConfig,
        config,
        getConfig
    };
}
