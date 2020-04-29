const { sequelize, Usuario } = require('../models');
const bcrypt = require('bcrypt');
const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: (req,res) => {
        console.log(req.session.usuario);
        res.render('index');
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