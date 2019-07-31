module.exports= function(sequelize,DataTypes){
    var Model=sequelize.define(
        "rolepermission",{
            roleId:
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            permissionId: 
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }
        },
        {
            tableName:"role_permissions",
            timestamps:false,
        }
    );
    return Model;
}