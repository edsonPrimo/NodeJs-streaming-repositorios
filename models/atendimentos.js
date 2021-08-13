const moment = require('moment')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
    constructor() {

        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({ tamanho }) => tamanho >= 5

        this.valida = (parametros) =>
            this.validacoes.filter(campo => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            });


        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }
    adiciona(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        /* pegando as validacoes e filtrando somente o que estiver errado
           para cada campo que estivermos enviando, se ele for valido, nao precisamos retornar 
           só iremos retornar ele se ele nao for valido */

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))

        } else {
            /* criando um atendimento com a data de criacao
          fazemos um array com tudo que estiver dentro de atendimento mais a data de criacao
          {...atendimento, dataCriacao} */
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId
                return { ...atendimento, id }
            })
        }
    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    altera(id, valores) {
        if (valores.data) valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const data = valores.data
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: 300 }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))

        } else {
            const atendimentoAlteradoDatado = { ...valores, dataCriacao, data }

            return repositorio.altera(id, atendimentoAlteradoDatado).then(() => {
                return { ...valores, id }
            })
        }
    }

    deleta(id) {
        return repositorio.deleta(id)
    }
}
module.exports = new Atendimento