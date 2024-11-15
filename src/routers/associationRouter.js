//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; 
import { animalController } from "../controllers/animalController.js";
import { verifyToken } from "../auth/verifyToken.js";
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js";
import { validate } from "../validation/validate.js"; 
import { patchSchema } from "../validation/patchAssociation.js"; 
import { verifyAssociation } from "../middlewares/verifyUser.js";


export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(associationController.getAllAssociations)); 
router.get("/:id",withTryCatch(associationController.getAssociationById )); 

router.get(
    "/:id/animal",
    verifyToken, isRoleAuthorizedMiddleware(["association"]),
    verifyAssociation(),
    withTryCatch(animalController.getAllAnimals
    ));

router.get("/:associationId/animal/:animalId",verifyToken, isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(animalController.getAnimalById));

//* Routes accessibles uniquement aux associations
router.patch(
    "/:id",
    verifyToken, 
    isRoleAuthorizedMiddleware(["association"]), 
    verifyAssociation(),
    validate(patchSchema, "body"), 
    withTryCatch(associationController.patchAssociation));

router.delete(
    "/:id",
    verifyToken,
    isRoleAuthorizedMiddleware(["association"]),
    verifyAssociation(), 
    withTryCatch(associationController.deleteAssociation));