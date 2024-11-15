import Joi from "joi";

export const patchSchema = Joi.object({
  address: Joi.string(),
  postal_code: Joi.string().max(5),
  city: Joi.string(),
  phone: Joi.string().pattern(
    /^0[1-9][0-9]{8}$/,
    "Merci de renseigner un numéro de téléphone"
  ),
  number_of_children: Joi.number().integer(),
  number_of_animals: Joi.number().integer(),
  garden: Joi.boolean(),
  description: Joi.string(),
  profile_photo: Joi.string(), // Si vous souhaitez conserver ce champ
  id_user: Joi.number().integer(),
  user: Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
  imageUrl: Joi.string().uri().optional(), //ligne pour permettre imageUrl
});