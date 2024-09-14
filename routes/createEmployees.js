const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { getAll, addPerson, removePerson, editPerson, getPerson, likePerson, unLikePerson, dislikePerson, unDislikePerson } = require('../controllers/employees');



router.get('/', getAll)
router.get('/:id', auth, getPerson)
router.post('/add', auth, addPerson)
router.post('/remove/:id', auth, removePerson)
router.put('/edit/:id', auth, editPerson)
router.post('/like/:id', auth, likePerson)
router.delete('/unlike/:id', auth, unLikePerson)
router.post('/dislike/:id', auth, dislikePerson)
router.delete('/undislike/:id', auth, unDislikePerson)

module.exports = router