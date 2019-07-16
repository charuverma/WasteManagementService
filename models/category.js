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
			Status: DataTypes.INTEGER,
			file: DataTypes.STRING
		},
		{
			tableName: "category",
			timestamps: false
		}
	);
	return Model;
};
