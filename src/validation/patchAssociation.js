import Joi from "joi";

export const patchSchema = Joi.object({
  rna_number: Joi.string().pattern(/^W\d{9}$/),
  representative: Joi.string(),
  address: Joi.string(),
  postal_code: Joi.string().max(5),
  city: Joi.string(),
  phone: Joi.string().pattern(
    /^0[1-9][0-9]{8}$/,
    "Merci de renseigner un numéro de téléphone français"
  ),
  description: Joi.string().allow(''),
  status: Joi.string().default("en attente"),
  profile_photo: Joi.string(),
  user: Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    currentPassword: Joi.string(),
    newPassword: Joi.string(),
    confirmPassword: Joi.string(),
  }),
  imageUrl: Joi.string().uri().optional(), //ligne pour permettre imageUrl
});