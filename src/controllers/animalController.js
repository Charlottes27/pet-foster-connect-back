import { Animal, Association, Family } from "../models/index.js";
import HttpError from "../middlewares/httperror.js";
import { Op } from "sequelize";
import cloudinary from "../config/cloudinaryConfig.js"; // Importez votre configuration Cloudinary
import validator from "validator";
import fs from "fs/promises";
import path from "path";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { log } from "console";

const { isURL } = validator;

export const animalController = {
  //! Recuperer tous les animaux
  getAllAnimals: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (req.originalUrl === `/api/association/${id}/animal`) {
      const association = await Association.findByPk(id);
      if (association) {
        const myAnimals = await association.getAnimals();
        return res.json(myAnimals);
      }
    }
    
    if (req.user) {
      if (req.user.role === "family") {
        const family = await Family.findOne({ where: { id_user: req.user.id } });
        if (family) {
          const myAnimals = await family.getAnimalsFamily();
          return res.json(myAnimals);
        }
      }
    }

    const { species, breed, age, size, gender } = req.query;
    const conditions = { id_family: null };

    // Filtre les animaux par éspèce spécifiée, Op.iLike  =  insensible à la casse dans Sequelize.
    if (species) {
      conditions.species = { [Op.iLike]: species };
    }

    if (breed) {
      conditions.breed = { [Op.iLike]: breed };
    }

    // Filtre les animaux dont l'âge est inférieur à la valeur spécifiée, Op.lt = "inférieur à" dans Sequelize
    if (age) {
      conditions.age = { [Op.lt]: parseInt(age, 10) };
    }

    // Filtre les animaux par taille
    if (size) {
      conditions.size = { [Op.iLike]: size };
    }

    // Filtre les animaux par sexe, Op.iLike = insensible à la casse dans Sequelize
    if (gender) {
      conditions.gender = { [Op.iLike]: gender };
    }

    // Effectue la requête avec les conditions
    const animals = await Animal.findAll({
      where: conditions,
    });

    if (animals.length === 0) {
      return res.status(404).json({ message: "Aucun animal trouvé" });
    }

    // Renvoyer les animaux filtrés
    res.status(200).json(animals);
  },

  //! Récuperer un animal
  getAnimalById: async (req, res) => {
  console.log("je suis dans le back !!!");
    const animalId = req.params.id || req.params.animalId;

    if (req.user) {
      const association = await Association.findOne({
        where: { id_user: req.user.id },
      });
      const myAnimal = await association.getAnimals({
        where: { id: animalId },
      });
      return res.json(myAnimal);
    }

    const animal = await Animal.findByPk(animalId, {
      where: { id_family: null },
      include: [
        {
          association: "family",
          include: {
            association: "user",
            attributes: { exclude: ["password"] },
          },
        }, // Relation avec la famille
        {
          association: "association",
          include: {
            association: "user",
            attributes: { exclude: ["password"] },
          },
        }, // Relation avec l'association
      ],
    });

    if (!animal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    res.status(200).json(animal);
  },

  //! Ajouter un animal
  createAnimal: async (req, res) => {
    console.log(req.user);
    console.log(req.body);
    console.log(req.files);
    const association = await Association.findOne({
      where: { id_user: req.user.id },
    });

    const animalData = req.body;

    if (req.files) {
      const photoFields = ["profile_photo", "photo1", "photo2", "photo3"];
      for (const field of photoFields) {
        if (req.files[field]|| req.body[field] === "delete") {
          if (selectedAnimal[field]) {
            if (selectedAnimal[field].includes("images/")) {
              const localFilePath = path.join(
                process.cwd(),
                "public",
                selectedAnimal[field]
              );
              try {
                await fs.unlink(localFilePath);
                console.log("fichier local supprimé", localFilePath);
              } catch (error) {
                console.warn(`Erreur lors de la suppression du fichier local : ${err.message}`);
              }
            } else {
              const publicId = selectedAnimal[field]
              .split("/")
              .pop()
              .split(".")[0]
              console.log(publicId)
              try {
                const response = await cloudinary.v2.uploader.destroy(publicId);
                console.log("Image Cloudinary supprimé", publicId);
              } catch (error) {
                console.warn(`Erreur lors de la suppression sur Cloudinary : ${err.message}`);
              }
            }
          }
          
          if (req.files[field]) {
            const uploadResult = await uploadToCloudinary(req.files[field][0], `animal${selectedAnimal.id}_${field}` ,selectedAnimal.id);
            animalData[field] = uploadResult;
          } else {
            animalData[field] = null;
          }
        }
      }
    }

    // Associer l'animal à l'association
    animalData.id_association = association.id;

    // Créer un nouvel animal avec les données fournies dans la requête
    const newAnimal = await Animal.create(animalData);

    res.status(201).json(newAnimal); // Renvoie la réponse avec le nouvel animal créé
  },

  //! Modifier un animal
  patchAnimal: async (req, res) => {
    const association = await Association.findOne({
      where: { id_user: req.user.id },
    });
    const animalId = req.params.id;
    const selectedAnimal = await Animal.findByPk(animalId);
    const updateAnimal = req.body;

    if (!selectedAnimal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    if (association.id !== selectedAnimal.id_association) {
      throw new HttpError(403, "Accès interdit: Vous n'etes pas habilité");
    }
    if (req.files) {
      const photoFields = ["profile_photo", "photo1", "photo2", "photo3"];
      for (const field of photoFields) {
        if (req.files[field]|| req.body[field] === "delete") {
          if (selectedAnimal[field]) {
            if (selectedAnimal[field].includes("images/")) {
              const localFilePath = path.join(
                process.cwd(),
                "public",
                selectedAnimal[field]
              );
              try {
                await fs.unlink(localFilePath);
                console.log("fichier local supprimé", localFilePath);
              } catch (error) {
                console.warn(`Erreur lors de la suppression du fichier local : ${err.message}`);
              }
            } else {
              const publicId = selectedAnimal[field]
              .split("/")
              .pop()
              .split(".")[0]
              console.log(publicId)
              try {
                const response = await cloudinary.v2.uploader.destroy(publicId);
                console.log("Image Cloudinary supprimé", publicId);
              } catch (error) {
                console.warn(`Erreur lors de la suppression sur Cloudinary : ${err.message}`);
              }
            }
          }
          
          if (req.files[field]) {
            const uploadResult = await uploadToCloudinary(req.files[field][0], `animal${selectedAnimal.id}_${field}` ,selectedAnimal.id);
            updateAnimal[field] = uploadResult;
          } else {
            updateAnimal[field] = null;
          }
        }
      }
    }
    //* Met à jour les propriétés de l'animal avec les nouvelles URLs d'images
    Object.assign(selectedAnimal, updateAnimal);
    await selectedAnimal.save(); // Sauvegarde l'animal mis à jour

    res.status(200).json(selectedAnimal);
  },

  //! Supprimer un animal
  deleteAnimal: async (req, res) => {
    const association = await Association.findOne({
      where: { id_user: req.user.id },
    });

    const animalId = req.params.id;
    const selectedAnimal = await Animal.findByPk(animalId);

    if (!selectedAnimal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    if (association.id !== selectedAnimal.id_association) {
      throw new HttpError(403, "Accès interdit : Vous n'êtes pas habilité");
    }


    const photoFields = ["profile_photo", "photo1", "photo2", "photo3"];

    for (const photo of photoFields) {
      console.log(selectedAnimal[photo]);
      if (selectedAnimal[photo]) {
        if (selectedAnimal[photo].startsWith("images/")) {
          const localFilePath = path.join(
            process.cwd(),
            "public",
            selectedAnimal[photo]
          );
          try {
            await fs.unlink(localFilePath);
            console.log(`Fichier local supprimé : ${localFilePath}`);
          } catch (err) {
            console.warn(
              `Erreur lors de la suppression du fichier local : ${err.message}`
            );
          }
        } else {
          const publicId = selectedAnimal[photo]
            .split("/")
            .pop()
            .split(".")[0];
          try {
            await cloudinary.v2.uploader.destroy(publicId);
            console.log(`Image Cloudinary supprimée : ${publicId}`);
          } catch (err) {
            console.warn(
              `Erreur lors de la suppression sur Cloudinary : ${err.message}`
            );
          }
        }
      }
    }

    await selectedAnimal.destroy();

    res.status(204).end();
  },
};