const express = require('express');
const bodyParser = require('body-parser');
const itensRouter = require('./middleware/router');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/menu', itensRouter);

app.use('/', (req, res) => {
    res.status(200).json({name: 'VAIII', version: '1.0.0'});
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({error: 'Servico indisponivel'});
})

app.listen(port, () => {
    console.log(`VAIII app listening on port ${port}`);
});