module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"countrys",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: DataTypes.STRING,
			status:DataTypes.STRING,
		},
		{
            tableName: "countries",
            timestamps:false,
		}
	);
	return Model;
};
