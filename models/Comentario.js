const Comentario = (sequelize, DataTypes) => {
    let comentario = sequelize.define('Comentario',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            texto: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {}
            },
            usuarios_id: {
                type: DataTypes.INTEGER,
                // foreignKey: true,
                allowNull: true
            },
            posts_id: {
                type: DataTypes.INTEGER,
                // foreignKey: true,
                allowNull: true
            }
        },
        {
            tableName: "comentarios",
            timestamps: false
        }
        
        );
        comentario.associate = (models) => {
            comentario.belongsTo(models.Post, {foreignKey: 'posts_id', as:'post'});
            comentario.belongsTo(models.Usuario, {foreignKey: 'usuarios_id', as: 'usuario'});
        }
        return comentario;
}

module.exports = Comentario;