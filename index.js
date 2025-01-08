import express from "express";
import "dotenv/config"; // Module pour charger le .env
import path from "path"; // Module pour travailler avec les chemins de fichiers et de répertoires
import { fileURLToPath } from "url"; // Utilisé pour manipuler les URL et obtenir des chemins de fichiers
import cors from "cors";
import mainRouter from "./src/routers/mainRouter.js"; // Importation du routeur principal de l'application

// ! Configuration des chemins d'accès aux fichiers
//Cette configuration (__filename et __dirname) est nécessaire en utilisant les modules ESM,
//__filename et __dirname ne sont pas définis par défaut sur module ESM (import) comme dans CommonJS (export).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration de CORS a retravailler avec option avant déploiement
app.use(
  cors({
    origin: process.env.CORS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options("*", cors());

// Middleware pour traiter le JSON
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Middleware pour servir des fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Utilisation du routeur principal
app.use("/api", mainRouter);

// Démarrage du serveur sur le port spécifié dans .env ou sur 3001 par défaut
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `🚀 Serveur API démarré à l'adresse : http://localhost:${PORT}/api`
  );
});
