const Joi = require('joi');

const postUserSchema = Joi.object().keys({
  full_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(20).required(),
  type: Joi.string().min(1).max(8000).required(),
});

const postBlogSchema = Joi.object().keys({
  title: Joi.string().min(2).max(8000).required(),
  subtitle: Joi.string().min(2).max(8000).required(),
  content: Joi.string().min(2).max(8000).required(),
  user_id: Joi.number().required(),
  annotations: Joi.array().items(Joi.string()).optional(),
});

const postCommentSchema = Joi.object().keys({
  user_id: Joi.string().min(2).max(100).required(),
  blog_id: Joi.string().min(1).max(8000).required(),
  content: Joi.string().email().required(),
  rating: Joi.string().min(7).max(20).required(),
});

module.exports = {
  postUserSchema,
  postBlogSchema,
  postCommentSchema,
};