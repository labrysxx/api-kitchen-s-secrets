const mongoose = require('mongoose')

const ReceitaSchema = new mongoose.Schema({
    nome: {
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
        type: Number,
        required: true
    },
    rendimento: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('recita', ReceitaSchema)