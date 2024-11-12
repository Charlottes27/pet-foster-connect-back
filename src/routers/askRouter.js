//! Router secondaire pour les routes liées aux alertes (prefixe de route : /api/ask)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { askController } from "../controllers/askController.js"; // Importation du Controller askController
import {isRoleAuthorizedMiddleware} from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits
import { verifyAssociation } from "../middlewares/verifyUser.js";


export const router = Router();

//* Routes accessibles uniquement aux associations
router.get("/", isRoleAuthorizedMiddleware(["association"]), verifyAssociation() ,withTryCatch(askController.getAllAsks)); // Route pour lister toutes les demandes
router.get("/:id", isRoleAuthorizedMiddleware(["association"]), verifyAssociation(), withTryCatch(askController.getAskById)); // Route pour obtenir le détail d'une demande
router.patch("/:id", isRoleAuthorizedMiddleware(["association"]),verifyAssociation(), withTryCatch(askController.patchAsk)); // Route pour modifier une demande

//* Routes accessibles uniquement aux familles d'accueil
router.post("/", isRoleAuthorizedMiddleware(["family"]),withTryCatch(askController.createAsk)); // Route pour créer une nouvelle demande

