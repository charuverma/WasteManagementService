module.exports = function(sequelize, DataTypes){
	var Model = sequelize.define('product',{
		id:{
			type:DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
		name:DataTypes.STRING,
		type:DataTypes.STRING,
		file:DataTypes.STRING,
		qty:DataTypes.INTEGER,
		weight:DataTypes.STRING,
		price:DataTypes.INTEGER,
		HSNnumber:DataTypes.INTEGER,
		others:DataTypes.STRING
	},{
		tableName: 'products',
		timestamps: false,
	}
	);
	return Model;
}