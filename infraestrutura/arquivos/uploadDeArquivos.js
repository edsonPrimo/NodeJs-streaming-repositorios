const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callBackImagemCriada) => {

  const tipo = path.extname(caminho)
  const tiposValidos = ['jpg', 'png', 'jpeg']
  const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

  if (!tipoEhValido) {
    const erro = "Tipo é inválido"
    callBackImagemCriada(erro)
    
  } else {
    const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novoCaminho))
      .on('finish', () => callBackImagemCriada(false , novoCaminho))

  }

}