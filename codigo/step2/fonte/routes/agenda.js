let express = require('express');
let router = express.Router();
let agendaController = require('../controllers/AgendaController');


/* GET users listing. */
router.get('/', agendaController.find);
router.post('/', agendaController.create);


module.exports = router;
