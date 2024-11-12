import {Animal, Association} from "../models/index.js";
import HttpError from "../middlewares/httperror.js";

export const animalController = {
  //! Recuperer tous les animaux
  getAllAnimals: async (req, res) => {
    
    if (req.user) {
      const association = await Association.findOne({where: {id_user : req.user.id}});
      const myAnimals = await association.getAnimals();
      return res.json(myAnimals);
    }
    
    const animals = await Animal.findAll({where: {id_family: null}});
    res.json(animals);
  },

  //! Recuperer un animal
  getAnimalById: async (req, res) => {
    const animalId = req.params.id || req.params.animalId;

    if (req.user) {
      const association = await Association.findOne({where: {id_user : req.user.id}});
      const myAnimal = await association.getAnimals({where: {id: animalId}});
      console.log(myAnimal);
      return res.json(myAnimal);
    }

    const animal = await Animal.findByPk(animalId, {
      where: {id_family : null},
      include: [
        { 
          association: "family",
          include: {association :"user", attributes: {exclude: ["password"]}}
        },// Relation avec la famille
        { 
          association: "association",
          include: {association :"user", attributes: {exclude: ["password"]}}
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
  const association = await Association.findOne({where: {id_user: req.user.id}});
  const animal = req.body;
  animal.id_association = association.id
  const newAnimal = await Animal.create(animal); // Crée un nouvel animal avec les données fournies dans la requête
  res.status(201).json(newAnimal); // Renvoie la réponse avec le nouvel animal créé
},

//! Modifier un animal
patchAnimal: async (req, res) => {
  const association = await Association.findOne({where: {id_user: req.user.id}});
  const animalId = req.params.id;
  const selectedAnimal = await Animal.findByPk(animalId);

  if (!selectedAnimal) {
    throw new HttpError(
      404,
      "Animal non trouvé. Veuillez vérifier l'animal demandé"
    );
  }

  if (association.id !== selectedAnimal.id_association){
    throw new HttpError(
      403,
      "Accès interdit: Vous n'etes pas habilité"
    );
  }
  
  Object.assign(selectedAnimal, req.body); // Met à jour les propriétés de l'animal

  await selectedAnimal.save(); // Sauvegarde l'animal mis à jour

  res.status(200).json(selectedAnimal);
},


  //! Supprimer un animal
  deleteAnimal: async (req, res) => {
    const association = await Association.findOne({where: {id_user: req.user.id}});
    const animalId = req.params.id;
    const selectedAnimal = await Animal.findByPk(animalId);

    if (!selectedAnimal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    if (association.id !== selectedAnimal.id_association){
      throw new HttpError(
        403,
        "Accès interdit: Vous n'etes pas habilité"
      );
    }

    await selectedAnimal.destroy();
    res.status(204).end();
  },
};
