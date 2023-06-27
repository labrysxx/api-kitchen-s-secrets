const express = require('express') // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados') //aqui eu estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() //estou chamando a função que conecta o banco de dados

const Receita = require('./receitaModel.js')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // aqui estou criando a porta

//GET
async function mostraReceitas(request, response) {
    try {
        const receitasVindasDoBancoDeDados = await Receita.find()

        response.json(receitasVindasDoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaReceita(request, response) {
    const novaReceita = new Receita({
        categoria: request.body.categoria,
        nome: request.body.nome,
        descricao: request.body.descricao,
        imagem: request.body.imagem,
        ingredientes: request.body.ingredientes,
        tempo: request.body.tempo,
        rendimento: request.body.rendimento,
        autor: request.body.autor,
        contato: request.body.contato,
        segredo: request.body.segredo
    })

    try {
        const receitaCriada = await novaReceita.save()
        response.status(201).json(receitaCriada)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeReceita(request, response) {
    try {
        const receitaEncontrada = await Receita.findById(request.params.id)

        if(request.body.categoria) {
            receitaEncontrada.categoria = request.body.categoria
        }

        if(request.body.nome) {
            receitaEncontrada.nome = request.body.nome
        }

        if(request.body.contato) {
            receitaEncontrada.contato = request.body.contato
        }

        if(request.body.descricao) {
            receitaEncontrada.descricao = request.body.descricao
        }

        if(request.body.imagem) {
            receitaEncontrada.imagem = request.body.imagem
        }

        if(request.body.ingredientes) {
            receitaEncontrada.ingredientes = request.body.ingredientes
        }

        if(request.body.tempo) {
            receitaEncontrada.tempo = request.body.tempo
        }

        if(request.body.rendimento) {
            receitaEncontrada.rendimento = request.body.rendimento
        }

        if(request.body.autor) {
            receitaEncontrada.autor = request.body.autor
        }

        if(request.body.segredo) {
            receitaEncontrada.segredo = request.body.segredo
        }

        const receitaAtualizadaNoBancoDeDados = await receitaEncontrada.save()

        response.json(receitaAtualizadaNoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaReceita(request, response) {
    try {
        await Receita.findByIdAndDelete(request.params.id)
        response.json({ menssagem: 'Receita deletada com sucesso!'})
    } catch(erro) {
        console.log(erro)
    }
}

//PORTA
function mostraPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

app.use(router.get('/receitas', mostraReceitas)) // configurei rota GET /receitas
app.use(router.post('/receitas', criaReceita)) // configurei rota POST /receitas
app.use(router.patch('/receitas/:id', corrigeReceita)) // configurei rota PATCH /receitas/:id
app.use(router.delete('/receitas/:id', deletaReceita)) // configurei rota DELETE /receitas/:id
app.listen(porta, mostraPorta) // servidor ouvindo a porta