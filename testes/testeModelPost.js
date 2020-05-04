const { sequelize, Post, Comentario } = require('../models');

Post.findAll({
    include:[
        {
            model: Comentario,
            as:'comentarios',
            include: 'usuario'
    },
        'usuario'
    ]}).then(
    data => {
        console.log(data.map( u => u.toJSON()));
        console.log(data[0].comentarios[0].usuario.nome);
        sequelize.close();
    }
)