const verificaUsuarioLogado = (req, res, next) => {
    // Se a session do usuario não estiver setada;
    if(!req.session.usuario){
        res.redirect('/login?error=2');
    }
    next();
}

module.exports = verificaUsuarioLogado;