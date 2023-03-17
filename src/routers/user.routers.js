const {Router} = require('express');
const router = Router();
const userCTRL = require('../controllers/user.controller');

router.get("/", userCTRL.getStart)

router.post("/register", userCTRL.postRegister)

router.post("/login", userCTRL.postLogin)

module.exports = router