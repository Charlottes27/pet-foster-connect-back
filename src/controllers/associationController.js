import Association from "../models/association.js";
import HttpError from "../middlewares/httperror.js";
import sequelize from "../models/client.js";
import { Scrypt } from "../auth/Scrypt.js";
import { validatePassword } from "../validation/validatePassword.js";
import cloudinary from "../config/cloudinaryConfig.js"; // Importez votre configuration Cloudinary
import validator from "validator";

const { isURL } = validator;

export const associationController = {
  //! Méthode pour lister les associations
  getAllAssociations: async (req, res) => {
    const associations = await Association.findAll({
      include: [
        { association: "user", attributes: { exclude: ["password"] } }, // Inclut les animaux associés à chaque association
        { association: "animals" }, // Inclut les utilisateurs associés à chaque association
      ],
    });
    res.status(200).json(associations);
  },

  //! Méthode pour obtenir le détail d'une association
  getAssociationById: async (req, res, next) => {
    const { id: associationId } = req.params;
    const association = await Association.findByPk(associationId, {
      include: [
        { association: "user", attributes: { exclude: ["password"] } }, // Inclut les animaux associés à chaque association
        { association: "animals" }, // Inclut les utilisateurs associés à chaque association
      ],
    });

    if (!association) {
      next(new HttpError(404, "Association not found"));
    } else {
      res.status(200).json(association);
    }
  },

  //! Méthode pour mettre à jour les informations de l'association
  patchAssociation: async (req, res, next) => {
    const associationId = req.params.id;
    const updateAssociation = req.body;

    const association = await Association.findByPk(associationId, {
      attributes: { exclude: "password" },
      include: "user",
    });

    if (!association) {
      return next(new HttpError(404, "Association not found"));
    }

    const transaction = await sequelize.transaction();

    try {
      const user = await association.getUser();

      //! Gestion de l'image de profil
      if (updateAssociation.imageUrl) {
        if (!isURL(updateAssociation.imageUrl)) {
          return res.status(400).json({ error: "URL d'image invalide" });
        }

        //* Supprimer l'ancienne photo si elle existe
        if (association.profile_photo) {
          const publicId = association.profile_photo
            .split("/")
            .pop()
            .split(".")[0]; // Extraire le public_id
          await cloudinary.v2.uploader.destroy(publicId); // Supprimer l'image de Cloudinary
        }

        //* Uploader l'image depuis l'URL à Cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload(
          updateAssociation.imageUrl,
          {
            resource_type: "image",
          }
        );

        //* Mettre à jour l'URL de la photo de profil dans les données
        updateAssociation.profile_photo = uploadResult.secure_url;
      }

      if (updateAssociation.user) {
        const userData = {
          ...user.get(),
          ...updateAssociation.user,
          id: user.id,
        };

        // Gestion du changement de mot de passe
        if (updateAssociation.user.currentPassword && updateAssociation.user.newPassword && updateAssociation.user.confirmPassword) {
          // Vérification du mot de passe actuel
          const isCurrentPasswordValid = await Scrypt.compare(updateAssociation.user.currentPassword, user.password);
          if (!isCurrentPasswordValid) {
            await transaction.rollback();
            return res.status(400).json({ message: "Le mot de passe actuel est incorrect." });
          }

          // Vérification que le nouveau mot de passe et sa confirmation correspondent
          if (updateAssociation.user.newPassword !== updateAssociation.user.confirmPassword) {
            await transaction.rollback();
            return res.status(400).json({ message: "Le nouveau mot de passe et sa confirmation ne correspondent pas." });
          }

          // Validation du nouveau mot de passe
          if (!validatePassword(updateAssociation.user.newPassword)) {
            await transaction.rollback();
            return res.status(400).json({
              message: "Le nouveau mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
            });
          }
          
          // Hachage du mot de passe
          userData.password = Scrypt.hash(updateAssociation.user.newPassword);
        }

        // Mise à jour du User en BDD
        await user.update(userData);
      }

      // Mettre à jour les données de l'association
      const associationData = {
        ...association.get(),
        ...updateAssociation,
        user: user.get(),
        id: association.id,
      };

      await association.update(associationData);

      const associationObject = association.get({ plain: true });
      if (associationObject.user) {
        delete associationObject.user.password;
      }

      await transaction.commit();

      res.status(201).json(associationObject);
    } catch (error) {
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }
  },

  //! Supprimer une association
  deleteAssociation: async (req, res) => {
    const associationId = req.params.id;
    const selectAssociation = await Association.findByPk(associationId);

    if (!selectAssociation) {
      throw new HttpError(404, "Association not found");
    }

    const user = await selectAssociation.getUser();

    await selectAssociation.destroy();
    await user.destroy();
    res.status(204).end();
  },
};
