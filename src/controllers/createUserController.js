import User from "../models/user.js";
import { Scrypt } from "../auth/Scrypt.js";
import { generateToken } from "../auth/tokenService.js";
import validator from "validator";
import Family from "../models/family.js";
import Association from "../models/association.js";
import { validatePassword } from "../validation/validatePassword.js";


//! Fonction pour créer un utilisateur
export const createUserController = {
  async createUser(req, res) {
    const user = req.body;
    const familyData = req.body.family;
    const associationData = req.body.association;

    //! Vérification de la validité de l'email
    if (!validator.isEmail(user.email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    //! Vérification de la validité du mot de passe
    if (!validatePassword(user.password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
      });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    // Hachage du mot de passe
    const hashedPassword = Scrypt.hash(user.password);
    

    if (associationData) {
      user.role = "association"; // Si les informations de l'association sont présentes
      // Vérification des champs obligatoires pour l'

      const newUser = await User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
        role: user.role
      })

      const newAssociation= await Association.create({
        ...associationData,
        id_user: newUser.id
      });
      
      const userAssociation = {
        ...newUser.toJSON(),
        association: newAssociation.toJSON()
      }

      delete userAssociation.password;

      // Génération du token
      const token = generateToken(userAssociation);

      res.status(201).json({
        message: "Inscription réussie",
        token,
        userAssociation
      });
    }

    if (familyData) {
      user.role = "family";

      const newUser = await User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
        role: user.role
      })

      const newFamily = await Family.create({
        ...familyData,
        id_user: newUser.id
      });
      
      const userFamily = {
        ...newUser.toJSON(),
        family: newFamily.toJSON()
      }

      delete userFamily.password;

      // Génération du token
      const token = generateToken(userFamily);

      res.status(201).json({
        message: "Inscription réussie",
        token,
        userFamily
      })
    }

    else {
      throw new HttpError(400, "Merci de bien compléter toutes les informations")
    }

 
  }
};
