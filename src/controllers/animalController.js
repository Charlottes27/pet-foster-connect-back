import { Animal, Association, Family } from "../models/index.js";
import HttpError from "../middlewares/httperror.js";
import { Op } from "sequelize";
import cloudinary from "../config/cloudinaryConfig.js"; // Importez votre configuration Cloudinary
import validator from "validator";

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
    const association = await Association.findOne({
      where: { id_user: req.user.id },
    });

    const animalData = req.body;

    // Gestion des photos si fournies
    if (Array.isArray(animalData.images)) {
      const uploads = animalData.images.map((image) =>
        cloudinary.v2.uploader.upload(image)
      );

      const urls = await Promise.all(uploads);

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i].secure_url;
        if (i === 0) {
          animalData.profile_photo = url;
        } else {
          animalData[`photo${i}`] = url;
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

    if (!selectedAnimal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    if (association.id !== selectedAnimal.id_association) {
      throw new HttpError(403, "Accès interdit: Vous n'etes pas habilité");
    }

    Object.assign(selectedAnimal, req.body); // Met à jour les propriétés de l'animal

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

    //! Gestion des images pour mise à jour
    const imageUrls = {};

    //* Upload de la photo de profil si fournie
    if (req.body.profile_photo && isURL(req.body.profile_photo)) {
      const uploadResultProfilePhoto = await cloudinary.v2.uploader.upload(
        req.body.profile_photo,
        {
          resource_type: "image",
        }
      );
      imageUrls.profile_photo = uploadResultProfilePhoto.secure_url;
    }

    //* Upload des autres photos si fournies
    for (let i = 1; i <= 3; i++) {
      const photoKey = `photo${i}`;
      if (req.body[photoKey] && isURL(req.body[photoKey])) {
        const uploadResultPhoto = await cloudinary.v2.uploader.upload(
          req.body[photoKey],
          {
            resource_type: "image",
          }
        );
        imageUrls[photoKey] = uploadResultPhoto.secure_url;
      }
    }

    //* Met à jour les propriétés de l'animal avec les nouvelles URLs d'images
    Object.assign(selectedAnimal, req.body, imageUrls);

    await selectedAnimal.save(); // Sauvegarde l'animal mis à jour

    res.status(200).json(selectedAnimal);
  },
};