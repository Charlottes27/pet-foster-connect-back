import jwt from "jsonwebtoken"; // Importation de la bibliothèque jsonwebtoken qui permet de créer et vérifier des JSON Web Tokens (JWT)

//! Récupération de la clé secrète pour signer le token depuis les variables d'environnement (fichier .env)
const JWT_SECRET = process.env.JWT_SECRET;

//! Fonction pour générer un token JWT
export const generateToken = (user) => {
  // La fonction 'jwt.sign()' crée un nouveau token avec les informations de l'utilisateur.

  // Le premier argument de 'jwt.sign()' est le "payload", qui contient les données que nous voulons inclure dans le token
  // Ici, on inclut l'id de l'utilisateur, son email et son rôle (par exemple, admin ou utilisateur normal)
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role}, // Payload : contient les informations utilisateur à inclure dans le token
    JWT_SECRET, // Clé secrète utilisée pour signer le token et le rendre sûr
    { expiresIn: "1h" } // Configuration supplémentaire : ici, le token expire après 1 heure (on peut ajuster la durée selon les besoins)
  );
};
