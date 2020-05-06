const { sequelize, Usuario, Post, Comentario } = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: async (req,res) => {
        console.log(req.session.usuario);
        let usuario = req.session.usuario;
        let posts = await Post.findAll(
            {
                include:
                [
                    {
                        model:Comentario, 
                        as:'comentarios', 
                        include:'usuario'
                    }, 
                    'usuario' 
                ]
            }
        );
        res.render('index', { posts, usuario });
    },
    postCadastro: async (req, res) => {
        let {texto, usuarios_id} = req.body;
        let { files } = req;
        const novoPost = await Post.create({texto, img:'/img/'+ files[0].originalname, usuarios_id, n_likes:0});
        res.redirect('/home');
    },

    commentCadastro: async (req, res) => {
        let {texto, usuarios_id, posts_id} = req.body;
        const novoPost = await Comentario.create({texto, usuarios_id, posts_id});
        //console.log(req.body.usuario_id);
        res.redirect('/home');
    },

    login: async (req, res) => {

        //Lendo as info do body
        const {email, password} = req.body;

        //Tentar carregar o usuário
        const user = await Usuario.findOne({where: { email }});
        // console.log(user.senha, password);
        // Verificar se o usuário existe com e-mail
        if(!user){
            res.redirect('/login?error=1');
        }
        // Validar a senha passada via post contra a do banco
        // bcrypt.compare(senha, user.senha, function(err, result) {
        //     // result == true
        //     // res.redirect('/login?error=1')
        //     res.send('Sucesso!')
        // });
        if(!bcrypt.compareSync(password, user.senha)){
            res.redirect('/login?error=1');
            //res.send('sucesso');
        }

        // Setar uma session com o usuário
        req.session.usuario = user;

        // Redirecionar o usuário para a rota '/home'
        res.redirect('/home');
    }


}

module.exports = AuthController;