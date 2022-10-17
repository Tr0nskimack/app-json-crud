const { Router } = require('express')
const router = Router()
const {
  renderIndex,
  renderCreate,
  postCreate,
  getDelete
} = require('../controllers/index.Controllers.js')

router.get('/', renderIndex)

router.get('/create', renderCreate)
router.post('/create', postCreate)

router.get('/delete/:id', getDelete)

module.exports = router
