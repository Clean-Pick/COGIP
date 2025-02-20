import express from "express";
import { connection } from "../connectionDB.mjs";

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données");
    return;
  }
  console.log("Connecté à la base de données");
});

const router = express.Router();

router.get("/", (req, res) => {
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ message: "Email et mot de passe requis" });
  // }
  // connection.query("SELECT * FROM `users` WHERE email = ?", [email], (err, rows) => {
  //   if (err) {
  //     console.error("Erreur de requête SQL:", err);
  //     return res.status(500).json({ message: "Erreur serveur" });
  //   }
  //   if (rows.length === 0) {
  //     return res.status(404).json({ message: "Utilisateur non trouvé" });
  //   }
  //   const user = rows[0];
  //   if (password === user.password) {
  //     res.status(200).json({ message: "Connexion réussie" });
  //   } else {
  //     res.status(401).json({ message: "Mot de passe incorrect" });
  //   }
  // });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }
  connection.query("SELECT * FROM `users` WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Erreur de requête SQL:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const user = rows[0];

    if (password === user.password) {
      res.status(200).json({ message: "Connexion réussie" });
    } else {
      res.status(401).json({ message: "Mot de passe incorrect" });
    }
  });
});

router.put("/", (req, res) => {
  res.send({ data: `User updated` });
});

router.delete("/", (req, res) => {
  res.send({ data: `User deleted` });
});

export default router;
