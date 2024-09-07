const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAll, addPerson, removePerson, editPerson, getPerson } = require('../controllers/employees');


router.get('/', auth, getAll)
router.get('/:id', auth, getPerson)
router.post('/add', auth, addPerson)
router.delete('/remove/:id', auth, removePerson)
router.put('/edit/:id', auth, editPerson)

module.exports = router