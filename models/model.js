const sequelize = require('../db').sequelize;;

const {DataTypes} = require('sequelize');

const User = sequelize.define("User", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	email: {type: DataTypes.STRING, unique:true},
	login: {type: DataTypes.STRING},
	password: {type: DataTypes.STRING},
});


const Basket = sequelize.define("Basket", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
});

const BasketItem = sequelize.define("BasketItem", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	name: {type: DataTypes.STRING },
	count: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
});

const Item = sequelize.define("Item", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	name: {type: DataTypes.STRING},
	restCount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
});

const Order = sequelize.define("Order", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
 })

const OrderItem = sequelize.define("OrderItem", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	name: {type: DataTypes.STRING },
	count: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

module.exports = {
	User, Basket, BasketItem, Item, Order, OrderItem
}