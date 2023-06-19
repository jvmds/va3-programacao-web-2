const fs = require('fs');
const item = require('../models/itemModel');
const crypto = require('crypto');
const path = require('path');
const urlDb = path.join(path.dirname(__dirname), 'db', 'db.json');

module.exports = {
    getAll(req, res) {
        fs.readFile(urlDb, 'utf-8', (err, data) => {
            if (err){return res.status(500).json({error: err.message});}
            
            let json = JSON.parse(data);
            return res.status(200).json(json);
        });
    },

    save(req, res){
        const {error, value} = item.validate(req.body);
        if (!error){
            fs.readFile(urlDb, 'utf-8', (err, data) => {
                if (err) {return res.status(500).json({error: err.message});}
                let json = JSON.parse(data);

                const newItem = {
                    id: crypto.randomUUID(),
                    nome: value.nome,
                    descricao: value.descricao,
                    preco: value.preco
                };
                json.itens.push(newItem);

                fs.writeFile(urlDb, JSON.stringify(json), 'utf-8', async (err) => {
                    if (err) {throw err;}

                    return res.status(201).json(newItem);
                });
            });
        }
        else{
            res.status(400).json(error);
        }
    },

    getById(req, res) {
        fs.readFile(urlDb, 'utf-8', (err, data) => {
            if (err){return res.status(500).json({error: err.message});}
            
            let json = JSON.parse(data);
            
            const {id} = req.params;
            const item = json.itens.find(e => e.id === id);
            if (item){
                res.status(200).json(item);
            }
            else{
                res.status(404).json({
                    error: `item ${id} não encontrado`
                });
            }
        });
        
    },

   update(req, res){
        const {error, value} = item.validate(req.body);
        if (!error){
            fs.readFile(urlDb, 'utf-8', (err, data) => {
                if (err) {return res.status(500).json({error: err.message});}
                let json = JSON.parse(data);

                const {id} = req.params;
                const item = json.itens.find(e => e.id === id);
                if (item){
                    item.nome = value.nome;
                    item.descricao = value.descricao;
                    item.preco = value.preco;

                    fs.writeFile(urlDb, JSON.stringify(json), 'utf-8', async (err) => {
                        if (err) {throw err;}
    
                        return res.status(200).json(item);
                    });
                }
                else{
                    res.status(404).json({
                        error: `item ${id} não encontrado`
                    });
                }
            });
        }
        else{
            res.status(400).json(error);
        }
        
    },

    remove(req, res) {
        fs.readFile(urlDb, 'utf-8', (err, data) => {
            if (err){return res.status(500).json({error: err.message});}
            
            let json = JSON.parse(data);
            
            const {id} = req.params;
            const indexItem = json.itens.findIndex(e => e.id === id);
            if (indexItem != -1){
                json.itens.splice(indexItem, 1);

                fs.writeFile(urlDb, JSON.stringify(json), 'utf-8', async (err) => {
                    if (err) {throw err;}

                    return res.status(200).json({});
                });
            }
            else{
                res.status(404).json({
                    error: `item ${id} não encontrado`
                });
            }
        });
    }
};
