const config = {
    dbUrl: process.env.DB_URL || 'mongodb://root:password@localhost:27017',
    port: process.env.APP_PORT || 3000,
    host: process.env.APP_URL || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || '/files',
}

module.exports = config