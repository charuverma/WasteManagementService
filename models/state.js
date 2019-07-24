module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"states",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
            },
            countryId:DataTypes.STRING,
			name: DataTypes.STRING,
			status:DataTypes.STRING,
		},
		{
            tableName: "states",
            timestamps:false,
		}
	);
	return Model;
};
