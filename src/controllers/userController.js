import { User, Family, Association} from "../models/index.js";
import sequelize from "../models/client.js";
import HttpError from "../middlewares/httperror.js";
import { Scrypt } from "../auth/Scrypt.js";
import { validatePassword } from "../validation/validatePassword.js";

export const userController = {
  //! récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    const users = await User.findAll({
      attributes: {exclude: ["password"]},
      include: [
        {association: "association"},
        {association: "family"}
        ]
    });
    res.status(200).json(users);
  },

  getOneUser: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: {exclude: ["password"]},
      include: [
        {association: "association",},
        {association: "family"}
      ]
    });

    if(!user){
      throw new HttpError(
        404,
        "Utilisateur non trouvé. Veuillez vérifier l'utilisateur demandé"
      );
    }
    res.status(200).json(user);
  },

   //! Modifier un utilisateur
   patchUser: async (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;

    const user = await User.findByPk(userId, {
      attributes: {exclude: ["password"]},
      include: [
        {association: "association"},
        {association: "family"}
      ], 
    });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    //! Vérification de la validité du mot de passe
    if (updateUser.password && !validatePassword(updateUser.password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
      });
    }

    const transaction = await sequelize.transaction();

    try{
  
      const family = await user.getFamily();
      if (family) {
        // Mise à jour des données de la famille du user
        const familyData = {
          ...family.get(), // Récupère les données de la famille
          ...updateUser.family,
          id: family.id,
        };
        await family.update(familyData)
      }

      const association = await user.getAssociation();
      if (association) {
        const associationData = {
          ...association.get(), // Récupère les données de l'association
          ...updateUser.association,
          id: association.id,
        };
        await association.update(associationData)
      }

      const userData = {
        ...user.get(),
        ...updateUser,
        id: user.id
      };

      if (updateUser.password) {
        userData.password = Scrypt.hash(updateUser.password);
      }

      await user.update(userData);
      
      const userObject = user.get({plain: true});
      delete userObject.password;
      
      await transaction.commit();
      
  
      res.status(200).json(userObject);
    }
    catch(error){
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }
  },

  //! Supprimer un utilisateur
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    const selectUser = await User.findByPk(userId);

    if (!selectUser) {
      throw new HttpError(404, "User not found");
    }

    await selectUser.destroy();
    res.status(204).end();
  },
};