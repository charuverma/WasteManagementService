module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"roles",
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
            tableName: "roles",
            timestamps:false,
		}
	);
	return Model;
};
