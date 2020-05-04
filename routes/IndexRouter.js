var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/AuthController");
const postsController = require('../controllers/postsController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', AuthController.showLogin);
router.get('/registro', AuthController.showRegistro);
router.get('/home', verificaUsuarioLogado, AuthController.showHome);
router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);

router.get('/posts', postsController.index);



module.exports = router;
