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
        console.log(posts);
        res.render('posts', {posts});
    }

}


module.exports = postsController;