module.exports = function(sequelize,DataTypes){
    var Model=sequelize.define(
        "permission",{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            module:DataTypes.STRING,
            module_action:DataTypes.STRING,
            slug:DataTypes.STRING,
            name:DataTypes.STRING,
            order:DataTypes.INTEGER,
            order_module:DataTypes.INTEGER,
            Status:DataTypes.INTEGER

        },
        {
            tableName: 'permission',
            timestamps: false,
        }
    );
    return Model;
};