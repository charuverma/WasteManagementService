module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"citys",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			countryId:DataTypes.STRING,
            stateId:DataTypes.STRING,
			name: DataTypes.STRING,
			status:DataTypes.STRING,
		},
		{
            tableName: "cities",
            timestamps:false,
		}
	);
	return Model;
};
