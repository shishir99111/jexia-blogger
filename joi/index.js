const postCommentSchema = Joi.object().keys({
  full_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(20).required(),
  type: Joi.string().min(1).max(8000).required()
}).or('fixed_amount', 'is_zero_fee');

module.exports = { postCommentSchema };