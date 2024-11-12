//! Router principal
import { Router } from "express";

import { errorHandler } from '../middlewares/errorhandle.js'; // Importation du gestionnaire d'erreurs global
import  HttpError  from "../middlewares/httperror.js"; // Importation de la classe d'erreur HTTP personnalisée
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du décorateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { verifyToken } from "../auth/verifyToken.js"; // Importation du Middleware de vérification du token

import { router as animalRouter } from "./animalRouter.js"; // router secondaire pour les routes liées aux animaux
import { router as askRouter } from "./askRouter.js"; // router secondaire pour les routes liées aux alertes
import { router as associationRouter } from "./associationRouter.js"; // router secondaire pour les routes liées aux associations
import { router as familyRouter } from "./familyRouter.js"; // router secondaire pour les routes liées aux familles d'accueil
import { router as userRouter } from "./userRouter.js"; // router secondaire pour les routes liées aux utilisateurs

import { validate } from "../validation/validate.js"; // Importation de la fonction de validation
import { createSchema } from "../validation/allUser.js"; // Importation du schéma d'inscription JOI


import { signinController } from "../controllers/signinController.js"; // Importation du Controller signinController pour la connexion


const router = Router();


//! Routeurs secondaires
router.use("/association", associationRouter); // toutes les routes commencant par /association seront traitées par associationRouter
router.use("/animal", animalRouter); // toutes les routes commencant par /animal seront traitées par animalRouter
router.use("/ask",  verifyToken,  askRouter); // toutes les routes commencant par /ask seront traitées par askRouter
router.use("/family", verifyToken, familyRouter); // toutes les routes commencant par /family seront traitées par familyRouter
router.use("/user", userRouter);// toutes les routes commencant par /user seront traitées par userRouter

//! Routes pour la connexion 
router.post("/signin", withTryCatch(signinController.signinUser)); // Connexion

//! Route de raffraichissement du token
router.post("/refresh-token", withTryCatch(signinController.refreshToken));



// *Middleware pour gérer les routes non trouvées
router.use((req, res, next)=>{
  next(new HttpError(404, "Resource not found")); 
});

// *Middleware de gestion globale des erreurs
router.use(errorHandler); 


export default router; 