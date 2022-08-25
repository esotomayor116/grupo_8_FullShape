module.exports = {
  // CHICOS NO OLVIDEN CONFIGURAR EN SUS DATOS LOCALES SUS RESPECTIVOS USUARIOS

  "development": {
    "username": "root",
    "password": null,
    "database": "fullshape_db",
    "host": "127.0.0.1",
    "port": 8889,
    "dialect": "mysql"
  },

  //Configuracion de Edy
  // "development": {
  //   "username": "root",
  //   "password": '',
  //   "database": "fullshape_db",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
//Fin de configuracion Edy


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
