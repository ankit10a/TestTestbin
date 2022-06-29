const express = require('express');

const router = express.Router();
const authController = require("./auth");
const taskController = require("./task");

router.use('/v1/auth',authController);
router.use('/v1/task',taskController);
// router.

// router.get('/getlist');
// router.delete('/delete');
// router.post('/save')





module.exports = router;