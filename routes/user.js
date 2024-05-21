const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');
const { authentication, isSuperAdmin } = require('../middleware/auth');

router.get('/', authentication, controllers.user.getAll)
router.get('/:id/detail', authentication, controllers.user.getById)
router.delete('/', authentication, isSuperAdmin, controllers.user.deleteById)
router.put('/:id/update', authentication, controllers.user.updateById)

module.exports = router;
