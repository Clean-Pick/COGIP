import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Adresse de ton serveur MariaDB
  user: process.env.DB_USER, // Utilisateur de la base de données
  password: process.env.DB_PASSWORD, // Mot de passe de l'utilisateur
  database: process.env.DB_NAME, // Nom de la base de données
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
  } else {
    console.log("Connexion à la base de données réussie.");
  }
});

export { connection };
