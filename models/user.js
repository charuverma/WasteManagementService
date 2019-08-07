var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"users",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			roleId: DataTypes.STRING,
			name: DataTypes.STRING,
			emailid:{ 
				type:DataTypes.STRING,
				 validate: {
					isUnique: function(value, next){
						Model.findOne({
							where:{
								id:{[sequelize.Sequelize.Op.ne]: this.id},
								emailid:value
							},
						}).then(function(data){
							if(data !== null){
								next('Email already exist');
							} else{
								next();
							}
						});
					}
				}  
			},
			mobile:{ 
				type:DataTypes.INTEGER,
				 validate: {
					isUnique: function(value, next){
						Model.findOne({
							where:{
								id:{[sequelize.Sequelize.Op.ne]: this.id},
								mobile:value
							},
						}).then(function(data){
							if(data !== null){
								next('Mobile already exist');
							} else{
								next();
							}
						});
					}
				}  
			},
			password: DataTypes.STRING,
			address: DataTypes.STRING,
			status: DataTypes.STRING,
			file:DataTypes.STRING
		},
		{
			tableName: "users",
            timestamps: false,
            hooks: {
                afterValidate: (user) => {
					if(user.password){
						const salt = bcrypt.genSaltSync();
						user.password = bcrypt.hashSync(user.password, salt);
					}
                }
            },
        }
	);
	return Model;
};
