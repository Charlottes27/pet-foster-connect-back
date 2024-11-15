import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  breed: Joi.string().required(),
  gender: Joi.string().valid("M", "F").required(),
  age: Joi.number().integer().required(),
  size: Joi.string().required(),
  description: Joi.string(),
  profile_photo: Joi.string(),
  photo1: Joi.string(),
  photo2: Joi.string(),
  photo3: Joi.string(),
  id_family: Joi.number().integer(),
  id_association: Joi.number().integer(),
  imageUrl: Joi.string().uri().optional(), // Ajout du champ imageUrl
});

export const patchSchema = Joi.object({
  name: Joi.string(),
  species: Joi.string(),
  breed: Joi.string(),
  gender: Joi.string().valid("M", "F"),
  age: Joi.number().integer(),
  size: Joi.string(),
  description: Joi.string(),
  profile_photo: Joi.string(),
  photo1: Joi.string(),
  photo2: Joi.string(),
  photo3: Joi.string(),
  id_family: Joi.number().integer(),
  id_association: Joi.number().integer(),
  imageUrl: Joi.string().uri().optional(), // Ajout du champ imageUrl
}).min(1);
