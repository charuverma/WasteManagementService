module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define(
		"collectors",
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
            collectorimg: DataTypes.STRING,
            collectorGSTcopy: DataTypes.STRING,
			bankaccount: DataTypes.STRING,
            PANNo: DataTypes.STRING,
            Aggdate:DataTypes.STRING,
            expdate:DataTypes.STRING
		},
		{
			tableName: "collectors",
			timestamps: false
		}
	);
	return Model;
};