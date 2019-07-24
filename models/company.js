module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"companys",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			compname: DataTypes.STRING,
			contactPN: DataTypes.STRING,
			emailid: DataTypes.STRING,
			ContactNo: DataTypes.STRING,
			Employees: DataTypes.INTEGER,
			address: DataTypes.STRING,
			Distt: DataTypes.STRING,
			countryId: DataTypes.STRING,
            stateId: DataTypes.STRING,
            cityId: DataTypes.STRING,
			pincode: DataTypes.INTEGER,
			GSTDetails: DataTypes.STRING,
            personimg: DataTypes.STRING,
            GSTcopy: DataTypes.STRING,
			bankaccount: DataTypes.STRING,
			PANNo: DataTypes.STRING
		},
		{
			tableName: "companies",
			timestamps: false
		}
	);
	return Model;
};