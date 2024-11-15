//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { associationController } from "../controllers/associationController.js";  // Importation du Controller associationController
import { animalController } from "../controllers/animalController.js";
import { askController} from "../controllers/askController.js"
import { verifyToken } from "../auth/verifyToken.js";
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js";
import { validate } from "../validation/validate.js"; // Importation de la fonction de validation
import { patchSchema } from "../validation/patchAssociation.js"; // Importation du schéma de modification d'utilisateur JOI
import { verifyAssociation } from "../middlewares/verifyUser.js";


export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(associationController.getAllAssociations)); 
router.get(
    "/:id",
    withTryCatch(associationController.getAssociationById
    )); 

router.patch("/:id",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), validate(patchSchema, "body"), withTryCatch(associationController.patchAssociation));
router.delete("/:id",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(associationController.deleteAssociation));

router.get("/:id/animal",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(animalController.getAllAnimals));
router.get("/:associationId/animal/:animalId",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(animalController.getAnimalById));

router.get("/:associationId/ask",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(askController.getAllAsks));
router.get("/:associationId/ask/:askId",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(askController.getAskById));
router.patch("/:associationId/ask/:askId",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(askController.patchAsk));
