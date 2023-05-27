const Joi = require('joi');

module.exports = Joi.object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    preco: Joi.number().positive().precision(2)
});