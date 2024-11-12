import  Family  from "../models/family.js";
import sequelize from "../models/client.js";
import HttpError from "../middlewares/httperror.js";
import { Scrypt } from "../auth/Scrypt.js";
import { validatePassword } from "../validation/validatePassword.js";

export const familyController = {
  //! Méthode pour lister les familles d'accueil
  getAllFamilies: async (req, res) => {
    const families = await Family.findAll({
      include: [
        { association: "animalsFamily" }, // Inclut les animaux associés à chaque famille
        { association: "user", attributes: {exclude: ["password"]} }, // Inclut les utilisateurs associés à chaque famille
      ],
    });
    res.status(200).json(families); 
  },

  //! Méthode pour obtenir le détail d'une famille d'accueil
  getFamilyById: async (req, res, next) => {
    // Ajout de 'res' comme argument
    const { id: familyId } = req.params; // Extrait l'ID de la famille depuis les paramètres de la requête
    const family = await Family.findByPk(familyId, {
      include: [{ association: "animalsFamily" }, 
                { association: "user", attributes: {exclude: ["password"]} }],
    });

    if (!family) {
      return next(new HttpError(404, "Foster family not found")); 
    }
    res.status(200).json(family); 
  },

  patchFamily: async (req, res, next) => {
    const familyId = req.params.id;
    const updateFamily = req.body;

    const family = await Family.findByPk(familyId,{
      attributes: {exclude: "password"},
      include: "user"
    });

    if(!family) {
      return next(new HttpError(404, "Foster family not found")); 
    }

    //! Vérification de la validité du mot de passe
    if (updateFamily.user&& updateFamily.user.password ) {
      if (!validatePassword(updateFamily.user.password)) {
        return res.status(400).json({
          message:
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
        });
      }
    }

    const transaction = await sequelize.transaction();
    
    try{
      const user = await family.getUser();
      
      if (updateFamily.user) {
        const userData = {
          ...user.get(),
          ...updateFamily.user,
          id: user.id,
        };

        // Hachage du mot de passe
        if (updateFamily.user.password) {
          userData.password = Scrypt.hash(updateFamily.user.password);
        }

        // Mise à jour du User en BDD
        await user.update(userData);
      }

      const familyData = {
        ...family.get(),
        ...updateFamily,
        user: user.get(),
        id: family.id,
      }
      await family.update(familyData);

      const familyObject = family.get({plain: true})
      if(familyObject.user) {
        delete familyObject.user.password;
      }

      await transaction.commit();


      res.status(201).json(familyObject)
    }
    catch(error) {
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }
  },

  deleteFamily: async (req, res) => {
    const familyId = req.params.id;
    const selectFamily = await Family.findByPk(familyId, {include: "animalsFamily"});

    if (!selectFamily) {
      throw new HttpError(404, "Family not found");
    }

    if (selectFamily.animalsFamily.length > 0) {
      throw new HttpError(409, "Deletion impossible, you are still hosting animals");
    }

    await selectFamily.destroy();
    res.status(204).end();
  },
};
