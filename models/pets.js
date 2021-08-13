const repositorio = require('../repositorios/pet')
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')

class Pet {
  adiciona(pet) {
    return new Promise((resolve, reject) => {
      uploadDeArquivo (pet.imagem, pet.nome, (erro, novoCaminho) => {
        if (erro) {
          reject(erro)
        } else {
          const novoPet = { nome: pet.nome, imagem: novoCaminho }
          resolve(repositorio.adiciona(novoPet).then(() => pet))
        }
      })
    })
   
  }
}
module.exports = new Pet()