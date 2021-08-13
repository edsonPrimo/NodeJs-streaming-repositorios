const query = require('../infraestrutura/database/queries')

class Pet {
  
  adiciona(pet){
    const sql = 'INSERT INTO Pets SET ?'
    return query(sql, pet)
  }
}

module.exports = new Pet()