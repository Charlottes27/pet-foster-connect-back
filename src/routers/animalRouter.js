//! Router secondaire pour les routes liées aux animaux (prefixe de route : /api/animal)

import { Router } from "express";
import  withTryCatch  from "../controllers/withTryCatchController.js"; // Importation du décorateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { animalController } from "../controllers/animalController.js";  // Importation du Controller animalController
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits
import { verifyToken } from "../auth/verifyToken.js"; // Importation du Middleware de vérification du token
import { validate } from "../validation/validate.js";
import { createSchema, patchSchema } from "../validation/animal.js";

export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(animalController.getAllAnimals)); // Route pour lister tous les animaux
router.get("/:id", withTryCatch(animalController.getAnimalById)); // Route pour obtenir un animal par son ID --> détail d'un animal

//* Routes accessibles uniquement aux associations
router.post("/", verifyToken, isRoleAuthorizedMiddleware(["association"]), validate(createSchema, "body"), withTryCatch(animalController.createAnimal)); // Route pour créer un nouvel animal
router.patch("/:id", verifyToken, isRoleAuthorizedMiddleware(["association"]), validate(patchSchema, "body"), withTryCatch(animalController.patchAnimal)); // Route pour modifier un animal par son ID
router.delete("/:id",  verifyToken, isRoleAuthorizedMiddleware(["association"]), withTryCatch(animalController.deleteAnimal)); // Route pour supprimer un animal par son ID