//! Router secondaire pour les routes liées aux utilisateurs (prefixe de route : /api/user)

import { Router } from "express";

import { userController } from "../controllers/userController.js";  // Importation du Controller userController
import { createUserController } from "../controllers/createUserController.js"; // Importation du Controller createUserController

import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { validate } from "../validation/validate.js"; // Importation de la fonction de validation
import {  createSchema, patchSchema } from "../validation/allUser.js"; // Importation du schéma de modification d'utilisateur JOI
import {  isRoleAuthorizedMiddleware} from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits

import { verifyToken } from "../auth/verifyToken.js";

export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(userController.getAllUsers)); // Route pour lister tous les utilisateurs RESTCLient
router.get("/:id", withTryCatch(userController.getOneUser));
router.post ("/", validate (createSchema, "body"), withTryCatch(createUserController.createUser)); // Route pour ajouter un nouvel utilisateur

//* Routes accessibles uniquement aux associations et aux familles d'accueil
router.patch("/:id", verifyToken, isRoleAuthorizedMiddleware(["association", "family", "admin"]),validate(patchSchema, "body"),withTryCatch(userController.patchUser)); // Route pour modifier un utilisateur par son ID

//* Routes accessibles uniquement aux admin, aux associations et aux familles d’accueil
router.delete("/:id", verifyToken, isRoleAuthorizedMiddleware(["admin", "association", "family"]),withTryCatch(userController.deleteUser)); // Route pour supprimer un utilisateur par son ID


