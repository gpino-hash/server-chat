const { MongoClient } = require('mongodb')
const config = require('./config')
require('dotenv').config()

let db = null;

async function connectToMongoDB() {
  if (db) {
    return db
  }

  const client = new MongoClient(config.dbUrl, { useUnifiedTopology: true })

  try {
    await client.connect()
    console.log('Conexión exitosa a la base de datos')
    db = client.db(process.env.DB_DATABASE)

    return db;
  } catch (error) {
    console.log('Error al conectar a la base de datos', error)
    throw error
  }
}

module.exports = {
  connectToMongoDB,
};