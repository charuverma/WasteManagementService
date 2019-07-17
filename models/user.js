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
			role: DataTypes.STRING,
			name: DataTypes.STRING,
			emailid: DataTypes.STRING,
			mobile: DataTypes.INTEGER,
			password: DataTypes.STRING,
			address: DataTypes.STRING,
			status: DataTypes.STRING,
			file: DataTypes.STRING
		},
		{
			tableName: "user",
            timestamps: false,
            hooks: {
                beforeCreate: (user) => {
                  const salt = bcrypt.genSaltSync();
                  user.password = bcrypt.hashSync(user.password, salt);
                }
              },
        }
	);
	return Model;
};
