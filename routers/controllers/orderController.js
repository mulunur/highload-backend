const {Order} = require("../../models/model");
const {ApiError} = require("../../middleware/errorHandlerMiddleware");

class OrderController{
	async getAll(req, res, next)
	{
		try
		{
			const UserId = req.query.id;
			const newOrder = await Order.findOne({where: {UserId}});
			return res.json({newOrder});
		}
		catch(e)
		{
			return next(ApiError.userError(e.messadge));
		}
	}
    async getOne(req, res, next)
	{
		try
		{
            const orderId = req.query.id;
			const newOrder = await Order.findOne({where: {id: orderId}});
			return res.json({newOrder});
		}
		catch(e)
		{
			return next(ApiError.userError(e.messadge));
		}
	}
	async create(req, res, next)
	{
		try
		{
			const UserId = req.body.id;
			if(!UserId)
				return next(ApiError.userError("требуется id"))
			const newOrder = await Order.create({UserId});
			return res.json({newOrder});
		}
		catch(e)
		{
			return next(ApiError.userError(e.messadge));
		}
	}
}

module.exports = new OrderController();