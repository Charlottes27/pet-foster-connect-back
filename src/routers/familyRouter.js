//! Router secondaire pour les routes liées aux familles d'accueil (prefixe de route : /api/family)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { familyController } from "../controllers/familyController.js"; // Importation du Controller familyController
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits
import { validate } from "../validation/validate.js"; // Importation de la fonction de validation
import { patchSchema } from "../validation/patchFamily.js"; // Importation du schéma de modification d'utilisateur JOI
import { verifyFamily } from "../middlewares/verifyUser.js";

export const router = Router();

//* Routes accessibles uniquement aux admin et aux associations
router.get("/", isRoleAuthorizedMiddleware(["admin","association"]), withTryCatch(familyController.getAllFamilies)); // Route pour lister toutes les familles
router.get("/:id", isRoleAuthorizedMiddleware(["admin", "association"]), withTryCatch(familyController.getFamilyById)); // Route pour obtenir le détail d'une famille
router.patch("/:id", isRoleAuthorizedMiddleware(["family"]), verifyFamily(), validate(patchSchema, "body"), withTryCatch(familyController.patchFamily));
router.delete("/:id", isRoleAuthorizedMiddleware(["family"]), verifyFamily(), withTryCatch(familyController.deleteFamily))