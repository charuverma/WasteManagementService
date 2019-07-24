module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"categorys",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: DataTypes.STRING,
			parentId: DataTypes.STRING,
			slug: DataTypes.STRING,
			desc: DataTypes.STRING,
			metatitle: DataTypes.STRING,
			metadesc: DataTypes.STRING,
			metakeyword: DataTypes.STRING,
			status: DataTypes.STRING,
			file: DataTypes.STRING
		},
		{
			tableName: "categories",
			timestamps: false
		}
	);
	return Model;
};
