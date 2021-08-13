const Atendimento = require('../models/atendimentos')
const { default: axios } = require('axios')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id)
            .then( async (resultados) => {
                const cpf = resultados.cliente
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                resultados.cliente = data
                res.json(resultados)
            })
            .catch(erros => res.status(400).json(erros, 'deu ruim'))
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros))
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id, valores)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id)
            .then(deletado => res.json(id))
            .catch(erros => res.status(400).json(erros))
            
    })
}