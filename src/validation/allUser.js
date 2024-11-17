import Joi from 'joi';

export const createSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    family: Joi.object({
        address: Joi.string().required(),
        postal_code: Joi.string().max(5).required(),
        city: Joi.string().required(),
        // 0 => premier chiffre obligatoirelment,
        // [1-9] => deuxième chiffre entre 1 et 9 obligatoirement,
        // [0-9]{8} => le reste des 8 chiffres sera compris entre 0 et 9
        phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français').required(),
        number_of_children: Joi.number().integer(),
        number_of_animals: Joi.number().integer(),
        garden: Joi.boolean(),
        description: Joi.string().allow(''),
        profile_photo: Joi.string()
    }),
    association: Joi.object({
        rna_number: Joi.string().pattern(/^W\d{9}$/).required(),
        representative: Joi.string().required(),
        address: Joi.string().required(),
        postal_code: Joi.string().max(5).required(),
        city: Joi.string().required(),
        phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français').required(),
        description: Joi.string().allow(''),
        status: Joi.string().default("en attente"),
        profile_photo: Joi.string()
    })
});

export const patchSchema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    currentPassword: Joi.string(),
    newPassword: Joi.string(),
    confirmPassword: Joi.string(),
    family: Joi.object({
        address: Joi.string(),
        postal_code: Joi.string().max(5),
        city: Joi.string(),
        phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français'),
        number_of_children: Joi.number().integer(),
        number_of_animals: Joi.number().integer(),
        garden: Joi.boolean(),
        description: Joi.string().allow(''),
        profile_photo: Joi.string(),
        id_user: Joi.number().integer()
    }),
    association: Joi.object({
        rna_number: Joi.string().pattern(/^W\d{9}$/),
        representative: Joi.string(),
        address: Joi.string(),
        postal_code: Joi.string().max(5),
        city: Joi.string(),
        phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français'),
        description: Joi.string().allow(''),
        status: Joi.string().default("en attente"),
        profile_photo: Joi.string()
    })
});