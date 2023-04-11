
const { redis_client } = require('../../index');
const { ApiError } = require('../../middleware/errorHandlerMiddleware');
const { BasketItem, Basket, Item } = require('../../models/model');

class basketItemController{

	async getItemAndBasketItem(req){
		const basketItemId = req.body.basketItemId;
		let BasketId = undefined;
		if (!basketItemId)
		{
			BasketId = req.body.BasketId ?? (await Basket.findOne({where: {UserId: req.user.id}})).id;
		}
		const ItemId = req.body.itemId;
		const basketItem = basketItemId ? await BasketItem.findOne({where: {id: basketItemId}}) : await BasketItem.findOne({where: {ItemId, BasketId}});
		const item = ItemId ? await Item.findOne({where: {id: ItemId}}) : await Item.findOne({where: {id: basketItem.ItemId}});
		return {basketItem, item}
	}

	async create (req, res, next){
		try{
			const BasketId = req.body.BasketId;
			const ItemId = req.body.itemId;
			// const basketItem = await BasketItem.findOne({where: {ItemId, BasketId}});
			// if(basketItem){
			// 	return next(ApiError.userError("такой передмет в корзне уже есть"))
			// }
			// const item = await Item.findOne({where: {id: ItemId}});
			// if(item.restCount > 0)
			// {
			// 	const newBasketItem = await BasketItem.create({name: item.name, price: item.price, count: 1, img: item.img, BasketId, ItemId});
			// 	await item.update({restCount: item.restCount-1});
			// 	return res.json(newBasketItem);
			// }
			// else{
			// 	return next(ApiError.userError("товара нет на складе"))
			// }

			redis_client.RPUSH(`${BasketId}`, `${ItemId}`)
			return res.json({"result": "OK"})
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	incrementcount = async (req, res, next) =>{
		try{
			const {item, basketItem} = await this.getItemAndBasketItem(req);
			if(item.restCount > 0)
			{
				item.update({restCount: item.restCount - 1})
				basketItem.update({count: basketItem.count + 1})
				return res.json(basketItem);
			}
			return next(ApiError.userError("этот товар закончился на складе"))
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	decrementcount = async (req, res, next) =>{
		try{
			const {item, basketItem} = await this.getItemAndBasketItem(req);
			if(basketItem.count - 1 == 0)
			{
				req.body.basketItemId = basketItem.id;
				return await this.deleteOne(req, res, next);
			}
			else
			{
				item.update({restCount: item.restCount + 1})
				basketItem.update({count: basketItem.count - 1})
				return res.json(basketItem)
			}
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	deleteOne = async (req, res, next) => {
		try{
			const {item, basketItem} = await this.getItemAndBasketItem(req);
			if(!basketItem){
				return next(ApiError.userError("такого передмета нет в корзине"))
			}
			await item.update({restCount: item.restCount + basketItem.count});
			await basketItem.destroy();
			return res.json(basketItem);
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	getOne = async (req, res, next) => {
		try{
			const {id, UserId} = req.query;
			const basket = await Basket.findOne({where: {UserId}})
			const basketItem = await BasketItem.findOne({where: {ItemId: id, BasketId: basket.id}});
			if(!basketItem){
				return next(ApiError.userError("такого передмета нет в корзине"))
			}
			return res.json(basketItem);
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	async deleteAll(req, res, next){
		try{
			const BasketId = req.body.BasketId ?? (await Basket.findOne({where: {UserId: req.user.id}})).id;
			const arrOfBasketItems = await BasketItem.findAll({where: {BasketId}});
			arrOfBasketItems.forEach( async (el) =>
			{
				const item = await Item.findOne({where: {id: el.ItemId}});
				await item.update({restCount: item.restCount + el.count});
				await el.destroy();
			})
			return res.json({})
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	async getAll (req, res, next){
		try{
			const BasketId = req.body.BasketId ?? (await Basket.findOne({where: {UserId: req.user.id}})).id;
			const arrOfBasketItems = await BasketItem.findAll({where: {BasketId}});
			arrOfBasketItems.sort((a, b) => {return a.id > b.id ? 1 : -1});
			return res.json(arrOfBasketItems)
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}

	changecount = async (req, res, next) => {
		try{
			const {item, basketItem} = await this.getItemAndBasketItem(req);
			const delta = req.body.delta;
			if(!basketItem){
				return next(ApiError.userError("такого передмета нет в корзне"))
			}
			if(item.restCount + delta < 0 || basketItem.count - delta < 0)
			{
				return next(ApiError.userError("действие невозможно"))
			}
			await item.update({restCount: item.restCount + delta})
			await basketItem.update({count: basketItem.count - delta})
			if (basketItem.count === 0)
			{
				req.body.basketItemId = basketItem.id;
				return await this.deleteOne(req, res, next);
			}
			return res.json(basketItem)
		}
		catch(e){
			return next(ApiError.userError(e.messadge))
		}
	}
}

module.exports = new basketItemController();