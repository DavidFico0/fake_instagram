const { sequelize, Post, Comentario } = require('../models');

const postsController = {
    index: async (req, res) => {
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
        //posts = JSON.parse(posts);
        //console.log(posts);
        res.render('posts', {posts});
    },
    commentCadastro: async (req, res) => {
        let {texto, usuarios_id, posts_id} = req.body;
        const novoPost = await Comentario.create({texto, usuarios_id, posts_id})
        //console.log(req.body.usuario_id);
        res.redirect('/posts')
    }

}


module.exports = postsController;