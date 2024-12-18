import Ask from "../models/ask.js";
import HttpError from "../middlewares/httperror.js";
import Animal from "../models/animal.js";
import Family from "../models/family.js";
import { Association } from "../models/index.js";

export const askController = {
  //! Méthode pour lister toutes les demandes (de l'association)
  getAllAsks: async (req, res) => {
    const association = await Association.findOne({where: {id_user: req.user.id}});
    const asks = await Ask.findAll({
      include: [
        { 
          model: Family, as: "family",
          include: {association :"user", attributes: {exclude: ["password"]}},
         }, // Inclut la famille associée à la demande
        { model: Animal, as: "animal", where : {id_association: association.id}}, // Inclut l'animal associé à la demande
      ],
    },
   );
    res.status(200).json(asks); 
  },

  //! Méthode pour lister une seule demande
  getAskById: async (req, res) => {
    const id = req.params.askId;
    const ask = await Ask.findByPk( id, {
      include: [
        { model: Family, as: "family",
          include: {association :"user", attributes: {exclude: ["password"]}}
        }, // Inclut la famille associée à la demande
        { model: Animal, as: "animal"}, // Inclut l'animal associé à la demande
      ],
    });

    if (!ask) {
      return res.status(404).json({error: "ask not found"})
    }

    res.status(200).json(ask); 
  },

  //! Méthode pour ajouter une demande
  createAsk: async (req, res) => {
    const family = await Family.findOne({
      where: { id_user: req.user.id }
    })
    const ask = req.body;
    ask.id_family = family.id;
     // Vérifier si une demande similaire existe déjà
    const existingAsk = await Ask.findOne({
      where: {
        id_family: ask.id_family,
        id_animal: ask.id_animal,
        status: "en attente",
      },
    });

    if (existingAsk) {
      return res.status(409).json({ message: "A similar request already exists." });
    }

    const newAsk = await Ask.create(ask); 
    res.status(201).json(newAsk); 
  },

  //! Méthode pour modifier une demande
  patchAsk: async (req, res) => {
    const id = req.params.askId; 
    const newStatut = (req.body);
    const ask = await Ask.findByPk(id);

    if (!ask) {
      throw new HttpError(404, "Request not found."); 
    }
console.log(newStatut);
    newStatut.status = newStatut.status.toLowerCase();

    // ask.status = req.body.status;
    Object.assign(ask, newStatut); // Mise à jour des données de la demande
    await ask.save(); // Enregistrement de la nouvelle demande

    if (ask.status === "validé") {
      const newFamilyId = {id_family : ask.id_family}
      const animal = await ask.getAnimal();

      Object.assign(animal, newFamilyId);
      await animal.save();
    }

    res.status(200).json(ask); // Envoie de la nouvelle demande mise à jour en réponse sous forme de JSON
  },
};
