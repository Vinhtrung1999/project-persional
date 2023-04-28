require('dotenv').config();

module.exports = {
  databaseConfig: {
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbCluster: process.env.DB_CLUSTER,
    dbName: process.env.DB_NAME,
  },
  serverConfig: {
    port: process.env.PORT,
    environment: process.env.ENV,
  },
};