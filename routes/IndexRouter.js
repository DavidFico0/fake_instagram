var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage ({
    destination: (req, file, cb) =>{
        cb(null, path.join('public', 'img'));
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);

    }
});
let upload = multer({ storage: storage})

const AuthController = require("../controllers/AuthController");
const postsController = require('../controllers/postsController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', AuthController.showLogin);
router.get('/registro', AuthController.showRegistro);
router.post('/registro', AuthController.cadastroUsuario);
router.get('/home', verificaUsuarioLogado, AuthController.showHome);
router.post('/home', verificaUsuarioLogado, upload.any(), AuthController.postCadastro);
router.post('/home/comentarios', verificaUsuarioLogado, AuthController.commentCadastro);
router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);

router.get('/posts', verificaUsuarioLogado, postsController.index);
router.post('/posts', postsController.commentCadastro);



module.exports = router;
