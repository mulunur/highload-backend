const {OrderItem, BasketItem} = require("../../models/model");
const {ApiError} = require("../../middleware/errorHandlerMiddleware");

class OrderItemController{
	async getAll(req, res, next)
	{
		try
		{
			const OrderId = req.query.id
			const OrderItem = await OrderItem.findOne({where: {OrderId}});
			return res.json({OrderItem});
		}
		catch(e)
		{
			return next(ApiError.userError(e.messadge));
		}
	}
    async create(req, res, next){
        // try
		// {
			const BasketItemId = req.body.basketItemId
            const OrderId = req.body.orderId
			if(!OrderId || !BasketItemId)
				return next(ApiError.userError("требуется id"))
			const newBasletItem = await BasketItem.findOne({where: {id: BasketItemId}});
            const newItem = OrderItem.create({...newBasletItem, OrderId})
			return res.json({...newItem});
		// }
		// catch(e)
		// {
		// 	return next(ApiError.userError(e.messadge));
		// }
    }
	async getOne(req, res, next)
	{
		try
		{
			const id = req.query.id
			const OrderItem = await OrderItem.findOne({where: {id}});
			return res.json({OrderItem});
		}
		catch(e)
		{
			return next(ApiError.userError(e.messadge));
		}
	}
}

module.exports = new OrderItemController();