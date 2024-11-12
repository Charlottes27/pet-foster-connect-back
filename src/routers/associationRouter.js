//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { associationController } from "../controllers/associationController.js";  // Importation du Controller associationController
import { animalController } from "../controllers/animalController.js";
import { verifyToken } from "../auth/verifyToken.js";
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js";
import { validate } from "../validation/validate.js"; // Importation de la fonction de validation
import { patchSchema } from "../validation/patchAssociation.js"; // Importation du schéma de modification d'utilisateur JOI
import { verifyAssociation } from "../middlewares/verifyUser.js";


export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(associationController.getAllAssociations)); // Route pour lister toutes les associations
router.get("/:id", withTryCatch(associationController.getAssociationById)); // Route pour obtenir le détail d'une association

router.get(
  "/:id/animal",
  /* verifyToken, isRoleAuthorizedMiddleware(["association"]), */ /* verifyAssociation(), */ withTryCatch(
    animalController.getAllAnimals
  )
); // Route pour lister tous les animaux
router.get(
  "/:id/animal/:id",
  /* verifyToken, isRoleAuthorizedMiddleware(["association"]), */ /* verifyAssociation(), */ withTryCatch(
    animalController.getAnimalById
  )
); // Route pour obtenir un animal par son ID --> détail d'un animal

router.patch("/:id",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), validate(patchSchema, "body"), withTryCatch(associationController.patchAssociation));
router.delete("/:id",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(associationController.deleteAssociation))