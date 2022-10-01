module.exports = {
  // CHICOS NO OLVIDEN CONFIGURAR EN SUS DATOS LOCALES SUS RESPECTIVOS USUARIOS

  "development": {
    "username": "root",
    "password": "",
    "database": "fullshape_db",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql"
 },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
