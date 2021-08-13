const Pet = require ('../models/pets')

module.exports = app => {
   app.post('/pet', (req, res) => {
      const pet = req.body

      Pet.adiciona(pet) 
         .then(resposta => res.status(201).json(resposta))
         .catch(erro => res.status(400).json(erro))
      
   })
}