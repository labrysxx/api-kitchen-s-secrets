const mongoose = require('mongoose')

const ReceitaSchema = new mongoose.Schema({
    categoria: {
      type: String,
      required: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    ingredientes: {
        type: [String],
        required: true
    },
    tempo: {
        type: String,
        required: true
    },
    rendimento: {
        type: Number,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    contato: {
        type: String,
        required: false
    },
    extra: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('receita', ReceitaSchema)