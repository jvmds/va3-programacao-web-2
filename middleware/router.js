const router = require('express').Router();
const controller = require('../controllers/menuController');

router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.save)
    .put('/:id', controller.update)
    .delete('/:id', controller.remove);

module.exports = router;