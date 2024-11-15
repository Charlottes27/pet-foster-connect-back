import Family from "../models/family.js";
import sequelize from "../models/client.js";
import HttpError from "../middlewares/httperror.js";
import { Scrypt } from "../auth/Scrypt.js";
import { validatePassword } from "../validation/validatePassword.js";
import cloudinary from "../config/cloudinaryConfig.js"; // Importez votre configuration Cloudinary
import validator from "validator";

const { isURL } = validator;

export const familyController = {
  //! Méthode pour lister les familles d'accueil
  getAllFamilies: async (req, res) => {
    const families = await Family.findAll({
      include: [
        { association: "animalsFamily" },
        { association: "user", attributes: { exclude: ["password"] } },
      ],
    });
    res.status(200).json(families);
  },

  //! Méthode pour obtenir le détail d'une famille d'accueil
  getFamilyById: async (req, res, next) => {
    const { id: familyId } = req.params;
    const family = await Family.findByPk(familyId, {
      include: [
        { association: "animalsFamily" },
        { association: "user", attributes: { exclude: ["password"] } },
      ],
    });

    if (!family) {
      return next(new HttpError(404, "Foster family not found"));
    }
    res.status(200).json(family);
  },

  //! Méthode pour mettre à jour les informations de la famille
  patchFamily: async (req, res, next) => {
    const familyId = req.params.id;
    const updateFamily = req.body;

    const family = await Family.findByPk(familyId, {
      attributes: { exclude: "password" },
      include: "user",
    });

    if (!family) {
      return next(new HttpError(404, "Foster family not found"));
    }

    // Vérification de la validité du mot de passe
    if (updateFamily.password && !validatePassword(updateFamily.password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
      });
    }

    const transaction = await sequelize.transaction();

    try {
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

      //! Gestion de l'image de profil
      if (updateFamily.imageUrl) {
        if (!isURL(updateFamily.imageUrl)) {
          return res.status(400).json({ error: "URL d'image invalide" });
        }

        //* Supprimer l'ancienne photo si elle existe
        if (family.profile_photo) {
          const publicId = family.profile_photo.split("/").pop().split(".")[0]; // Extraire le public_id
          await cloudinary.v2.uploader.destroy(publicId); // Supprimer l'image de Cloudinary
        }

        //* Uploader l'image depuis l'URL à Cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload(
          updateFamily.imageUrl,
          {
            resource_type: "image",
          }
        );

        //* Mettre à jour l'URL de la photo de profil dans les données
        updateFamily.profile_photo = uploadResult.secure_url;
      }

      // Mettre à jour les données de la famille
      const familyData = {
        ...family.get(),
        ...updateFamily,
        user: user.get(),
        id: family.id,
      };

      await family.update(familyData);

      const familyObject = family.get({ plain: true });
      if (familyObject.user) {
        delete familyObject.user.password;
      }

      await transaction.commit();

      res.status(201).json(familyObject);
    } catch (error) {
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }
  },

  //! Supprimer une famille
  deleteFamily: async (req, res) => {
    const familyId = req.params.id;
    const selectFamily = await Family.findByPk(familyId);

    if (!selectFamily) {
      throw new HttpError(404, "Family not found");
    }

    await selectFamily.destroy();
    res.status(204).end();
  },
};
