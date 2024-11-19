import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  breed: Joi.string().required(),
  gender: Joi.string().valid("M", "F").required(),
  age: Joi.number().integer().required(),
  size: Joi.string().required(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string().dataUri()).min(1).max(4).optional(),
  id_family: Joi.number().integer(),
  id_association: Joi.number().integer(),
});

export const patchSchema = Joi.object({
  name: Joi.string(),
  species: Joi.string(),
  breed: Joi.string(),
  gender: Joi.string().valid("M", "F"),
  age: Joi.number().integer(),
  size: Joi.string(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string().dataUri()).min(1).max(4).optional(),
  id_family: Joi.number().integer(),
  id_association: Joi.number().integer(),
}).min(1);
